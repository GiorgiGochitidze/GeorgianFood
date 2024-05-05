const mongoose = require('mongoose')

const User = new mongoose.Schema({
    username: String,
    gmail: String,
    password: String,
})

module.exports = mongoose.model('users', User)