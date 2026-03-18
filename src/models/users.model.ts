import pool from "../config/db";
import {
  RegisterUserType,
  UserSuccessResponse,
  UserType,
} from "../types/users.types";
import bcrypt from "bcrypt";
export const RegisterUserModel = async (userData: RegisterUserType) => {
  try {
    console.log("Registering user with data:", userData);
    const query =
      "INSERT INTO users (email, password, name, role ) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [
      userData.email,
      userData.password,
      userData.name,
      userData?.role || "user",
    ];
    const result = await pool.query(query, values);
    // Return user data without password
    const { password, ...userWithoutPassword } = result.rows[0];
    return userWithoutPassword as UserSuccessResponse;
  } catch (err) {
    return { message: "Error registering user", error: err } as {
      message: string;
      error: any;
    };
  }
};
export const LoginUserModel = async (email: string) => {
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0] as UserType;
  } catch (err) {
    console.error("Error logging in user:", err);
    throw err;
  }
};
