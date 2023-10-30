const express = require("express");
const cors = require('cors');
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
require('dotenv').config()
const app = express();
const port = process.env.port
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use("/posts",postRouter)
app.listen(port,async()=>{
try {
    await connection
    console.log("db is connnected")
    console.log(`Server is running on port ${port}`)
} catch (error) {
    console.log(error)
}
})