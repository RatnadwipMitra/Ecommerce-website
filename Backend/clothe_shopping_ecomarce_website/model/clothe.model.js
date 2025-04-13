const mongoose = require("mongoose");

const mongoSchema = mongoose.Schema({
    "clothe_id":{
        type:String,
        required:[true,"clothe id is compulsary"]
    },
    "clothe_name":{
        type:String,
        required:[true,"clothe name is required"]
    },
    "clothe_composition":{
        type:String,
        required:[true,"composition has to be provided"]
    },
    "clothe_price":{
        type:Number,
        required:[true,"price has to be provided"],
        validate:{
            validator:(price)=>{
                return price>0;
            },
            message:(props)=>`${props.value} has to be non zero field`
        }
    },
    "clothe_quantity":{
        type:Number,
        required:[true,"clothe qty is mandatory"],
        validate:{
            validator:(qty)=>{
                return qty>0;
            },
            message:(props)=>`${props.value} has to be non zero field`
        }
    },
    "clothe_image":{
        type:String,
        required:[true,"clothe path is required"]
    },
    "clothe_entry_date":{
        type:Date,
        required:[true,'Date is Required'],
        default : new Date()
    }
},{versionKey:false})

                              //NameOfModel   //SchemaObj    //Collection      

module.exports=mongoose.model("clotheModel",mongoSchema,"clothes");
console.log("clothe model is working");