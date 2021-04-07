class Popup {
    constructor(elem){
        const modalCart = this.modalCart = document.querySelector(elem);
        const modalClose = this.modalCart.querySelector('.modal-close');

        modalClose.addEventListener('click', this.closeModal.bind(this));
        this.modalCart.addEventListener('click', this.closeModal.bind(this));
        this.modalCart.querySelector('.modal').addEventListener('click', event => event.stopPropagation());
    }

    openModal(){
        this.modalCart.classList.add('show');
    }

   closeModal(){
       this.modalCart.classList.remove('show');
    }
}
