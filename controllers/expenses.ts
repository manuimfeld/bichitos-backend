import { Request, Response } from "express";
import pool from "../config/pg/connection";
import expensesQueries from "../queries/expensesQueries";
import { handleSuccess, handleError } from "../utils/responseHelper";

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(expensesQueries.getAllExpenses);
    handleSuccess(res, result.rows);
  } catch (error) {
    handleError(res, error, "Error al obtener todos los gastos");
  }
};
export const getExpensesByMonth = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(expensesQueries.getExpensesByMonth);
    handleSuccess(res, result.rows);
  } catch (error) {
    console.log(error);
    handleError(res, error, "Error al obtener todos los gastos");
  }
};
export const getTotalExpensesThisMonth = async (
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

export default {
  getAllExpenses,
  getExpensesByMonth,
  getTotalExpensesThisMonth,
  createExpense,
};
