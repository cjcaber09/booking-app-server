import express from "express";
import {
  createPaymentMethod,
  getPaymentMethods,
} from "../controller/payment_methods.controller";
import authenticateAdmin from "../middleware/admin.middleware";
import { validateBookingSchema } from "../validation/user.middleware";

const router = express.Router();

router.get("/", getPaymentMethods);
router.post("/create", authenticateAdmin, createPaymentMethod);

export default router;
