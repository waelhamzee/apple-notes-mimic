import { HTTP_STATUS } from "@/shared/constants";
import { ApiResponse } from "@/shared/types";
import { Request, Response } from "express";
import { CreateUserDto, LoginDto } from "../dtos";
import authService from "../services/AuthService";

export class AuthController {
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateUserDto = req.body;
      const result = await authService.signup(data);
      const response: ApiResponse = {
        success: true,
        data: result,
        message: "User created successfully",
      };
      res.status(HTTP_STATUS.CREATED).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Signup failed",
      };
      res.status(HTTP_STATUS.BAD_REQUEST).json(response);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const data: LoginDto = req.body;
      const result = await authService.login(data);
      const response: ApiResponse = {
        success: true,
        data: result,
        message: "Login successful",
      };
      res.status(HTTP_STATUS.OK).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Login failed",
      };
      res.status(HTTP_STATUS.BAD_REQUEST).json(response);
    }
  }
}

export default new AuthController();
