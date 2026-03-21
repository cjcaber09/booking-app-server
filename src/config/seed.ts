import pool from "./db";
import roomsMigration from "./migrations/rooms.migration";
import UserTableMigration from "./migrations/users.migration";
import paymentMethodsMigration from "./migrations/payment_methods.migration";
import bookingsMigration from "./migrations/bookings.migration";
import paymentsMigration from "./migrations/payments.migration";

const seed = async (): Promise<void> => {
  try {
    await pool.query(UserTableMigration);
    console.log("Users table created successfully.");
    await pool.query(roomsMigration);
    console.log("Rooms table created successfully.");
    await pool.query(paymentMethodsMigration);
    console.log("Payment methods table created successfully.");
    await pool.query(paymentsMigration);
    console.log("Payments table created successfully.");
    await pool.query(bookingsMigration);
    console.log("Bookings table created successfully.");



    console.log("Database seeded successfully.");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await pool.end();
  }
};

seed();
