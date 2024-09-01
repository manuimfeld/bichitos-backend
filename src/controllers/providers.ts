import { Request, Response } from "express";
import pool from "../config/pg/connection";
import providersQueries from "../src/queries/providersQueries";
import { handleError, handleSuccess } from "../utils/responseHelper";

export const getAllProviders = async (req: Request, res: Response) => {
  try {
    const results = await pool.query(providersQueries.getAllProviders);
    handleSuccess(res, results.rows);
  } catch (error) {
    console.log(error);
    handleError(res, error, "Ha ocurrido un error al obtener los proveedores");
  }
};

export default getAllProviders;
