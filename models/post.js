var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var PostSchema = new mongoose.Schema({
    userName: String,
    title: String,
    content: String,
    vote: Number,
    comments:[],
})

PostSchema.plugin(mongoosePaginate)
const Post = mongoose.model('Post', PostSchema)

module.exports = Post;



// visual representation of the posts array!
// postsArray[
//     {post: "firstpost", comments: [{comment: "this is dumb", author: "askjfsj"}, {comments: "i love this!", author: "askjfsj"}]},
//     {post: "yosecondpost", comments: [{comments: "i love this!", author: "askjfsj"}, {comments: "Good job!", author: "askjfsj"}]}
// ]