import {
    selectedRules,
    TIME_LIMITS,
    SPAWN_RADII,
    PIXEL_SIZES
} from './constants.js';

let score = 0;
let reactionInterval = null;
let lastPixelPos = null;
let spawnTimestamp = 0;

export function renderPage() {
    const difficultySelect = document.getElementById('difficulty');
    const colorSelect = document.getElementById('pixelColor');
    const startButton = document.getElementById('startButton');
    const canvas      = document.getElementById('gameCanvas');
    const startScreen = document.getElementById('startScreen');
    const gameScreen  = document.getElementById('gameScreen');
    const scoreDisplay= document.getElementById('score');
    const timeDisplay = document.getElementById('timeLeft');

    populateSelect(difficultySelect, [
        { value: 'easy',   text: 'Легко' },
        { value: 'medium', text: 'Середній' },
        { value: 'hard',   text: 'Важко' },
    ]);
    populateSelect(colorSelect, [
        { value: 'red',    text: 'Red' },
        { value: 'blue',   text: 'Blue' },
        { value: 'yellow', text: 'Yellow' },
        { value: 'black',  text: 'Black' },
    ]);

    startButton.addEventListener('click', () => {
        selectedRules.currentDifficulty = difficultySelect.value;
        selectedRules.currentPixelColor = colorSelect.value;
        score = 0;
        lastPixelPos = null;
        scoreDisplay.textContent = score;
        startScreen.style.display = 'none';
        gameScreen.style.display  = 'block';
        spawnPixel();
    });

    function spawnPixel() {
        clearInterval(reactionInterval);

        const prev = document.querySelector('.pixel');
        if (prev) prev.remove();

        const size = PIXEL_SIZES[selectedRules.currentDifficulty];
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        Object.assign(pixel.style, {
            width:  `${size}px`,
            height: `${size}px`,
            backgroundColor: selectedRules.currentPixelColor,
        });

        const maxX = canvas.clientWidth  - size;
        const maxY = canvas.clientHeight - size;
        let x, y;

        if (lastPixelPos) {
            const radius = SPAWN_RADII[selectedRules.currentDifficulty];
            const angle  = Math.random() * Math.PI * 2;
            const dist   = Math.random() * radius;
            x = Math.max(0, Math.min(maxX, lastPixelPos.x + dist * Math.cos(angle)));
            y = Math.max(0, Math.min(maxY, lastPixelPos.y + dist * Math.sin(angle)));
        } else {
            const maxX = canvas.offsetWidth - size;
            const maxY = canvas.offsetHeight - size;
            x = Math.floor(Math.random() * (maxX + 1));
            y = Math.floor(Math.random() * (maxY + 1));
        }

        lastPixelPos = { x, y };
        pixel.style.left = `${x}px`;
        pixel.style.top  = `${y}px`;
        canvas.appendChild(pixel);

        spawnTimestamp = Date.now();
        reactionInterval = setInterval(checkTimeout, 50);

        pixel.addEventListener('click', () => {
            clearInterval(reactionInterval);
            score++;
            scoreDisplay.textContent = score;
            spawnPixel();
        });
    }

    function checkTimeout() {
        const elapsed   = Date.now() - spawnTimestamp;
        const timeLimit= TIME_LIMITS[selectedRules.currentDifficulty];
        const remaining = timeLimit - elapsed;

        if (remaining <= 0) {
            clearInterval(reactionInterval);
            alert(`Час вичерпано! Гра закінчилась. Ваш рахунок: ${score}`);
            startScreen.style.display = 'block';
            gameScreen.style.display  = 'none';
            lastPixelPos = null;
        } else {
            timeDisplay.textContent = (remaining / 1000).toFixed(1);
        }
    }
}

function populateSelect(selectEl, items) {
    selectEl.innerHTML = '';
    items.forEach(({value, text}) => {
        const opt = document.createElement('option');
        opt.value       = value;
        opt.textContent = text;
        selectEl.appendChild(opt);
    });
}

renderPage();