import { Request, Response } from "express";
import pool from "../../config/pg/connection";
import salesQueries from "../../queries/salesQueries";
import { paymentMapping, turnMapping } from "../../utils/mappingSales";
import { handleSuccess, handleError } from "../../utils/responseHelper";

export const createSale = async (req: Request, res: Response) => {
  const {
    payment_method_id,
    amount,
    customer_dni,
    sale_date,
    created_by,
    turn,
  } = req.body;

  if (!amount || !turn || !created_by || !payment_method_id) {
    return handleError(res, null, "Faltan datos requeridos");
  }

  try {
    const result = await pool.query(salesQueries.createSale, [
      payment_method_id,
      amount,
      customer_dni,
      sale_date,
      created_by,
      turn,
    ]);
    handleSuccess(res, result.rows[0]);
  } catch (error) {
    handleError(res, error, "Error al crear la venta");
  }
};
