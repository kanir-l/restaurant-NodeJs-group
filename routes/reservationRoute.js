const express = require("express");
const { eightteenChecking, twentyoneChecking, createReservations } = require("../controller/reservationController");
const router = express.Router();

router.get("/reservations/checkingEightteen", eightteenChecking);
router.get("/reservations/checkingTwentyone", twentyoneChecking);
router.get("/reservations/confirmation", createReservations);

module.exports = router;