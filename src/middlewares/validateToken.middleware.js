import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const validateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No se proporcionó un token" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(403).json({ message: "Token inválido o caducado" });
  }
};
