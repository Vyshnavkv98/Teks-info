import AdminRepository from '../../infra/repository/adminRepository.js'
const adminRepository=new AdminRepository()

class AdminUseCase{
    constructor(){

    }

    async signIn(email,password){
        let adminData=await adminRepository.getAdminData(email)
         console.log(adminData);
        return adminData?.password==password
       
    }

    async getAllRecord(){
        return await adminRepository.getAllUserData()
    }
}

export default AdminUseCase