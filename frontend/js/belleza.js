(() => {
const products = [
  {
    name: 'Vinchas hawaianas',
    description: 'Vinchas coloridas y frescas para looks alegres o temáticos.',
    image: '../img/vinhashawaianas.jpeg',
    price: '$1'
  },
  {
    name: 'Vinchas de estrellas',
    description: 'Vinchas con detalle de estrellas para un estilo tierno y llamativo.',
    image: '../img/vinchasestrellas.jpeg',
    price: '$0.25',
    promo: 'Par: $0.50 | 5 unidades: $1'
  }
];

const pageNumber = document.getElementById('pageNumber');
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productPromo = document.getElementById('productPromo');
const productDescription = document.getElementById('productDescription');
const productPlaceholder = document.getElementById('productPlaceholder');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const pageDots = document.getElementById('pageDots');
const notebook = document.querySelector('.notebook');
let currentPage = 0;
let touchStartX = 0;

function renderDots() {
  pageDots.innerHTML = '';
  products.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = index === currentPage ? 'dot is-active' : 'dot';
    dot.setAttribute('aria-label', `Ir a hoja ${index + 1}`);
    dot.addEventListener('click', () => {
      currentPage = index;
      renderPage();
    });
    pageDots.appendChild(dot);
  });
}

function renderPage() {
  const product = products[currentPage];
  notebook.classList.remove('turning');
  void notebook.offsetWidth;
  notebook.classList.add('turning');
  pageNumber.textContent = `Hoja ${currentPage + 1} de ${products.length}`;
  productName.textContent = product.name;
  productPrice.textContent = product.price || '';
  productPrice.hidden = !product.price;
  productPromo.textContent = product.promo || '';
  productPromo.hidden = !product.promo;
  productDescription.textContent = product.description;
  productPlaceholder.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
  prevPage.disabled = currentPage === 0;
  nextPage.disabled = currentPage === products.length - 1;
  renderDots();
}

prevPage.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage -= 1;
    renderPage();
  }
});

nextPage.addEventListener('click', () => {
  if (currentPage < products.length - 1) {
    currentPage += 1;
    renderPage();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') prevPage.click();
  if (event.key === 'ArrowRight') nextPage.click();
});

notebook.addEventListener('touchstart', (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

notebook.addEventListener('touchend', (event) => {
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) < 45) return;
  if (distance > 0) prevPage.click();
  if (distance < 0) nextPage.click();
}, { passive: true });

renderPage();
})();
