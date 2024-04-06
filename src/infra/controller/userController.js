import UserUseCase from "../../core/usecase/userUsecase.js";
import bcrypt from 'bcrypt'
import { hashBcrypt } from "../utils/hashpassword.js";
import { sendEmail } from '../utils/sendMail.js'

const HashBcrypt = new hashBcrypt()
const SendEmail = new sendEmail()

let userUseCase = new UserUseCase();


class UserController {
  constructor() {

  }

  async signUp(req, res) {
    try {
      const { name, email, mobileNumber, password} = req.body;
  
     let validation= await userUseCase.validate({name, email, mobileNumber, password})
     if(!validation)return res.status(400).json({message:'Please check your mobile number'})

      const isExist = await userUseCase.isExist(email)
      const profileImagePath = req.file.path
      console.log(profileImagePath,'profile image');
      if (!isExist) {
        let hashedPassword = await HashBcrypt.hashPassword({ password: password })
        let userData = await userUseCase.signUpUser({ name, email, mobileNumber, password: hashedPassword,profileImage:profileImagePath });
        console.log(userData, userData);
        if (userData) {
          const verificationToken = await userUseCase.createUser(email);
          const verificationLink = `http://localhost:5000/verify?token=${verificationToken}`;
          await SendEmail.sendMail(verificationLink, email)
        }
      } else {
        let userData = await userUseCase.getUserByEmail(email)
        console.log(userData);
        if (userData?.isEmailVerified) {

          return res.status(409).json({ message: 'User already exist' });
        } else {
          const verificationToken = await userUseCase.createUser(email);
          const verificationLink = `http://localhost:5000/verify?token=${verificationToken}`;
          await SendEmail.sendMail(verificationLink,email)
          return res.status(200).json({ message: 'Complete email verification' });
        }
      }
      return res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
      console.error('Error signing up user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  async verification(req, res) {
    const { token } = req.query;
    const isVerified = await userUseCase.verifyUser(token);
    console.log(isVerified);

    if (isVerified) {
      res.status(200).send('Email verified successfully');
    } else {
      res.status(400).send('Invalid verification token');
    }

  }

  async signIn(req, res) {
    try {
      console.log('sifgnin');
      const { email, password } = req.body;

      let userData = await userUseCase.getUserByEmail(email)
      if (!userData) {
        return res.status(200).json({ message: 'Please sign up first' });
      }
      if (userData?.isEmailVerified) {
        const result = await userUseCase.signInUser(email, password);
        if (result) {
          let accesstoken = await userUseCase.createaccesstoken(email)
          return res.status(200).json({ message: 'User signed in successfully', data: result, token: accesstoken });

        } else {
          return res.status(401).json({ message: 'password does not match' });
        }
      } else {
        return res.status(200).json({ message: 'Complete email verification' });
      }


    } catch (error) {
      console.error('Error signing in user:', error);
      res.status(500).json({ error: 'Internal server error'});
    }
  }


}

export default UserController;
