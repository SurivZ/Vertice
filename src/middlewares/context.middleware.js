import { requestContext } from "../utils/context.js";

export const contextMiddleware = (req, res, next) => {
  const user = req.user;

  requestContext.run({ user }, next);
};
