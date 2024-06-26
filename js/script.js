
let words = {
    easy: ["cake", "idea", "mile", "open", "tall", "pink", "quit", "spin", "urge", "zest", "apple", "dance", "hello", "jelly", "laser", "novel", "puppy", "quack", "vivid", "whale", "bird", "bell", "tree", "lock", "milk", "duck", "moon", "rain", "foot", "gold", "star", "hope", "wind", "home", "fire", "gift", "desk", "book", "drop", "jump", "lamp", "play", "town", "pool", "test", "hill", "rock", "swim", "ball", "kite", "fish", "crab", "frog", "hat", "sand", "plant", "rice", "wave", "sock", "pear", "bone", "chair", "sail", "ship", "deer", "plum", "sled", "wand", "swan", "drum", "trip", "mint", "corn", "wing", "boat", "dust", "grip", "horn", "leaf", "curl", "twig", "tape", "yarn", "nest", "fork", "brush", "snip", "nail", "rug", "plug", "bowl", "sink", "snack", "chat", "face", "hunt", "mark", "neck", "oven", "sale", "time", "vest", "word", "band", "card", "dart", "flag", "goat", "hail", "itch", "lake", "pair", "quiz", "road", "tale", "vase", "zebra", "cloud", "eagle", "floor", "ghost", "horse", "juice", "kiwi", "lemon", "music", "night", "peach", "queen", "river", "snake", "tiger", "uncle", "voice", "water"],
    medium: ["notepad", "cupcake", "bluejay", "sunrise", "starlit", "sandals", "popcorn", "glacier", "treetop", "fantasy", "firefly", "pioneer", "overlap", "cascade", "rainbow", "peacock", "journey", "muffins", "surgeon", "jukebox", "sidecar", "blanket", "grocery", "airport", "enlarge", "compile", "crimson", "enchant", "freight", "garland", "holiday", "iceberg", "jewelry", "kidneys", "laundry", "mailbox", "nightly", "octagon", "picture", "quality", "railway", "skylark", "tourism", "unicorn", "variety", "workout", "zealots", "adviser", "bandage", "caramel", "digital", "erosion", "forgive", "gingham", "harvest", "install", "journey", "kindred", "lullaby", "monitor", "nostrum", "opinion", "pursuit", "quantum", "release", "service", "torrent", "upstart", "village", "warrior", "zephyr", "almonds", "brocade", "custard", "diamond", "empower", "feather", "glimmer", "horizon", "infancy", "jackpot", "kitchen", "library", "mantled", "natural", "optical", "picture", "qualify", "respect", "sincere", "tourist", "unfolds", "various", "welcome", "zeniths", "aviator", "boulder", "creator", "drizzle", "elastic", "flaming", "gardens", "highway", "isotope", "justice", "kissing", "lettuce", "machine", "nimble", "orchard", "passion", "quintet", "remnant", "seaside", "teacher", "upscale", "venture", "wealthy", "zipline"],
    hard: ["camouflage", "exquisite", "hypocrisy", "indigo", "lethargic", "meticulous", "nostalgia", "perpendicular", "quintessence", "resilience", "serendipity", "tranquility", "vulnerable", "xenophobic", "yesterday", "zeppelin", "anxiety", "belligerent", "cacophony", "dystopia", "eclectic", "formidable", "gargantuan", "hierarchy", "impervious", "juxtaposition", "kaleidoscopic", "luminous", "malevolent", "nomenclature", "omnipotent", "panacea", "quintessential", "repertoire", "surreptitious", "ubiquitous", "verisimilitude", "wanderlust", "xenogenesis", "yearning", "zephyrous", "abracadabra", "bamboozle", "catastrophic", "dexterous", "eloquent", "fascinate", "alchemy", "boulevard", "chimney", "dwarves", "effervescent", "frequent", "galactic", "haphazard", "ignition", "juxtapose", "kaleidoscope", "labyrinth", "mnemonic", "oblivion", "paradox", "quagmire", "reservoir", "synchrony", "trajectory", "vignette", "whimsical", "xylophone", "yacht", "zephyr", "chaos", "zookeeper", "omniscient", "mercurial", "scintillating", "labyrinthine", "ineffable", "ostentatious", "magnanimous", "iridescent", "ephemeral", "insidious", "idiosyncratic", "ambidextrous", "incorrigible", "belligerent", "esoteric", "hegemony", "intransigent", "perspicacious", "recalcitrant", "sanctimonious", "unflappable", "veracity", "wanderlust", "xylophonist", "zephyrean", "calliope", "labyrinthine", "calisthenics", "bibliophile", "circumlocution", "denouement", "eviscerate", "felicity", "grandeur", "hyperbole", "idiosyncrasy", "kaleidoscope", "lethargy", "magniloquent", "nonchalant", "obfuscate", "penultimate", "quixotic", "reticent", "sesquipedalian", "truculent", "unctuous", "volition", "witticism", "xerophyte", "youthful", "zeitgeist", "abominable", "brobdingnagian", "cacophonous", "defenestration", "ephemeral", "fortuitous", "garrulous", "hubris", "indefatigable", "juxtaposition", "kvetch", "logorrhea", "machination"]
};

