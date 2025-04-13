const asyncHandeler=require("express-async-handler");
const mongoose = require("mongoose");

const base_url=require("../model/base_url")

const ClothesModel = require("../model/clothe.model")

const db = `mongodb://localhost:27017/ClotheDB`;

try {
    mongoose.connect(db);
    console.log("connected successfully")
    
} catch (error) {
    console.log(error)
    
}

//  mongoose.connect(db)
//         .then(()=>{
//             console.log("connected to MONGODB");
//         })
//         .catch((error)=>{
//             console.log(error);
//         });

var getAllClothes = asyncHandeler(async(req,res)=>{
    var clothesinfo  =await ClothesModel.find().exec()
    if(!clothesinfo){
        res.status(403).json({"error":"clothes are empty"})
    }
    else{
        res.status(200).json(clothesinfo)
    }
})

var addClothe=asyncHandeler(async(req,res)=>{
    try {
        var clothesinfo=await ClothesModel.create({
            "clothe_id":"med-"+Math.floor(Math.random()*99999),
            "clothe_name":req.body.cname,
            "clothe_composition":req.body.ccomp,
            "clothe_quantity":req.body.cqty,
            "clothe_price":req.body.cprice,
            "clothe_image":base_url+"/uploads/"+req.file.filename,
    
        })
        if(!clothesinfo){
            res.status(403).json({"message":"clothe_add_error"});
           }else{
            res.status(200).json({"message":"clothe_add_success"});
           }
        
    } catch (error) {
        res.status(403).json(error)
        
    }
    
})



var deleteClothe=asyncHandeler(async(req,res)=>{
    var clothesinfo = await ClothesModel.deleteOne({'clothe_id':req.params.cid});

    if(clothesinfo.deletedCount==0){
        res.status(403).json({"message":"delete_clothe_error"});
    }
    else{
        res.status(200).json({"message":"deleted_clothe_success"});
    }
})

var updatedClothe=asyncHandeler(async(req,res)=>{
    try {
        var clothesinfo = await ClothesModel.updateOne({'clothe_id':req.params.cid},{$set:{
            "clothe_name":req.body.mname,
            "clothe_comp":req.body.mcomp,
            "clothe_quantity":req.body.mqty,
            "clothe_price":req.body.mprice,
        }});
        if(clothesinfo.modifiedCount==0){
            res.status(403).json({"message":"could not change the clothe"});
        }
        else{
            res.status(200).json({"message":"clothe_update_success"});
        }
        
    } catch (error) {
        res.status(403).json(error)
        
    }
    
})

module.exports={
    getAllClothes,addClothe,deleteClothe,updatedClothe,
}