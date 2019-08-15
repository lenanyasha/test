export {};

const VALIDATION :any = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  name: /^[a-zA-Z ]+$/,
  phone: /^\+\(\d{3}\)\d{7}$/,
};

const URL = 'http://natours.com/subscribe';

let name = <HTMLInputElement>document.getElementById('name');
let email = <HTMLInputElement>document.getElementById('email');
let phone = <HTMLInputElement>document.getElementById('phone');
const wayToFindUs = document.getElementById('findUs');
const wayToRecieveNews = <HTMLInputElement>document.getElementById('recieveNews');
const form = document.getElementById('form');

form.addEventListener('submit', (e:any) => {
  e.preventDefault();
  switch(wayToRecieveNews.value) {
    case('mail'):
    phone.value = '';
    if(validateName() && validateEmail()) {
      sendForm();
    }
    break;
    case('sms'):
    email.value = '';
    if(validateName() && validatePhone()) {
      sendForm();
    }
    break;
  }
})

function sendForm() {
  var data = new FormData();
  data.append('name', name.value);
  data.append('email', email.value);
  data.append('phone', phone.value);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://natours.com/subscribe', true);
  xhr.onload = function () {
      console.log(this.responseText);
  };
  xhr.send(data);
}

function handleSelect() {
  switch(wayToRecieveNews.value) {
    case 'mail':
    phone.parentElement.style.display = 'none';
    email.parentElement.style.display = 'block';
    break;
    case 'sms':
    email.parentElement.style.display = 'none';
    phone.parentElement.style.display = 'block';
  }
}

function validateName() {
  console.log(name);
  console.log(document.getElementById('name'));
  if (checkIfEmpty(name)) return;
  if (!checkIfOnlyLetters(name)) return;
  return true;
}

function validateEmail() {
  console.log(email);
  if (checkIfEmpty(email)) return;
  if (!checkIfMatches(email)) return;
  return true;
}

function validatePhone() {
  if (checkIfEmpty(phone)) return;
  if (!checkIfMatches(phone)) return;
  return true;
}

function checkIfEmpty(field:any) {
  if (isEmpty(field.value)) {
    setInvalid(field, `${field.name} is requered`);
    return true;
  } else {
    setValid(field);
    return false;
  }
}

function isEmpty(value:string) {
  if (value === '') {
    return true
  } else {
    return false;
  }
}


function setInvalid(field:any, message: string) {
  field.classList.add('invalid');
  field.nextElementSibling.innerHTML = message;
}

function setValid(field:any) {
  field.classList.remove('invalid');
  field.nextElementSibling.innerHTML = '';
}

function checkIfOnlyLetters(field:any) {
  if (VALIDATION[field.id].test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} must contain only letters`);
    return false;
  }
}

function checkIfMatches(field:any) {
  if(VALIDATION[field.id].test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} is not valid`);
    return false;
  }
}
