const DateTime = {
	getDateTime: function(timestamp){
		let date = new Date(timestamp*1000).toLocaleDateString("pt-BR")
		let time = new Date(timestamp*1000).toLocaleTimeString("pt-BR")
		return `${date} ${time}`;
	}	
}

module.exports = DateTime;