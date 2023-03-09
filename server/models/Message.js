const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({});

module.exports = mongoose.model("Message", MessageSchema);
