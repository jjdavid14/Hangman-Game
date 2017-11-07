// Initialize game object
var game = {
	word: "",
	guess: [],
	letterGuessed: [],
	guessRemaining: 8,
	wins: 0,
	losses: 0,

	// Constructs a new empty game
	start: function() {
		this.letterGuessed = [];
		this.guessRemaining = 8;
	},
	// Sets word to a random word from wordList
	setWord: function(wordList) {
		this.word = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
	},
	// Creates blank word of the current word
	initGuess: function() {
		this.guess = [];
		for(var i = 0; i < this.word.length; i++) {
			if(this.word.charAt(i) === ' ') {
				this.guess.push(' ');
			} else {
				this.guess.push('_');
			}
		}
	},
	// Display the guessed letters of the word
	displayGuess: function() {
		var str = "";
		for(var i = 0; i < this.guess.length; i++) {
			str += this.guess[i];
			if(this.guess[i] !== ' ') {
				str += " ";
			}
		}
		console.log(str);
	},
	// Replaces blanks ('_') with correct letters from letterGuessed
	fillBlanks: function() {
		// Check each letter in letterGuessed
		for(var i = 0; i < this.word.length; i++) {
			// If the letter in word is in the letterGuessed array,
			// then replace the blank ('_') with the letter.
			if(this.letterGuessed.indexOf(this.word.charAt(i)) > -1) {
				this.guess[i] = this.word.charAt(i);
			}
		}
	},
	// Checks if word is guessed correctly
	isGuessed: function() {
		for(var i = 0; i < this.guess.length; i++) {
			if(this.guess[i] === '_') {
				return false;
			}
		}
		return true;
	},
	// Check if there are anymore guesses remaining
	hasGuesses: function() {
		return this.guessRemaining > 0;
	},
	// Check if character is in the word
	isInword(key) {
		if(this.word.indexOf(key) < 0) {
			return false;
		}
		return true;
	},
	// Display wins and losses
	displayStats() {
		console.log("Wins: " + this.wins + " Losses: " + this.losses);
	}
};

// Initialize word list
var wordList = [
"Maltese",
"Labrador Retriever",
"German Shepherd",
"Golden Retriever",
"Bulldog",
"Beagle",
"Shih Tzu",
"Siberian Husky",
"Dachshund",
"Pomeranian"
];

function newGame() {
	game.start();
	game.setWord(wordList);
	console.log(game.word);
	game.initGuess();
	game.displayGuess();
}

newGame();

// User presses a key
document.onkeyup = function(event) {
	// Store the key pressed
	var keyPress = event.key.toUpperCase();

	if(game.letterGuessed.indexOf(keyPress) === -1) {
		game.letterGuessed.push(keyPress);
		game.fillBlanks();
	} else {
		console.log("Letter already guessed.");
		return;
	}

	game.displayGuess();

	// Check if word is guessed
	if(game.isGuessed()) {
		// If guessed update wins
		game.wins++;
		alert("WINNER!");
		game.displayStats();
		// Start a new game
		newGame();
	}
	// If not guessed
	else {
		// Check if there are no more remaining guesses
		if(!game.hasGuesses()) {
			// If no more guesses then update losses
			game.losses++;
			alert("LOST!");
			game.displayStats();
			// Start a new game
			newGame();
		}
		// If letter is not in the word then update remaining guesses
		if(!game.isInword(keyPress)) {
			game.guessRemaining--;
		}
	}
}