import { Request } from "express";
import { User } from "./user"; // Asegúrate de ajustar la ruta según la ubicación de tu archivo de tipos `User`.

export interface IGetUserAuthInfoRequest extends Request {
  user?: User; // O el tipo que hayas definido para "User"
}
