import { Request, Response } from "express";
import pool from "@/config/pg/connection";
import salesQueries from "@/queries/salesQueries";
import { paymentMapping, turnMapping } from "@/utils/mappingSales";
import { handleSuccess, handleError } from "@/utils/responseHelper";

export const getAllSales = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(salesQueries.getAllSales);
    handleSuccess(res, result.rows);
  } catch (error) {
    handleError(res, error, "Error al obtener todas las ventas");
  }
};

export const getSalesToday = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(salesQueries.getSalesToday);
    handleSuccess(res, result.rows);
  } catch (error) {
    handleError(res, error, "Error al obtener todas las ventas");
  }
};

export const getSalesByDay = async (req: Request, res: Response) => {
  const sale_date = req.params.date;
  const startDate = new Date(sale_date + "T00:00:00Z");
  const endDate = new Date(sale_date + "T23:59:59Z");

  if (!sale_date) {
    return handleError(res, null, "Faltan datos requeridos");
  }
  try {
    const result = await pool.query(salesQueries.getSalesByDay, [
      startDate,
      endDate,
    ]);
    handleSuccess(res, result.rows);
  } catch (error) {
    handleError(res, error, "Error a obtener las ventas");
  }
};

export default { getAllSales, getSalesToday, getSalesByDay };
