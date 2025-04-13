const cartModel = require("../model/cart.model");
const asyncHandeler = require("express-async-handler")
const clothesModel = require("../model/clothe.model")

const addCart=asyncHandeler(async(req,res)=>{
    try {
        const cartInfo = await cartModel.create({
            "cart_id":"cart-"+Date.now()+"-"+Math.floor(Math.random()*9999),
            "user_id":req.params.uid,
            "clothe_ids":req.params.cids,
            "clothe_qty":req.body.cqty,//string array
            "total_price":req.body.cprice//string array
    
        })
        if(!cartInfo){
            res.status(403).json({"message":"failed to add itemson the cart "})
        }
        else{
            res.status(200).json({"message":"item has been added succesfull to cart","items":cartInfo})
        }
        
    } catch (error) {
        res.status(403).json(error)
        
    }
   
});



const getClothes = asyncHandeler(async(cid,qty)=>{
    // console.log(mids)
    try {
        const clotheObj = await clothesModel.findOne({"clothe_id":cid})
        return {
            "clothe_name":clotheObj.clothe_name,
            "clothe_composition":clotheObj.clothe_composition,
            "clothe_price":clotheObj.clothe_price,
            "total_price":clotheObj.clothe_price * qty 
        }
        
    } catch (error) {
        if(error){
            throw error
        }
        
    }
   
    
    
})

const viewCart=asyncHandeler(async(req,res)=>{
    const viewInfo = await cartModel.findOne({"user_id":req.params.uid})
    if(!viewInfo){
        res.status(404).json({"message":"cart is empty"})
    }
    else{
        // res.status(200).json({"message":"view all data","items":viewInfo})
        let clotheIds = viewInfo.clothe_ids.split(",");
        let clothe_qty = viewInfo.clothe_qty.split(",");
        // res.status(200).json({"items":clotheIds})
        var clotheList=[]
        var i = 0;
        var total_payable_amount=0;
        for(let cid of clotheIds){
        var clotheobj = await getClothes(cid,clothe_qty[i])
        i++,
        total_payable_amount+=clotheobj.total_price;
        clotheList.push(clotheobj)
        }
        clotheList.push({"net_amount":total_payable_amount});
        res.status(200).json(clotheList);
    }
})
module.exports={
    addCart,viewCart
}