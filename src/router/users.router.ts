import express from "express";
import {
  RegisterUserController,
  LoginUser,
} from "../controller/users.controller";
import { validateRegister } from "../validation/user.middleware";
const router = express.Router();

router.post("/register", validateRegister, RegisterUserController);
router.post("/login", LoginUser);

export default router;
