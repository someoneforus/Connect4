const heroTile = document.getElementById('heroTile')
const title = document.querySelector('.title')
const playTiles = document.querySelectorAll('.playTile')
const lmTiles = document.querySelectorAll('.lmTile')
const htpSection = document.getElementById('htp')

window.onload = () => {
    title.classList.add('active')

    heroTile.classList.remove('introFallAnimation');
    void heroTile.offsetWidth;
    heroTile.classList.add('introFallAnimation');
}

heroTile.addEventListener('click', () => {
    heroTile.classList.toggle('gameActive');
    setTimeout(() => {
        window.location.href = './game.html'
    }, 2200);
});

/* Maybe remove the heroTile animation */



playTiles.forEach((playTile) => {
    playTile.addEventListener('mouseenter', () => {
        playTiles.forEach((tile) => {
            tile.classList.add('active')
        });
    });

    playTile.addEventListener('mouseleave', () => {
        playTiles.forEach((tile) => {
            tile.classList.remove('active')
        });
    });

    playTile.addEventListener('click', () => {
        heroTile.classList.toggle('gameActive')
        setTimeout(() => {
            window.location.href = './game.html'
        }, 2200)
    });
});




lmTiles.forEach((lmTile) => {
    lmTile.addEventListener('mouseenter', () => {
        lmTiles.forEach((tile) => {
            tile.classList.add('active')
        });
    });

    lmTile.addEventListener('mouseleave', () => {
        lmTiles.forEach((tile) => {
            tile.classList.remove('active')
        });
    });

    lmTile.addEventListener('click', () => {
        htpSection.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        })
    });
});


