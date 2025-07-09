import { prisma } from "../../config/prisma.js";
import { encryptPassword, comparePassword } from "../../utils/bcrypt.handle.js";
import { generateToken } from "../../utils/jwt.handle.js";

export const registerService = async ({ email, password, name }) => {
  if (!email || !password) {
    throw new Error('Se requieren correo ("email") y contraseña ("password")');
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Ya existe un usuario con este correo electrónico");
  }

  const hashedPassword = await encryptPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return user;
};

export const loginService = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Credenciales inválidas");
  }

  const token = generateToken(user);
  return token;
};
