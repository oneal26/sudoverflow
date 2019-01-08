// Access our newly created Mongoose Model
var User = require('../models/user.js')

// Saving the context of this module inside the _the variable
_this = this

// Let's use an Async function to get the To Do List
//this is a function
    exports.getUsers = async function(query, page, limit){

        // We also want to set up options for the mongoose paginate

        var options = {
            page,
            limit
        }

    //Let's create a Try and Catch function 
    //that way we have some error handling set. 
    //Waiting for the promise
        
    try {
        var users = await User.paginate(query, options)
        
    //Once the Mongoose promise is returned 
    //we're going to go ahead and return 
    //the To Do List it has produced 

        return users;

    } catch (e) {

    //If the try didn't work we're going to 
    //go ahead and let the users know what kind of 
    //Error we have

        throw Error('Oh No! We got an error while Paginating our To-Do Tasks, so sorry!' )
    }
}

exports.createUser = async function(user){
    
    // Creating a new Mongoose Object by using the new keyword
    
        var newUser = new User({
            userName: user.userName,
            password: user.password,
            posts: []
        })
    
        try{
    
            // Let's go ahead and save the User 
    
            var savedUser = await newUser.save()
    
            return savedUser;
        }catch(e){
          
            //if we can't create a User we want to throw an error 
    
            throw Error("Error while Creating User")
        }
    }

    exports.updateUser = async function(user){
        var id = user.id
    
        try{
            //Find the old User Object by the Id
        
            var oldUser = await User.findById(id);
        }catch(e){
            throw Error("Error occured while Finding the User")
        }
    
        // If no old User Object exists return false
    
        if(!oldUser){
            return false;
        }
    
        console.log(oldUser)
    
        //Edit the User Object
    
        oldUser.userName = user.userName
        oldUser.password = user.password
    
    
        console.log(oldUser)
    
        try{
            var savedUser = await oldUser.save()
            return savedUser;
        }catch(e){
            throw Error("And Error occured while updating the User");
        }
    }

    exports.deleteUser = async function(id){
    
        // Delete the User
    
        try{
            var deleted = await User.deleteOne({_id: id});
            if(deleted.n === 0){
                throw Error("User Could not be deleted")
            }
            return deleted
        }catch(e){
            throw Error("Error Occured while Deleting the User")
        }
    }