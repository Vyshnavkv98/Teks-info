
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import UserRepositoryImpl from "../../infra/repository/userRepository.js";
import {validate} from '../../infra/utils/validate.js'

const userRepository=new UserRepositoryImpl()

class UserUseCase {
    constructor() {
      this.users = new Map();
      this.userRepository = userRepository;
    }
  
    async signUpUser(user) {
     return await this.userRepository.createUser(user);
    }
  
    async signInUser(email, password) {
      const user = await userRepository.getUserByEmail(email);
      let userPassword=user?.password
      console.log(password,userPassword,'userpass');
       bcrypt.compare(String(password),String(userPassword),(error, result) => {
        if (error) {
          console.error('Error comparing passwords:', error);
          return;
        }
        console.log(result);
        if (result) {
          return user
        } else {
          return new Error('Password does not match');
        }
      })

    }
    async isExist(email){
       const checkExist=await userRepository.isExist(email)
       return checkExist
    }
    async createUser(email) {
      const token = jwt.sign({ email }, 'secret_key', { expiresIn: '1d' });
      this.users.set(email, { verified: false, verificationToken: token });
      return token;
    }
    async createaccesstoken(email){
       let userData=await userRepository.getUserByEmail(email)
       return  jwt.sign({ userId:userData._id }, 'secret_key1', { expiresIn: '1d' });
    }
  
    async verifyUser(token) {
      try {
        const { email } = jwt.verify(token, 'secret_key');
        const user = this.users.get(email);
        if (user) {
         const isVerified= await userRepository.emailVerification(email)
         if(isVerified){

           user.verified = true;
           return true;
         }else{
          return false
         }
        }
        return false;
      } catch (error) {
        console.error('Error verifying token:', error);
        return false;
      }
    }
    async getUserByEmail(email){
      return userRepository.getUserByEmail(email)
   }
  
   async validate(user){
       return validate(user)
   }

  }
  
export default UserUseCase;
  