cart = JSON.parse(localStorage.getItem('productos-en-carrito'));

const productsCartContainer = document.querySelector('.cart__container');

const amountSpan = document.getElementById('amount');
const totalWithoutDiscSpan = document.getElementById('totalWithoutDisc');
const discountSpan = document.getElementById('discount');
const subtotalSpan = document.getElementById('subtotal');

const emptyBtn = document.getElementById('emptyBtn');
const payBtn = document.getElementById('payBtn');

emptyBtn.addEventListener('click', emptyCart);

function loadCart() {
  if (cart) {
    // console.log(cart);
    showCartProductsHTML();
  } else {
    console.log('no hay productos');
  }
}

function showCartProductsHTML() {

  cleanHTMLCart();

  let totalWithoutDiscount = 0;
  let discount = 0;
  let subtotal = 0;

  cart.forEach(product => {
    let total = ((100 - product[0].discountPercentage) / 100) * product[0].price;
    total = parseFloat(total.toFixed(2));

    let subtotalProduct = total * product[1];
    subtotalProduct = parseFloat(subtotalProduct.toFixed(2));

    calculatedDiscount = ((product[0].price * product[0].discountPercentage)/100);

    // const { title, id, image, price } = product;
    const divProduct = document.createElement('div');
    divProduct.classList.add('cart__card');
    // divProduct.innerHTML = `
    //   <div class="producto__info">
    //     <p class="producto__nombre"> ${product[0].title} </p>
    //     <p class="producto__precio">
    //         Price:
    //         <span> $${product[0].price} </span>
    //     </p>
    //     <p class="producto__cantidad">
    //       Amount:
    //       <span> ${product[1]} </span>
    //     </p> 
    //     <a href="#" class="eliminar-carrito" data-id="${product[0].id}"> X </a>
    //   </div>
    // `
    divProduct.innerHTML = `
    <div class="cart__picture">
      <img class="cart__img" src="${product[0].thumbnail}" alt="${product[0].title}">
    </div>
    <div class="cart__texts">
      <p class="cart__title">${product[0].title}</p>
      <p class="cart__description">${product[0].description}</p>
      <p class="cart__unitariPrice">$${total}</p>
      <p class="cart__amount">Amount: <span>${product[1]}</span></p>
      <p class="cart__totalPrice">Total: $${subtotalProduct}</p>
      <button class="delete__btn" id="${product[0].id}">
        <span>Delete</span>
      </button>
    </div>
    `
    productsCartContainer.appendChild(divProduct);  

    // iterating to add each time the subtotal
    totalWithoutDiscount += product[0].price;
    discount += calculatedDiscount;
    subtotal += total;
  });

  totalWithoutDiscount = parseFloat(totalWithoutDiscount.toFixed(2));
  discount = parseFloat(discount.toFixed(2));
  subtotal = parseFloat(subtotal.toFixed(2));
  updatePurchaseInfo(totalWithoutDiscount, discount, subtotal);
}

function updatePurchaseInfo(totalWithoutDiscount, discount, subtotal) {
  // total items
  let totalItems = cart.reduce((acc, product) => acc + product[1], 0);
  amountSpan.innerHTML = `${totalItems}`;

  // total without discount
  totalWithoutDiscSpan.innerText = `$${totalWithoutDiscount}`;
  
  // total discount
  discountSpan.innerHTML = `-$${discount}`;
  
  // subtotal
  subtotalSpan.innerText = `$${subtotal}`;
}

function emptyCart() {
  cart.length = 0;
  saveLocalStorage();
  loadCart();
}

function saveLocalStorage() {
  localStorage.setItem('productos-en-carrito', JSON.stringify(cart));
}

function cleanHTMLCart() {
  while (productsCartContainer.firstChild) {
    productsCartContainer.removeChild(productsCartContainer.firstChild);
  }
}

loadCart();