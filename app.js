import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import cors from 'cors'
import env from 'dotenv';
import { connectDb } from './src/infra/database/index.js';
import userRouter from './src/infra/routes/userRouter.js'
import adminRoter from './src/infra/routes/adminRoute.js'
import { Server } from 'socket.io';


const app = express()
env.config()
connectDb()

app.use(cors())
app.use(helmet());
app.use(logger('dev'))
app.use(express.json());
app.use('/user', userRouter)
app.use('/', userRouter)
app.use('/admin', adminRoter)




let server=app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
})
const io = new Server(server, { cors: true });
io.on('connection', (socket) => {
    console.log('A user connected');
    
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
