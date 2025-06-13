'use client';

import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../context/authContext';

export default function CreateProductPage() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
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
        }
    }, [user, router]);

    const validateImageUrl = (url) => {
        const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
        return urlRegex.test(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim().length < 3) {
            toast.error('Name must be at least 3 characters long');
            return;
        }

        if (description.trim().length === 0) {
            toast.error('Description cannot be empty');
            return;
        }

        if (isNaN(price) || price <= 0) {
            toast.error('Price must be a positive number');
            return;
        }

        if (!validateImageUrl(imageUrl)) {
            toast.error('Please enter a valid image URL');
            return;
        }

        if (isNaN(stock) || stock < 0 || !Number.isInteger(Number(stock))) {
            toast.error('Stock must be a non-negative integer');
            return;
        }

        try {
            const res = await fetch('http://localhost:4000/api/products/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({ name, description, price, category, imageUrl, stock }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Product created successfully');
                setName('');
                setDescription('');
                setPrice('');
                setCategory('ALBUMS');
                setImageUrl('');
                setStock('');
                router.push('/');
            } else {
                toast.error(data.message || 'Failed to create product');
            }
        } catch (err) {
            toast.error('Server error');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5 pt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow">
                            <div className="card-header text-black text-center">
                                <h3>Create Product</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3 px-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3 px-3">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            value={description}
                                            required
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3 px-3">
                                        <label className="form-label">Price</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="form-control"
                                            value={price}
                                            required
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3 px-3">
                                        <label className="form-label">Category</label>
                                        <select
                                            className="form-select"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="ALBUMS">ALBUMS</option>
                                            <option value="MERCH">MERCH</option>
                                        </select>
                                    </div>
                                    <div className="mb-3 px-3">
                                        <label className="form-label">Image URL</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={imageUrl}
                                            required
                                            onChange={(e) => setImageUrl(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3 px-3">
                                        <label className="form-label">Stock</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={stock}
                                            required
                                            onChange={(e) => setStock(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-success mx-auto d-block" style={{ width: '200px' }}>
                                        Create Product
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}