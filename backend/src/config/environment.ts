import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 4000,
  LOG_FILE_PATH: process.env.LOG_FILE_PATH || "",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
};
