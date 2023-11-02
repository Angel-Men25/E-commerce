cart = JSON.parse(localStorage.getItem('productos-en-carrito'));

const productsCartContainer = document.querySelector('.productos');

function cargarCarrito() {
  if (cart) {
    console.log(cart);
    showCartProductsHTML();
  } else {
    console.log('no hay productos');
  }
}

function showCartProductsHTML() {

  cleanHTMLCart();

  cart.forEach(product => {
    // const { title, id, image, price } = product;
    const divProduct = document.createElement('div');
    divProduct.classList.add('producto');
    divProduct.innerHTML = `
      <div class="producto__info">
        <p class="producto__nombre"> ${product[0].title} </p>
        <p class="producto__precio">
            Precio:
            <span> ${product[0].price} </span>
        </p>
        <p class="producto__cantidad">
          Cantidad:
          <span> ${product[1]} </span>
        </p> 
        <a href="#" class="eliminar-carrito" data-id="${product[0].id}"> X </a>
      </div>
    `
    productsCartContainer.appendChild(divProduct);
  });
}

function cleanHTMLCart() {
  while (productsCartContainer.firstChild) {
    productsCartContainer.removeChild(productsCartContainer.firstChild);
  }
}

cargarCarrito();