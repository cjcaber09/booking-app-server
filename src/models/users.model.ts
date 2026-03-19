import pool from "../config/db";
import { RegisterUserType, UserType } from "../types/users.types";

export const RegisterUserModel = async (userData: RegisterUserType) => {
  try {
    console.log("Registering user with data:", userData);
    const query =
      "INSERT INTO users (email, password, name, role, addresses ) VALUES ($1, $2, $3, $4, $5) RETURNING *";

    const values = [
      userData.email,
      userData.password,
      userData.name,
      userData?.role || "user",
      userData?.addresses?.length
        ? JSON.stringify(userData.addresses)
        : JSON.stringify([]),
    ];
    const result = await pool.query(query, values);
    // Return user data without password
    const { password, ...userWithoutPassword } = result.rows[0];
    return userWithoutPassword;
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
    return result.rows[0];
  } catch (err) {
    console.error("Error logging in user:", err);
    throw err;
  }
};
