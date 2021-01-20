// CALCULATES TOTALS OFFER COST
// API ENDPOINT : api/offer/totalCost?id={offer_id}
// returns  total_cost ARRAY of individual products  + grand_total ARRAY with total offer cost

import prisma from "../../../lib/database";

export default async function (req, res) {
  let total_cost;

  if (req.method !== "GET") {
    res.status(405).json({
      error:
        "Cannot change total cost , as it's dependent from product individual cost ",
    });
  }

  if (!req.query.id) {
    res
      .status(400)
      .json({ error: "Bad Request. Must provide an offer id ... " });
  }

  try {
    total_cost = await prisma.$queryRaw`
        SELECT product.code , product.price, product.description, product.num_code, offer.qty , ROUND((offer.qty * product.price),3)    AS product_cost
        FROM offer_products AS offer 
        LEFT OUTER JOIN pricelist AS product
        ON offer.product_id = product.id 
        WHERE offer.offer_id = ${parseInt(req.query.id)}
        `;

    // reduce total cost array to get final sum
    const grand_total = total_cost
      .reduce((currentValue, total) => currentValue + total.product_cost, 0)
      .toFixed(2);

    res.status(200).json({ total_cost, grand_total });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
