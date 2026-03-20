import dotenv from "dotenv";
import express from "express";
import usersRouter from "./router/users.router";
import pool from "./config/db";
import cors from "cors";
import bookingsRouter from "./router/bookings.routes";
import roomsRouter from "./router/rooms.routes";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
pool
  .connect()
  .then(() => console.log("Connected to the database."))
  .catch((err) => console.error("Database connection error:", err.stack));

app.use(cors());
const prefix = "/api/v1";
app.use(`${prefix}/users`, usersRouter);
app.use(`${prefix}/bookings`, bookingsRouter);
app.use(`${prefix}/rooms`, roomsRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Connected to the server."));
