const express = require("express");
const { renderBookingsAdmin, deleteBookingAdmin, updateBookingAdmin } = require("../controller/adminController");
const router = express.Router();

router.get("/admin", renderBookingsAdmin);
router.delete("/admin/delete/:id", deleteBookingAdmin); 
router.put("/admin/update/:id", updateBookingAdmin);

// router.get("/admin/update/:id", updateBookingAdmin);

module.exports = router;