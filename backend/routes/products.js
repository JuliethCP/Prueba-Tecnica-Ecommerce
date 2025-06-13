const express = require("express");
const router = express.Router();
const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Error fetching products" });
  }
});

module.exports = router;
