const products = [
  { id: 1, image: 'img-wine' },
  { id: 2, image: 'img-milk' },
  { id: 3, image: 'img-jam' },
  { id: 4, image: 'img-cheese' },
  { id: 5, image: 'img-bacon' },
  { id: 6, image: 'img-chicken' },
  { id: 7, image: 'img-pack' },
  { id: 8, image: 'img-pineapple' },
  { id: 9, image: 'img-banana' },
  { id: 10, image: 'img-apple' },
  { id: 11, image: 'img-letuce' },
];

let count = [];

// Функция отрисовки козырька и его тени
function showUmbrella(currentClass, className) {
  document.querySelector(currentClass).innerHTML = new Array(27)
    .fill()
    .map((_, index) => `<li key={index} class="${className}"></li>`)
    .join('');
}

// Функция отрисовки продуктов
function showProducts(arr, el) {
  product = document.querySelector(el).innerHTML = arr
    .map(
      (item) =>
        `<li key='${item.id}' class="list__item"><img id='${item.id}' src='assets/images/${item.image}.svg'></li>`
    )
    .join('');
}

// Функция отрисовки кнопки
function showButton(item) {
  if (item.length >= 3) {
    document
      .querySelector('.footer__button')
      .classList.add('footer__button_visible');
  }
}

showProducts(products.slice(0, 4), '#list-top');
showProducts(products.slice(4, 7), '#list-middle');
showProducts(products.slice(7, 11), '#list-bottom');

// Drag and Drop
const listItems = document.querySelectorAll('.list__item');
const cart = document.querySelector('.footer__cart');
const cartImage = document.querySelector('.footer__image');

for (item of listItems) {
  item.addEventListener('dragstart', function (e) {
    e.dataTransfer.setData('data', e.target.id);
    cartImage.classList.remove('footer__image_active');

    let dragged = e.target;

    // перемещение над корзиной
    cart.addEventListener('dragover', (e) => {
      e.preventDefault();
      cartImage.classList.add('footer__image_active');
    });

    // оставление продукта в корзине
    cart.addEventListener('drop', (e) => {
      e.preventDefault();

      dragged.classList.add('list__item_dragged');
      cartImage.classList.remove('footer__image_active');
      e.target.appendChild(dragged);

      count.push(Number(dragged.id));
      const number = Array.from(new Set(count));

      showButton(number);
    });
  });
}

showUmbrella('.umbrella', 'umbrella__item');
showUmbrella('.back-side__shadow-umbrella', 'back-side__shadow-item');
