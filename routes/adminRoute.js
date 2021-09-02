const express = require("express");
const { renderBookingsAdmin, deleteBookingAdmin } = require("../controller/adminController");
const router = express.Router();

router.get("/admin", renderBookingsAdmin);
router.delete("/admin/delete/:id", deleteBookingAdmin); 

// router.get("/admin/update/:id", updateBookingAdmin);

module.exports = router;