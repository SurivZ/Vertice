export const catch404 = (req, res, next) => {
  const error = new Error("Endpoint no encontrado.");
  error.statusCode = 404;
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Ha ocurrido un error interno en el servidor.";

  res.status(statusCode).json({ message: message });
};
