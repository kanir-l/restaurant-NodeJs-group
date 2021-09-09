const express = require("express");
const { renderBookingsAdmin, deleteBookingAdmin, updateBookingAdmin, sendingAvailabilityEdit, renderBooking} = require("../controller/adminController");
const router = express.Router();

router.get("/admin", renderBookingsAdmin);// This route handles fetching all the reservations from the db
router.delete("/admin/delete/:id", deleteBookingAdmin); // This route handles the deletion of the reservation from admin page
router.get("/admin/checkingAvailabilityEdit", sendingAvailabilityEdit); // This route handles the checks for editing the reservation
router.put("/admin/update", updateBookingAdmin); // This route handles the edit feature in admin page
router.get("/admin/:id", renderBooking); // This route is when the user goes to do their own cancellation

module.exports = router;