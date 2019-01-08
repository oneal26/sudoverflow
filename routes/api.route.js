var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var posts = require('./api/post.route')

router.use('/users', users);
router.use('/posts', posts);

module.exports = router;