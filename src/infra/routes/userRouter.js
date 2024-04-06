import express from 'express';
import UserController from '../controller/userController.js';
import { upload } from '../utils/multer.js';

const userController=new UserController()

const router = express.Router();

  router.post('/signup',upload.single('profileImage'), userController.signUp);
  router.post('/signin', userController.signIn);
  router.get('/verify', userController.verification);

  export default router

