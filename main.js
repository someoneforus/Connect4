
const heroTile = document.getElementById('heroTile');
const playTiles = document.querySelectorAll('.playTile');
const lmTiles = document.querySelectorAll('.lmTile');
const htpSection = document.getElementById('htp');
const heroGrid=document.querySelector('.heroGrid');

window.onload = () => {
    logo.classList.add('active')
    heroGrid.classList.add('active')

    heroTile.classList.remove('introFallAnimation');
    void heroTile.offsetWidth;
    heroTile.classList.add('introFallAnimation');
}


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
        heroGrid.classList.remove('active');
        heroTile.classList.toggle('gameActive');
        setTimeout(() => {
            window.location.href = './game.html'
            heroTile.classList.remove('gameActive')
        }, 1200)
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


