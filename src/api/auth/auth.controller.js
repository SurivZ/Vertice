import { registerService, loginService } from "./auth.service.js";

export const registerController = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const newUser = await registerService({ email, password, name });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await loginService({ email, password });

    res.status(200).json({
      message: "Logueo exitoso",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
