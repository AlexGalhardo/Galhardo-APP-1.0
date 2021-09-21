/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 * 
 * 
 *  http://localhost:3000/api/admin
 */

const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

// HELPERS
const Bcrypt = require('../../helpers/Bcrypt')
const DateTime = require('../../helpers/DateTime')


// MODELS
const Users = require(`../../models/${process.env.APP_DATABASE}/Users`)



class APIAdminController {

    static async postAdminLogin(req, res, next) {

        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return res.status(422).json({ errors: errors.array() });
            }

            const { email, password } = req.body;

            if(!Users.emailRegistred(email)){
                return res.status(422).json({
                    error: "Email inválid!",
                });
            }

            const admin = await Users.getUserByEmail(email)
            console.log(admin)

            const passwordIsValid = await Bcrypt.comparePassword(password, admin.password);

            if(!passwordIsValid){
                return res.status(422).json({
                    error: "Incorrect password",
                });
            }

            if(!admin.admin){
                return res.status(422).json({
                    error: "This user is NOT ADMIN!",
                });
            }

            const JWT_TOKEN = jwt.sign(
                                    {admin_id:admin.id},
                                    process.env.JWT_SECRET,
                                    { expiresIn: '1h' }
                                );

            return res.json({
                ADMIN_JWT_TOKEN: JWT_TOKEN
            });

        }
        catch(err){
            next(err);
        }
    }


    /**
     * POST /api/admin/test
     */
    static postAdminTestJWT(req, res, next) {
        try {

            const JWT_TOKEN = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(JWT_TOKEN, process.env.JWT_SECRET);
            const admin = Users.getByID(decoded.admin_id)
            
            return res.json({
                admin: {
                    name: admin.name,
                    email: admin.email,
                    JWT_created_at: DateTime.getDateTime(decoded.iat),
                    JWT_expires_at: DateTime.getDateTime(decoded.exp)
                }
            });
        }
        catch(err){
            next(err);
        }
    }

    static verifyAdminAPIRequestUsingJWT(req){
        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(422).json({
                message: "Please provide the ADMIN JWT Token in Header Authorization Bearer Token",
            });
        }

        const JWT_TOKEN = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(JWT_TOKEN, process.env.JWT_SECRET);

        if(!Users.verifyIfAdminByID(decoded.admin_id)){
            return res.status(422).json({
                message: "This JWT Token is Inválid!",
            });
        }

        const admin = Users.getUserByID(decoded.admin_id)
        return admin
    }
}

module.exports = APIAdminController;
