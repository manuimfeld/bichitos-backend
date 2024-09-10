import { Request, Response } from "express";
import pool from "../../config/pg/connection";
import expensesQueries from "../../queries/expensesQueries";
import { handleSuccess, handleError } from "../../utils/responseHelper";

export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(expensesQueries.getAllExpenses);
    handleSuccess(res, result.rows);
  } catch (error) {
    handleError(res, error, "Error al obtener todos los gastos");
  }
};

export const getExpensesCurrentMonth = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(expensesQueries.getExpensesByMonth);
    handleSuccess(res, result.rows);
  } catch (error) {
    console.log(error);
    handleError(res, error, "Error al obtener todos los gastos");
  }
};
