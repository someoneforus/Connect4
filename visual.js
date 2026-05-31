const logo = document.querySelector('.logo');
const animatedTiles = document.querySelectorAll('.animatedTile');
const burger = document.querySelector('.burger');
const pizza = document.querySelector('.pizza');
const links = document.querySelector('.links');

window.onload = () => {
    heroTile.classList.remove('gameActive')
}

logo.addEventListener('click', () => {
    window.location.href = './index.html'
})

function rendering() {
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            let tile = document.querySelector(`[data-row="${rowIndex}"][data-col="${colIndex}"]`);

            if (cell === 1) {
                tile.classList.add('red');
            }
            else if (cell === 2) {
                tile.classList.add('yellow');
            }
            else if (cell === 0) {
                tile.classList.remove('red');
                tile.classList.remove('yellow');
            }
        })
    })
}

function animation(landingRow, x) {
    let tile = document.querySelector(`[data-row="${landingRow}"][data-col="${x}"]`);

    tile.classList.remove('css-fallAnimation');
    void tile.offsetWidth;
    tile.classList.add('css-fallAnimation');
}

function popUp(message) {
    setTimeout(() => {
        msgContainer.classList.add('active');
        winDisplay.innerHTML = message;
    }, 750)
}

function closeMsg() {
    msgContainer.classList.remove('active');
}

function playerIndication(player, color) {
    const rect = player.getBoundingClientRect();
    const parentRect = player.parentElement.getBoundingClientRect();

    const centerX = rect.left - parentRect.left + rect.width / 2;
    const bottomY = rect.bottom - parentRect.top;
    slider.style.left = centerX + "px";
    slider.style.top = bottomY + "px";
    slider.style.transform = "translateX(-50%)";
    slider.style.backgroundColor = color;

}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {

            entry.target.classList.add('introFallAnimation');

            entry.target.addEventListener('animationend', () => {
                entry.target.classList.remove('introFallAnimation');
                observer.observe(entry.target);
            }, { once: true })
        }
    });
});

animatedTiles.forEach((tile) => {
    observer.observe(tile);
});

burger.addEventListener('click',()=>{
    pizza.classList.add('active')
    links.classList.add('active')
    burger.classList.remove('active')
});

pizza.addEventListener('click',()=>{
    burger.classList.add('active')
    links.classList.remove('active')
    pizza.classList.remove('active')
});
