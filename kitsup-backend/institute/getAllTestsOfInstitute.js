import { db } from "../database.js";

export const getAllTestsOfInstitute = async (req, res) => {
    const { institute_id } = req.params;

    if (!institute_id) {
        return res.status(400).json({ success: false, message: "Institute Id Not Found" });
    }

    const sql = "SELECT * FROM tests WHERE institute_id = ?";

    const sql1 = "SELECT * FROM teachers WHERE user_id = ?"

    try {
        const [rows] = await db.execute(sql, [institute_id]);
 
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No Tests Found." });
        }

        //fetch teacher data for each testr row
        const resultWithTeacherData = await Promise.all(
            rows.map(async(test)=>{
 
                const [teachers] = await db.execute(sql1,[test.user_id]);

                return {
                    ...test,
                    teacher:teachers[0] || null,
                };
            })
        );

        return res.json({
            success: true,
            data: resultWithTeacherData,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err });
    }
};
