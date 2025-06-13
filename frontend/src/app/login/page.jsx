'use client';

import { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/authContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { login } = useContext(AuthContext); 

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            toast.success("Logged in successfully");
            console.log("Login successful:", data.token);
            login(data.token); 
            router.push("/");
        } else {
            toast.error(data.message || "Login failed");
        }
    };

    return (
        <>
        <Navbar />
        <div className="container mt-5 pt-5">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
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
                <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
            <p className="mt-3">
                Don’t have an account? <Link href="/register">Register</Link>
            </p>
        </div>
        </>
    );
}
