import pool from "../config/db";
import {
  CreatePaymentMethodType,
  PaymentMethodId,
} from "../types/payment_methods.types";

export const getPaymentMethodsModel = async () => {
  const query = "SELECT * FROM payment_methods";
  const result = await pool.query(query);
  return result.rows;
};

export const createPaymentMethodModel = async (
  methodData: CreatePaymentMethodType,
) => {
  try {
    const query =
      "INSERT INTO payment_methods (name, description, user_id) VALUES ($1, $2, $3) RETURNING *";
    const values = [
      methodData.name,
      methodData.description,
      methodData.user_id,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating payment method:", error);
    return { error };
  }
};

export const getPaymentMethodById = async (id: PaymentMethodId) => {
  try {
    const query = "SELECT * FROM payment_methods WHERE id = $1";
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching payment method by ID:", error);
    return { error };
  }
};
