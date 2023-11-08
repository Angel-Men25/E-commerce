cart = JSON.parse(localStorage.getItem('cartProducts'));

const productsCartContainer = document.querySelector('.cart__container');

const amountSpan = document.getElementById('amount');
const totalWithoutDiscSpan = document.getElementById('totalWithoutDisc');
const discountSpan = document.getElementById('discount');
const subtotalSpan = document.getElementById('subtotal');

const emptyBtn = document.getElementById('emptyBtn');
const payBtn = document.getElementById('payBtn');

const emptyCartDiv = document.querySelector('#main__empty--div');

emptyBtn.addEventListener('click', emptyCart);

function loadCart() {
  if (cart.length >= 1) {
    showCartProductsHTML();
    // remove "disabled" classlist to payBtn
    payBtn.classList.remove('disabled');
    // no image when the cart has products
    emptyCartDiv.classList.remove('active');
  } else {
    showCartProductsHTML();
    // add "disabled" classlist to payBtn
    payBtn.classList.add('disabled');
    // image when the cart has no products
    emptyCartDiv.classList.add('active');
  }
}

function showCartProductsHTML() {

  cleanHTMLCart();

  let totalWithoutDiscount = 0;
  let discount = 0;
  let subtotal = 0;

  cart.forEach(product => {
    let total = ((100 - product[0].discountPercentage) / 100) * product[0].price;
    total = toFixedNumber(total);

    let subtotalProduct = total * product[1];
    subtotalProduct = toFixedNumber(subtotalProduct);

    calculatedDiscount = ((product[0].price * product[0].discountPercentage)/100);

    const divProduct = document.createElement('div');
    divProduct.classList.add('cart__card');

    // cart__picture DIV
    const cartPictureDiv = document.createElement('div');
    cartPictureDiv.classList.add('cart__picture');
    
    // cart__img
    const cartImg = document.createElement('img');
    cartImg.classList.add('cart__img');
    cartImg.src = product[0].thumbnail;
    cartImg.alt = product[0].title;

    cartPictureDiv.appendChild(cartImg);

    // cart__texts DIV
    const cartTextsDiv = document.createElement('div');
    cartTextsDiv.classList.add('cart__texts');

    // cart__title
    const cartTitle = document.createElement('h2');
    cartTitle.classList.add('cart__title');
    cartTitle.innerText = product[0].title;

    // cart__description
    const cartDescription = document.createElement('p');
    cartDescription.classList.add('cart__description');
    cartDescription.innerText = product[0].description;

    // cart__unitariPrice
    const cartUnitariPrice = document.createElement('p');
    cartUnitariPrice.classList.add('cart__unitariPrice');
    cartUnitariPrice.innerText = `$${total}`;

    // cart__amount
    const cartAmount = document.createElement('p');
    cartAmount.classList.add('cart__amount');
    cartAmount.innerHTML = `Amount: <span>${product[1]}</span>`;

    // cart__totalPrice
    const cartTotalPrice = document.createElement('p');
    cartTotalPrice.classList.add('cart__totalPrice');
    cartTotalPrice.innerHTML = `Total: $${subtotalProduct}`;

    // delete__btn
    const cartDeleteBtn = document.createElement('button');
    cartDeleteBtn.classList.add('delete__btn');
    cartDeleteBtn.innerText = 'Delete';
    cartDeleteBtn.dataset.id = product[0].id;
    cartDeleteBtn.onclick = (e) => {
      let idProduct = parseInt(e.target.dataset.id);
      deleteProduct(idProduct);
    }


    cartTextsDiv.appendChild(cartTitle);
    cartTextsDiv.appendChild(cartDescription);
    cartTextsDiv.appendChild(cartUnitariPrice);
    cartTextsDiv.appendChild(cartAmount);
    cartTextsDiv.appendChild(cartTotalPrice);
    cartTextsDiv.appendChild(cartDeleteBtn);

    divProduct.appendChild(cartPictureDiv);
    divProduct.appendChild(cartTextsDiv);

    productsCartContainer.appendChild(divProduct);  
    
    // iterating to add each time the subtotal
    totalWithoutDiscount += product[0].price * product[1];
    discount += calculatedDiscount * product[1];
    subtotal += total * product[1];
  });

  totalWithoutDiscount = toFixedNumber(totalWithoutDiscount);
  discount = toFixedNumber(discount);
  subtotal = toFixedNumber(subtotal);
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

function deleteProduct(id) {
  console.log(id);
  cart = cart.filter(product => product[0].id !== id);
  saveLocalStorage();
  loadCart();
}

function emptyCart() {
  cart.length = 0;
  saveLocalStorage();
  loadCart();
}

function saveLocalStorage() {
  localStorage.setItem('cartProducts', JSON.stringify(cart));
}

function cleanHTMLCart() {
  while (productsCartContainer.firstChild) {
    productsCartContainer.removeChild(productsCartContainer.firstChild);
  }
}

payBtn.addEventListener('click', () => {
  if(cart.length >= 1) {
    window.location.href = '../credit-card.html';
    return;
  }
})

function toFixedNumber(number) {
  number = parseFloat(number.toFixed(2));
  return number;
}

loadCart();