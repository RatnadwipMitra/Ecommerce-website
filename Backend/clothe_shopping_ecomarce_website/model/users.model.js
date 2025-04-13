const mongoose = require("mongoose");

const mongooseSchema = mongoose.Schema({
    "user_id":{
        type:String,
        required:[true,'user_id is random & compulsory']
   },

    "user_name":{
        type:String,
        required:[true,"user_name is required"]
    },
    "user_email": {
        type: String,
        required: [true, "user_email is required"],
        validate: {
            validator: async function (email) {
                // Check if the email format is valid
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    throw new Error("Invalid email address");
                }

                // Check if email is already registered
                const user = await this.constructor.findOne({ user_email: email });
                if (user) {
                    throw new Error(`${email} is already registered with us!`);
                }
                else{
                    return true; 

                }
                
            }
        }
    },
    "user_password":{
        type:String,
        required:[true,"user_password is required"],
        
    },
    "user_ph_no":{
        type:Number,
        required:[true,"ph no is required"],
        validate:{
            validator:(value)=>/^[7-9][0-9]{9}$/.test(value)
        },
        message:(props)=>`$(props.value) is invalid`
    }

},{versionKey:false})

module.exports=mongoose.model("userModel",mongooseSchema,"users");
