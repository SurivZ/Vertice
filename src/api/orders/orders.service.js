import { prisma } from "../../config/prisma.js";

export const getUserOrdersService = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        select: {
          quantity: true,
          price: true,
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getOrderByIdService = async (userId, orderId) => {
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    const error = new Error("Orden no encontrada.");
    error.statusCode = 404;
    throw error;
  }
  return order;
};

export const createOrderService = async (userId, items) => {
  if (!items || items.length === 0) {
    const error = new Error("La orden debe contener al menos un producto.");
    error.statusCode = 400;
    throw error;
  }

  return prisma.$transaction(async (tx) => {
    const productIds = items.map((item) => item.productId);
    const productsInDB = await tx.product.findMany({
      where: { id: { in: productIds } },
    });

    let totalOrderPrice = 0;

    for (const item of items) {
      const product = productsInDB.find((p) => p.id === item.productId);
      if (!product) {
        throw new Error(`El producto con ID ${item.productId} no existe.`);
      }
      if (product.stock < item.quantity) {
        throw new Error(
          `Stock insuficiente para el producto: ${product.name}.`
        );
      }
      totalOrderPrice += product.price * item.quantity;
    }

    const order = await tx.order.create({
      data: {
        userId,
        total: totalOrderPrice,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: productsInDB.find((p) => p.id === item.productId).price,
          })),
        },
      },
    });

    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return order;
  });
};
