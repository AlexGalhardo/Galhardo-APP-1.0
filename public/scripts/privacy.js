let lgpdURL = `https://jsonplaceholder.typicode.com/posts`;

let lgpdHTML = `
	<link rel="stylesheet" href="css/privacy.css">
	<div class="lgpd">
		<div class="lgpd--left">
			We use cookies to improve your experience on the site!<br>
			Our <a href="/privacy">Privacy Policy</a>
		</div>
		<div class="lgpd-right">
			<button id="lgpd_button_confirm">OK</button>
		</div>
	</div>
`;

let lsLGPD = localStorage.getItem('lgpd');
if(!lsLGPD){
	document.body.innerHTML += lgpdHTML;

	let lgpdArea = document.querySelector('.lgpd');
	let lgpdButton = document.querySelector('#lgpd_button_confirm');

	lgpdButton.addEventListener('click', async () => {
		lgpdArea.remove();
		localStorage.setItem('lgpd', '123');

		let result = await fetch(lgpdURL);
		let response = await result.json();

		if(response.error != '') {
			let user_id = '456';
			localStorage.setItem('lgpd', user_id);
		}
	});
}
