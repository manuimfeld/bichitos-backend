const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (planePassword) => {
  try {
    const hashedPassword = await bcrypt.hash(planePassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error al hashear la contraseña");
  }
};

const comparePassword = async (planePassword, hashedPassword) => {
  try {
    const checkPassword = await bcrypt.compare(planePassword, hashedPassword);
    return checkPassword;
  } catch (err) {
    throw new Error("Error al comparar la contraseña" + err);
  }
};

module.exports = { hashPassword, comparePassword };
