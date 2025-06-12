import { db } from "../database.js";

export const getLeaderBoard = async (req, res) => {
  const { test } = req.params;
 
  try {
    // Step 1: Get top 10 results for the test
    const [results] = await db.execute(
      "SELECT student_id, score, submitted_at FROM results WHERE test_id = ? ORDER BY score DESC LIMIT 10",
      [test]
    );

    // Step 2: If no results found, return early
    if (results.length === 0) {
      return res.status(404).json({ message: "No results found for this test" });
    }

    // Step 3: Get all student IDs from the result
    const studentIds = results.map(row => row.student_id);

    // Step 4: Get student details in a single query using IN clause
    const [students] = await db.execute(
      `SELECT id, name, email, city FROM students WHERE id IN (${studentIds.map(() => '?').join(',')})`,
      studentIds
    );

    // Step 5: Merge student data with results
    const leaderboard = results.map(result => {
      const student = students.find(s => s.id === result.student_id);
      return {
        student_id: result.student_id,
        name: student?.name || 'Unknown',
        email: student?.email || '',
        city: student?.city || '',
        score: result.score,
        submitted_at: result.submitted_at
      };
    });

    res.json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Server error while fetching leaderboard" });
  }
};
