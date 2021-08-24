const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    numberOfGuests: {
        type: Number,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    date: {
        type: Date
    },
    time: {
        type: Number
    },
    specialRequest: {
        type: String
    }
})

const BookingModel = mongoose.model('bookings', BookingSchema)

module.exports = BookingModel