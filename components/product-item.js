// product-item.js
let inCart = new Object(JSON.parse(localStorage.getItem('incart')));
class ProductItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    const card = document.createElement('li');
    card.setAttribute('class', 'product');

    const img = card.appendChild(document.createElement('img'));
    img.src = this.hasAttribute('img') ? this.getAttribute('img') : '/noimg.png';
    img.setAttribute('alt', this.getAttribute('title-text'));

    const productTitle = card.appendChild(document.createElement('p'));
    productTitle.setAttribute('class','title-text');
    productTitle.textContent = this.getAttribute('title-text');

    const productPrice = card.appendChild(document.createElement('p'));
    productPrice.setAttribute('class', 'price');
    productPrice.textContent = this.getAttribute("price-num")

    const addButton = card.appendChild(document.createElement('button'));
    addButton.addEventListener('click', (event) => { 
      event.preventDefault();
      updateButton(this);
    });
    addButton.textContent = "Add to Cart";

    /* css styling */
    const styleLink = document.createElement('link');
    styleLink.setAttribute('rel', 'stylesheet');
    styleLink.setAttribute('href','./styles/styles.css');

    this.shadowRoot.append(card,styleLink);
  }

  connectedCallback() {
    console.log('product added to page.');
    updateAttributes(this);
  }
}
customElements.define('product-item', ProductItem);

function updateButton(elem) {
  const shadow = elem.shadowRoot;
  const button = shadow.querySelector('button');
  const cartCount = document.querySelector("#cart-count");
  if (button.getAttribute('added') != 'true') {
    button.setAttribute('added', 'true');
    cartCount.textContent = parseInt(cartCount.textContent,10) + 1;
    button.textContent = "Remove from Cart";
    inCart[elem.getAttribute('id')] = 1; 
  } else {
    button.setAttribute('added','false') ;
    cartCount.textContent = parseInt(cartCount.textContent,10) - 1;
    button.textContent = "Add to Cart";
    delete inCart[elem.getAttribute('id')];
  }
  localStorage.setItem('incart', JSON.stringify(inCart));
}

function renderButtons(id, elem) {
  const incart = localStorage.getItem('incart');
  if (incart != null) {
    itemsList = JSON.parse(incart);
    if (itemsList[id]) {
      updateButton(elem);
    }
  }
}
function updateAttributes(elem) {
  const shadow = elem.shadowRoot;
  
  const img = shadow.querySelector("img");
    img.src = elem.hasAttribute('img') ? elem.getAttribute('img') : '/noimg.png';
    img.setAttribute('alt', elem.getAttribute('title-text'));
  const productTitle = shadow.querySelector(".title-text");
    productTitle.setAttribute('class','title');
    productTitle.textContent = elem.getAttribute('title-text');
  const productPrice = shadow.querySelector(".price");
    productPrice.setAttribute('class', 'price');
    productPrice.textContent = elem.getAttribute("price-num");
  const idHolder = shadow.querySelector('li');
    idHolder.setAttribute('id', elem.getAttribute('id'));
    renderButtons(elem.getAttribute('id'), elem);
}