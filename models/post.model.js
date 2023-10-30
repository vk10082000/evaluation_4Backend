const mongoose = require("mongoose")
const postSehema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    no_of_comments: Number,
    userID:String
}
    ,{
    versionKey: false
})
const PostModel = mongoose.model("post",postSehema)

module.exports={PostModel}