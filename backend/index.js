const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/products");

app.use("/api/products", productRoutes);

app.get("/", (req, res) => res.send("API funcionando"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));