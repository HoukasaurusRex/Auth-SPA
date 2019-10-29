const express = require('express')
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const router = express.Router()

const payload = {
  id: 1,
  name: 'JT',
  avatar: 'https://google.com'
}

const secret = 'secreet'

router.use(expressJWT({ secret }).unless({ path: ['/users/auth'] }))

router.post('/auth', (req, res, next) => {
  const token = jwt.sign(payload, secret)
  res.send({ token })
})

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send(req.user)
})

module.exports = router
