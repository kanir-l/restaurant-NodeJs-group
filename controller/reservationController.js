const express = require("express")
const BookingModel = require('../models/BookingSchema')
    // const path = require('path')

const sendingAvailability = async(req, res) => {

    const bookings = await BookingModel.find()

    // Filter bookings with the requested date 
    const reqDate = req.params.requestedDate
    const bookingsOnReqDate = bookings.filter(function(booking) {
        return booking.date.toString().includes(reqDate)
    })

    // Calulating by the number of guests requested 
    const reqGuests = req.params.requestedNoOfGuests
    const reqTables = Math.ceil(reqGuests / 6);

    const checkingAvailability = (timeslot) => {

        const slotBookings = bookingsOnReqDate.filter(function(booking) {
                return booking.time.toString() === timeslot;
            })
            // Map out the no of guests that are already booked on that slot
        const slotGuests = slotBookings.map(booking => booking.numberOfGuests);

        // Loop all of the bookings and devide each guestnumber with 6 to get the number of tables filled.
        const slotTables = slotGuests.map(guests => Math.ceil(guests / 6))

        // Sum up the number of tables booked on that slot
        const sumSlotTables = slotTables.reduce((a, b) => a + b, 0);

        try {
            if (sumSlotTables + reqTables > 15) {
                return (false)
            } else {
                return (true)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const slot1Availability = checkingAvailability(18);
    const slot2Availability = checkingAvailability(21);

    return res.send({
        slot1: slot1Availability,
        slot2: slot2Availability
    });

}


/* CREATE - An api endpoint for /reservations/confirmation */
const createReservations = async(req, res) => {
    try {
        const booking = new BookingModel({
            id: req.body.newBooking.id,
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
        res.send("Thank you for your reservation from the backend")
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    sendingAvailability,
    createReservations
}