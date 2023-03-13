const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

// add
router.post("/", async (req, res) => {
  try {
    const message = new Message(req.body);
    const savedMessage = await message.save();
    return res.status(200).json(savedMessage);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// get
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error);
  }
});
module.exports = router;
