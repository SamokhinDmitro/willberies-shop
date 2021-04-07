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

const modalCart  = document.querySelector('#modal-cart');
const modalClose = modalCart.querySelector('.modal-close');

const openModal = () => {
    modalCart.classList.add('show');
}

const closeModal = () => {
    modalCart.classList.remove('show');
}

modalClose.addEventListener('click', closeModal);
modalCart.addEventListener('click', closeModal);
modalCart.querySelector('.modal').addEventListener('click', event => event.stopPropagation());

btnCart.addEventListener('click', () => {
    cart.renderCart();
    openModal();
});
//END Modal controls


const getGoods = async () => {

    const response = await fetch(`https://willberies-shop.herokuapp.com/goods`);
    if(!response.ok){
        throw ('Что то пошло не так...');
    }else{
        return response.json();
    }
};

//ScrollBtn
const scrollLinks = document.querySelectorAll('.scroll-link');

function scrollToSection(event){
    event.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

scrollLinks.forEach(link => {
    link.addEventListener('click', scrollToSection);
});
//END ScrollBtn




//Корзина

const cartTableTotal = document.querySelector('.card-table__total');
const cartCount = document.querySelector('.cart-count');

const cart = {
    cartGoods: [],
    counterGoods() {
        let sum = 0;

        this.cartGoods.forEach(item => {
            sum += item.count;
        });
        cartCount.textContent = sum;
    },
    clearCart() {
        this.cartGoods.length = 0;
        this.renderCart();
        this.counterGoods();
    },
    renderCart() {
        cartTableGoods.textContent = '';

        this.cartGoods.forEach(({id, name, price, count}) => {
            const trGood = document.createElement('tr');
            trGood.className = 'cart-item';
            trGood.dataset.id = id;
            trGood.innerHTML = `
            <td>${name}</td>
            <td>${price}$</td>
            <td><button class="cart-btn-minus">-</button></td>
            <td>${count}</td>
            <td><button class="cart-btn-plus">+</button></td>
            <td>${price * count}$</td>
            <td><button class="cart-btn-delete">&times;</button></td>
            `;
            cartTableGoods.append(trGood);
        });

        const totalCount = this.cartGoods.reduce((sum, item) => {
            return sum + (item.price * item.count);
        }, 0)

        cartTableTotal.innerHTML = totalCount + '&#36;';
    },
    plusGoods(id) {
        for (const item of this.cartGoods) {
            if (item.id === Number(id)) {
                item.count++;
                break;
            }
        }
        this.renderCart();
        this.counterGoods();
    },

    subGoods(id) {
        for (const item of this.cartGoods) {
            if (item.id === Number(id)) {
                if (item.count <= 1) {
                    this.deleteCart(id);
                } else {
                    item.count--;
                }
                break;
            }
        }
        this.renderCart();
        this.counterGoods();
    },

    deleteCart(id) {
        this.cartGoods = this.cartGoods.filter(item => Number(id) !== item.id);
        this.renderCart();
        this.counterGoods();

    },

    addCartGoods(id) {
        //Проверка что элемент уже есть в корзине
        const goodItem = this.cartGoods.find(item => item.id === Number(id));
        if (goodItem) {
            this.plusGoods(id);
        } else {
            getGoods()
                .then(data => data.find(item => item.id === Number(id)))
                .then(({id, name, price}) => {
                    this.cartGoods.push({
                        id,
                        name,
                        price,
                        count: 1
                    });
                    this.counterGoods();
                })
        }
    }

};

//Очистка корзины
btnDanger.addEventListener('click', cart.clearCart.bind(cart));

//Добавление товара в корзинку
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
//END Корзина



//Goods
//const goods = new Goods();
const longGoodsList = document.querySelector('.long-goods-list');

const createCard = objCard => {
    const {id, name, label, description, price, src, type} = objCard;
    const card = document.createElement('div');
    card.className = 'col-lg-3 col-sm-6';
    card.innerHTML = `
        <div class="goods-card">
        ${label ? `<span class="label">${label}</span>` : ``}
\t\t\t\t\t\t<img src='https://willberies-shop.herokuapp.com/${src}.${type}' alt='${name}' class="goods-image">
\t\t\t\t\t\t<h3 class="goods-title">${name}</h3>
\t\t\t\t\t\t<p class="goods-description">${description}</p>
\t\t\t\t\t\t<button class="button goods-card-btn add-to-cart" data-id= ${id}>
\t\t\t\t\t\t\t<span class="button-price">&#36; ${price}</span>
\t\t\t\t\t\t</button>
\t\t\t\t\t</div>
    `;
    return card;
}

const renderGoods = data => {
    longGoodsList.textContent = '';
    const cards = data.map(createCard);

    document.body.classList.add('show-goods');
    longGoodsList.append(...cards);
}

//Filtered goods
const filteredGoods = (field, value) => {
    getGoods()
        .then(data => {
            return data.filter(item => item[field] === value);
        })
        .then(data => renderGoods(data))
        .catch(error => console.log(error))
}

const showAll = (event) =>{
    event.preventDefault();
    getGoods()
        .then(data => {
            //console.log(data);
           renderGoods(data);
        })
        .catch(error => {
            console.log(error);
        })
}


//Отображение всех товаров на странице
viewAll.forEach(item => {
    item.addEventListener('click', showAll);
});

//Клик по навигации
navigationLink.forEach(link => {
   link.addEventListener('click', () => {
      const field = link.dataset.field;
      const value = link.dataset.value;
      filteredGoods(field, value);
   });
});

// Фильт банеров с категориями
showAcsessories.forEach(link => {
   link.addEventListener('click', event => {
       event.preventDefault();
       filteredGoods('category', 'Accessories')
   });
});

showClothing.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        filteredGoods('category', 'Clothing');
    });
});

