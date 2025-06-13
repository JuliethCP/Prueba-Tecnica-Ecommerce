'use client';

import Navbar from '../components/Navbar';
import { useCart } from '../context/cartContext';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return <div className="container mt-5 pt-5"><h3>Your cart is empty</h3></div>;
    }

    return (
        <>
        <Navbar/>
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
                            <td><img src={item.imageUrl} width="50" /></td>
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
                            <td>${item.price}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>X</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
                <h4>Total: ${total.toFixed(2)}</h4>
            </div>

            <div className="text-center mt-4">
                <button className="btn btn-success px-4 py-2">Buy</button>
            </div>
        </div>
        </>
    );
}