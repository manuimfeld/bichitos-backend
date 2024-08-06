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
  getSalesByDay: async (req, res) => {
    const sale_date = req.params.date;
    const startDate = new Date(sale_date + "T00:00:00Z");
    const endDate = new Date(sale_date + "T23:59:59Z");
    console.log(startDate);

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
