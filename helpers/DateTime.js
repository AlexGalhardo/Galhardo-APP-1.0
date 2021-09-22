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

    static convertSubscriptionPeriondEnd(inputDate){
        let substring = inputDate.substring(0, 10)

        let myDate = substring.split("-");

        let newDate = new Date(myDate[0], myDate[1] - 1, myDate[2]);

        let futureDate = newDate.getTime()

        let futureTimestamp = futureDate.setDate(futureDate.getDate() + 30);

        let date = new Date(futureTimestamp*1000).toLocaleDateString(process.env.LOCALE_DATE_TIME)
        let time = new Date(futureTimestamp*1000).toLocaleTimeString(process.env.LOCALE_DATE_TIME)

        return `${date} ${time}`;
    }
}

export default DateTime;
