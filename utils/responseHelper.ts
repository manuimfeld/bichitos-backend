import { Response } from "express";

export const handleSuccess = (res: Response, data: any) => {
  if (!res.headersSent) {
    res.status(200).json(data);
  }
};

export const handleError = (res: Response, error: unknown, message: string) => {
  if (!res.headersSent) {
    // Verifica si error es null o undefined y maneja la excepción
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message, details: errorMessage });
  }
};

export default { handleSuccess, handleError };
