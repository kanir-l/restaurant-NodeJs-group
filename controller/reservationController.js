const express = require("express")
const BookingModel = require('../models/BookingSchema')


const sendingAvailability = async(req, res) => {

    const bookings = await BookingModel.find()

    // Filter bookings with the requested date 
    const reqDate = req.query.date;
    const bookingsOnReqDate = bookings.filter(function(booking) {
        return booking.date.includes(reqDate)
    })

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
        slot1Availability,
        slot2Availability
    })
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

    createReservations,
    sendingAvailability

}