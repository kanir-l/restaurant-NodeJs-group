const express = require("express");
const { renderBookingsAdmin, deleteBookingAdmin, updateBookingAdmin, sendingAvailabilityEdit, renderBooking} = require("../controller/adminController");
const router = express.Router();

router.get("/admin", renderBookingsAdmin);
router.delete("/admin/delete/:id", deleteBookingAdmin); 
router.get("/admin/checkingAvailabilityEdit", sendingAvailabilityEdit);
router.put("/admin/update", updateBookingAdmin);
router.get("/admin/:id", renderBooking) // This route is when the user goes to do their own cancellation

module.exports = router;