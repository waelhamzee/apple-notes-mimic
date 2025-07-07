import { HTTP_STATUS } from "@/shared/constants";
import { ApiResponse } from "@/shared/types";
import { Request, Response } from "express";
import userService from "../services/UserService";

export class UserController {
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        throw new Error("User not authenticated");
      }

      const result = await userService.getProfile(userId);

      const response: ApiResponse = {
        success: true,
        data: result,
      };

      res.status(HTTP_STATUS.OK).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        error: error.message || "Failed to get profile",
      };

      res.status(HTTP_STATUS.BAD_REQUEST).json(response);
    }
  }
}

export default new UserController();
