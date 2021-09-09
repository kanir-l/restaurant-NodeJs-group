const express = require("express");
const BookingModel = require('../models/BookingSchema');
require('dotenv').config();
const nodemailer = require('nodemailer');

// Request the bookings with condition values recieved from react
const sendingAvailability = async(req, res) => {
    const bookings = await BookingModel.find()

    // Filter bookings with the requested date
    const reqDate = req.query.date;
    const bookingsOnReqDate = bookings.filter(function(booking) {
        return booking.date.includes(reqDate);
    });

    // Calulating by the number of guests requested
    const reqGuests = req.query.numberOfGuests;
    const reqTablesMath = reqGuests / 6;
    const reqTables = Math.ceil(reqTablesMath);

    const checkingAvailability = (timeslot) => {
        const slotBookings = bookingsOnReqDate.filter(function(booking) {
            return booking.time === timeslot;
        })

        // Map out the no of guests that are already booked on that slot
        const slotGuests = slotBookings.map(booking => booking.numberOfGuests);

        // Loop all of the bookings and divide each guestnumber with 6 to get the number of tables occupied.
        const slotTables = slotGuests.map(guests => guests / 6);

        //Round up where there are decimals
        const occupiedTables = slotTables.map(table => Math.ceil(table));

        // Sum up the number of tables booked on that slot
        const sumSlotTables = occupiedTables.reduce((a, b) => a + b, 0);

        try {
            if (sumSlotTables + reqTables > 15) {
                return (false);
            } else {
                return (true);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const slot1Availability = checkingAvailability(18);
    const slot2Availability = checkingAvailability(21);

    return res.send({
        slot1Availability,
        slot2Availability
    });
}

// CREATE - An api endpoint for /reservations/confirmation
const createReservations = async(req, res) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVICE,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.RESET_EMAIL,
            pass: process.env.RESET_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        const booking = new BookingModel({
            numberOfGuests: req.body.newBooking.numberOfGuests,
            date: req.body.newBooking.date,
            time: req.body.newBooking.time,
            firstName: req.body.newBooking.firstName,
            lastName: req.body.newBooking.lastName,
            phone: req.body.newBooking.phone,
            email: req.body.newBooking.email,
            specialRequest: req.body.newBooking.specialRequest
        })
        await booking.save()
        res.send(booking) //removed the return, caused the mail not to run
      
        transporter.sendMail({
            from: process.env.RESET_EMAIL,
            to: `${req.body.newBooking.email}`,
            subject: "Reservation details",
            text: `Seafood Restaurant - Reservation booked. Booking details: ${req.body.newBooking.date} at 
            ${req.body.newBooking.time}:00. Booked in the name of ${req.body.newBooking.firstName} ${req.body.newBooking.lastName}.
            Looking forward to serve you!`,
            html: `<h3>Seafood Restaurant</h3>
            <h1>Reservation booked.</h1>
            <ul>
              <li>${req.body.newBooking.date} at ${req.body.newBooking.time}:00</li>
              <li>Party of ${req.body.newBooking.numberOfGuests}</li>
            </ul>
            <p>Hi ${req.body.newBooking.firstName},</p>
            <br>
            <p>Your reservation at has been made at Seafood Restaurant.</p>
            <p>If you wish to cancel your reservation click this link:</p>
            <a href="http://localhost:3000/admin/${booking._id}">Cancel reservation</a>
            <br>
            <p>Looking forward to serve you!</p>`
        }, (err, info) => {
            if (err) {
                return console.log("Error log from nodemailer" + err);
            } else {
                return console.log("Info log from nodemailer" + info.response);
            }
        })
    } catch (err) {
        console.log(err);
    }
}

const deleteReservation = async(req, res) => {
    try {
        const idParams = req.params.id;
        await BookingModel.deleteOne({_id: idParams});
        res.send("Deleting the reservation of: " + idParams);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createReservations,
    sendingAvailability,
    deleteReservation
}