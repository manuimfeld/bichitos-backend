import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassword = async (planePassword: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(planePassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error al hashear la contraseña");
  }
};

export const comparePassword = async (
  planePassword: string,
  hashedPassword: string
): Promise<Boolean> => {
  try {
    const checkPassword = await bcrypt.compare(planePassword, hashedPassword);
    return checkPassword;
  } catch (err) {
    throw new Error("Error al comparar la contraseña" + err);
  }
};

export default { hashPassword, comparePassword };
