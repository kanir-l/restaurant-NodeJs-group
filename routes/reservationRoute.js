const express = require("express");
const {sendingAvailability, createReservations } = require("../controller/reservationController");
const router = express.Router();

/* router.post("/reservations/checkingEightteen", eightteenChecking);
router.post("/reservations/checkingTwentyone", twentyoneChecking); */
router.get("/reservations/checkingAvailability", sendingAvailability)
router.post("/reservations/confirmation", createReservations);

module.exports = router;