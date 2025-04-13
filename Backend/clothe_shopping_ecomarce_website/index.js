const express = require("express");
const cors = require("cors")
const port = 3003;
const host = "localhost";

const app = express();

app.use(cors())

const clothesRouter = require("./routes/clothe.route")
const userRouter = require("./routes/users.route");
const cartRoute = require("./routes/cart.route");

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public")); //SSR
app.use("/api/clothes",clothesRouter)
app.use("/api/users",userRouter)
app.use("/api/carts",cartRoute)

app.use("/",(req,res)=>{
    res.send("<h1>Welcome to mongo page</h1>")
})



app.listen(port,host,()=>{
    console.log(`server will start:https://${host}:${port}`)
})
