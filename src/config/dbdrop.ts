// drops all tables in the database and re-syncs them
import pool from "./db";

const dropTables = async (): Promise<void> => {
  try {
    await pool.query("DROP TABLE IF EXISTS bookings");
    await pool.query("DROP TABLE IF EXISTS rooms");
    await pool.query("DROP TABLE IF EXISTS users");
    console.log("All tables dropped successfully.");
  } catch (err) {
    console.error("Error dropping tables:", err);
  } finally {
    await pool.end();
  }
};

dropTables();
