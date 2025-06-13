import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";


export default function Home() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/products");
                if (!res.ok) {
                    throw new Error("Error al obtener productos");
                }
                const data = await res.json();
                setProductos(data);
            } catch (error) {
                console.error("Error al obtener productos:", error);
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

    return (
        <>
            <Head>
                <title>KPOP NJ</title>
                <link rel="icon" href="/imgs/k-pop2.png" />
            </Head>

            <Navbar />

            <div className="container-fluid mt-5 pt-5">
                <div className="row">
                    {productos.map((producto) => (
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
                                    <p className="card-text">${producto.price}</p>
                                    <p className="card-text">${producto.description}</p>
                                </div>
                                <div className="card-footer position-relative border-0 bg-transparent" style={{ height: '50px' }}>
                                    <button
                                        className="btn add-cart position-absolute bottom-0 start-0 m-2"
                                        data-id={producto.id}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            cursor: "pointer",
                                            background: "transparent",
                                            padding: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
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
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
