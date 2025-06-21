import { db } from "../database.js";

export const updateQuiz = async (req, res) => {
  const { testCode } = req.params;
  const {
    user_id,
    title,
    duration,
    expire_at,
    negative_marking = 0,
    randomize = 0,
    questions: questionsArray
  } = req.body;

  if (!testCode || !user_id || !title || !duration || !expire_at || !Array.isArray(questionsArray)) {
    return res.status(400).json({ error: "Missing or invalid data" });
  }

  // Convert ISO string to MySQL DATETIME format
const formattedExpireAt = new Date(expire_at)
  .toISOString()
  .slice(0, 19)
  .replace("T", " "); // => '2025-06-19 10:23:39'


  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Get test ID from testCode
    const [testRows] = await connection.execute(
      `SELECT id FROM tests WHERE testcode = ? AND user_id = ?`,
      [testCode, user_id]
    );

    if (testRows.length === 0) {
      return res.status(404).json({ error: "Test not found or unauthorized" });
    }

    const test_id = testRows[0].id;

    // Update test
    await connection.execute(
  `UPDATE tests SET title = ?, duration = ?, questions = ?, expire_at = ?, negative_marking = ?, randomize = ? WHERE id = ?`,
  [title, duration, questionsArray.length, formattedExpireAt, negative_marking, randomize, test_id]
);

    // Delete old questions
    await connection.execute(`DELETE FROM test_questions WHERE test_id = ?`, [test_id]);

    // Insert new questions
    const insertPromises = questionsArray.map(
      ({ question_text, options, correct_answer }) =>
        connection.execute(
          `INSERT INTO test_questions (test_id, question_text, options, correct_answer) VALUES (?, ?, ?, ?)`,
          [test_id, question_text, JSON.stringify(options), correct_answer]
        )
    );

    await Promise.all(insertPromises);
    await connection.commit();

    res.json({ success: true, message: "Test updated successfully", testCode });
  } catch (err) {
    await connection.rollback();
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update test", details: err.message });
  } finally {
    connection.release();
  }
};
