import { getApiService } from "./main.service.js";

export const getApiController = (req, res) => {
  const apiInfo = getApiService();
  res.status(200).json(apiInfo);
};
