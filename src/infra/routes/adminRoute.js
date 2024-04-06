import express from 'express';
import AdminController from '../controller/adminController.js';

const adminController=new AdminController()

const router = express.Router();

  router.post('/signIn',adminController.signInAdmin);
  router.post('/getuserdata',adminController.viewRecords);
  


  export default router