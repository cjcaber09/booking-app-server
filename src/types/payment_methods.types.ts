export interface PaymentMethodTypes {
  id: number;
  name: string;
  description: string;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export type CreatePaymentMethodType = Omit<
  PaymentMethodTypes,
  "id" | "created_at" | "updated_at"
>;
export type PaymentMethodId = Pick<PaymentMethodTypes, "id">;
export type UpdatePaymentMethodType = Partial<CreatePaymentMethodType>;
