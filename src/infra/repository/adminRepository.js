import AdminModel from '../database/adminModel.js'
import UserModel from '../database/userModel.js'
class AdminRepository{
    constructor(){

    }

    async getAdminData(email){
        return await AdminModel.findOne({email:email})
    }

    async getAllUserData(){
        return await UserModel.find()
    }
}

export default AdminRepository