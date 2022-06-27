const express = require('express')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const User = require('../../models/User')

const router = express.Router()

// @routes    Get api/auth
// @desc      Test routes
// @access    Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passord')
    res.json(user)
    res.send('auth routes')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @routes    Post api/auth
// @desc      authenticate user
// @access    Public
router.post(
  '/',
  [
    check('email', 'Please set e valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] })
      }

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
    }
  }
)

module.exports = router
