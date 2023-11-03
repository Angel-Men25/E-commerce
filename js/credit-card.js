const tarjeta = document.querySelector('#tarjeta');
const btnAbrirFormulario = document.querySelector('#btn-abrir-formulario');
const form = document.querySelector('#form-tarjeta');

// rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
  tarjeta.classList.toggle('active');
})

// boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
  btnAbrirFormulario.classList.toggle('active');
  form.classList.toggle('active');
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