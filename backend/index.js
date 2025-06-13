const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth"); 

// Use routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes); 

// base route
app.get("/", (req, res) => res.send("API running"));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
