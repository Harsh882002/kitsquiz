import { db } from "../database.js";
import bcrypt from "bcrypt";

export const registerApi = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    role,
    type,
    city,
    state,
    department,
    gender,
    employeeId,
    institute_id,
  } = req.body;

  console.log(req.body);

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Name, email, password, and role are required." });
  }

  try {
    // Check if email already exists
    const [existingUser] = await db.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Insert into users
    const sql =
      "INSERT INTO users (name, email, phone, password, role) VALUES (?, ?, ?, ?, ?)";
    const [userResult] = await db.execute(sql, [
      name,
      email,
      phone,
      hashPassword,
      role,
    ]);

    const userId = userResult.insertId;

    switch (role) {
      case "institutes":
        await db.execute(
          "INSERT INTO institutes (user_id, institute_name, type, city, state) VALUES (?, ?, ?, ?, ?)",
          [userId, name, type, city, state]
        );
        return res
          .status(201)
          .json({ message: "Institute added successfully." });

      case "teachers":
        // Check if institute exists
        let instituteIdToInsert = null;

        if (institute_id) {
          const [institute] = await db.execute(
            "SELECT id FROM institutes WHERE id = ?",
            [institute_id]
          );
          if (institute.length > 0) {
            instituteIdToInsert = institute_id;
          } else {
            console.warn("Invalid institute_id, setting to NULL.");
          }
        }

        await db.execute(
          "INSERT INTO teachers (user_id, full_name, gender, department, employee_id, institute_id) VALUES (?, ?, ?, ?, ?, ?)",
          [userId, name, gender, department, employeeId, instituteIdToInsert]
        );

        return res
          .status(201)
          .json({ message: "Teacher registered successfully." });

      case "superadmin":
        await db.execute(
          "INSERT INTO superadmin (user_id, name, phone) VALUES (?, ?, ?)",
          [userId, name, phone]
        );
        return res
          .status(201)
          .json({ message: "Superadmin created successfully." });

      default:
        return res.status(400).json({ message: "Invalid role specified." });
    }
  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};
