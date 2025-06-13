const express = require("express");
const router = express.Router();
const { PrismaClient } = require("../generated/prisma");
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
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

router.post('/create', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    const { name, description, price, category, imageUrl, stock } = req.body;

    if (!name || !price || !category || !imageUrl || stock == null) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                category,
                imageUrl,
                stock: parseInt(stock),
            },
        });
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Eliminar producto (solo admin)
router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.product.delete({ where: { id } });
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product' });
    }
});


// Obtener un producto por ID
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) return res.status(404).json({ message: 'Not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product' });
    }
});

// Actualizar producto (solo admin)
router.put('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, price, category, imageUrl, stock } = req.body;
    try {
        const updated = await prisma.product.update({
            where: { id },
            data: { name, description, price: parseFloat(price), category, imageUrl, stock: parseInt(stock) }
        });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Error updating product' });
    }
});

router.post('/purchase', authenticateToken, async (req, res) => {
    const { items } = req.body; // products to purchase with productId and quantity

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'No items provided for purchase' });
    }

    try {
        // Verify the stock for each product
        for (const item of items) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId },
            });

            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
            }
        }

        // Reduce the stock for each product
        for (const item of items) {
            await prisma.product.update({
                where: { id: item.productId },
                data: { stock: { decrement: item.quantity } }, // Subtract stock
            });
        }

        // Clear the cart for the user
        await prisma.cart.deleteMany({
            where: { userId: req.user.id },
        });

        res.status(200).json({ message: 'Purchase successful and cart cleared' });
    } catch (err) {
        console.error('Error processing purchase:', err);
        res.status(500).json({ message: 'Error processing purchase' });
    }
});

module.exports = router;
