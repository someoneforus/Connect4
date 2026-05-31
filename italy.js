const italyCard = document.querySelector('.italyCard');
const neapolitanCard = document.querySelector('.neapolitanCard');
const tiramisuCard = document.querySelector('.tiramisuCard');

const italySection = document.getElementById('italy');
const neapolitanSection = document.getElementById('neapolitan');
const tiramisuSection = document.getElementById('tiramisu');

italyCard.addEventListener('click', () => {
    italySection.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
    });
});

neapolitanCard.addEventListener('click', () => {
    neapolitanSection.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
    });
});

tiramisuCard.addEventListener('click', () => {
    tiramisuSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

const italyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        const imgs = entry.target.querySelectorAll('.itImg')

        if (entry.isIntersecting) {
            imgs.forEach((itImg) => {
                itImg.classList.add('active')
            });
            console.log('animating italy')
        } else {
            imgs.forEach((itImg) => {
                itImg.classList.remove('active')
            });
        }
    });
}, {
    threshold: 0.4
});


italyObserver.observe(italySection);
italyObserver.observe(neapolitanSection);
italyObserver.observe(tiramisuSection);
