const pool = require("../config/pg/connection");
const productsQueries = require("../queries/productsQueries");
const { handleSuccess, handleError } = require("../utils/responseHelper");

const mappingProviders = {
  SeñorGonzales: 1,
  Merlo: 2,
  CYH: 3,
};

const productsController = {
  getAllProducts: async (req, res) => {
    try {
      const result = await pool.query(productsQueries.getAllProducts);
      handleSuccess(res, result.rows);
    } catch (error) {
      handleError(res, error, "Error al obtener todos los productos");
    }
  },
  createProduct: async (req, res) => {
    const { name, price, provider } = req.body;
    provider.replace(" ", "");

    if (!name || !price || !provider) {
      return handleError(res, null, "Faltan datos requeridos");
    }

    try {
      const result = await pool.query(productsQueries.createProduct, [
        name,
        price,
        mappingProviders[provider],
      ]);
      handleSuccess(res, result.rows);
    } catch (error) {
      console.log(error);
      handleError(res, error, "Error al crear el producto");
    }
  },
};

module.exports = productsController;
