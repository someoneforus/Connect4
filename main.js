const heroTile = document.getElementById('heroTile');
const playTiles = document.querySelectorAll('.playTile');
const lmTiles = document.querySelectorAll('.lmTile');
const heroGrid = document.querySelector('.heroGrid');
const htpSection = document.getElementById('htpSection');
const step1 = document.querySelector('.step1');
const step2 = document.querySelector('.step2');
const step3 = document.querySelector('.step3');
const clicktiles = document.querySelectorAll('.clickTile');
const carouselBtns = document.querySelectorAll('.carouselBtn');

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


clicktiles.forEach((clicktile) => {
    clicktile.addEventListener('click', () => {
        clicktile.classList.add('red');
        clicktile.classList.remove('introFallAnimation');
        void clicktile.offsetWidth;
        clicktile.classList.add('introFallAnimation');
    });
});



carouselBtns.forEach((carouselBtn) => {
    const moveLeft = document.querySelector('.moveLeft');
    const moveRight = document.querySelector('.moveRight');

    carouselBtn.addEventListener('click', () => {
        if (carouselBtn.classList.contains('moveLeft') && step1.classList.contains('center')) {
            console.log('cant go left')
            return
        } else if (carouselBtn.classList.contains('moveRight') && step1.classList.contains('center')) {
            step1.classList.remove('center')
            step1.classList.add('left')
            step2.classList.remove('right')
            step2.classList.add('center')
            setTimeout(() => clearHtpBoard(), 800)
            console.log('moving 1 to left, 2 to center')
        } else if (carouselBtn.classList.contains('moveRight') && step2.classList.contains('center')) {
            step2.classList.remove('center')
            step2.classList.add('left')
            step3.classList.remove('right')
            step3.classList.add('center')
            setTimeout(() => clearHtpBoard(), 800)
            console.log('moving 2 to left, 3 to center')
        } else if (carouselBtn.classList.contains('moveLeft') && step2.classList.contains('center')) {
            step2.classList.remove('center')
            step2.classList.add('right')
            step1.classList.remove('left')
            step1.classList.add('center')
            setTimeout(() => clearHtpBoard(), 800)
            console.log('moving 2 to right, 1 to center')
        } else if (carouselBtn.classList.contains('moveLeft') && step3.classList.contains('center')) {
            step3.classList.remove('center')
            step3.classList.add('right')
            step2.classList.remove('left')
            step2.classList.add('center')
            setTimeout(() => clearHtpBoard(), 800)
            console.log('moving 3 to right, 2 to center')
        } else if (carouselBtn.classList.contains('moveRight') && step3.classList.contains('center')) {
            console.log('cant go right')
            return
        }

        if (carouselBtn.classList.contains('moveLeft') && step1.classList.contains('center')) {
            moveLeft.classList.add('inactive')
        } else {
            moveLeft.classList.remove('inactive');
        }
        if (carouselBtn.classList.contains('moveRight') && step3.classList.contains('center')) {
            moveRight.classList.add('inactive')
        } else {
            moveRight.classList.remove('inactive');
        }
    });


});

function clearHtpBoard() {
    clicktiles.forEach((clicktile) => {
        clicktile.classList.remove('red');
    });

}