const mongoose = require("mongoose");

const mongoschame = mongoose.Schema({
    "cart_id":{
        type:String,
        required:[true,"id is randomly genarated"]
    },
    "user_id":{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:[true,"it is compulsory"]
    },
    "clothe_ids":{
        type:String,
        required:[true,"it is compulsory"]
    },
    "clothe_qty":{
        type:String,
        required:[true,"this is non zero componenets"],
        
    },
    "total_price":{
        type:String,
        required:[true,"this is non zero components"],

    },
    "clothe_date":{
        type:String,
        default:new Date(),
        required:[true,"id is randomly genarated"]

    },

},{versionKey:false})
module.exports = mongoose.model("cartModel",mongoschame,"cartCollections");