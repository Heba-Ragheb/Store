import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        googleId: { type: String },
        name:{
            type : String,
            required : true
        },
         email:{
            type : String,
            required : true
        },
         password:{
            type : String,
            required : true
        },
         role:{
            type : String,
            enum :["Admin","User"],
            default: "User" 
        }
    }
) 
const User = mongoose.model("User",userSchema);
export default User