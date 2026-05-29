const router = require("express").Router();
const Form = require("../models/Form");

// CREATE FORM
router.post("/form", async (req, res) => {
    try {
        const newForm = new Form(req.body);
        await newForm.save();
        res.json("Form Submitted");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;