let timer;
let timeLeft = 60;
let errors = 0;
let correct = 0;
let currentWord = '';  // Stores the current word that needs to be typed
let currentDifficulty = 'easy';  //Stores the current difficulty level, defaulting to 'easy'
let previousWord = '';   // This will store the previously used word to ensure one word is not used twice in succession


document.getElementById('typingField').addEventListener('input', checkInput);  // On input event for the typing field, call checkInput function
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        showMainModal();  //On keydown event to check if the "Escape" key is pressed, calling showMainModal
    }
});

function startGame(difficulty) {   
    currentDifficulty = difficulty;  // This sets the difficulty
    document.getElementById('main-modal').classList.add('hidden');   // Hides the main modal
    document.getElementById('game-container').classList.remove('hidden'); // Shows the game container
    resetGame();
    startTimer();
    setNewWord();
document.getElementById('typingField').focus();  // Focus the typing field
}

function resetGame() {  //This is for when the player resets the game
    timeLeft = 60;
    errors = 0;
    correct = 0;
    updateScores();
    document.getElementById('typingField').value = '';  //Making sure we clear the typing field
}

function startTimer() {
    timer = setInterval(() => {  // Starts an interval that runs a function every 1 second and assigns the interval ID to 'timer'
        timeLeft--;  // Decreases the timeLeft by 1 second each time the interval runs
        const formattedTime = timeLeft < 10 ? `0${timeLeft}` : timeLeft;  // Formats timeLeft to add a leading zero if it is less than 10 seconds for display purposes
        document.getElementById('timer').innerText = `Time: ${formattedTime} sec`;  // Updates the timer display on the webpage with the formatted time (add the word sec)
        if (timeLeft === 0) {  // Checks if the timeLeft has reached 0 seconds
            clearInterval(timer);  // Stops the interval, stopping the countdown timer
            endGame();  // Calls the endGame function to handle the end-of-game actions (showing the score)
        }
    }, 1000);  // This is the interval of 1 second
}


function updateScores() {   // Updates the displayed score for errors and correct entries
    document.getElementById('errorNumber').innerText = `Errors: ${errors}`;
    document.getElementById('correctNumber').innerText = `Correct: ${correct}`;
}

function setNewWord() {
    const wordList = words[currentDifficulty];  // Retrieves the list of words corresponding to the current difficulty level and assigns it to wordList
    let newWord = currentWord;  // Initializes the variable newWord with the current word

    // Ensure the new word is different from the current word
    while (newWord === currentWord) {  // This line begins a loop that continues as long as newWord is the same as currentWord
        newWord = wordList[Math.floor(Math.random() * wordList.length)];  // Selects a random word from wordList and assigns it to newWord
    }

    previousWord = currentWord;  // Updates previousWord to store the value of the current word
    currentWord = newWord;  // Updates currentWord to the newly selected word
    document.getElementById('wordToType').innerText = currentWord;  // Updates the text content of the HTML element with the ID wordToType to display the new current word
}

// ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧.
// BEHOLD!!!! THE MOST REWORKED FUNCTION IN HUMAN HISTORY!!! 💀 😵‍💫 💀
// ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧. | ✧.

