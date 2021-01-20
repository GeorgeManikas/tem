// CREATE NEW OFFER
// API ENDPOINT : api/offer/newOffer?description={DESCRIPTION}

import prisma from "../../../lib/database";
export default async function (req, res) {
  let offer;
  if (!req.query.description) {
    res.status(500).json({ error: "Must provide an offer name... " });
  }
  if (req.method === "POST") {
    try {
      offer = await prisma.offer.create({
        data: {
          description: req.query.description,
        },
      });
      res.status(201).json(offer);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ error: "Only POST method allowed " });
  }
}
