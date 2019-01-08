var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    userName: String,
    password: String,
    posts: new Array,
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;



// visual representation of the posts array!
// postsArray[
//     {post: "firstpost", comments: [{comment: "this is dumb", author: "askjfsj"}, {comments: "i love this!", author: "askjfsj"}]},
//     {post: "yosecondpost", comments: [{comments: "i love this!", author: "askjfsj"}, {comments: "Good job!", author: "askjfsj"}]}
// ]