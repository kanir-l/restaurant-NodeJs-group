const express = require("express");
const { createReservations } = require("../controller/reservationController");
const router = express.Router();

router.get("/reservations/confirmation", createReservations);

module.exports = router;