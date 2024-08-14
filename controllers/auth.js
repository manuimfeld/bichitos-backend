const pool = require("../config/pg/connection");
const authQueries = require("../queries/authQueries");
const { comparePassword, hashPassword } = require("../utils/bcrypt");
const { signJwt } = require("../utils/jwt");
const { handleSuccess, handleError } = require("../utils/responseHelper");

const authController = {
  postAuth: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return handleError(res, null, "Faltan datos requeridos");
    }

    try {
      const result = await pool.query(authQueries.checkAuth, [username]);
      const data = result.rows[0];

      if (!data) {
        return handleError(res, null, "Nombre de usuario incorrecto");
      }

      const checkPassword = await comparePassword(password, data.password);

      if (checkPassword) {
        const jwt = signJwt({
          user_id: data.user_id,
          username: data.username,
          role: data.role,
        });

        handleSuccess(res, { jwt: jwt });
      } else {
        handleError(res, null, "Contraseña incorrecta");
      }
    } catch (error) {
      console.log(error);
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
