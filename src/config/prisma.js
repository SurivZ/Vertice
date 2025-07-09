import { PrismaClient } from "@prisma/client";
import { requestContext } from "../utils/context.js";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === "Log") {
    return next(params);
  }

  if (["create", "update", "delete"].includes(params.action)) {
    const modelName = params.model;
    const action = params.action;
    let oldValue = null;

    if (action !== "create") {
      oldValue = await prisma[modelName].findUnique({
        where: params.args.where,
      });
    }

    const result = await next(params);

    const store = requestContext.getStore();

    const changedBy = store?.user?.email || "System";

    await prisma.log.create({
      data: {
        modelName,
        action,
        oldValue: oldValue ? oldValue : null,
        newValue: action === "delete" ? null : result,
        changedBy: changedBy,
      },
    });

    return result;
  }

  return next(params);
});

export { prisma };
