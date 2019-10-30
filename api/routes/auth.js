const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const router = express.Router()

const payload = {
  id: 1,
  name: 'JT',
  avatar: 'https://google.com'
}

router.post('/email', (req, res) => {
  res.send('logging in')
})

router.post('/logout', (req, res) => {
  res.send('logging out')
})

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email', 'openid'] })
)

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send(req.user)
})

router.post('/jwt', (req, res) => {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET)
  res.send({ token })
})

/* GET users listing. */
router.get('/', passport.isAuthenticated, (req, res) => {
  res.send(req.user)
})

module.exports = router
