var userService = require('../services/user.js')

var User = require('../models/user.js');

// Access our newly created Mongoose Model
var Post = require('../models/post.js')

// Saving the context of this module inside the _the variable
_this = this





// Let's use an Async function to get the To Do List
//this is a function
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

        throw Error('Oh No! We got an error while Paginating our To-Do Tasks, so sorry!' )
    }
}

exports.createPost = async function(post){
    
    // Creating a new Mongoose Object by using the new keyword
    
        var newPost = new Post({
            userName: post.userName,
            title: post.title,
            content: post.content,
            vote: post.vote,
            comments: [],
        })
    
        try{
    
            // Let's go ahead and save the User 
    
            var savedPost = await newPost.save()
           
            return savedPost;
        }catch(e){
          
            //if we can't create a Post we want to throw an error 
    
            throw Error("Error while Creating Post")
        }
    }


    // exports.pushPosts = async function(user, post){
    //     if(post.user == user.firstName){
    //         user.posts.push(post)
    //     }
    // }






    exports.updatePost = async function(post){
        var id = post.id
    
        try{
            //Find the old Post Object by the Id
        
            var oldPost = await Post.findById(id);
        }catch(e){
            throw Error("Error occured while Finding the Post")
        }
    
        // If no old User Object exists return false
    
        if(!oldPost){
            return false;
        }
    
        console.log(oldPost)
    
        //Edit the User Object
        oldPost.userName = post.userName
        oldPost.title = post.title
        oldPost.content = post.content
        oldPost.vote = post.vote
    
    
        console.log(oldPost)
    
        try{
            var savedPost = await oldPost.save()
            return savedPost;
        }catch(e){
            throw Error("And Error occured while updating the Post");
        }
    }

    exports.deletePost = async function(id){
    
        // Delete the User
    
        try{
            var deleted = await Post.deleteOne({_id: id});
            if(deleted.n === 0){
                throw Error("Post Could not be deleted")
            }
            return deleted
        }catch(e){
            throw Error("Error Occured while Deleting the Post")
        }
    }