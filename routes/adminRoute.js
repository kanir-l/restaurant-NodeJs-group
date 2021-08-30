const express = require("express");
const { renderBookingsAdmin } = require("../controller/adminController");
const router = express.Router();

router.get("/admin", renderBookingsAdmin);

// router.get("/admin/delete/:id", deleteBookingAdmin);

// router.get("/admin/update/:id", updateBookingAdmin);

module.exports = router;