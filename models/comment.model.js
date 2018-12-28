var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var CommentSchema = new mongoose.Schema({
    content: String,
    date: Date,
    vote: Number,
})

CommentSchema.plugin(mongoosePaginate)
const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment;