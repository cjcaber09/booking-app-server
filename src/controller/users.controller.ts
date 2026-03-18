import { Request, Response } from "express";
import { LoginUserType, RegisterUserType } from "../types/users.types";
import bcrypt from "bcrypt";
import { LoginUserModel, RegisterUserModel } from "../models/users.model";
import { generateToken } from "../utils/utils";

export const RegisterUserController = async (
  req: Request<{}, {}, RegisterUserType>,
  res: Response,
) => {
  // TODO - Implement user registration logic
  // 1. Validate input data
  let { email, password, name, role } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  // 2. Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);
  password = hashedPassword; // Update password with hashed version
  // 3. Store user in database
  const stored = await RegisterUserModel({
    email,
    password,
    name,
    role: role || "user", // Default role, can be modified as needed
  });
  console.log("Stored user data:", stored);
  if ("error" in stored)
    return res
      .status(500)
      .json({ message: stored.error?.message || "Error registering user" });
  //  Create token and set is local storage in frontend
  const token = generateToken({
    id: stored.id,
    email: stored.email,
    role: stored.role,
  }); // Implement generateToken to create JWT

  res.status(201).json({ ...stored, token });
};

export const LoginUser = async (
  req: Request<{}, {}, LoginUserType>,
  res: Response,
) => {
  const user = await LoginUserModel(req.body.email);
  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });
  console.log({ pass: req.body.password, pass1: user.password });
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
  if (!isPasswordValid)
    return res.status(401).json({ message: "Invalid email or password" });

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  // remove password from user object before sending response
  const { password, ...userWithoutPassword } = user;
  res.status(200).json({ ...userWithoutPassword, token });
};
