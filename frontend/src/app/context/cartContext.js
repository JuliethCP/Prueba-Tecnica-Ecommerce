'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [userId, setUserId] = useState(null);

    // Detectar usuario y cargar el carrito del backend si está logueado
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const decoded = jwtDecode(token);
            setUserId(decoded.id);
            fetchCartFromBackend(token);
        } catch {
            localStorage.removeItem('token');
            setUserId(null);
        }
    }, []);

    const fetchCartFromBackend = async (token) => {
        try {
            const res = await fetch('http://localhost:4000/api/cart', {
                headers: { Authorization: 'Bearer ' + token }
            });
            const data = await res.json();
            const formatted = data.map(item => ({
                id: item.product.id,
                name: item.product.name,
                price: item.product.price,
                imageUrl: item.product.imageUrl,
                quantity: item.quantity
            }));
            setCart(formatted);
        } catch (err) {
            console.error('❌ Error loading cart from backend');
        }
    };

    const syncWithBackend = async (productId, quantity) => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await fetch('http://localhost:4000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify({ productId, quantity })
            });
        } catch (err) {
            console.error('❌ Error syncing cart with backend');
        }
    };

    const addToCart = (product) => {
        let updatedCart;
        setCart(prev => {
            const existing = prev.find(p => p.id === product.id);
            updatedCart = existing
                ? prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
                : [...prev, { ...product, quantity: 1 }];
            return updatedCart;
        });

        // Sincronizar con backend fuera del setCart
        const existing = updatedCart.find(p => p.id === product.id);
        const quantity = existing ? existing.quantity : 1;
        syncWithBackend(product.id, quantity);
    };

    const removeFromCart = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await fetch(`http://localhost:4000/api/cart/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });

            setCart(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error('❌ Error removing item from backend');
        }
    };

    const updateQuantity = (id, quantity) => {
        setCart(prev => {
            const updated = prev.map(p => p.id === id ? { ...p, quantity } : p);
            syncWithBackend(id, quantity);
            return updated;
        });
    };

    const clearCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            await fetch('http://localhost:4000/api/cart', {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });

            setCart([]);
        } catch (err) {
            console.error('❌ Error clearing cart in backend');
        }
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);