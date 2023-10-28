// ABRIR/CERRAR CARRITO

const openCartBtn = document.querySelector('.open-menu');
const menu = document.querySelector('.carrito');
const closeCartBtn = document.querySelector('.close-menu');

openCartBtn.addEventListener('click', () => {
    menu.classList.add('carrito-active')
} )

closeCartBtn.addEventListener('click', () => {
    menu.classList.remove('carrito-active')
} )