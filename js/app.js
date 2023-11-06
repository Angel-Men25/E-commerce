// dummyjson
// https://dummyjson.com/products

const cardsContainer = document.querySelector('.cards');
const buttonContainer = document.querySelector('.buttons');
const mainTitle = document.querySelector('.main__title');
const bagIcon = document.querySelector('.bag__button');
const notificationNumber = document.querySelector('.notification span');

const openCategoriesBtn = document.querySelector('#open-categories');
const menuCategories = document.querySelector('.buttons__container');

openCategoriesBtn.addEventListener('click', () => {
  menuCategories.classList.toggle('show');
  document.body.classList.toggle('no-scroll');
})


document.addEventListener('DOMContentLoaded', fetchCategories);
document.addEventListener('DOMContentLoaded', fetchAllProducts);
document.addEventListener('DOMContentLoaded', detectViewport);

// detect viweport to style "bagIcon" button
function detectViewport() {
  if (screen.width > 1536) {
    bagIcon.style.position = 'absolute';
  }
}

// array for the categorie's name
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
  // iterate in "data"
  for (let i = 0; i < data.length; i++) {
    // if includes a "middle dash"
    if (data[i].includes('-')) {
      // split by the "middle dash" and join with a blank space
      let str = data[i].split('-').join(' ');
      categories.push(str);
      continue;
    }
    // add in "categories" the next categorie text
    categories.push(data[i]);
  }

  // add text to buttons
  categories.forEach(categorie => {
    const categorieBtn = document.createElement('button');
    categorieBtn.classList.add('buttons__categories');
    categorieBtn.innerText = categorie[0].toUpperCase() + categorie.slice(1);
    categorieBtn.onclick = (e) => {
      // add again the "middle dash" and to lower case
      let categorieName = e.target.innerText;
      let text = e.target.innerText;
      text = text[0].toLowerCase() + text.slice(1);
      text = text.replace(' ', '-');
      filterByCategorie(text, categorieName);
      // add "buttons__categories--active"
      addBtnActiveClass(e, categorieName);
    }

    buttonContainer.appendChild(categorieBtn);
  });
}

function addBtnActiveClass(e, categorieName) {
  const btnsCategoriesDOM = document.querySelectorAll('.buttons__categories');
  btnsCategoriesDOM.forEach(button => button.classList.remove('buttons__categories--active'));
  e.currentTarget.classList.add('buttons__categories--active');
  mainTitle.innerHTML = categorieName;
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
    menuCategories.classList.remove('show');
    document.body.classList.remove('no-scroll');
  } catch (error) {
    console.log(error);
  }
}

function showProductsCards(products) {

  cleanHTML();

  products.forEach(product => {
    const { title, id, thumbnail, price, discountPercentage } = product;

    let total = ((100 - discountPercentage) / 100) * price;
    total = total.toFixed(2);
    
    const card = document.createElement('div');
    card.classList.add('card');

    // card__img
    const cardImg = document.createElement('img');
    cardImg.classList.add('card__img');
    cardImg.src = thumbnail;
    cardImg.alt = title;

    // card__texts DIV
    const cardTextsDiv = document.createElement('div');
    cardTextsDiv.classList.add('card__texts');

    // card__title
    const cardTitle = document.createElement('p');
    cardTitle.classList.add('card__title');
    cardTitle.innerText = title;

    // card__prev-price
    const prevPrice = document.createElement('p');
    prevPrice.classList.add('card__prev-price');
    prevPrice.innerHTML = `$ <span>${price}</span>`;

    // card__prices
    const cardPricesDiv = document.createElement('div');
    cardPricesDiv.classList.add('card__prices');

    // price__act
    const priceActual = document.createElement('p');
    priceActual.classList.add('price__act');
    priceActual.innerHTML = `$ <span>${total}</span>`;

    // price__discount
    const priceDiscount = document.createElement('p');
    priceDiscount.classList.add('price__discount');
    priceDiscount.innerHTML = `<span>${discountPercentage}</span>% off`;

    // card__btn
    const cardBtn = document.createElement('button');
    cardBtn.classList.add('card__btn');
    cardBtn.dataset.id = id;
    cardBtn.innerText = 'Add to cart';
    cardBtn.onclick = (e) => {
      const idButton = parseInt(e.target.dataset.id);
      const addToCartBtn = e.target;
      addToCart(idButton, products);
      animateBagIcon(bagIcon);
      animateBagIcon(addToCartBtn);
    }

    cardTextsDiv.appendChild(cardTitle);
    cardTextsDiv.appendChild(prevPrice);
    cardTextsDiv.appendChild(cardPricesDiv);
    cardTextsDiv.appendChild(cardBtn);
    
    cardPricesDiv.appendChild(priceActual);
    cardPricesDiv.appendChild(priceDiscount);

    card.appendChild(cardImg);
    card.appendChild(cardTextsDiv);

    cardsContainer.appendChild(card);
  });
}

function animateBagIcon(item) {
  item.style.scale = '1.1';
  setInterval(() => {
    item.style.scale = '1';
  }, 100);
}

// CART

let cart = [];
let cartLS = JSON.parse(localStorage.getItem('productos-en-carrito'));
if (cartLS) {
  cart = cartLS;
  updateNotificationNumber();
} else {
  cart = [];
}

function addToCart(idButton, products) {
  const addedProduct = products.find(product => product.id === idButton);

  if (cart.some(product => product[0].id === idButton)) {
    // if already exists on the "cart array", only increase the product amount
    const productToAmount = cart.find(product => product[0].id === idButton);
    productToAmount[1] ++;
  } else {
    // if it doesnt exist, then add
    cart = [...cart, [addedProduct, 1]];
  }

  updateNotificationNumber();

  saveLocalStorage();
}

function saveLocalStorage() {
  localStorage.setItem('productos-en-carrito', JSON.stringify(cart));
}

function updateNotificationNumber() {
  let number = cart.reduce((acc, product) => acc + product[1], 0);
  notificationNumber.innerHTML = `${number}`;
}

function cleanHTML() {
  while (cardsContainer.firstChild) {
    cardsContainer.removeChild(cardsContainer.firstChild);
  }
}