'use client';

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

export default function Home() {
    const [productos, setProductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [group, setGroup] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/products");
                if (!res.ok) {
                    throw new Error("Error getting producst");
                }
                const data = await res.json();
                setProductos(data);
                setFilteredProductos(data);
            } catch (error) {
                console.error("Error getting products:", error);
            }
        };

        fetchProductos();

        const script = document.createElement("script");
        script.src = "/js/scriptCart.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const filtered = productos.filter((producto) => {
            const matchName = producto.name.toLowerCase().includes(search.toLowerCase());
            const matchCategory = category === "All" || producto.category === category;
            const matchGroup =
                group === "All" ||
                producto.name.toLowerCase().includes(group.toLowerCase());
            return matchName && matchCategory && matchGroup;
        });

        setFilteredProductos(filtered);
        setCurrentPage(1);
    }, [search, category, group, productos]);

    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage;
    const currentProductos = filteredProductos.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredProductos.length / productsPerPage);

    return (
        <>
            <Navbar />

            <div className="container-fluid mt-5 p-5">
                {/* Filtros */}
                <div className="row mb-4">
                    <div className="col-md-4 mb-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4 mb-2">
                        <select
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="All">All categories</option>
                            <option value="ALBUMS">Albums</option>
                            <option value="MERCH">Merch</option>
                        </select>
                    </div>
                    <div className="col-md-4 mb-2">
                        <select
                            className="form-select"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                        >
                            <option value="All">All the groups</option>
                            <option value="blackpink">BLACKPINK</option>
                            <option value="le sserafim">LE SSERAFIM</option>
                            <option value="g idle">(G)I-DLE</option>
                            <option value="new jeans">NewJeans</option>
                        </select>
                    </div>
                </div>

                {/* Productos */}
                <div className="row">
                    {currentProductos.map((producto) => (
                        <div
                            key={producto.id}
                            className="col-12 col-sm-6 col-md-3 col-lg-2 mb-4"
                        >
                            <div className="card h-100">
                                <img
                                    src={producto.imageUrl}
                                    className="card-img-top"
                                    alt={producto.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{producto.name}</h5>
                                    <p className="card-text">{producto.description}</p>
                                    <h5 className="card-text">${producto.price}</h5>
                                </div>
                                <div
                                    className="card-footer position-relative border-0 bg-transparent"
                                    style={{ height: "50px" }}
                                >
                                    <button
                                        className="btn add-cart position-absolute bottom-0 start-0 m-2"
                                        data-id={producto.id}
                                        style={{
                                            width: "50%",
                                            height: "50px",
                                            cursor: "pointer",
                                            background: "transparent",
                                            padding: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 576 512"
                                            width="25"
                                            height="25"
                                            fill="currentColor"
                                        >
                                            <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z" />
                                        </svg>
                                        <span> Add to cart</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Paginación */}
                <div className="d-flex justify-content-center mt-4">
                    <nav>
                        <ul className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li
                                    key={i}
                                    className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
