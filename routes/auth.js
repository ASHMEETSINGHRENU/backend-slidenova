const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const auth = require("../middleware/authMiddleware");

// Upload config
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();
        res.json("User Registered");
    } catch (err) {
        res.status(400).json(err);
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json("Invalid password");

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.json({ token, user });
});
// GET PROFILE
router.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json("User not found");
        }

        res.json(user);
    } catch (err) {
        res.status(500).json("Server error");
    }
});

// UPDATE PROFILE
router.put("/update", auth, upload.single("photo"), async (req, res) => {
    try {
        const updateData = {
            username: req.body.username,
            email: req.body.email,
        };

        if (req.body.password) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }

        if (req.file) {
            updateData.photo = req.file.filename;
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            { new: true }
        );

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;