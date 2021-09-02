const express = require("express")
const BookingModel = require('../models/BookingSchema')
// const path = require('path')

/* CHECKING availability at 18:00 with the API /reservations/checkingEightteen */
const eightteenChecking = async(req, res) => {
    const bookings = await BookingModel.find()

    // Filter bookings with the requested date 
    const dateInputValue = req.body.requestedDate
    const hitDateBookings = bookings.filter(function (booking) {
        return booking.date.toString().includes(dateInputValue)
    })

    // Calulating by the number of guests requested 
    const guestInputValue = req.body.requestedNoOfGuests 
    const amountOfTables = guestInputValue / 6
    const totalTablesRequested = Math.ceil(amountOfTables)

    // Filter by requested date bookings with the time slot 18
    const eightteenTime = "18" 
    const eightteenBookings = hitDateBookings.filter(function (booking) {
        return booking.time.toString() == eightteenTime
    })

    // Map out the no of guests of the the 18 bookings
    const noOfGuestsBookings = eightteenBookings.map(booking => booking.numberOfGuests)

    // Devide each of guests booked with 6 to get the number of tables
    const devideTablesBooked = noOfGuestsBookings.map(guests => guests / 6)
    const totalTablesBooked = devideTablesBooked.map(table => Math.ceil(table))

    // Sum up the number of tables booked
    const sumTablesBooked = totalTablesBooked.reduce((a, b) => a + b, 0)
    
    try {
        if (sumTablesBooked + totalTablesRequested > 15) {
            console.log("No availability at 18:00 according to your requests")
            return res.send(false)
        } else {
            console.log("Yes, at 18:00 is available to book")
            return res.send(true)
        }
    } catch (err) {
        console.log(err)
    }
}

/* CHECKING availability at 21:00 with the API /reservations/checkingTwentyone */
const twentyoneChecking = async(req, res) => { 
    const bookings = await BookingModel.find()

    // Filter bookings with the requested date 
    const dateInputValue = req.body.requestedDate 
    const hitDateBookings = bookings.filter(function (booking) {
        return booking.date.toString().includes(dateInputValue)
    })

    // Calulating by the number of guests requested 
    const guestInputValue = req.body.requestedNoOfGuests 
    const amountOfTables = guestInputValue / 6
    const totalTablesRequested = Math.ceil(amountOfTables)

    // Filter by requested date bookings with the time slot 21
    const twentyoneTime = "21" 
    const twentyoneBookings = hitDateBookings.filter(function (booking) {
        return booking.time.toString() === twentyoneTime
    })

    // Map out the no of guests of the the 21 bookings
    const noOfGuestsBookings = twentyoneBookings.map(booking => booking.numberOfGuests)

    // Devide each of guests booked with 6 to get the number of tables
    const devideTablesBooked = noOfGuestsBookings.map(guests => guests / 6)
    const totalTablesBooked = devideTablesBooked.map(table => Math.ceil(table))
     
    // Sum up the number of tables booked
    const sumTablesBooked = totalTablesBooked.reduce((a, b) => a + b, 0)
    
    // Comparing if the tables at 21 has enough for the requested guests/tables
    try {
        if (sumTablesBooked + totalTablesRequested > 15) {
            console.log("No availability at 21:00 according to your requests")
            return res.send(false)
        } else {
            console.log("Yes, at 21:00 is available to book")
            return res.send(true)
        }
    } catch (err) {
        console.log(err)
    }
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

module.exports= {
    eightteenChecking,
    twentyoneChecking,
    createReservations
}