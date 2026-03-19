export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at?: Date;
  status?: string;
  role: string;
  addresses?: addressType[];
  contact_info?: contactInfoType;
  payment_info?: paymentInfoType;
}

export interface addressType {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface contactInfoType {
  phone: string;
  alternate_email?: string;
}

export interface paymentInfoType {
  type: string;
  details: Record<string, any>;
}


export type RequiredUserFields = "email" | "password";

export type LoginUserType = Pick<UserType, RequiredUserFields>;

export type TokenPayload = Pick<UserType, "id" | "email" | "role">;

export type UserResponse = Pick<UserType, "id" | "name" | "email" | "role">;

export type RegisterUserType = Omit<
  UserType,
  "id" | "created_at" | "updated_at" | "status"
>;

export type UserSuccessResponse = Omit<UserType, "password">;
