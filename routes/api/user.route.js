var express = require('express')

var router = express.Router()

// Getting the User Controller that we just created

var UserController = require('../../controllers/user.js');


// Map each API to the Controller FUnctions

router.get('/', UserController.getUsers)

router.post('/', UserController.createUser)

router.put('/', UserController.updateUser)

router.delete('/:id',UserController.removeUser)


// Export the Router

module.exports = router;