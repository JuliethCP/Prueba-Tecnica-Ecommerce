'use client';

import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar';
import { AuthContext } from '../../context/authContext';

export default function CreateAdminPage() {
    const { user } = useContext(AuthContext); 
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (!user) {
            toast.error('You must be logged in as admin');
            router.push('/login');
            return null;
        }

        if (user.role !== 'admin') {
            toast.error('Unauthorized access');
            router.push('/');
            return null;
        }
    }, [user, router]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim().length < 3) {
            toast.error('Name must be at least 3 characters long');
            return;
        }

        if (!validateEmail(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        try {
            const res = await fetch('http://localhost:4000/api/auth/register-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Admin created successfully');
                setName('');
                setEmail('');
                setPassword('');
                router.push('/');
            } else {
                toast.error(data.message || 'Failed to create admin');
            }
        } catch (err) {
            toast.error('Error connecting to server');
        }
    };

    return (
        <>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="shadow rounded p-5" style={{ width: "100%", maxWidth: "500px" }}>
                    <h2 className="text-center mb-4">Create New Admin</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Create Admin
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}