//END Goods


//Validation
const validateForm = e => {
    const el = e.target;

    let rule = el.dataset.rule;

    let check;

    switch (rule) {
        case 'name':
            check = /^[А-Яа-яЁёA-Za-z]{3,11}$/.test(el.value);
            break;

        case 'email':
            check = /^[a-zA-Z._-]+\d*@[a-z]+?\.[a-z]{2,3}$/.test(el.value);
            break;

        case 'phone':
            check = validatePhone(el.value);
            break;

        default:
            check = false;
    }

    if (check) {
        el.style.border = '2px solid green';
    } else {
        el.style.border = '2px solid red';
        el.value = '';
    }
}

//Phone Validation
const validatePhone = val => {

    let massCode = [67, 96, 97, 98, 50, 66, 95, 99, 63, 73, 93, 91, 92, 94];

    let resCode = massCode.map(function (i) {
        return '0' + i;
    });

    let str = resCode.join('|');

    let reg = new RegExp("/\\+38\\(" + str + "\\)\\-(\d{3})\\-(\d{2})\\-(\d{2})/");

    if (reg.test(val)) {
        return true;
    } else {
        return false;
    }
}
//END Validation

//Send form
const order = document.forms.order;

const processForm = form => {
    for(let i = 0; i < form.elements.length; i++){
        if(form.elements[i].type !== 'submit'){
            form.elements[i].required = 'required';

            //Validation chema
            form.elements[i].addEventListener('blur', event => validateForm(event));
        }
    }
    form.addEventListener('submit', event => sendForm(event))
}

const sendForm = event => {
    event.preventDefault();

    const el = event.target;

    //Инфо блок - оповещение пользователя
    let messageBlock = document.createElement('div');
    messageBlock.classList.add('modal-message');

    const data  = {};

    //Перебор элементов формы
    for(let i in el.elements){

        //Проверка наличия свойств
        if(el.elements.hasOwnProperty(i)){
            if(el.elements[i].name){
                //Формируем объект с данными
                data[el.elements[i].name] = el.elements[i].value;
            }
        }
    }

    data.res = cart.cartGoods;

    el.parentElement.append(messageBlock);

    //Проверка наличия товаров в корзине
    if(!Object.keys(data.res).length){
        messageBlock.textContent = 'Вы ничего не заказали!';

        //Убираем оповещение пользователя
        setTimeout(()=> {
            el.parentElement.removeChild(messageBlock);
            popup.closeModal();
            el.reset();
            cart.clearCart();
        }, 5000);
        return false;
    }


    fetch('https://willberies-shop.herokuapp.com/orders', {
        method: 'POST',
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
    })
        .then(response => response.text())
        .then(response => {
            console.log(response);
            messageBlock.textContent = response;
        })
        .catch(error => console.log(error))

    //Убираем оповещение пользователя
    setTimeout(()=> {
        el.parentElement.removeChild(messageBlock);
        closeModal();
        el.reset();
        cart.clearCart();
    }, 5000);
}

//Вызов отправки формы
processForm(order);

//END Send form




