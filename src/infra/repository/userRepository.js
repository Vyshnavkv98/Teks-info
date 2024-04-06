import UserModel from "../database/userModel.js";

class UserRepositoryImpl{
  constructor() {
    this.UserModel = UserModel;
  }

  async createUser(user) {
    console.log(user,'user');
    const newUser = new this.UserModel(user);
    let userData=await newUser.save();
    if(newUser)return userData
    else{
      throw Error('User registration not completed')
    }
  }

  async getUserByEmail(email) {
    return this.UserModel.findOne({ email }).exec();
  }
  async isExist(email){
    return await this.UserModel.findOne({email:email})
  }

  async emailVerification(email){
   let isVerified= await this.UserModel.findOneAndUpdate({email:email},{
      isEmailVerified:true
   },{new:true})
   return isVerified
  }
}

export default  UserRepositoryImpl;