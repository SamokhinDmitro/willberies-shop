class Goods {
    constructor() {
        const longGoodsList = this.longGoodsList = document.querySelector('.long-goods-list');

    }

    //Получение данных от сервера
    async getGoods(){

        const response = await fetch(`https://willberies-shop.herokuapp.com/goods`);
        if(!response.ok){
            throw ('Что то пошло не так...');
        }else{
            return response.json();
        }
    };

    createCard(objCard){
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

    renderGoods(data){
        this.longGoodsList.textContent = '';
        const cards = data.map(this.createCard);

        document.body.classList.add('show-goods');
        this.longGoodsList.append(...cards);
    }

    //Filtered goods
   filteredGoods(field, value){
        this.getGoods()
            .then(data => {
                return data.filter(item => item[field] === value);
            })
            .then(data => this.renderGoods(data))
            .catch(error => console.log(error))
    }

    showAll(event){
        event.preventDefault();
        this.getGoods()
            .then(data => {
                //console.log(data);
                this.renderGoods(data);
            })
            .catch(error => {
                console.log(error);
            })
    }

}
