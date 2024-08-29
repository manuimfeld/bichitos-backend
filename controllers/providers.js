const pool = require("../config/pg/connection");
const providersQueries = require("../queries/providersQueries");
const { handleError, handleSuccess } = require("../utils/responseHelper");

const providersController = {
  getAllProviders: async (req, res) => {
    try {
      const results = await pool.query(providersQueries.getAllProviders);
      handleSuccess(res, results.rows);
    } catch (error) {
      console.log(error);
      handleError(res, error, {
        message: "Ha ocurrido un error al obtener los proveedores",
      });
    }
  },
};

module.exports = providersController;
