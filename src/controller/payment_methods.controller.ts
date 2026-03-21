import { Request, Response } from "express";
import {
  createPaymentMethodModel,
  getPaymentMethodById,
  getPaymentMethodsModel,
} from "../models/payment_methods.models";
import { BodyRequest, ParamRequest } from "../types/express";
import {
  CreatePaymentMethodType,
  PaymentMethodId,
} from "../types/payment_methods.types";

export const getPaymentMethods = async (req: Request, res: Response) => {
  const paymentMethods = await getPaymentMethodsModel();
  if (paymentMethods.length === 0)
    return res.status(404).json({ message: "No payment methods found" });
  // TODO - Implement logic to fetch available payment methods
  res.status(200).json(paymentMethods);
};

export const getPaymentMethod = async (
  req: ParamRequest<PaymentMethodId>,
  res: Response,
) => {
  let { id } = req.params;
  const paymentMethod = await getPaymentMethodById(id);
  if ("error" in paymentMethod)
    return res.status(500).json({
      message: paymentMethod.error?.message || "Error fetching payment method",
    });
  // TODO - Implement logic to fetch payment method details by ID
  res.status(200).json({
    message: "Get payment method by ID not implemented yet",
  });
};

export const createPaymentMethod = async (
  req: BodyRequest<CreatePaymentMethodType>,
  res: Response,
) => {
  let { name, description } = req.body;
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  const created = await createPaymentMethodModel({
    name,
    description,
    user_id: req.user.id,
  });
  if ("error" in created)
    return res.status(500).json({
      message: created.error?.message || "Error creating payment method",
    });
  // get all the payment methods for the user after creating a new one
  const paymentMethods = await getPaymentMethodsModel();
  if (paymentMethods.length === 0)
    return res.status(404).json({ message: "No payment methods found" });
  return res.status(201).json(paymentMethods);
  // TODO - Implement logic to create a new payment method
};
