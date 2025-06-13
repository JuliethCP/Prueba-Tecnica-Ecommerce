'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../context/authContext';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" data-bs-theme="dark" style={{ height: '9%' }}>
            <div className="container-fluid" style={{ width: '90%' }}>
                <Link href="/" className="navbar-brand d-flex align-items-center" style={{ fontSize: '25px' }}>
                    <img src="/imgs/icon2.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top mx-3" />
                    <h2 className="m-0">KPOPBEAT</h2>
                </Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mx-3 mb-2 mb-lg-0">
                        <li className="nav-item mx-3">
                            <Link href="/" className="nav-link active" style={{ fontSize: '17px' }}>Home</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center justify-content-end" style={{ flexGrow: 1 }}>
                        {user && (
                            <Link href="/cart" className="btn btn-outline-light me-2" id="btnMyCart">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-cart-fill me-2" 
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 
          0 0 1 .485.379L2.89 3H14.5a.5.5 
          0 0 1 .491.592l-1.5 8A.5.5 0 0 
          1 13 12H4a.5.5 0 0 1-.491-.408L2.01 
          3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 
          12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 
          0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 
          1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 
          0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>
                                My Cart
                            </Link>
                        )}

                        {user?.role === "admin" && (
                            <div className="dropdown me-3">
                                <button
                                    className="btn btn-outline-warning dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Admin
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><Link className="dropdown-item" href="/admin/products">Manage Products</Link></li>
                                    <li><Link className="dropdown-item" href="/admin/create-admin">Add Admin</Link></li>
                                </ul>
                            </div>
                        )}

                        {!user ? (
                            <Link href="/login" className="btn btn-primary me-3 px-4 py-2" style={{ fontSize: '17px', borderRadius: '20px' }}>
                                Sign In
                            </Link>
                        ) : (
                            <>
                                <span className="text-white me-3 d-flex align-items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                        className="bi bi-person-circle me-2"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M13.468 12.37C12.758 11.226 11.482 10.5 10 10.5c-1.482 0-2.758.726-3.468 1.87A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63zM8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a7 7 0 1 0 0 14A7 7 0 0 0 8 10z" />
                                    </svg>
                                    Hello, {user.name}
                                </span>
                                <button
                                    className="btn btn-danger px-4 py-2 mx-3" 
                                    style={{ borderRadius: '20px' }}
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}