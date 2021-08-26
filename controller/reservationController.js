const express = require("express");
const BookingModel = require('../models/BookingSchema')
// const path = require('path')

// POST/CREATE - An api endpoint for /RESERVATION
const createReservations = async(req, res) => {
    try {
        const booking = new BookingModel({
            id: 4,
            numberOfGuests: 5,
            time: 21,
            firstName: "This is hard code from the reservations",
            lastName: "Dummy lastName",
            phone: 123456789,
            email: "dummy@email.com",
            specialRequest: "VIP corner please"
        })
        await booking.save()
        res.send("Thank you for your reservation")
        console.log("Thank you for your reservation")
    } catch (err) {
        console.log(err)
    }
}

module.exports= {
    createReservations
}