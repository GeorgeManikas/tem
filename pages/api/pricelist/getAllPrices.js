import prisma from "../../../lib/database";

export default async function (req, res) {
  try {
    const products = await prisma.pricelist.findMany({
      include: {
        product_family_pricelistToproduct_family: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
