import { UserResponse, UserSuccessResponse } from "../types/users.types";

export const toUserResponse = (user: UserSuccessResponse): UserResponse => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});
