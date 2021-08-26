const express = require('express')
const BookingModel = require('../models/BookingSchema')
// const path = require('path')
const app = express()

// POST/CREATE - An api endpoint for /RESERVATION
const createReservations = async(req, res) => {
    try {
        const booking = new BookingModel({
            id: 3,
            guest: 6,
            date: new Date(),
            time: 18.00,
            name: "Another dummy name",
            phone: 88888888,
            email: "dummy@info.com"
        })
        await booking.save()
        res.send(booking)
    } catch (err) {
        console.log(err)
    }
}

module.exports= {
    createReservations
}