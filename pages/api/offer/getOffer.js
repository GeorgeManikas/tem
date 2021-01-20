//  ENDPOINT : /api/offer/getOffer?id={OFFER_ID}

import prisma from "../../../lib/database";

export default async function (req, res) {
  let offer;

  // this endpoint only works with get requests. FOR post, put , delete refer to /api/offer/handleOffer endpoint
  if (req.method === "GET") {
    try {
      if (req.query.id) {
        // fetch an offer by id
        offer = await prisma.offer.findMany({
          include: {
            offer_products: true,
          },
          where: {
            id: { equals: parseInt(req.query.id) },
          },
        });
        res.status(200).json(offer);
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
