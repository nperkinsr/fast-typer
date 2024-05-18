let words = {
    easy: ["cat", "dog", "sun", "bed", "run", "box", "cup", "pen", "map", "bug", "fan", "web", "log", "tap", "fun", "jam", "mat", "red", "big", "tip", "lip", "nut", "pet", "pot", "van", "bat", "mud", "rug", "hot", "win", "jet", "wet", "bus", "wig", "gem", "lid", "zap", "mix", "leg", "cake", "idea", "mile", "open", "tall", "pink", "quit", "spin", "urge", "zest", "apple", "dance", "hello", "jelly", "laser", "novel", "puppy", "quack", "vivid", "whale", "bird", "cake", "bell", "tree", "lock", "milk", "duck", "moon", "rain", "foot", "gold", "star", "hope", "wind", "home", "fire", "gift", "desk", "book", "drop", "jump", "lamp", "play", "open", "town", "pool", "test", "hill", "rock", "swim"],
    medium: ["rhythm", "wizard", "gizmo", "vortex", "jigsaw", "sphinx", "quartz", "jockey", "buzzer", "puzzle", "zephyr", "frenzy", "jungle", "zombie", "quiver", "guitar", "mystic", "bazaar", "pocket", "jacket", "fiasco", "museum", "phlegm", "matrix", "blazer", "zigzag", "mumble", "muffin", "hazard", "jester", "buzzer", "sizzle", "galaxy", "bungle", "fumble", "jumble", "gurgle", "knotty", "zodiac", "squawk", "hijack", "squirm", "quaint", "frazzle", "spritz", "whisky", "squeal", "buzzer", "apple", "clock", "drink", "frost", "ghost", "happy", "juice", "magic", "novel", "peach", "quick", "radio", "smile", "toast", "water", "candy", "crown", "fancy", "giant", "honey", "jelly", "lemon", "music", "night", "piano", "quiet", "roast", "sunny", "tiger"],
    hard: ["camouflage", "exquisite", "hypocrisy", "indigo", "lethargic", "meticulous", "nostalgia", "perpendicular", "quintessence", "resilience", "serendipity", "tranquility", "vulnerable", "xenophobic", "yesterday", "zeppelin", "anxiety", "belligerent", "cacophony", "dystopia", "eclectic", "formidable", "gargantuan", "hierarchy", "impervious", "juxtaposition", "kaleidoscopic", "luminous", "malevolent", "nomenclature", "omnipotent", "panacea", "quintessential", "repertoire", "surreptitious", "ubiquitous", "verisimilitude", "wanderlust", "xenogenesis", "yearning", "zephyrous", "abracadabra", "bamboozle", "catastrophic", "dexterous", "eloquent", "fascinate", "alchemy", "boulevard", "chimney", "dwarves", "effervescent", "frequent", "galactic", "haphazard", "ignition", "juxtapose", "kaleidoscope", "labyrinth", "mnemonic", "oblivion", "paradox", "quagmire", "reservoir", "synchrony", "trajectory", "ubiquitous", "vignette", "whimsical", "xylophone", "yacht", "zephyr", "chaos", "zookeeper"]
};

let timer;
let timeLeft = 60;
let errors = 0;
let correct = 0;
let currentWord = '';
let currentDifficulty = 'easy';
let previousWord = '';   // This will store the previously used word to ensure one word is not used twice in succession


document.getElementById('typingField').addEventListener('input', checkInput);
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        showMainModal();
    }
});

function startGame(difficulty) {
    currentDifficulty = difficulty;
    document.getElementById('main-modal').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden'); // Show the game container
    resetGame();
    startTimer();
    setNewWord();
}

function resetGame() {
    timeLeft = 60;
    errors = 0;
    correct = 0;
    updateScores();
    document.getElementById('typingField').value = '';
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        const formattedTime = timeLeft < 10 ? `0${timeLeft}` : timeLeft;
        document.getElementById('timer').innerText = `Time: ${formattedTime} sec`;
        if (timeLeft === 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}


function updateScores() {
    document.getElementById('errorNumber').innerText = `Errors: ${errors}`;
    document.getElementById('correctNumber').innerText = `Correct: ${correct}`;
}

function setNewWord() {
    const wordList = words[currentDifficulty];
    let newWord = currentWord;

    // Ensure the new word is different from the current word
    while (newWord === currentWord) {
        newWord = wordList[Math.floor(Math.random() * wordList.length)];
    }

    previousWord = currentWord;
    currentWord = newWord;
    document.getElementById('wordToType').innerText = currentWord;
}

function checkInput() {
    const inputField = document.getElementById('typingField');
    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');

    if (inputField.value === currentWord) {
        correct++;
        inputField.classList.add('correct');
        correctSound.currentTime = 0; // Reset the audio to the beginning
        correctSound.play(); // Play the correct word sound
        setTimeout(() => {
            inputField.classList.remove('correct');
            inputField.value = '';
            setNewWord();
        }, 100); // Wait before clearing
    } else if (inputField.value.length >= currentWord.length) {
        errors++;
        inputField.classList.add('incorrect');
        incorrectSound.currentTime = 0; // Reset the audio to the beginning
        incorrectSound.play(); // Play the incorrect word sound
        setNewWord(); // Set a new word immediately
        setTimeout(() => {
            inputField.classList.remove('incorrect');
            inputField.value = '';
        }, 500); // Wait before clearing
    }
    updateScores();
}


function endGame() {
    document.getElementById('game-container').classList.add('hidden');
    document.getElementById('end-modal').classList.remove('hidden');
    
    const correctWordsDiv = document.getElementById('correct-words');
    const errorWordsDiv = document.getElementById('error-words');
    
    correctWordsDiv.innerText = `Correct: ${correct}`;
    errorWordsDiv.innerText = `Errors: ${errors}`;

    document.getElementById('final-score').classList.remove('hidden');
}

function restartGame() {
    document.getElementById('end-modal').classList.add('hidden');
    document.getElementById('main-modal').classList.remove('hidden');
}

function retryGame() {
    document.getElementById('end-modal').classList.add('hidden');
    startGame(currentDifficulty);
}

document.getElementById('typingField').addEventListener('keydown', playKeyPressSound);

function playKeyPressSound() {
    const audio = document.getElementById('keypress-sound');
    audio.currentTime = 0; // Reset the audio to the beginning
    audio.play(); // Play the sound
}

const buttonClickSound = document.getElementById('button-sound');

document.querySelectorAll('.difficulty-button, .game-over').forEach(button => {
    button.addEventListener('click', () => {
        buttonClickSound.currentTime = 0; // Reset the audio to the beginning
        buttonClickSound.play(); // Play the button click sound
    });
});

// Ensure window size is 1440x900
function setWindowSize() {
    window.resizeTo(1440, 900);
}

window.onload = function() {
    setWindowSize();
    document.getElementById('game-container').classList.add('hidden'); // Ensure the game container is hidden initially
//    startGame('easy'); // TO DELETE WHEN I FINISH FIXING THE UI
    disableResize();
};

function disableResize() {
    window.addEventListener('resize', function() {
        if (window.outerWidth !== 1440 || window.outerHeight !== 900) {
            window.resizeTo(1440, 900);
        }
    });
}

window.onresize = setWindowSize;

function showMainModal() {
    document.getElementById('main-modal').classList.remove('hidden');
    document.getElementById('game-container').classList.add('hidden');
    clearInterval(timer);
}
