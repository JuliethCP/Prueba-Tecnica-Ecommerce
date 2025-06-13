'use client';

import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../context/authContext';

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const router = useRouter();
    const { user } = useContext(AuthContext); 

    useEffect(() => {
        if (!user) {
            toast.error('You must be logged in as admin');
            router.push('/login');
            return;
        }

        if (user.role !== 'admin') {
            toast.error('Unauthorized access');
            router.push('/');
            return;
        }

        fetchProducts();
    }, [user, router]);

    const fetchProducts = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/products');
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            toast.error('Error fetching products');
        }
    };

    const deleteProduct = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        console.log('Deleting product with ID:', id);
        try {
            const res = await fetch(`http://localhost:4000/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (res.ok) {
                toast.success('Product deleted');
                setProducts(products.filter((p) => p.id !== id));
            } else {
                toast.error('Failed to delete product');
                console.error('Delete error:', await res.json());
            }
        } catch (err) {
            toast.error('Error deleting product');
        }
    };

    return (
        <>
        <Navbar />
        <div className="container mt-5 pt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Product Management</h2>
                <Link href="/admin/create" className="btn btn-success">+ New Product</Link>
            </div>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>${p.price}</td>
                            <td>{p.category}</td>
                            <td>{p.stock}</td>
                            <td>
                                <Link href={`/admin/edit/${p.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}