import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    mobileNumber:{
        type:String
    },
    profileImage:{
        type:String
    },
    password:{
        type:String
    },
    isEmailVerified:{
        default:false,
        type:Boolean
    },
    isOtpVerified:{
        default:false,
        type:Boolean
    },
})

const UserModel =mongoose.model('user',userSchema)

export default UserModel 