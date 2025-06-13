'use client';

import { useEffect, useState, useContext } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Navbar from '../../../components/Navbar';
import { AuthContext } from '../../../context/authContext';

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const { user } = useContext(AuthContext); 
    const [product, setProduct] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('ALBUMS');
    const [imageUrl, setImageUrl] = useState('');
    const [stock, setStock] = useState('');

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

        fetchProduct();
    }, [user, router]);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`http://localhost:4000/api/products/${id}`);
            const data = await res.json();
            setProduct(data);
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            setCategory(data.category);
            setImageUrl(data.imageUrl);
            setStock(data.stock);
        } catch (err) {
            toast.error('Error loading product');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:4000/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ name, description, price, category, imageUrl, stock }),
            });

            if (res.ok) {
                toast.success('Product updated');
                router.push('/admin/products');
            } else {
                toast.error('Error updating');
            }
        } catch (err) {
            toast.error('Error updating product');
        }
    };

    if (!product) return <p className="container mt-5 pt-5">Loading...</p>;

    return (
        <>
        <Navbar />
        <div className="container mt-5 pt-5">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input type="text" className="form-control" value={name} required onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input type="number" className="form-control" value={price} required onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Category</label>
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="ALBUMS">ALBUMS</option>
                        <option value="MERCH">MERCH</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label>Image URL</label>
                    <input type="text" className="form-control" value={imageUrl} required onChange={(e) => setImageUrl(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Stock</label>
                    <input type="number" className="form-control" value={stock} required onChange={(e) => setStock(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
        </>
    );
}
