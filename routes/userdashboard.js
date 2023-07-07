const express = require("express");
const multer = require("multer");
const upload = multer({dest : 'uploads/'});
const {dashboard } = require("../controller/controller");
const router = express.Router();

router.route("/dashboard").get(dashboard);

module.exports = router;