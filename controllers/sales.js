const pool = require("../config/pg/connection");
const salesQueries = require("../queries/salesQueries");
const { handleSuccess, handleError } = require("../utils/responseHelper");

const salesController = {
  getAllSales: async (req, res) => {
    try {
      const result = await pool.query(salesQueries.getAllSales);
      handleSuccess(res, result.rows);
    } catch (error) {
      handleError(res, error, "Error al obtener todas las ventas");
    }
  },
  getSalesToday: async (req, res) => {
    try {
      const result = await pool.query(salesQueries.getSalesToday);
      handleSuccess(res, result.rows);
    } catch (error) {
      handleError(res, error, "Error al obtener todas las ventas");
    }
  },
  createSale: async (req, res) => {
    const { amount, customer_dni, turn, created_by, payment_method_id } =
      req.body;

    if (!amount || !turn || !created_by || !payment_method_id) {
      return handleError(res, null, "Faltan datos requeridos");
    }

    try {
      const result = await pool.query(salesQueries.createSale, [
        amount,
        customer_dni,
        turn,
        created_by,
        payment_method_id,
      ]);
      handleSuccess(res, result.rows[0]);
    } catch (error) {
      handleError(res, error, "Error al crear la venta");
    }
  },
};

module.exports = salesController;
