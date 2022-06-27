const express = require('express');

const router = express.Router();

// @routes    Get api/profile
// @desc      Test routes
// @access    Public

router.get('/', (req,res)=> res.send('profile routes'))

module.exports = router;