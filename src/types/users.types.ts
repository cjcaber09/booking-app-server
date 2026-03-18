export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at?: Date;
  status?: string;
  role: string;
}
export type RequiredUserFields = "email" | "password";

export type LoginUserType = Pick<UserType, RequiredUserFields>;

export type TokenPayload = Pick<UserType, "id" | "email" | "role">;

export type RegisterUserType = Omit<
  UserType,
  "id" | "created_at" | "updated_at" | "status"
>;

export type UserSuccessResponse = Omit<UserType, "password">;
