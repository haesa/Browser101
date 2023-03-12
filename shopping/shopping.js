'use strict'

// Store
const addBtn = document.querySelector('.footer__add');
addBtn.addEventListener('click', () => {
  const input = document.querySelector('.footer__input').value;
  if (input === "") { return ; }
  localStorage.setItem(Date.now(), JSON.stringify(input));
  location.reload();
});

// Display
const items = document.querySelector('.items');
const keyArray = Object.keys(localStorage);
keyArray.sort((a, b) => a - b);
keyArray.forEach((key) => {
  items.appendChild(createItem(key));
});

function createItem(key) {
  const item = localStorage.getItem(key);
  const text = JSON.parse(item);

  const divTag = document.createElement('div');
  const pTag = document.createElement('p');
  const btnTag = document.createElement('button');
  const iTag = document.createElement('i');

  divTag.classList.add('item');
  pTag.innerText = text;
  btnTag.classList.add('item__delete');
  iTag.classList.add('fa-solid');
  iTag.classList.add('fa-trash');

  btnTag.appendChild(iTag);
  divTag.appendChild(pTag);
  divTag.appendChild(btnTag);

  return divTag;
}

// Delete
const deleteBtns = document.querySelectorAll('.item__delete');
deleteBtns.forEach((deleteBtn, index) => {
  deleteBtn.addEventListener('click', () => {
    localStorage.removeItem(keyArray[index]);
    location.reload();
  });
});