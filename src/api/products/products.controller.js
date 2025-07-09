import {
  getAllProductsService,
  getProductByIdService,
} from "./products.service.js";

export const getAllProductsController = async (req, res, next) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(Number(id));
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
