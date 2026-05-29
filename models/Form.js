const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    email: String,
    pptTopic: String,
    pptDescription: String,
    pptType: [String],
    purpose: [String],
    slides: String,
    hasContent: String,
    deadline: Date,
    urgency: String,
    budget: String
}, { timestamps: true });

module.exports = mongoose.model("Form", formSchema);