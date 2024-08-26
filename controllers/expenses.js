const pool = require("../config/pg/connection");
const expensesQueries = require("../queries/expensesQueries");
const { handleSuccess, handleError } = require("../utils/responseHelper");

const expensesController = {
  getAllExpenses: async (req, res) => {
    try {
      const result = await pool.query(expensesQueries.getAllExpenses);
      handleSuccess(res, result.rows);
    } catch (error) {
      handleError(res, error, "Error al obtener todos los gastos");
    }
  },
  getExpensesByMonth: async (req, res) => {
    try {
      const result = await pool.query(expensesQueries.getExpensesByMonth);
      handleSuccess(res, result.rows);
    } catch (error) {
      console.log(error);
      handleError(res, error, "Error al obtener todos los gastos");
    }
  },
  getTotalExpensesThisMonth: async (req, res) => {
    try {
      const result = await pool.query(expensesQueries.getTotalExpensesMonth);
      handleSuccess(res, result.rows[0]);
    } catch (error) {
      console.error("Error al obtener gastos del mes:", error);
      handleError(res, error, "Error al obtener gastos del mes");
    }
  },
  createExpense: async (req, res) => {
    const { name, price, provider } = req.body;
    provider.replace(" ", "");

    if (!name || !price || !provider) {
      return handleError(res, null, "Faltan datos requeridos");
    }

    try {
      const result = await pool.query(expensesController.createExpense, [
        expenses_date,
        provider,
        expenses_type,
        amount,
        is_paid,
      ]);
      handleSuccess(res, result.rows);
    } catch (error) {
      console.log(error);
      handleError(res, error, "Error al crear el gasto");
    }
  },
};

module.exports = expensesController;
