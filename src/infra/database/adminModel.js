import mongoose from "mongoose";

const adminSchema=new mongoose.Schema({
 
    email:{
        type:String
    },
    password:{
        type:String
    }
})

const AdminModel =mongoose.model('admin',adminSchema)

export default AdminModel