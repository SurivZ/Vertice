import { userService } from "./user.service.js";

export const userController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const userProfile = await userService(userId);

    res.status(200).json({
      message: "Información del usuario recuperada exitosamente",
      user: userProfile,
    });
  } catch (error) {
    next(error);
  }
};
