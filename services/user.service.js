// Access our newly created Mongoose Model
var User = require('../models/todo.model.js')

// Saving the context of this module inside the _the variable
_this = this

// Let's use an Async function to get the To Do List
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

    throw Error('Oh No! We got an error while Paginating our User Tasks, so sorry!' )
}
}

exports.createUser = async function(user){
    
    // Creating a new Mongoose Object by using the new keyword
    
        var newUser = new User({
            username: User.username,
            password: Uer.password,
            userId: new Number(),
        })
    
        try{
    
            // Let's go ahead and save the Todo 
    
            var savedUser = await newUser.save()
    
            return savedUser;
        }catch(e){
          
            //if we can't create a Todo we want to throw an error 
    
            throw Error("Error while Creating User")
        }
    }

    exports.updateUser = async function(User){
        var id = User.id
    
        try{
            //Find the old Todo Object by the Id
        
            var oldUser = await User.findById(id);
        }catch(e){
            throw Error("Error occured while Finding the User")
        }
    
        // If no old Todo Object exists return false
    
        if(!oldUser){
            return false;
        }
    
        console.log(oldUser)
    
        //Edit the Todo Object

        oldUser.username = User.username
        oldUser.password = User.password
    
        console.log(oldUser)
    
        try{
            var savedUser = await oldUser.save()
            return savedUser;
        }catch(e){
            throw Error("And Error occured while updating the User");
        }
    }

    exports.deleteUser = async function(id){
    
        // Delete the Todo
    
        try{
            var deleted = await User.deleteOne({_id: id})
            if(deleted.n === 0){
                throw Error("User Could not be deleted")
            }
            return deleted
        }catch(e){
            throw Error("Error Occured while Deleting the User")
        }
    }


