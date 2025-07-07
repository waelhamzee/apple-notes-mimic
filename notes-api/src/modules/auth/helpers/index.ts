import { generateToken } from "./generateToken";
import { hashPassword } from "./hashPassword";
import { comparePasswords } from "./comparePasswords";

export class AuthHelpers {
  static generateToken = generateToken;
  static hashPassword = hashPassword;
  static comparePasswords = comparePasswords;
}

export default AuthHelpers;
