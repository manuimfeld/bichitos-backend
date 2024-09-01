import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../types/user";

dotenv.config();
const secret = process.env.JWT_SECRET as string;

export const signJwt = (data: object) => {
  return jwt.sign(data, secret, { expiresIn: "14d" });
};

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secret, (err, user) => {
      if (err) return res.sendStatus(403);

      req.user = user as User;
      next();
    });
  } catch (error) {
    console.error("Error in JWT authentication:", error);
    res.sendStatus(500);
  }
};

export const authorizeRole = (authorizedRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User;

    if (user?.role !== authorizedRole) {
      return res.sendStatus(403); // Forbidden
    }
    next();
  };
};

module.exports = {
  signJwt,
  authenticateJWT,
  authorizeRole,
};
