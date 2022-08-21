const express = require("express");
const router = express.Router();

//getting all
router.get("/", (req, res) => {
  res.send("ahihi");
});

//getting one
router.get("/:id", (req, res) => {
  req.params.id;
  res.send(req.params.id);
});
//creating one
router.post("/", (req, res) => {});
//updating one
router.patch("/:id", (req, res) => {});
//deleting one
router.delete("/:id", (req, res) => {});
module.exports = router;
