'use client';

import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/cartContext';
import { toast } from 'react-toastify';

export default function CartPage() {
    const { cart, setCart, removeFromCart, updateQuantity, clearCart, purchaseCart } = useCart(); // Importar purchaseCart

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/cart', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                const data = await res.json();

                if (res.ok) {
                    setCart(data.items.map(item => ({
                        id: item.id,
                        productId: item.productId,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        imageUrl: item.imageUrl,
                    })));
                } else {
                    toast.error('Failed to load cart: ' + data.message);
                }
            } catch (err) {
                console.error('Caught error:', err);
                toast.error('Error connecting to server or parsing response');
            }
        };

        fetchCart();
    }, [setCart]);

    const handleRemoveFromCart = async (id) => {
        try {
            const res = await fetch(`http://localhost:4000/api/cart/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (res.ok) {
                setCart(cart.filter(item => item.id !== id));
                toast.success('Item removed from cart');
            } else {
                const data = await res.json();
                toast.error(data.message || 'Failed to remove item');
            }
        } catch (err) {
            console.error('Caught error:', err);
            toast.error('Error removing item from cart');
        }
    };

    const handleClearCart = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/cart', {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (res.ok) {
                setCart([]);
                toast.success('Cart cleared');
            } else {
                const data = await res.json();
                toast.error(data.message || 'Failed to clear cart');
            }
        } catch (err) {
            console.error('Caught error:', err);
            toast.error('Error clearing cart');
        }
    };

    const handlePurchase = async () => {
        try {
            await purchaseCart(); // Llamar al método purchaseCart
            toast.success('Purchase completed successfully!');
        } catch (err) {
            console.error('Error during purchase:', err);
            toast.error('Failed to complete purchase');
        }
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="container mt-5 pt-5">
                <h3>Your cart is empty</h3>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mt-5 pt-5">
                <h2 className="text-center mb-4">Shopping Cart</h2>
                <table className="table table-bordered align-middle text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Quantity</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, idx) => (
                            <tr key={item.id}>
                                <td>{idx + 1}</td>
                                <td><img src={item.imageUrl} alt={item.name} width="50" /></td>
                                <td>
                                    <input
                                        type="number"
                                        min="1"
                                        className="form-control"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                    />
                                </td>
                                <td>{item.name}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-between align-items-center">
                    <button className="btn btn-danger" onClick={handleClearCart}>Clear Cart</button>
                    <h4>Total: ${total.toFixed(2)}</h4>
                </div>

                <div className="text-center mt-4">
                    <button className="btn btn-success px-4 py-2" onClick={handlePurchase}>Buy</button>
                </div>
            </div>
        </>
    );
}