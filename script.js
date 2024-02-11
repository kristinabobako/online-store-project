const items = [
  {
    title: "Масло амаранта 100мл",
    description: "Повышает силы иммунной системы",
    tags: ["масло", "амарант"],
    price: 35,
    img: "./img/1.jpeg",
    rating: 4.4,
  },
  {
    title: "Масло черного тмина 100мл",
    description: "В черном тмине исцеление от всех болезней, кроме смерти",
    tags: ["масло", "тмин"],
    price: 30,
    img: "./img/2.jpeg",
    rating: 3.1,
  },
  {
    title: "Масло кокоса 100мл",
    description: "Источник энергии",
    tags: ["масло", "кокос"],
    price: 19,
    img: "./img/3.jpeg",
    rating: 5.0,
  },
  {
    title: "Урбеч из кешью 250мл",
    description: "Мягкий, сливочный, сладковатый (естественная сладость)",
    tags: ["урбеч", "кешью"],
    price: 24,
    img: "./img/4.jpeg",
    rating: 4.7,
  },
  {
    title: "Урбеч абрикосовой косточки 250мл",
    description: "Вкус сладковатой горчинки с привкусом муската",
    tags: ["урбеч", "абрикос"],
    price: 17,
    img: "./img/5.jpeg",
    rating: 4.9,
  },
  {
    title: "Гранола с сухофруктами 100г",
    description: "Состоит из злаков и семян, запеченых в медовом соусе",
    tags: ["гранола"],
    price: 4,
    img: "./img/6.jpeg",
    rating: 3.2,
  },
  {
    title: "Набор халвы",
    description: "Медовая, без сахара, менее сладкая, разных цветов и вкусов",
    tags: ["халва"],
    price: 37,
    img: "./img/7.jpeg",
    rating: 2.9,
  },
  {
    title: "Семечки-зернышки “два кунжута” 200г",
    description: "Микс семян белого и черного кунжута 50:50",
    tags: ["семена", "кунжут"],
    price: 7,
    img: "./img/8.jpeg",
    rating: 3.4,
  },
  {
    title: "Семечки-зернышки микс 200г",
    description: "Микс из 6 видов семян",
    tags: ["семена"],
    price: 6,
    img: "./img/9.jpeg",
    rating: 4.8,
  },
  {
    title: "Мука кедровая 100г",
    description: "Имеет сбалансированный химический состав, а также полезные минеральные вещества",
    tags: ["мука"],
    price: 6,
    img: "./img/10.jpeg",
    rating: 3.2,
  },
  {
    title: "Мука амаранта 100г",
    description: "Задерживает процесс старения клеток, а также насыщает ткани нашего организма кислородом",
    tags: ["мука", "амарант"],
    price: 6,
    img: "./img/11.jpeg",
    rating: 3.7,
  },
  {
    title: "Яблочный уксус 500мл",
    description: "Приготовлен из цельных яблок и меда",
    tags: ["уксус"],
    price: 15,
    img: "./img/12.jpeg",
    rating: 4.1,
  },
];

const itemsContainer = document.querySelector('#shop-items');
const itemTemplate = document.querySelector('#item-template');

function makeProductCard(storeProduct) {
  const item = itemTemplate.content.cloneNode(true);

  const { title, description, tags, price, img, rating } = storeProduct;

  item.querySelector('h1').textContent = title;
  item.querySelector('p').textContent = description;
  item.querySelector('span').textContent = `${price}.00BYN`;
  item.querySelector('img').src = img;

  const tagsContainer = item.querySelector('.tags');

  tags.forEach(tag => {
    const element = document.createElement('span');
    element.classList.add('tag');
    element.textContent = tag;
    tagsContainer.append(element);
  });

  const ratingContainer = item.querySelector('.rating');

  for (let i = 0; i < rating; i++) {
    const star = document.createElement('i');
    star.classList.add('fa', 'fa-star');
    ratingContainer.append(star);
  };

  return item;
};

let copyItems = [...items];

const nothingFound = document.querySelector('#nothing-found');

function renderItems(arr) {
  itemsContainer.innerHTML = '';

  nothingFound.textContent = '';

  arr.forEach((item) => {
    itemsContainer.append(makeProductCard(item));
  });

  if (!arr.length) {
    nothingFound.textContent = 'Ничего не найдено';
  };
};

function sortByAlphabet(a, b) {
  if (a.title > b.title) {
    return 1;
  };

  if (a.title < b.title) {
    return -1;
  };

  return 0;
};

renderItems(copyItems.sort((a, b) => sortByAlphabet(a, b)));

const sortControl = document.querySelector('#sort');

sortControl.addEventListener('change', (event) => {
  const selectedOption = event.target.value;

  switch (selectedOption) {
    case 'expensive': {
      copyItems.sort((a, b) => b.price - a.price);
      break;
    }
    case 'cheap': {
      copyItems.sort((a, b) => a.price - b.price);
      break;
    }
    case 'rating': {
      copyItems.sort((a, b) => b.rating - a.rating);
      break;
    }
    case 'alphabet': {
      copyItems.sort((a, b) => sortByAlphabet(a, b));
      break;
    }
  }

  renderItems(copyItems);
});

const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');

function checkSearchString() {
  const searchString = searchInput.value.trim().toLowerCase();

  copyItems = items.filter((el) => el.title.toLowerCase().includes(searchString));

  copyItems.sort((a, b) => sortByAlphabet(a, b));

  sortControl.selectedIndex = 0;

  renderItems(copyItems);
};

searchBtn.addEventListener('click', checkSearchString);
searchInput.addEventListener('search', checkSearchString);