function checkInput() {
    const inputField = document.getElementById('typingField');  // Retrieves the input field element where the user types
    const correctSound = document.getElementById('correct-sound');  // Retrieves the audio element for the correct sound
    const incorrectSound = document.getElementById('incorrect-sound');  // Retrieves the audio element for the incorrect sound

    if (inputField.value === currentWord) {  // Checks if the player's typed input matches the current word
        correct++;  // Increments the count of correct words
        inputField.classList.add('correct');  // Adds the 'correct' class to the input field for visual feedback (green letters)
        correctSound.currentTime = 0; // Reset the audio to the beginning
        correctSound.play(); // Play the correct word sound
        setTimeout(() => {  // Sets a delay before executing the following code (100 miliseconds) so we get to see the green letters
            inputField.classList.remove('correct');  // Removes the 'correct' class from the input field
            inputField.value = '';  // Clears the input field
            setNewWord();  // Sets a new word
        }, 100);
    } else if (inputField.value.length >= currentWord.length) {  // Checks if the length of the typed input is greater than or equal to the current word length
        errors++;  // Increments the count of errors
        inputField.classList.add('incorrect');  // Adds the 'incorrect' class to the input field for visual feedback (red letters)
        incorrectSound.currentTime = 0; // Reset the audio to the beginning
        incorrectSound.play(); // Play the incorrect word sound
        setNewWord(); // Set a new word
        setTimeout(() => {  // Sets a delay before executing the following code (500 miliseconds) so we get to see the red letters
            inputField.classList.remove('incorrect');  // Removes the 'incorrect' class from the input field
            inputField.value = '';  // Clears the input field
        }, 500);
    }
    updateScores();  // Updates the displayed scores
}

// WHAT HAPPENS WHEN THE GAME ENDS
function endGame() {
    document.getElementById('game-container').classList.add('hidden');  // Hides the game container element by adding the 'hidden' class
    document.getElementById('end-modal').classList.remove('hidden');  // Shows the end modal element by removing the 'hidden' class

    const chosenDifficultyDiv = document.getElementById('chosen-difficulty');  // Retrieves the element for displaying the chosen difficulty
    const correctWordsDiv = document.getElementById('correct-words');  // Retrieves the element that displays the number of correct words for the score
    const errorWordsDiv = document.getElementById('error-words');  // Retrieves the element that displays the number of errors for the score


    chosenDifficultyDiv.innerText = `Difficulty:  ${currentDifficulty}`;  // Sets the inner text to display the chosen difficulty
    correctWordsDiv.innerText = `Correct:  ${correct}`;  // Sets the inner text of the correct words element to display the count of correct words
    errorWordsDiv.innerText = `Errors:  ${errors}`;  // Sets the inner text of the error words element to display the count of errors

    document.getElementById('final-score').classList.remove('hidden');  // Shows the final score element within the mainModal by removing the 'hidden' class
}

function restartGame() {
    document.getElementById('end-modal').classList.add('hidden');  // This hides the end modal
    document.getElementById('main-modal').classList.remove('hidden');  // This reveals the main modal
}


function retryGame() {
    document.getElementById('end-modal').classList.add('hidden');  // Hides the end game modal
    startGame(currentDifficulty);  // Restarts the game with the current / same difficulty
}

document.getElementById('typingField').addEventListener('keydown', playKeyPressSound);   // This is the typewriter sound every time you hit a key

function playKeyPressSound() {
    const audio = document.getElementById('keypress-sound');
    audio.currentTime = 0; // Reset the audio to the beginning
    audio.play(); // Play the sound
}

const buttonClickSound = document.getElementById('button-sound');    // This is the sound that plays when a <button> is pressed

document.querySelectorAll('.difficulty-button, .game-over').forEach(button => {
    button.addEventListener('click', () => {
        buttonClickSound.currentTime = 0; // Reset the audio to the beginning
        buttonClickSound.play(); // Play the button click sound
    });
});

// Ensure window size is 1200x750
function setWindowSize() {
    window.resizeTo(1000, 625);
}

window.onload = function() {
    setWindowSize();
    document.getElementById('game-container').classList.add('hidden'); // Ensure the game container is hidden initially
 //   startGame('easy'); // TO DELETE WHEN I FINISH FIXING THE UI
    disableResize();
};

function disableResize() {
    window.addEventListener('resize', function() {
        if (window.outerWidth !== 1000 || window.outerHeight !== 625) {
            window.resizeTo(1000, 625);
        }
    });
}

window.onresize = setWindowSize;

function showMainModal() {
    document.getElementById('main-modal').classList.remove('hidden');
    document.getElementById('game-container').classList.add('hidden');
    clearInterval(timer);
}
