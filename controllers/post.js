// We need to be able to access the Service 
//that we just created so let's pull that in


var PostService = require('../services/post.js');

// Make sure to save the context of 
//this module inside the _this variable

_this = this




exports.getPosts = async function(req, res, next){

    // We're going to use ternary to check 
    //the existence of the query parameters
        
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 50; 
    
        try{
        
            var posts = await PostService.getPosts({}, page, limit)
            
    // Return the Users list with the appropriate 
    //HTTP Status Code and Message.
            
            return res.status(200).json({status: 200, data: posts, message: "Succesfully Posts Recieved"});
            
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
            return res.status(400).json({status: 400, message: e.message});
            
        }
    }


    exports.createPost = async function(req, res, next){

        // Note: Req.Body contains the form submit values.
    
        var post = {
            userName: req.body.userName,
            title: req.body.title,
            content: req.body.content,
            vote: req.body.vote,
            comments:[],
        }
    
        try{
            
    // Calling the Service function 
    //with the new object from the Request Body
        
            var createdPost = await PostService.createPost(post)
            return res.status(201).json({status: 201, data: createdPost, message: "Succesfully Created Post"})
        }catch(e){
    //Return an Error Response Message 
    //with Code and the Error Message.
    return res.status(400).json({status: 400, message: "Post Creation was Unsuccesfull, I am sorry :( "})
        }
    }
    


    exports.updatePost = async function(req, res, next){

        // Id is necessary for the update
    
        if(!req.body._id){
            return res.status(400).json({status: 400, message: "Id must be present"})
        }
    
        var id = req.body._id;
    
        console.log(req.body)
    
        var UPost = {
            id,
            userName: req.body.userName ? req.body.userName : null,
            title: req.body.title ? req.body.title : null,
            content: req.body.content ? req.body.content : null,
            vote: req.body.vote ? req.body.vote : null,
            comments: req.body.comments ? req.body.comments : null,
        }
    
        try{
            var updatedPost = await PostService.updatePost(post)
            return res.status(200).json({status: 200, data: updatedPost, message: "Succesfully Updated Post"})
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
    }
    

    exports.removePost = async function(req, res, next){

        var id = req.params.id;
    
        try{
            var deleted = await PostService.deletePost(id)
            return res.status(204).json({status:204, message: "Succesfully Post Deleted"})
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
    
    }