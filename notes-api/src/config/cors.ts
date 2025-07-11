import { env } from "@/config/env";
import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: env.isDevelopment ? "http://localhost:5173" : "*", // remove "*"" from production and add your calling domain
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default corsOptions;
