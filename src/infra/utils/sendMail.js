import { configDotenv } from 'dotenv';
import nodemailer from 'nodemailer'

configDotenv()


export class sendEmail {
    constructor() {
      

    }
     async sendMail(verificationLink,email) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user:String(process.env.EMAIL),
              pass:String(process.env.PASSWORD),
            },
          });
          console.log(email,'email');
        const mailOptions = {
          from:String(process.env.EMAIL),
          to: email,
            subject: 'Email Verification',
            text: `Please click the following link to verify your email: ${verificationLink}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              return error
            } else {
              console.log('Verification email sent:', info.response);
              
            }
          });
    }

}