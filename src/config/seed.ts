import pool from "./db";
import UserTableMigration from "./migrations/users.migration";

const seed = async (): Promise<void> => {
  try {
    await pool.query(UserTableMigration);
    console.log("Database seeded successfully.");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await pool.end();
  }
};

seed();
