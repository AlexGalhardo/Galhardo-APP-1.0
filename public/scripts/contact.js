const message = document.getElementById('message');
const length = message.getAttribute("maxlength");
const count = document.getElementById('count');
count.innerHTML = length + ' words left';
message.onkeyup = function () {
  document.getElementById('count').innerHTML = (length - this.value.length) + ' words left';
};

function cb(token){
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'g-recaptcha-response');
    input.setAttribute('value', token);
    input.setAttribute('type', 'hidden');
    document.getElementsByTagName('form')[0].appendChild(input);
}
