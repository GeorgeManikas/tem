// /api/pricelist/getProductFamilies
// returns all product families
import prisma from "../../../lib/database";

export default async function (req, res) {
  try {
    const product_families = await prisma.product_family.findMany({
      orderBy: { id: "asc" },
    });
    res.status(200).json(product_families);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
