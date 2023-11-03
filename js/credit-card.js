const tarjeta = document.querySelector('#tarjeta');
const btnAbrirFormulario = document.querySelector('#btn-abrir-formulario');
const form = document.querySelector('#form-tarjeta');

tarjeta.addEventListener('click', () => {
  tarjeta.classList.toggle('active');
})

btnAbrirFormulario.addEventListener('click', () => {
  btnAbrirFormulario.classList.toggle('active');
  form.classList.toggle('active');
})