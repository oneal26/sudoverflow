// We need to be able to access the Service 
//that we just created so let's pull that in

var UserService = require('../services/user.service.js');

// Make sure to save the context of 
//this module inside the _this variable

_this = this

exports.getUsers = async function(req, res, next){

    // We're going to use ternary to check 
    //the existence of the query parameters
        
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10; 
    
        try{
        
            var users = await UserService.getUsers({}, page, limit)
            
    // Return the todos list with the appropriate 
    //HTTP Status Code and Message.
            
            return res.status(200).json({status: 200, data: todos, message: "Succesfully Users Recieved"});
            
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
            return res.status(400).json({status: 400, message: e.message});
            
        }
    }

    exports.createUser = async function(req, res, next){

        // Note: Req.Body contains the form submit values.
    
        var user = {
            
        }
    
        try{
            
    // Calling the Service function 
    //with the new object from the Request Body
        
            var createdUser = await UserService.createUser(user)
            return res.status(201).json({status: 201, data: createdUser, message: "Succesfully Created User"})
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
    return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull, I am sorry :( "})
        }
    }

    exports.updateUser = async function(req, res, next){

        // Id is necessary for the update
    
        if(!req.body._id){
            return res.status(400).json({status: 400., message: "Id must be present"})
        }
    
        var id = req.body._id;
    
        console.log(req.body)
    
        var user = {
            id,
            username: req.body.username ? req.body.username : null,
            password: req.body.password ? req.body.password : null,
        }
    
        try{
            var updatedUser = await UserService.updateUser(user)
            return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
        }catch(e){
            return res.status(400).json({status: 400., message: e.message})
        }
    }
    
    exports.removeUser = async function(req, res, next){

        var id = req.params.id;
    
        try{
            var deleted = await UserService.deleteUser(id)
            return res.status(204).json({status:204, message: "Succesfully User Deleted"})
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
    
    }
    
