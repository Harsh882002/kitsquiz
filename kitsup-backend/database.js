import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createPool({
    host: "34.93.43.63",
    user: "root",
    password: "root",
    database: "kitsquizdatabase",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

try {
    const connection = await db.getConnection();
    console.log("Database Connected successfully...");
    connection.release(); // Always release the connection back to the pool
} catch (err) {
    console.error("Database Connection Failed...", err);
}
