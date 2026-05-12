const heroTile = document.getElementById('heroTile')
const title = document.querySelector('.title')
const playTiles = document.querySelectorAll('.playTile')
const lmTiles = document.querySelectorAll('.lmTile')

window.onload = () => {
    title.classList.add('active')

    heroTile.classList.remove('introFallAnimation');
    void heroTile.offsetWidth;
    heroTile.classList.add('introFallAnimation');
}

heroTile.addEventListener('click', () => {
    heroTile.classList.add('gameActive')
})



playTiles.forEach((playTile) => {
    playTile.addEventListener('mouseenter',()=>{
        playTiles.forEach((tile)=>{
            tile.classList.add('active')
        });
    });

    playTile.addEventListener('mouseleave',()=>{
        playTiles.forEach((tile)=>{
            tile.classList.remove('active')
        });
    });
});


lmTiles.forEach((lmTile) => {
    lmTile.addEventListener('mouseenter',()=>{
        lmTiles.forEach((tile)=>{
            tile.classList.add('active')
        });
    });

    lmTile.addEventListener('mouseleave',()=>{
        lmTiles.forEach((tile)=>{
            tile.classList.remove('active')
        });
    });
});


