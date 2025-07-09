import { prisma } from "../../config/prisma.js";

export const getAllProductsService = async () => {
  return prisma.product.findMany();
};

export const getProductByIdService = async (id) => {
  const product = await prisma.product.findFirst();
  if (!product) {
    throw new Error("Producto no encontrado");
  }
  return product;
};
