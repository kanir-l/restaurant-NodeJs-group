const express = require("express");
const { sendingAvailability, createReservations } = require("../controller/reservationController");
const router = express.Router();

router.get("/reservations/checkingAvailability", sendingAvailability); ////Vet inte om denna path är fel????
router.post("/reservations/confirmation", createReservations);

module.exports = router;