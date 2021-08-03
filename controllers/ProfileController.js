const bodyParser = require('body-parser');

const ProfileController = {
	getViewProfile: (req, res) => {
		res.render('pages/profile/profile');
	},
	getLogout: (req, res) => {
		res.redirect('/login');
	}
}

module.exports = ProfileController;