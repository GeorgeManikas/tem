import prisma from "../../../lib/database";
// API ENDPOINT : /api/pricelist/getPrice?....
// query for pricelist
// API ENDPOINT api/pricelist/getPrice
// @@ PARAMETERS :
//    code : e.g SM10
//    description : e.g ΑΠΛΟ
//    num_code : e.g 1512
//    family : modul
//   *** DON'T USE FAMILY PARAMETER WITH code , description , or num_code ****************
//    all query parameters don't need to be exact and are case INSENSITIVE ...

export default async function (req, res) {
  let full_list_response;

  try {
    if (req.query.family) {
      // if there are parameters
      const keys = Object.getOwnPropertyNames(req.query);
      var criteria = {};

      keys.map((key) => {
        criteria["description"] = { contains: req.query[key].toUpperCase() };
      });
      full_list_response = await prisma.pricelist.findMany({
        include: {
          product_family_pricelistToproduct_family: true,
        },
        where: {
          product_family_pricelistToproduct_family: {
            description: {
              contains:
                req.query.family[0].toUpperCase() + req.query.family.slice(1),
            },
          },
        },
      });
    } else if (req.query.code || req.query.description || req.query.num_code) {
      // if there are parameters
      const keys = Object.getOwnPropertyNames(req.query);
      var criteria = {};

      keys.map((key) => {
        criteria[key] = { contains: req.query[key].toUpperCase() };
      });

      full_list_response = await prisma.pricelist.findMany({
        include: {
          product_family_pricelistToproduct_family: true,
        },
        where: {
          OR: { ...criteria },
        },
      });
    } else if (req.query.length === 0) {
      full_list_response = await prisma.pricelist.findMany({
        // query whole pricelist
        include: {
          product_family_pricelistToproduct_family: true,
        },
      });
    }
    res.status(200).json(full_list_response);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
