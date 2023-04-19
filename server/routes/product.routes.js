const express = require("express");
const Product = require("../models/Product");
const router = express.Router({ mergeParams: true });
const auth = require("../middleware/auth.middleware");

router.get("/", async (req, res) => {
  try {
    const list = await Product.find();
    res.status(200).send(list);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже." });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
      moderateStatus: "onCheck",
    });
    res.send(newProduct);
  } catch (e) {
    return sendDefaultError(res);
  }
});

router.patch("/update", auth, async (req, res) => {
  const productId = req.body._id;
  try {
    const updateProduct = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    res.send(updateProduct);
  } catch (e) {
    return sendDefaultError(res);
  }
});

module.exports = router;
