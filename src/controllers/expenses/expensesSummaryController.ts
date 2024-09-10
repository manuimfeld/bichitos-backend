import { Request, Response } from "express";
import pool from "../../config/pg/connection";
import expensesQueries from "../../queries/expensesQueries";
import { handleSuccess, handleError } from "../../utils/responseHelper";

export const getCurrentMonthExpensesSummary = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await pool.query(expensesQueries.getTotalExpensesMonth);
    handleSuccess(res, result.rows[0]);
  } catch (error) {
    console.error("Error al obtener gastos del mes:", error);
    handleError(res, error, "Error al obtener gastos del mes");
  }
};
