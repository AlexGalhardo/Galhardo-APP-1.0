/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 * ./helpers/DateTime.js
 */


class DateTime  {
	
	static getDateTime(timestamp){
		let date = new Date(timestamp*1000).toLocaleDateString(process.env.LOCALE_DATE_TIME)
		let time = new Date(timestamp*1000).toLocaleTimeString(process.env.LOCALE_DATE_TIME)
		return `${date} ${time}`;
	}

	static getNow() {
		let date = new Date().toLocaleDateString(process.env.LOCALE_DATE_TIME)
		let time = new Date().toLocaleTimeString(process.env.LOCALE_DATE_TIME)
		return `${date} ${time}`;
	}	
}

module.exports = DateTime;
