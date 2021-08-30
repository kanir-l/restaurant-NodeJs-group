const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    numberOfGuests: {
        type: Number
    },
    date: {
        type: String
    },
    time: {
        type: Number
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    specialRequest: {
        type: String
    }
})

const BookingModel = mongoose.model('bookings', BookingSchema)

module.exports = BookingModel;