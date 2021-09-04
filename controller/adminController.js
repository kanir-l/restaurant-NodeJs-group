const express = require("express")
const BookingModel = require('../models/BookingSchema')
// const path = require('path')

// READ - An api endpoint for /ADMIN
const renderBookingsAdmin = async(req, res) => {
    try {
        const bookings = await BookingModel.find()
        res.json(bookings)
    } catch (err) {
        console.log(err)
    }
}

/* DELETE - An api endpoint for /ADMIN/DELETE/:ID */
const deleteBookingAdmin = async(req, res) => {
    try {
        const idParams = req.params.id
        await BookingModel.deleteOne({_id: idParams})
        res.send(idParams)
        window.location.reload()
    } catch (err) {
        console.log(err)
    } 
}

/* UPDATE - An api endpoint for /ADMIN/EDIT/:ID */
const updateBookingAdmin = async(req, res) => {
    const idBooking = req.body.idBooking
    const updatedRes = {
        numberOfGuests: req.body.numberOfGuests,
        date: req.body.date,
        time: req.body.time,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        specialRequest: req.body.specialRequest
    }
    
    try {
        await BookingModel.findById(idBooking, (updatedBooking) => {
            updatedBooking.numberOfGuests = updatedRes.numberOfGuests
            updatedBooking.date = updatedRes.date
            updatedBooking.time = updatedRes.time
            updatedBooking.firstName = updatedRes.firstName
            updatedBooking.lastName = updatedRes.lastName
            updatedBooking.phone = updatedRes.phone
            updatedBooking.email = updatedRes.email
            updatedBooking.specialRequest = updatedRes.specialRequest

            updatedBooking.save()
            res.send("Updated")
        })

        
    } catch (err) {
        console.log(err)
    }
}


module.exports= {
    renderBookingsAdmin,
    deleteBookingAdmin,
    updateBookingAdmin
}
