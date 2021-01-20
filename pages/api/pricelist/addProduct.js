// api/pricelist/addProduct?

import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();

  if (req.method !== "POST") {
    res
      .status(405)
      .json({ error: "Only POST requests allowed in this endpoint" });
  }

  try {
    const product = await prisma.pricelist.create({
      include: {
        product_family_pricelistToproduct_family: true,
      },
      data: {
        product_family_pricelistToproduct_family: {
          connect: { id: parseInt(req.query.family) },
        },
        code: req.query.code,
        description: req.query.description,
        price: parseFloat(req.query.price),
        num_code: req.query.num_code,
      },
    });
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
