const items = document.querySelector('.items');
const form = document.querySelector('.new-form');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__add');

/*
주석에는 이 함수는 무엇인지, 어떤 의도로 만들어졌는지, 어떻게 사용하는 것이 바람직한지, 왜 사용해야하는지, 왜 이런 방식으로 작성했는지 등
왜를 설명할 수 있어야 한다. (따라서 코드를 그대로 설명하는 주석은 필요 좋지 않다. 가독성도 떨어지고 코드만 보고서도 충분히 이해 가능하기 때문)
*/

form.addEventListener('submit', (event) => {
  onAdd();
  event.preventDefault();
});

function onAdd() {
  const text = input.value;
  if (text === '') {
    input.focus();
    return;
  }

  const item = createItem(text);
  items.appendChild(item);
  item.scrollIntoView({ block: 'center' });
  input.value = '';
  input.focus();
}

let id = 0; // UUID
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
    <div class="item">
      <span class="item__name">${text}</span>
      <button class="item__delete">
        <i class="fa-solid fa-trash" data-id=${id}></i>
      </button>
    </div>
    <div class="item__divider"></div>`;
  id++;
  return itemRow;
}

// addBtn.addEventListener('click', () => {
//   onAdd();
// });

// input.addEventListener('keydown', event => {
//   if (event.key === 'Enter') {
//     onAdd();
//   }
// });

items.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});