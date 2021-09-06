const express = require("express");
const { renderBookingsAdmin, deleteBookingAdmin, updateBookingAdmin, sendingAvailabilityEdit } = require("../controller/adminController");
const router = express.Router();

router.get("/admin", renderBookingsAdmin);
router.delete("/admin/delete/:id", deleteBookingAdmin); 
router.get("/admin/checkingAvailabilityEdit", sendingAvailabilityEdit);
router.put("/admin/update", updateBookingAdmin);

// router.get("/admin/update/:id", updateBookingAdmin);

module.exports = router;