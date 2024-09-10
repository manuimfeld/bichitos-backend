import { Request, Response } from "express";
import pool from "../../config/pg/connection";
import expensesQueries from "../../queries/expensesQueries";
import { handleSuccess, handleError } from "../../utils/responseHelper";

export const createExpense = async (req: Request, res: Response) => {
  const { expenses_date, provider_id, expenses_type, amount, is_paid } =
    req.body;

  if (!expenses_date || !provider_id || !expenses_type || !amount || !is_paid) {
    return handleError(res, null, "Faltan datos requeridos");
  }

  try {
    const result = await pool.query(expensesQueries.createExpense, [
      expenses_date,
      provider_id,
      expenses_type,
      amount,
      is_paid,
    ]);
    handleSuccess(res, result.rows);
  } catch (error) {
    console.log(error);
    handleError(res, error, "Error al crear el gasto");
  }
};
