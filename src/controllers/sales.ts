import { Request, Response } from "express";
import pool from "../config/pg/connection";
import salesQueries from "../queries/salesQueries";
import { paymentMapping, turnMapping } from "../utils/mappingSales";
import { handleSuccess, handleError } from "../utils/responseHelper";

export const getAllSales = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(salesQueries.getAllSales);
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
export const getSalesToday = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(salesQueries.getSalesToday);
    handleSuccess(res, result.rows);
  } catch (error) {
    handleError(res, error, "Error al obtener todas las ventas");
  }
};
export const getTotalSalesThisMonth = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(salesQueries.getTotalSalesMonth);
    handleSuccess(res, result.rows[0]);
  } catch (error) {
    console.error("Error al obtener ventas del mes:", error);
    handleError(res, error, "Error al crear la venta");
  }
};
export const getTotalSalesYear = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(salesQueries.getTotalSalesYear);
    handleSuccess(res, result.rows);
  } catch (error) {
    console.error("Error al obtener ventas del mes:", error);
    handleError(res, error, "Error al crear la venta");
  }
};
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
export const editSale = async (req: Request, res: Response) => {
  const { sale_id } = req.params;

  const saleData = { ...req.body };

  saleData.turn = turnMapping[saleData.turn];

  if (!sale_id) {
    return handleError(res, null, "No seleccionaste la venta a editar");
  }

  if (
    !saleData.payment_method_id ||
    saleData.amount === undefined ||
    saleData.turn === undefined ||
    !saleData.sale_date
  ) {
    return handleError(
      res,
      null,
      "Faltan datos necesarios para actualizar la venta"
    );
  }

  try {
    const result = await pool.query(salesQueries.updateSale, [
      paymentMapping[saleData.payment_method_id],
      saleData.amount,
      saleData.turn,
      saleData.sale_date,
      sale_id,
    ]);
    handleSuccess(res, result.rows[0]);
  } catch (error) {
    console.log(error);
    handleError(res, error, "Error al editar la venta");
  }
};

export default {
  getAllSales,
  getSalesByDay,
  getSalesToday,
  getTotalSalesThisMonth,
  getTotalSalesYear,
  createSale,
  deleteSale,
  editSale,
};
