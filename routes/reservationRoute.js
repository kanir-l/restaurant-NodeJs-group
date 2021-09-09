const express = require("express");
const {sendingAvailability, createReservations, deleteReservation } = require("../controller/reservationController");
const router = express.Router();

router.get("/reservations/checkingAvailability", sendingAvailability)
router.post("/reservations/confirmation", createReservations);
router.get("/reservations/confirmation", createReservations);

module.exports = router;