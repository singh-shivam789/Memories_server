const express = require("express");
const Conversation = require("../models/Conversation");
const router = express.Router();

// new conversation
router.post("/", async (req, res) => {
  try {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    const savedConversation = await newConversation.save();
    return res.status(200).send(savedConversation);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// get a conversation
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).send(error);
  }
});
module.exports = router;
