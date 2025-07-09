import {
  createOrderService,
  getOrderByIdService,
  getUserOrdersService,
} from "./orders.service.js";

export const getUserOrdersController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await getUserOrdersService(userId);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderByIdController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderId = Number(req.params.id);
    const order = await getOrderByIdService(userId, orderId);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const createOrderController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;
    const newOrder = await createOrderService(userId, items);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};
