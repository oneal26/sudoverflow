// Access our newly created Mongoose Model
var Post = require('../models/todo.model.js')

// Saving the context of this module inside the _the variable
_this = this

// Let's use an Async function to get the To Do List
exports.getPosts = async function(query, page, limit){

    // We also want to set up options for the mongoose paginate

    var options = {
        page,
        limit
    }

    //Let's create a Try and Catch function 
//that way we have some error handling set. 
//Waiting for the promise
    
try {
    var posts = await Post.paginate(query, options)
    
//Once the Mongoose promise is returned 
//we're going to go ahead and return 
//the To Do List it has produced 

    return posts;

} catch (e) {

//If the try didn't work we're going to 
//go ahead and let the users know what kind of 
//Error we have

    throw Error('Oh No! We got an error while Paginating our Post Tasks, so sorry!' )
}
}

exports.createPost = async function(post){
    
    // Creating a new Mongoose Object by using the new keyword
    
        var newPost = new Post({
            title: post.title,
            description: post.description,
            date: new Date(),
            status: post.status,
        })
    
        try{
    
            // Let's go ahead and save the Todo 
    
            var savedPost = await newPost.save()
    
            return savedPost;
        }catch(e){
          
            //if we can't create a Todo we want to throw an error 
    
            throw Error("Error while Creating Post")
        }
    }

    exports.updatePost = async function(Post){
        var id = Post.id
    
        try{
            //Find the old Todo Object by the Id
        
            var oldPost = await Post.findById(id);
        }catch(e){
            throw Error("Error occured while Finding the Post")
        }
    
        // If no old Todo Object exists return false
    
        if(!oldPost){
            return false;
        }
    
        console.log(oldPost)
    
        //Edit the Todo Object

        oldPost.description = Post.description
        oldPost.title = Post.title,
    
        console.log(oldPost)
    
        try{
            var savedPost = await oldPost.save()
            return savedPost;
        }catch(e){
            throw Error("And Error occured while updating the Post");
        }
    }

    exports.deletePost = async function(id){
    
        // Delete the Todo
    
        try{
            var deleted = await Post.deleteOne({_id: id})
            if(deleted.n === 0){
                throw Error("Post Could not be deleted")
            }
            return deleted
        }catch(e){
            throw Error("Error Occured while Deleting the Post")
        }
    }

