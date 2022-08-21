const express = require("express");
const router = express.Router();

const Subscribers = require("../models/subscribersModel");

//middleware
const getSubscriber = async (req, res, next) => {
  let subscriber;
  try {
    subscriber = await Subscribers.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "cannot find the subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.subscriber = subscriber;
  next();
};

//getting all
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscribers.find();
    res.status(200).json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//creating one
router.post("/", async (req, res) => {
  try {
    const subscriber = new Subscribers({
      name: req.body.name,
      subscribedToChannel: req.body.subscribedToChannel,
    });
    const savedSubscriber = await subscriber.save();
    res.status(200).json(savedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//getting one
router.get("/:id", getSubscriber, (req, res) => {
  res.status(200).json(res.subscriber);
});

//updating one
router.patch("/:id", getSubscriber, (req, res) => {});

//deleting one
router.delete("/:id", getSubscriber, (req, res) => {
  try {
    res.subscriber.remove();
    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
