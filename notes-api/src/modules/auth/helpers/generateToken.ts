import { env } from "@/config/env";
import User from "@/modules/user/models/User";
import { APP_CONSTANTS } from "@/shared/constants";
import jwt from "jsonwebtoken";

export function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    env.JWT_SECRET,
    {
      expiresIn: APP_CONSTANTS.JWT_EXPIRES_IN,
    }
  );
}
