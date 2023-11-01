// PLATZI API
// https://api.escuelajs.co/api/v1/products
// FAKE STORE API
// https://fakestoreapi.com/products
// dummyjson
// https://dummyjson.com/products

const cardsContainer = document.querySelector('.cards');
// const productsCartContainer = document.querySelector('.productos');
const buttonContainer = document.querySelector('.buttons');

document.addEventListener('DOMContentLoaded', fetchCategories);
document.addEventListener('DOMContentLoaded', fetchAllProducts);

// ========================================

let categories = [];

// fetch categories in API
async function fetchCategories() {
  try {
    const url = 'https://dummyjson.com/products/categories';
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    renderCategorieBtn(data);
  } catch (error) {
    console.log(error);
  }
}

// show buttons of categories on HTML
function renderCategorieBtn(data) {
  // Iterar en "data" = categoria
  for (let i = 0; i < data.length; i++) {
    // si contiene un guion medio
    if (data[i].includes('-')) {
      // separar por el guien medio y juntar con un espacio
      let str = data[i].split('-').join(' ');
      categories.push(str);
      continue;
    }
    // imprimir la categoria siguiente
    categories.push(data[i]);
  }

  // add text to buttons
  categories.forEach(categorie => {
    console.log(categorie[0].toUpperCase() + categorie.slice(1));
    const categorieBtn = document.createElement('button');
    categorieBtn.classList.add('buttons__categories');
    categorieBtn.innerText = categorie[0].toUpperCase() + categorie.slice(1);
    categorieBtn.onclick = (e) => {
      let text = e.target.innerText;
      text = text[0].toLowerCase() + text.slice(1);
      text = text.replace(' ', '-');
      filterByCategorie(text);
    }

    buttonContainer.appendChild(categorieBtn);
  });

  // fetchAllProducts();
}

async function fetchAllProducts() {
  try {
    const url = 'https://dummyjson.com/products?limit=100';
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.products);
    showProductsCards(data.products);
  } catch (error) {
    console.log(error);
  }
}

async function filterByCategorie(text) {
  try {
    const url = `https://dummyjson.com/products/category/${text}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.products);
    showProductsCards(data.products);
  } catch (error) {
    console.log(error);
  }
}

// ========================================

// async function fetchData() {
//   try {
//     const url = 'https://dummyjson.com/products?limit=100';
//     const response = await fetch(url);
//     const data = await response.json();
//     // PLATZI and FAKE STORE API
//     // console.log(data);
//     // dummyjson
//     console.log(data.products);
//     showProductsCards(data.products);
//   } catch (error) {
//     console.log(error);
//   }
// }

function showProductsCards(products) {

  cleanHTML();

  products.forEach(product => {
    const { title, id, thumbnail, price } = product;
    
    const card = document.createElement('div');
    card.classList.add('card');
    // card.innerHTML = `
    //   <p class="card__title">${product.title}</p>
    //   <button class="card__btn" data-id="${product.id}">Buy</button>
    // `;

    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card__title');
    cardTitle.innerText = title;

    const cardImg = document.createElement('img');
    cardImg.classList.add('card__img');
    cardImg.src = thumbnail;
    cardImg.alt = title;

    const cardBtn = document.createElement('button');
    cardBtn.classList.add('card__btn');
    cardBtn.dataset.id = id;
    cardBtn.innerText = 'Buy';
    cardBtn.onclick = (e) => {
      const idButton = parseInt(e.target.dataset.id);
      // console.log(idButton);
      addToCart(idButton, products);
      // showToastNotification();
    }

    card.appendChild(cardTitle);
    card.appendChild(cardImg);
    card.appendChild(cardBtn);

    cardsContainer.appendChild(card);
  });
}

// function showToastNotification() {
//   const toast = document.querySelector('.toast');
//   const closeIcon = document.querySelector('.toast__icon--close');
//   const progress = document.querySelector('.progress');

//   toast.classList.add('active');
//   progress.classList.add('active');
//   setTimeout(() => {
//     toast.classList.remove('active');
//   }, 5000);
//   setTimeout(() => {
//     progress.classList.remove('active');
//   }, 5300);

//   closeIcon.addEventListener('click', () => {
//     toast.classList.remove('active');

//     setTimeout(() => {
//       toast.classList.remove('active');
//     }, 300);
//   })
// }


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

function cleanHTML() {
  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }
}