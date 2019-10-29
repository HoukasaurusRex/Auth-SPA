const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
// const expressJWT = require('express-jwt')
const router = express.Router()

const payload = {
  id: 1,
  name: 'JT',
  avatar: 'https://google.com'
}

const secret = 'secreet'

// router.use(expressJWT({ secret }).unless({ path: ['/users/auth'] }))

router.get('/login', (req, res) => {
  res.send('logging in')
})

router.get('/logout', (req, res) => {
  res.send('logging out')
})

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
)

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('hey')
})

router.post('/jwt', (req, res) => {
  const token = jwt.sign(payload, secret)
  res.send({ token })
})

/* GET users listing. */
router.get('/', (req, res) => {
  res.send(req.user)
})

module.exports = router
