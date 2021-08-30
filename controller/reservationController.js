const express = require("express")
const BookingModel = require('../models/BookingSchema')
// const path = require('path')

/* CHECKING availability at 18:00 with the API /reservations/checkingEightteen */
const eightteenChecking = async(req, res) => {
    const bookings = await BookingModel.find()

    // Filter those bookings with the requested date 
    const dateInputValue = "Aug 27 2021" // FROM THE USER
    const hitDateBookings = bookings.filter(function (booking) {
        return booking.date.toString().includes(dateInputValue)
    })

    // Calulating by the number of guests requested 
    const guestInputValue = 90 // FROM THE USER
    const amountOfTables = guestInputValue / 6
    const totalAmoutOfTables = Math.ceil(amountOfTables)

    // Filter and count those requested date bookings of the time slot 18
    const eightteenTime = "18" 
    const eightteenBookings = hitDateBookings.filter(function (booking) {
        return booking.time.toString() == eightteenTime
    }).length
        
    // Comparing if the tables at 18 has enough for the requested guests/tables
    try {
        if (eightteenBookings >= 15 - totalAmoutOfTables) {
            console.log("No availability at 18:00 according to your requests")
            return false
        } else {
            console.log("Yes, at 18:00 is available to book")
            return true
        }
    } catch (err) {
        console.log(err)
    }
}

/* CHECKING availability at 21:00 with the API /reservations/checkingTwentyone */
const twentyoneChecking = async(req, res) => { 
    const bookings = await BookingModel.find()

    // Filter those bookings with the requested date 
    const dateInputValue = "Aug 27 2021" // FROM THE USER
    const hitDateBookings = bookings.filter(function (booking) {
        return booking.date.toString().includes(dateInputValue)
    })

    // Calulating by the number of guests requested 
    const guestInputValue = 10 // FROM THE USER
    const amountOfTables = guestInputValue / 6
    const totalAmoutOfTables = Math.ceil(amountOfTables)

    // Filter and count those requested date bookings of the time slot 21 
    const twentyoneTime = "21" 
    const twentyoneBookings = hitDateBookings.filter(function (booking) {
        return booking.time.toString() == twentyoneTime
    }).length
    
    // Comparing if the tables at 21 has enough for the requested guests/tables
    try {
        if (twentyoneBookings >= 15 - totalAmoutOfTables) {
            console.log("No availability at 21:00 according to your requests")
            return false
        } else {
            console.log("Yes, at 21:00 is available to book")
            return true
        }
    } catch (err) {
        console.log(err)
    }
} 

/* CREATE - An api endpoint for /RESERVATION */
const createReservations = async(req, res) => {
    try {
        const booking = new BookingModel({
            id: 3,
            numberOfGuests: 5,
            date: new Date(),
            time: 18.00,
            firstName: "firstname",
            lastName: "lastName",
            phone: 123456789,
            email: "dummy@email.com",
            specialRequest: "No Smoke"
        })
        await booking.save()
        res.send("Thank you for your reservation")
    } catch (err) {
        console.log(err)
    }
}

module.exports= {
    eightteenChecking,
    twentyoneChecking,
    createReservations
}