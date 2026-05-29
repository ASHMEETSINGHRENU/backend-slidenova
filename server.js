// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// const app = express();

// // 🔹 Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true
// }));

// // 🔹 Static folder for uploads
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // 🔹 Routes
// const authRoutes = require("./routes/auth");
// app.use("/api", authRoutes);

// const formRoutes = require("./routes/form");
// app.use("/api", formRoutes);

// // 🔹 MongoDB Connection (FIXED)
// mongoose.connect("mongodb://127.0.0.1:27017/SlideNova")
//     .then(() => {
//         console.log("✅ MongoDB Connected");
//     })
//     .catch((err) => {
//         console.error("❌ MongoDB Connection Error:", err.message);
//         process.exit(1); // stop server if DB fails
//     });

// // 🔹 Test Route (optional but useful)
// app.get("/", (req, res) => {
//     res.send("API is running...");
// });

// // 🔹 Global Error Handler (optional but recommended)
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ error: "Something went wrong" });
// });

// // 🔹 Start Server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// 🔹 Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 CORS
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://front-slidenova.vercel.app/"
    ],
    credentials: true
}));

// 🔹 Static Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔹 Routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const formRoutes = require("./routes/form");
app.use("/api", formRoutes);

// 🔹 MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Atlas Connected");
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    });

// 🔹 Test Route
app.get("/", (req, res) => {
    res.send("🚀 API is running...");
});

// 🔹 Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Something went wrong"
    });
});

// 🔹 Server Port
const PORT = process.env.PORT || 5000;

// 🔹 Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});