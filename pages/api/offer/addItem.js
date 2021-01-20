// add item to offer by providing id of the offer plus the id of the product & qty
// API endpoint : /api/offer/addItem?offer={id}&product={id}&qty={qty}

import prisma from "../../../lib/database";

export default async function (req, res) {
  if (
    (req.method =
      "POST" && req.query.offer && req.query.product && req.query.qty)
  ) {
    try {
      const item = await prisma.offer_products.create({
        include: {
          offer: true,
          pricelist: true,
        },
        data: {
          offer: {
            connect: {
              id: parseInt(req.query.offer),
            },
          },
          pricelist: {
            connect: {
              id: parseInt(req.query.product),
            },
          },
          qty: parseInt(req.query.qty),
        },
      });
      res.status(201).json(item);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ error: e.message });
  }
}
