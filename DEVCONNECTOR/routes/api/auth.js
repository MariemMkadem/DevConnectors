const express = require('express')
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

module.exports = router
