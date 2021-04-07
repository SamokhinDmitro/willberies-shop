//OOP Icludes

const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

//ShowModalWin
const btnCart = document.querySelector('.button-cart');

//Получение товаров и отрисовка на странице по нажатию View-all
const viewAll = document.querySelectorAll('.view-all');
const navigationLink = document.querySelectorAll('.navigation-link:not(.view-all)');

//Кнопка очистки корзины
const btnDanger = document.querySelector('.btn-danger');
//Таблица заказов
const cartTableGoods =  document.querySelector('.cart-table__goods');

/* Клик по банерам на стартовой странице */
const showAcsessories = document.querySelectorAll('.show-acsessories');
const showClothing = document.querySelectorAll('.show-clothing');

//Modal controls
const modal = new Popup('#modal-cart');

btnCart.addEventListener('click', () => {
    cart.renderCart();
    modal.openModal();
});

//ScrollBtn
new ScrollToTop('.scroll-link');

//Goods
const goods = new Goods();

//Корзина
const cart = new Cart('#modal-cart');



//Очистка корзины
btnDanger.addEventListener('click', cart.clearCart.bind(cart));

//Добавление товара в корзину
document.body.addEventListener('click', event => {
    const addToCart = event.target.closest('.add-to-cart');
    if(addToCart){
        cart.addCartGoods(addToCart.dataset.id);
    }
});


//Обработка клика по форме заказа
cartTableGoods.addEventListener('click', event => {
    const target = event.target;

    if(target.classList.contains('cart-btn-delete')){
        const id = target.closest('.cart-item').dataset.id;
        //Удаление записи
        cart.deleteCart(id);
    }

    if(target.classList.contains('cart-btn-plus')){
        const id = target.closest('.cart-item').dataset.id;
        cart.plusGoods(id);
    }

    if(target.classList.contains('cart-btn-minus')){
        const id = target.closest('.cart-item').dataset.id;
        cart.subGoods(id);
    }
});

//Отображение всех товаров на странице
viewAll.forEach(item => {
    item.addEventListener('click', goods.showAll.bind(goods));
});

//Клик по навигации
navigationLink.forEach(link => {
   link.addEventListener('click', () => {
      const field = link.dataset.field;
      const value = link.dataset.value;
      goods.filteredGoods(field, value);
   });
});

// Фильт банеров с категориями
showAcsessories.forEach(link => {
   link.addEventListener('click', event => {
       event.preventDefault();
       goods.filteredGoods('category', 'Accessories')
   });
});

showClothing.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        goods.filteredGoods('category', 'Clothing');
    });
});

//Send form
const order = document.forms.order;

cart.processForm(order);

//END Send form



