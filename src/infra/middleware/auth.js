  
 export const userAuth=(req,res,next)=>{
     let user= req.headers.Authorization.split('')[1]
     console.log(user);
  }