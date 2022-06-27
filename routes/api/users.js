const express = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const User = require('../../models/User')

const router = express.Router()

// @routes    Post api/users
// @desc      Register user
// @access    Public
router.post(
  '/',
  [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please set e valid email').isEmail(),
    check(
      'password',
      'Pleaser enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body
    try {
      let user =  await User.findOne({ email })
      if (user) {
        res.status(400).json({ errors: [{ msg: 'User already exsist' }] })
      }

      //get users gavatar
      const avatar = gravatar.url(email,{
        s: '200',
        r: 'pg',
        d: 'mm',
      })
    console.log('avatar', avatar)
      user = new User({
        name,
        password,
        avatar,
        email,
      })
      //encrypt password

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()
      //return jsonwebtoken

      res.send('User Registred')
    } catch (err) {
      console.error(err.message)
      res.status(500).send('server error')
    }
  }
)
module.exports = router
