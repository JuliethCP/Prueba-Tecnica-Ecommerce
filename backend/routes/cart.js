const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middleware/authMiddleware');

const prisma = new PrismaClient();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const cartItems = await prisma.cart.findMany({
            where: { userId: req.user.id },
            include: { product: true }
        });

        const cart = cartItems.map(item => ({
            id: item.id,
            productId: item.productId,
            name: item.product.name,
            price: item.product.price,
            imageUrl: item.product.imageUrl,
            quantity: item.quantity
        }));

        res.json({ items: cart });
    } catch (err) {
        res.status(500).json({ message: 'Error getting cart' });
    }
});

router.post('/', authenticateToken, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const existing = await prisma.cart.findFirst({
            where: { userId: req.user.id, productId }
        });

        let result;
        if (existing) {
            result = await prisma.cart.update({
                where: { id: existing.id },
                data: { quantity }
            });
        } else {
            result = await prisma.cart.create({
                data: { userId: req.user.id, productId, quantity }
            });
        }

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error saving cart item' });
    }
});


router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const cartItem = await prisma.cart.findFirst({
            where: { id: parseInt(req.params.id), userId: req.user.id }
        });

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found or does not belong to the user' });
        }

        await prisma.cart.delete({
            where: { id: cartItem.id }
        });

        res.json({ message: 'Removed' });
    } catch (err) {
        res.status(500).json({ message: 'Error removing cart item' });
    }
});


router.delete('/', authenticateToken, async (req, res) => {
    try {
        await prisma.cart.deleteMany({
            where: { userId: req.user.id }
        });

        res.json({ message: 'All cart items removed' });
    } catch (err) {
        res.status(500).json({ message: 'Error clearing cart' });
    }
});

module.exports = router;