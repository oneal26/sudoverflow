var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String,
    vote: Number,
    postId: Number,
})

PostSchema.plugin(mongoosePaginate)
const Post = mongoose.model('Post', PostSchema)

module.exports = Post;