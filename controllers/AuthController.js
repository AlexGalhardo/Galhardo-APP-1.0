const bodyParser = require('body-parser');
const DateTime = require('../helpers/DateTime');

const Bcrypt = require('../helpers/Bcrypt');

const AuthController = {
	getViewLogin: (req, res) => {
		res.render('pages/auth/login');
	},
	postLogin: async (req, res) => {

	},
	getViewRegister: (req, res) => {
		res.render('pages/auth/register');
	},
	postRegister: async (req, res) => {

	},
	getViewForgetPassword: (req, res) => {
		res.render('pages/auth/forgetPassword');
	},
	postForgetPassword: async (req, res) => {
		const email = req.body.email;

		res.render('pages/auth/forgetPassword', {
			flash: {
				type: "success",
				message: "If this email exists, we send a link to this email to recover password!"
			}
		});
	},
	getViewResetPassword: (req, res) => {
		const email = req.params.email;
		const token = req.params.token;

		if(!email || !token){
			res.render('pages/auth/forgetPassword', {
				flash: {
					type: "warning",
					message: "Inválid URL!"
				}
			});
		}
		res.render('pages/auth/resetPassword');
	},
	postResetPassword: async (req, res) => {
		const newPassword = req.body.new_password;
		const confirmNewPassword = req.body.confirm_new_password;

		res.render('pages/auth/login', {
			flash: {
				type: "success",
				message: "You updated your password!"
			}
		});
	}
}

module.exports = AuthController;