// gateway/index.js
// Puente entre el frontend (React) y el backend (Python FastAPI)

import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const PYTHON_API = process.env.PYTHON_API || "http://localhost:8000";

app.use("/api", async (req, res) => {
    const targetUrl = `${PYTHON_API}${req.originalUrl.replace("/api", "")}`;
    const options = {
        method: req.method,
        headers: { "Content-Type": "application/json" },
    };

    if (["POST", "PUT", "PATCH"].includes(req.method)) {
        options.body = JSON.stringify(req.body);
    }

    try {
        const response = await fetch(targetUrl, options);
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error("Error al comunicar con Python API:", error.message);
        res.status(500).json({ error: "Error de comunicación con backend Python" });
    }
});

app.listen(3000, () => {
    console.log("🚀 Express Gateway corriendo en http://localhost:3000");
});