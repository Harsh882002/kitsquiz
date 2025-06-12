import { db } from "../database.js";

export const deleteTest = async (req,res) => {
  const {id} = req.params;
  console.log("Deleting test with ID:", id);    

  try {
    const [result] = await db.execute("DELETE FROM tests WHERE testcode =? ", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Test not found" });
    }

res.json({ message: "Test deleted successfully", id });
  } catch (error) {
    console.error("Error deleting test:", error);
    res.status(500).json({ message: "Server error" });
  }
};
