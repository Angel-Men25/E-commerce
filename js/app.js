
// https://api.escuelajs.co/api/v1/products

const cardsContainer = document.querySelector('.cards');
// const productsCartContainer = document.querySelector('.productos');

document.addEventListener('DOMContentLoaded', fetchData)

async function fetchData() {
  try {
    const url = 'https://api.escuelajs.co/api/v1/products';
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    // showProductsCards(data);
  } catch (error) {
    console.log(error);
  }
}

function showProductsCards(products) {
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('card');
    // card.innerHTML = `
    //   <p class="card__title">${product.title}</p>
    //   <button class="card__btn" data-id="${product.id}">Buy</button>
    // `;

    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card__title');
    cardTitle.innerText = product.title;

    const cardBtn = document.createElement('button');
    cardBtn.classList.add('card__btn');
    cardBtn.dataset.id = product.id;
    cardBtn.innerText = 'Buy';
    cardBtn.onclick = (e) => {
      const idButton = parseInt(e.target.dataset.id);
      // console.log(idButton);
      addToCart(idButton, products);
    }

    card.appendChild(cardTitle);
    card.appendChild(cardBtn);

    cardsContainer.appendChild(card);
  });
}


// CART
let cart = [];
let cartLS = JSON.parse(localStorage.getItem('productos-en-carrito'));
if (cartLS) {
    cart = cartLS;
} else {
    cart = [];
}

function addToCart(idButton, products) {
  const addedProduct = products.find(product => product.id === idButton);

  if (cart.some(product => product[0].id === idButton)) {
    // Si ya existe en el cart mandar un "toast" que notifique que ya esta en el carrito
    console.log('The product is already in the cart');
    // toastNotification('The product is already in the cart');
    // console.log(cart);
    // productoAAumentar.cantidad ++;
    const productoAAumentar = cart.find(product => product[0].id === idButton);
    productoAAumentar[1] ++;
  } else {
    // Si no existe en el cart, agregarlo
    // cart = [...cart, addedProduct];
    cart = [...cart, [addedProduct, 1]];
    console.log('Product added correctly');
    console.log(cart);
    // console.log(cart[0]);
  }

  guardarLocalStorage();
  
  // showCartProductsHTML(idButton, products);
}

// function showCartProductsHTML(idButton, products) {

//   cleanHTMLCart();

//   cart.forEach(product => {
//     const divProduct = document.createElement('div');
//     divProduct.classList.add('producto');
//     divProduct.innerHTML = `
//       <div class="producto__info">
//         <p class="producto__nombre"> ${product.title} </p>
//         <p class="producto__precio">
//             Precio:
//             <span> ${product.price} </span>
//         </p>

//         <a href="#" class="eliminar-carrito" data-id="${product.id}"> X </a>
//       </div>
//     `
//     productsCartContainer.appendChild(divProduct);
//   });
// }

// /* 
// <p class="producto__cantidad">
//     Cantidad:
//     <input type="number" name="amount" id="amount" min="1" value="1">
// </p> 
// */

// function cleanHTMLCart() {
//   while (productsCartContainer.firstChild) {
//     productsCartContainer.removeChild(productsCartContainer.firstChild);
//   }
// }

function guardarLocalStorage() {
  localStorage.setItem('productos-en-carrito', JSON.stringify(cart));
}