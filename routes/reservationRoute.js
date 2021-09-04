const express = require("express");

const {sendingAvailability, createReservations } = require("../controller/reservationController");
const router = express.Router();

router.get("/reservations/checkingAvailability", sendingAvailability)

router.post("/reservations/confirmation", createReservations);

module.exports = router;