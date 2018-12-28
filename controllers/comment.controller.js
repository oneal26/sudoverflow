// We need to be able to access the Service 
//that we just created so let's pull that in

var CommentService = require('../services/comment.service.js');

// Make sure to save the context of 
//this module inside the _this variable

_this = this

exports.getComments = async function(req, res, next){

    // We're going to use ternary to check 
    //the existence of the query parameters
        
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10; 
    
        try{
        
            var comments = await CommentService.getComments({}, page, limit)
            
    // Return the todos list with the appropriate 
    //HTTP Status Code and Message.
            
            return res.status(200).json({status: 200, data: comments, message: "Succesfully Comments Recieved"});
            
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
            return res.status(400).json({status: 400, message: e.message});
            
        }
    }

    exports.createComment = async function(req, res, next){

        // Note: Req.Body contains the form submit values.
    
        var comment = {
            content: req.body.content,
        }
    
        try{
            
    // Calling the Service function 
    //with the new object from the Request Body
        
            var createdComment = await CommentService.createComment(comment)
            return res.status(201).json({status: 201, data: createdComment, message: "Succesfully Created Comment"})
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
    return res.status(400).json({status: 400, message: "Comment Creation was Unsuccesfull, I am sorry :( "})
        }
    }

    exports.updateComment = async function(req, res, next){

        // Id is necessary for the update
    
        if(!req.body._id){
            return res.status(400).json({status: 400., message: "Id must be present"})
        }
    
        var id = req.body._id;
    
        console.log(req.body)
    
        var comment = {
            id,
            content: req.body.content ? req.body.content : null,
        }
    
        try{
            var updatedComment = await CommentService.updateComment(comment)
            return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Comment"})
        }catch(e){
            return res.status(400).json({status: 400., message: e.message})
        }
    }

    exports.removeComment = async function(req, res, next){

        var id = req.params.id;
    
        try{
            var deleted = await CommentService.deleteComment(id)
            return res.status(204).json({status:204, message: "Succesfully Comment Deleted"})
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
    
    }
