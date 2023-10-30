const mongoose = require("mongoose")
const blacklistSehema = mongoose.Schema({btoken:String})
const BlackListModel = mongoose.model("blacklist",blacklistSehema)

module.exports={BlackListModel}