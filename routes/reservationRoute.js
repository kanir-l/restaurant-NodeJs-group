const express = require("express");
const { eightteenChecking, twentyoneChecking, createReservations } = require("../controller/reservationController");
const router = express.Router();

router.post("/reservations/checkingEightteen", eightteenChecking);
router.post("/reservations/checkingTwentyone", twentyoneChecking);
router.get("/reservations/confirmation", createReservations);

module.exports = router;