import { Request, Response } from "express";
import pool from "@/config/pg/connection";
import salesQueries from "@/queries/salesQueries";
import { paymentMapping, turnMapping } from "@/utils/mappingSales";
import { handleSuccess, handleError } from "@/utils/responseHelper";

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

export default { editSale };
