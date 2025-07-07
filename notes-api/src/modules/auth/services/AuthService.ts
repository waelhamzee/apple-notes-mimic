import { APP_CONSTANTS } from "@/shared/constants";
import { BadRequestError, UnauthorizedError } from "@/shared/errors";
import userRepository from "../../user/repositories/UserRepository";
import { AuthResponseDto, CreateUserDto, LoginDto } from "../dtos";
import AuthHelpers from "../helpers";

export class AuthService {
  async signup(data: CreateUserDto): Promise<AuthResponseDto> {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequestError("User with this email already exists");
    }
    const hashedPassword = await AuthHelpers.hashPassword(
      data.password,
      APP_CONSTANTS.BCRYPT_ROUNDS
    );
    const user = await userRepository.create({
      email: data.email,
      name: data.name,
      password: hashedPassword,
    });
    const token = AuthHelpers.generateToken(user);
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }

  async login(data: LoginDto): Promise<AuthResponseDto> {
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }
    const isValidPassword = await AuthHelpers.comparePasswords(
      data.password,
      user.password
    );
    if (!isValidPassword) {
      throw new UnauthorizedError("Invalid credentials");
    }
    const token = AuthHelpers.generateToken(user);
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}

export default new AuthService();
