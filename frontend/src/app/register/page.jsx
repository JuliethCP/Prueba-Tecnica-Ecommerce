'use client';

import { useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/authContext";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { login } = useContext(AuthContext); 
    const handleRegister = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:4000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            toast.success("Registration successful!");
            login(data.token); 
            router.push("/");
        } else {
            toast.error(data.message || "Registration failed.");
        }
    };

    return (
        <>
          <Navbar />
            <Head>
                <title>Register</title>
            </Head>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="shadow rounded p-5" style={{ width: "100%", maxWidth: "500px" }}>
                    <h2 className="text-center mb-4">Register</h2>
                    <form onSubmit={handleRegister}>
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
                        <button type="submit" className="btn btn-success w-100">
                            Register
                        </button>
                    </form>
                    <p className="mt-3 text-center">
                        Already have an account? <Link href="/login">Sign In</Link>
                    </p>
                </div>
            </div>
        </>
    );
}
