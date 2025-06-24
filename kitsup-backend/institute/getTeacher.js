import { db } from "../database.js";

export const getTeacherOfInstitute = async (req, res) => {
    const { id } = req.params;
     

    if (!id) {
        return res.status(400).json({ message: "Id Not Found" });
    }

    const sql = `SELECT * FROM teachers WHERE institute_id = ?`;

    try {
        const [rows] = await db.execute(sql, [id]); // ← Fixed: id wrapped in []

        if (rows.length === 0) {
            return res.status(404).json({ message: "Data Not Found" });
        }

        return res.status(200).json({
            success: true,
            data: rows,
        });
    } catch (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
