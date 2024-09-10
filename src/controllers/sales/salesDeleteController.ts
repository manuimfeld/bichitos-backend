import { Request, Response } from "express";
import pool from "../../config/pg/connection";
import salesQueries from "../../queries/salesQueries";
import { paymentMapping, turnMapping } from "../../utils/mappingSales";
import { handleSuccess, handleError } from "../../utils/responseHelper";

export const deleteSale = async (req: Request, res: Response) => {
  const { sale_id } = req.params;

  if (!sale_id) {
    return handleError(res, null, "No seleccionaste la venta a eliminar");
  }

  try {
    const result = await pool.query(salesQueries.deleteSale, [sale_id]);
    handleSuccess(res, result.rows[0]);
  } catch (error) {
    handleError(res, error, "Error al eliminar la venta");
  }
};
