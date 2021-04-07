class Cart {
    constructor(popupElem) {
        const cartGoods = this.cartGoods = [];
        const cartTableGoods = this.cartTableGoods = document.querySelector('.cart-table__goods');
        const cartTableTotal = this.cartTableTotal = document.querySelector('.card-table__total');
        const cartCount = this.cartCount = document.querySelector('.cart-count');

        //Popup - class
        const popup = this.popup = new Popup(popupElem);
    }

    //Получение данных от сервера
    async getGoods() {
        const response = await fetch('https://willberies-shop.herokuapp.com/goods');
        if (!response.ok) {
            throw ('Что то пошло не так...');
        } else {
            return response.json();
        }
    }



    counterGoods() {
        let sum = 0;

        this.cartGoods.forEach(item => {
            sum += item.count;
        });
        this.cartCount.textContent = sum;

    }

    clearCart() {
        this.cartGoods.length = 0;
        this.renderCart();
        this.counterGoods();
    }

    renderCart() {
        this.cartTableGoods.textContent = '';

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
            this.cartTableGoods.append(trGood);
        });

        const totalCount = this.cartGoods.reduce((sum, item) => {
            return sum + (item.price * item.count);
        }, 0)

        this.cartTableTotal.innerHTML = totalCount + '&#36;';
    }

    plusGoods(id) {
        for (const item of this.cartGoods) {
            if (item.id === Number(id)) {
                item.count++;
                break;
            }
        }
        this.renderCart();
        this.counterGoods();
    }

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
    }

    deleteCart(id) {
        this.cartGoods = this.cartGoods.filter(item => Number(id) !== item.id);
        this.renderCart();
        this.counterGoods();

    }

    addCartGoods(id) {
        //Проверка что элемент уже есть в корзине
        const goodItem = this.cartGoods.find(item => item.id === Number(id));
        if (goodItem) {
            this.plusGoods(id);
        } else {
            this.getGoods()
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

    processForm(form){
        for(let i = 0; i < form.elements.length; i++){
            if(form.elements[i].type !== 'submit'){
                form.elements[i].required = 'required';

                //Validation chema
                form.elements[i].addEventListener('blur', event => new Validation().validateForm(event));
            }
        }
        form.addEventListener('submit', event => this.sendForm(event))
    }

    sendForm(event){
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

        data.res =  this.cartGoods;
        //console.log(data);

        el.parentElement.append(messageBlock);

        //Проверка наличия товаров в корзине
        if(!Object.keys(data.res).length){
            messageBlock.textContent = 'Вы ничего не заказали!';

            //Убираем оповещение пользователя
            setTimeout(()=> {
                el.parentElement.removeChild(messageBlock);
                this.popup.closeModal();
                el.reset();
                this.clearCart();
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
                //console.log(response);
                messageBlock.textContent = response;
            })
            .catch(error => console.log(error))

        //Убираем оповещение пользователя
        setTimeout(()=> {
            el.parentElement.removeChild(messageBlock);
            this.popup.closeModal();
            el.reset();
            this.clearCart();
        }, 5000);
    }

}
