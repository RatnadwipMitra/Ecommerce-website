const express = require("express");
const userRouter = express.Router();

const userController = require("../controller/users.controller")


userRouter.post("/signup",userController.adduser)
userRouter.post("/login",userController.loginUser)



module.exports=userRouter;