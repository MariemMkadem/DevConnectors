const express = require('express');

const router = express.Router();

// @routes    Get api/posts
// @desc      Test routes
// @access    Public

router.get('/', (req,res)=> res.send('posts routes'))

module.exports = router;