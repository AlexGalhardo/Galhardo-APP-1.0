function cb(token){
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'g-recaptcha-response');
    input.setAttribute('value', token);
    input.setAttribute('type', 'hidden');
    document.getElementsByTagName('form')[0].appendChild(input);
}
