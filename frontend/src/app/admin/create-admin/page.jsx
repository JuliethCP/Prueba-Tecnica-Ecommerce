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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        <div className="container mt-5 pt-5">
            <h2>Create New Admin</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input type="text" className="form-control" value={name} required onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} required onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Create Admin</button>
            </form>
        </div>
        </>
    );
}