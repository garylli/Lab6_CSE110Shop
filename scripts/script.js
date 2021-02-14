// Script.js
let localStorage = window.localStorage;

window.addEventListener('DOMContentLoaded', () => { 
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => storeData(JSON.stringify(data)))
    .then(createCards(localStorage.getItem('fakestoredata')));
});

function storeData(data) {
  if (localStorage.getItem('fakestoredata') == null) {
    localStorage.setItem('fakestoredata',data);
  }
}

function createCards(data) {
  const items = JSON.parse(data);
  let parent = document.querySelector(".flex-container");
  console.log(parent);
  items.forEach(element => {
    const item = document.createElement('product-item');
    item.setAttribute('img', element.image);
    item.setAttribute('title-text', element.title)
    item.setAttribute('price-num', element.price);
    parent.appendChild(item);
  });
}