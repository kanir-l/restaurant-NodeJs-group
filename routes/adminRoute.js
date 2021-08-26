const express = require("express");
const { renderBookingsAdmin } = require("../controller/adminController");
const router = express.Router();

router.get("/admin", renderBookingsAdmin);

module.exports = router;