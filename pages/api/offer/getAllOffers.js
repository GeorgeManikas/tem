import { PrismaClient } from "@prisma/client";

export default async function (req, res) {
  const prisma = new PrismaClient();

  if (req.method !== "GET") {
    // only GET method allowed
    res.status(405).json({ error: "Only GET method allowed " });
  }

  try {
    const offers = await prisma.offer.findMany({});
    res.status(200).json(offers);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
