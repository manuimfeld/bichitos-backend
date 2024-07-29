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

const comparePassword = (planePassword) => {
  bcrypt.compare(planePassword, hash, function (err, result) {
    return result;
  });
};

module.exports = { hashPassword, comparePassword };
