const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('../services/passport')
const Users = require('../models/Users')
const { generateUserPayload } = require('../utils/jwt')
const router = express.Router()

const payload = {
  id: 1,
  name: 'JT',
  avatar: 'https://google.com'
}

router.post('/email', async (req, res) => {
  const user =
    (await Users.findOne({ email: req.body.email })) ||
    (await Users.create({
      email: req.body.email,
      password: req.body.password
    }))

  if (!user.password === req.body.password) {
    res.status(400).send({ error: 'Incorrect email or password' })
    return
  }
  const payload = generateUserPayload(user)
  const token = jwt.sign(payload, process.env.TOKEN_SECRET)
  res.send({ user, token })
})

router.get('/verify', (req, res) => {
  console.log(req.cookies['X-JWT-Payload'])
  console.log(req.cookies['X-JWT-Signature'])
  console.log(req.user)
  res.send('verified')
})

router.post('/logout', (req, res) => {
  res.send('logging out')
})

const googleOptions = { scope: ['profile', 'email', 'openid'] }
router.get('/google', passport.authenticate('google', googleOptions))
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  const payload = generateUserPayload(req.user)
  const token = jwt.sign(payload, process.env.TOKEN_SECRET)
  res.redirect(`http://localhost:8080/signin?token=${token}`)
})

const linkedinOptions = {
  scope: ['r_emailaddress', 'r_liteprofile', 'w_member_social']
}
router.get('/linkedin', passport.authenticate('linkedin', linkedinOptions))
router.get(
  '/linkedin/redirect',
  passport.authenticate('linkedin'),
  (req, res) => {
    const payload = generateUserPayload(req.user)
    const token = jwt.sign(payload, process.env.TOKEN_SECRET)
    const jwtComposition = token.split('.')
    const jwtPayload = jwtComposition.slice(1).join('.')
    const jwtSignature = jwtComposition[0]
    console.log(req.cookies['X-JWT-Payload'])
    console.log(req.cookies['X-JWT-Signature'])
    console.log(process.env.NODE_ENV)
    // permanent
    res.cookie('X-JWT-Payload', jwtPayload, {
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 1000 * 60 * 30, // 1 hour
      httpOnly: false,
      domain: 'http://localhost:8080'
    })
    // session
    res.cookie('X-JWT-Signature', jwtSignature, {
      secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      domain: 'http://localhost:8080'
    })
    res.redirect(`http://localhost:8080/signin?token=${token}`)
  }
)

router.post('/jwt', (req, res) => {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET)
  res.send({ token })
})

router.get('/', passport.isAuthenticated, (req, res) => {
  res.send(req.user)
})

module.exports = router
