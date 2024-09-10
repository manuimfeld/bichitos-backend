import { Request, Response } from "express";
import pool from "@/config/pg/connection";
import salesQueries from "@/queries/salesQueries";
import { paymentMapping, turnMapping } from "@/utils/mappingSales";
import { handleSuccess, handleError } from "@/utils/responseHelper";

export const getTotalSalesThisMonth = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(salesQueries.getTotalSalesMonth);
    handleSuccess(res, result.rows[0]);
  } catch (error) {
    console.error("Error al obtener ventas del mes:", error);
    handleError(res, error, "Error al crear la venta");
  }
};
export const getTotalSalesYear = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(salesQueries.getTotalSalesYear);
    handleSuccess(res, result.rows);
  } catch (error) {
    console.error("Error al obtener ventas del mes:", error);
    handleError(res, error, "Error al crear la venta");
  }
};

export default { getTotalSalesThisMonth, getTotalSalesYear };
