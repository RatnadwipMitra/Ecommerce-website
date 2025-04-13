const express = require("express")
const cartRoute =express.Router()
const cartController = require("../controller/cart.controller")

cartRoute.post("/add/:uid/:cids",cartController.addCart)
cartRoute.get("/view/:uid",cartController.viewCart)


module.exports=cartRoute;
