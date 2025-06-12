import { nanoid } from "nanoid";
import { db } from "../database.js"; // Assume db is a mysql2 promise pool

export const uploadQuiz = async (req, res) => {
  let {
    user_id,
    title,
    duration,
    expire_at,
    negative_marking = 0,
    randomize = 0,
    questions: questionsArray,
  } = req.body;

  // Defensive parse if questions are sent as string
  if (typeof questionsArray === "string") {
    try {
      questionsArray = JSON.parse(questionsArray);
    } catch {
      return res.status(400).json({ error: "Invalid questions array format" });
    }
  }

  // Validate required fields and types
  if (
    !user_id ||
    isNaN(user_id) ||
    !title ||
    typeof title !== "string" ||
    !duration ||
    isNaN(duration) ||
    !expire_at ||
    !questionsArray ||
    !Array.isArray(questionsArray) ||
    questionsArray.length === 0
  ) {
    return res.status(400).json({ error: "Missing or invalid test data" });
  }

  user_id = Number(user_id);
  duration = Number(duration);
  negative_marking = Number(negative_marking);
  randomize = Number(randomize);

  if (![0, 1].includes(negative_marking)) negative_marking = 0;
  if (![0, 1].includes(randomize)) randomize = 0;

  // Validate datetime format (YYYY-MM-DD HH:mm:ss)
  const datetimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  if (!datetimeRegex.test(expire_at)) {
    return res.status(400).json({ error: "Invalid expiration date format" });
  }

  // Validate each question object
  for (const [index, q] of questionsArray.entries()) {
    if (
      !q.question_text ||
      typeof q.question_text !== "string" ||
      !q.type ||
      (q.type !== "mcq" && q.type !== "text")
    ) {
      return res.status(400).json({
        error: `Invalid question format at index ${index}: 'question_text' (string) and valid 'type' ('mcq' or 'text') are required.`,
      });
    }

    if (q.type === "mcq") {
      if (
        !q.options ||
        typeof q.options !== "object" ||
        Object.keys(q.options).length === 0 ||
        !q.correct_answer ||
        !Object.prototype.hasOwnProperty.call(q.options, q.correct_answer)
      ) {
        return res.status(400).json({
          error: `Invalid MCQ options or 'correct_answer' at index ${index}.`,
        });
      }
      // MCQs should NOT have keywords
      if (q.keywords !== undefined) {
        return res.status(400).json({
          error: `Keywords should NOT be provided for MCQ questions at index ${index}.`,
        });
      }
    } else if (q.type === "text") {
      // For text questions, options and correct_answer should be null or undefined
      if (q.options !== null && q.options !== undefined) {
        return res.status(400).json({
          error: `Text type questions must have options as null or undefined at index ${index}.`,
        });
      }
      // keywords must be an array of strings if provided
      if (q.keywords !== undefined) {
        if (
          !Array.isArray(q.keywords) ||
          !q.keywords.every((kw) => typeof kw === "string")
        ) {
          return res.status(400).json({
            error: `Keywords must be an array of strings for text questions at index ${index}.`,
          });
        }
      }
    }
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Generate unique test code
    const testCode = nanoid(10);

    // Insert into `tests` table
    const [testResult] = await connection.execute(
      `INSERT INTO tests (user_id, title, duration, questions, expire_at, negative_marking, randomize, testcode)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        title,
        duration,
        questionsArray.length,
        expire_at,
        negative_marking,
        randomize,
        testCode,
      ]
    );

    const testId = testResult.insertId;

    // Insert questions with keywords support
    const insertPromises = questionsArray.map(
      ({ question_text, options, correct_answer, type, keywords }) => {
        const optionsToStore = type === "mcq" ? JSON.stringify(options) : null;
        const correctAnswerToStore = type === "mcq" ? correct_answer : null;
        const keywordsToStore =
          type === "text" && keywords ? JSON.stringify(keywords) : null;

        return connection.execute(
          `INSERT INTO test_questions (test_id, question_text, options, correct_answer, type, keywords)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            testId,
            question_text,
            optionsToStore,
            correctAnswerToStore,
            type,
            keywordsToStore,
          ]
        );
      }
    );

    await Promise.all(insertPromises);

    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Test created successfully",
      testId,
      testCode,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Error creating test:", error);
    res.status(500).json({
      error: "Failed to create the test",
      details: error.message,
    });
  } finally {
    connection.release();
  }
};
