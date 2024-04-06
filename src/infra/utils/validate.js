export const validate=(user)=>{
    const{ name, email, mobileNumber, password}=user
    const phoneRegex = /^[6-9]\d{9}$/;
    if (phoneRegex.test(mobileNumber)) {
        return true;
      } else {
        return false;
      }
}
