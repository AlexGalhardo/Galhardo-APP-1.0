const DateTime = {
	getDateTime: function(timestamp){
		let date = new Date(timestamp*1000).toLocaleDateString("pt-BR")
		let time = new Date(timestamp*1000).toLocaleTimeString("pt-BR")
		return `${date} ${time}`;
	},

	getNow: () => {
		let date = new Date().toLocaleDateString("pt-BR")
		let time = new Date().toLocaleTimeString("pt-BR")
		return `${date} ${time}`;
	}	
}

module.exports = DateTime;