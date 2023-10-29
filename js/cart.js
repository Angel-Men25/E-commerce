cart = JSON.parse(localStorage.getItem('productos-en-carrito'));

const productsCartContainer = document.querySelector('.productos');

function cargarCarrito() {
  if (cart) {
    console.log(cart);
    // showCartProductsHTML(idButton, products);
    showCartProductsHTML();
  } else {
    console.log('no hay productos');
  }
}

function showCartProductsHTML() {

  cleanHTMLCart();

  cart.forEach(product => {
    const divProduct = document.createElement('div');
    divProduct.classList.add('producto');
    divProduct.innerHTML = `
      <div class="producto__info">
        <p class="producto__nombre"> ${product.title} </p>
        <p class="producto__precio">
            Precio:
            <span> ${product.price} </span>
        </p>
        <p class="producto__cantidad">
          Cantidad:
          <span> ${product[1]} </span>
        </p> 
        <a href="#" class="eliminar-carrito" data-id="${product.id}"> X </a>
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