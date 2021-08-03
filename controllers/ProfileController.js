const bodyParser = require('body-parser');

const ProfileController = {
	getViewProfile: (req, res) => {
		res.render('pages/profile/profile');
	},
	getLogout: (req, res) => {
		res.render('pages/auth/login', {
			flash: {
				type: 'success',
				message: 'Come back always!'
			},
		});
	}
}

module.exports = ProfileController;