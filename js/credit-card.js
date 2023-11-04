cart = JSON.parse(localStorage.getItem('productos-en-carrito'));
console.log(cart);

const tarjeta = document.querySelector('#tarjeta');
const form = document.querySelector('#form-tarjeta');
const numeroTarjeta = document.querySelector('#tarjeta .numero');
const nombreTarjeta = document.querySelector('#tarjeta .nombre');
const logoMarca = document.querySelector('#logo-marca');
const mesExpiracion = document.querySelector('#tarjeta #expiracion .mes');
const yearExpiracion = document.querySelector('#tarjeta #expiracion .year');
const ccv = document.querySelector('#tarjeta .ccv');
const mensajeError = document.querySelector('#error');
const modalDiv = document.querySelector('#modal-validation');
const continueBtn = document.querySelector('#continue-btn');

// rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
  tarjeta.classList.toggle('active');
})

// select del mes generado dinamicamente
for (let i = 1; i <= 12; i++) {
  let option = document.createElement('option');
  option.value = i;
  option.innerText = i;
  form.selectMes.appendChild(option);
}

// select del año generado dinamicamente
const actualYear = new Date().getFullYear();
const maxYear = actualYear + 8;
for (let i = actualYear; i <= maxYear; i++) {
  let option = document.createElement('option');
  option.value = i;
  option.innerText = i;
  form.selectYear.appendChild(option);
}

let inputs = {
  numeroTarjeta: '',
  nombreTarjeta: '',
  mesExpiracion: '',
  yearExpiracion: '',
  ccv: ''
}

// input numero de tarjeta
form.inputNumero.addEventListener('keyup', (e) => {
  let valorInput = e.target.value;
  form.inputNumero.value = valorInput
  // eliminar espacios en blanco
    .replace(/\s/g, '')
  // eliminar letras
    .replace(/\D/g, '')
  // espacios cada 4 numeros
    .replace(/([0-9]{4})/g, '$1 ')
  // elimina el ultimo espaciado
    .trim();

  numeroTarjeta.textContent = valorInput;
  inputs.numeroTarjeta = valorInput;

  if (valorInput == '') {
    numeroTarjeta.textContent = '#### #### #### ####';
    logoMarca.innerHTML = '';
  }

  if (valorInput[0] == 4) {
    logoMarca.innerHTML = '';
    const img = document.createElement('img');
    img.src = '../img/logos/visa.png';
    logoMarca.appendChild(img);
  } else if (valorInput[0] == 5) {
    logoMarca.innerHTML = '';
    const img = document.createElement('img');
    img.src = '../img/logos/mastercard.png';
    logoMarca.appendChild(img);
  }

  // mostrar el frente de la tarjeta
  mostrarFrenteTarjeta();
})

function mostrarFrenteTarjeta() {
  if (tarjeta.classList.contains('active')) {
    tarjeta.classList.remove('active');
  }
}

form.inputNombre.addEventListener('keyup', (e) => {
  let valorInput = e.target.value;

  form.inputNombre.value = valorInput.replace(/[0-9]/g, '');
  nombreTarjeta.textContent = valorInput;
  inputs.nombreTarjeta = valorInput;

  if (nombreTarjeta.textContent == '') {
    nombreTarjeta.textContent = 'Jhon Doe';
  }

  mostrarFrenteTarjeta();
})

form.selectMes.addEventListener('change', (e) => {
  mesExpiracion.textContent = e.target.value;
  inputs.mesExpiracion = e.target.value;
  mostrarFrenteTarjeta();
})

form.selectYear.addEventListener('change', (e) => {
  yearExpiracion.textContent = e.target.value.slice(2);
  inputs.yearExpiracion = e.target.value;
  mostrarFrenteTarjeta();
})

form.inputCCV.addEventListener('keyup', (e) => {
  if (!tarjeta.classList.contains('active')) {
    tarjeta.classList.add('active');
  }

  form.inputCCV.value = form.inputCCV.value
  // eliminar espacios en blanco
  .replace(/\s/g, '')
  // eliminar letras
  .replace(/\D/g, '');

  ccv.textContent = form.inputCCV.value;
  inputs.ccv = form.inputCCV.value;
})

form.addEventListener('submit', validateForm)

function validateForm(e) {
  e.preventDefault();
  if (Object.values(inputs).every(input => input !== '')) {
    if (inputs.numeroTarjeta.length == 19) {
      // purchase succesfuly
      modalDiv.classList.add('active');
      document.body.classList.add('no-scroll');
      return;
    }
    // card number field incorrectly
    form.inputNumero.style.border = '2px solid red';
    setInterval(() => {
      form.inputNumero.style.border = '2px solid #ced6e0';
    }, 3000);
    return;
    }
  
  // error message
  mensajeError.classList.add('active');
  setInterval(() => {
    mensajeError.classList.remove('active');
  }, 3000);
}

continueBtn.addEventListener('click', () => {
  window.location.href = '../index.html';
  modalDiv.classList.remove('active');
  document.body.classList.remove('no-scroll');
  // remove all items from "cart"
  cart.length = 0;
  saveLocalStorage();
})

function saveLocalStorage() {
  localStorage.setItem('productos-en-carrito', JSON.stringify(cart));
}