class ScrollToTop {
    constructor(elem){
        const scrollLinks = this.scrollLinks = document.querySelectorAll(elem);

        this.scrollLinks.forEach(link => {
            link.addEventListener('click', this.scrollToSection.bind(link));
        });
    }

    scrollToSection(event){
        event.preventDefault();
        const id = this.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

}
