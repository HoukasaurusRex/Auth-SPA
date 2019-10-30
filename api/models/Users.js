const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  googleId: String,
  avatar: String,
  email: String,
  locale: String
})

module.exports = mongoose.model('Users', userSchema)
