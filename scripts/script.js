// Script.js
let localStorage = window.localStorage;

window.addEventListener('DOMContentLoaded', () => { 
  if (localStorage.getItem('fakestoredata') == null){
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => createCards(JSON.stringify(data)))
  } else {
    createCards(localStorage.getItem('fakestoredata'));
  }
});

function createCards(data) {
  if (localStorage.getItem('fakestoredata') == null) {
    localStorage.setItem('fakestoredata',data);
  }
  const items = JSON.parse(data);
  let parent = document.querySelector(".flex-container");
  items.forEach(element => {
    const item = document.createElement('product-item');
    item.setAttribute('img', element.image);
    item.setAttribute('title-text', element.title);
    item.setAttribute('price-num', element.price);
    item.setAttribute('id', element.id);
    parent.appendChild(item);
  });
}
