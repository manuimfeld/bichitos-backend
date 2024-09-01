import { Request } from "express";
import { User } from "./user"; // Ajusta la ruta según la estructura de tu proyecto

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
