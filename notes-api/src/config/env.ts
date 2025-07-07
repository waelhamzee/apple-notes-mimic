import dotenv from 'dotenv';

dotenv.config();

export const env = {
  // Database
  DB_NAME: process.env.DB_NAME || 'todos',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASS: process.env.DB_PASS || '',
  DB_HOST: process.env.DB_HOST || 'localhost',
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret',
  
  // Server
  PORT: parseInt(process.env.PORT || '4000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Validation
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const; 