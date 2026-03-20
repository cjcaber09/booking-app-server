import pool from "./db";
import roomsMigration from "./migrations/rooms.migration";
import UserTableMigration from "./migrations/users.migration";

const seed = async (): Promise<void> => {
  try {
    await pool.query(UserTableMigration);
    await pool.query(roomsMigration);
    console.log("Database seeded successfully.");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await pool.end();
  }
};

seed();
