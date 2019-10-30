const passport = require('passport')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const GoogleStrategy = require('passport-google-oauth20')
const Users = require('../models/Users')

const generateJWTPayload = user => ({
  id: user.id,
  email: user.email,
  avatar: user.avatar,
  locale: user.locale
})

// To Client from Server
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// To Server from Client Cookie
passport.deserializeUser(async (id, done) => {
  const user = await Users.findById(id)
  done(null, user)
})

passport.isAuthenticated = expressJWT({ secret: process.env.TOKEN_SECRET })

const googleOptions = {
  callbackURL: '/auth/google/redirect',
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
}
const googleCallback = async (_accessToken, _refreshToken, profile, done) => {
  const user =
    (await Users.findOne({
      googleId: profile.id
    })) ||
    (await Users.create({
      username: profile.displayName,
      googleId: profile.id,
      avatar: profile['_json'].picture,
      email: profile['_json'].email,
      locale: profile['_json'].locale
    }))
  const payload = generateJWTPayload(user)
  const token = jwt.sign(payload, process.env.TOKEN_SECRET)
  done(null, user)
}
passport.use(new GoogleStrategy(googleOptions, googleCallback))

module.exports = passport
