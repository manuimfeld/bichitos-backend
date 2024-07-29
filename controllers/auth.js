const pool = require("../config/pg/connection");
const authQueries = require("../queries/authQueries");
const { comparePassword, hashPassword } = require("../utils/bcrypt");
const { handleSuccess, handleError } = require("../utils/responseHelper");

const authController = {
  postAuth: async (req, res) => {
    const { username, password } = req.body;
    const checkPassword = comparePassword(password);

    if (!username || !password) {
      return handleError(res, null, "Faltan datos requeridos");
    }

    try {
      const result = await pool.query(authQueries.checkAuth, [
        username,
        checkPassword,
      ]);
      handleSuccess(res, result.rows[0]);
    } catch (error) {
      handleError(res, error, "Error al iniciar sesión");
    }
  },
  postRegister: async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);

    if (!username || !password) {
      return handleError(res, null, "Faltan datos requeridos");
    }

    try {
      const result = await pool.query(authQueries.createUser, [
        username,
        hashedPassword,
      ]);
      handleSuccess(res, result.rows[0]);
    } catch (error) {
      handleError(res, error, "Error al crear usuario");
    }
  },
};

module.exports = authController;
