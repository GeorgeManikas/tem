import prisma from "../../../lib/database";
export default async function (req, res) {
  let response;
  try {
    if (req.method === "PUT") {
      response = await prisma.pricelist.update({
        data: {
          code: req.query.code,
          description: req.query.description,
          price: parseFloat(req.query.price),
          num_code: req.query.num_code,
        },
        where: {
          id: parseInt(req.query.id),
        },
      });
      res.status(201).json(response);
    } else if (req.method === "POST") {
      response = await prisma.pricelist.create({
        include: {
          product_family_pricelistToproduct_family: true,
        },
        data: {
          code: req.query.code,
          description: req.query.description,
          price: parseFloat(req.query.price),
          num_code: req.query.num_code,
          product_family_pricelistToproduct_family: {
            connect: { id: parseInt(req.query.family) },
          },
        },
      });
      res.status(201).json(response);
    } else if (req.method === "DELETE") {
      const response = await prisma.pricelist.delete({
        where: {
          id: parseInt(req.query.id),
        },
      });
      res.status(201).json(response);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
