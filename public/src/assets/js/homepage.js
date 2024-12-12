const container = document.querySelector(".container");
const pages = document.querySelectorAll(".page");
let currentPage = "";

container.addEventListener("scroll", () => {
    let foundPage = null;

    pages.forEach(page => {
        const rect = page.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            foundPage = page.id;
        }
    });

    if (foundPage && foundPage !== currentPage) {
        currentPage = foundPage;
        console.log(currentPage);
        const element = document.getElementById(currentPage);
        const indexs = document.getElementsByClassName('index');
        Array.from(indexs).forEach(index => {
            index.classList.remove('active');
        });
        document.getElementById(element.id.replace('page', 'index')).classList.add('active');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
