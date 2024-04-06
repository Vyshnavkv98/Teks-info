import AdminUseCase from "../../core/usecase/adminUseCase.js";

const adminUseCase = new AdminUseCase()
class AdminController {
    constructor() {

    }
    async signInAdmin(req, res) {
        try {
            const { email, password } = req.body
            const isAdmin = await adminUseCase.signIn(email, password)
            if (isAdmin) {
                res.status(200).json({ message: 'admin login successful' })
            } else {
                return res.status(401).json({ message: 'unAuthorized access' })
            }

        } catch (error) {
            console.log(error);
        }
    }

    async viewRecords(req, res) {
        try {
            let getAllRecord=await adminUseCase.getAllRecord()
            if(getAllRecord){
                res.status(200).json(getAllRecord)
            }
        } catch (error) {
            console.log(error);
        }
    }

}


export default AdminController