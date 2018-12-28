// Access our newly created Mongoose Model
var Comment = require('../models/todo.model.js')

// Saving the context of this module inside the _the variable
_this = this

// Let's use an Async function to get the To Do List
exports.getComment = async function(query, page, limit){

    // We also want to set up options for the mongoose paginate

    var options = {
        page,
        limit
    }

    //Let's create a Try and Catch function 
//that way we have some error handling set. 
//Waiting for the promise
    
try {
    var comments = await Comment.paginate(query, options)
    
//Once the Mongoose promise is returned 
//we're going to go ahead and return 
//the To Do List it has produced 

    return comments;

} catch (e) {

//If the try didn't work we're going to 
//go ahead and let the users know what kind of 
//Error we have

    throw Error('Oh No! We got an error while Paginating our Comments Tasks, so sorry!' )
}
}


exports.createComment = async function(comment){
    
    // Creating a new Mongoose Object by using the new keyword
    
        var newComment = new Comment({
            date: new Date(),
            content: Comment.content,
            vote: Comment.vote,
        })
    
        try{
    
            // Let's go ahead and save the Todo 
    
            var savedComments = await newComments.save()
    
            return savedComments;
        }catch(e){
          
            //if we can't create a Todo we want to throw an error 
    
            throw Error("Error while Creating Comment")
        }
    }

    exports.updateComment = async function(Comment){
        var id = Comment.id
    
        try{
            //Find the old Todo Object by the Id
        
            var oldComment = await Comment.findById(id);
        }catch(e){
            throw Error("Error occured while Finding the Comment")
        }
    
        // If no old Todo Object exists return false
    
        if(!oldComment){
            return false;
        }
    
        console.log(oldComment)
    
        //Edit the Todo Object

        oldComment.content = Comment.content
    
    
        console.log(oldComment)
    
        try{
            var savedComment = await oldComment.save()
            return savedComment;
        }catch(e){
            throw Error("And Error occured while updating the Comment");
        }
    }

    exports.deleteComment = async function(id){
    
        // Delete the Todo
    
        try{
            var deleted = await Comment.deleteOne({_id: id})
            if(deleted.n === 0){
                throw Error("Comment Could not be deleted")
            }
            return deleted
        }catch(e){
            throw Error("Error Occured while Deleting the Comment")
        }
    }
