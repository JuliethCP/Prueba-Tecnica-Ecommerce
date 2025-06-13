'use client'; // opcional en caso de usar componentes interactivos en Next.js App Router

import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" data-bs-theme="dark" style={{ height: '9%' }}>
            <div className="container-fluid" style={{ width: '90%' }}>
                <Link href="/" className="navbar-brand d-flex align-items-center" style={{ fontSize: '25px' }}>
                    <img src="/imgs/icon2.png" alt="Logo" width="40" height="40" className="d-inline-block align-text-top mx-3" />
                    <h2 className="m-0">KPOPBEAT</h2>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-3 mb-2 mb-lg-0">
                        <li className="nav-item mx-3">
                            <Link href="/" className="nav-link active" style={{ fontSize: '17px' }}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item dropdown mx-3">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                style={{ fontSize: '17px' }}
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Categories
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link href="/Albums" className="dropdown-item">ALBUMS</Link>
                                </li>
                                <li>
                                    <Link href="/Merch" className="dropdown-item">MERCH</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown mx-3">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                style={{ fontSize: '17px' }}
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Groups
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link href="/LeSserafim" className="dropdown-item">LE SSERAFIM</Link></li>
                                <li><Link href="/NewJeans" className="dropdown-item">NEW JEANS</Link></li>
                                <li><Link href="/Blackpink" className="dropdown-item">BLACKPINK</Link></li>
                                <li><Link href="/Gidle" className="dropdown-item">(G)-IDLE</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center justify-content-end" style={{ flexGrow: 1 }}>
                        <form className="d-flex" role="search" action="/searchResults" method="GET">
                            <input className="form-control me-2" type="search" name="q" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success me-5" type="submit">Search</button>
                        </form>
                        <button id="btnMyCart" className="btn btn-outline-light me-5 ms-0" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="bi bi-cart-fill" viewBox="0 0 16 16">
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
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
