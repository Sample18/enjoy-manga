const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/comment", require("./comment.routes"));
router.use("/genre", require("./genre.routes"));
router.use("/product", require("./product.routes"));
router.use("/chapter", require("./chapter.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
