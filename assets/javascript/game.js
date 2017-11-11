// Play the song
$("#playSong").on("click", function() {
	document.getElementById("song").play();
});
// Pause the song
$("#pauseSong").on("click", function() {
	document.getElementById("song").pause();
});

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
			
			if(this.guess[i] === '_') {
				str += '<i class="material-icons">pets</i>';
			}
			else if(this.guess[i] === ' ') {
				str += "&nbsp;&nbsp;&nbsp;";
			}
			else {
				str += this.guess[i];
			}
			if(this.guess[i] !== ' ') {
				str += " ";
			}
		}
		document.getElementById("lettersToGuess").innerHTML = str;
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
		var str =  "Wins: " + this.wins;
		str += "<br/><br/>";
		str += "Losses: " + this.losses;
		document.getElementById("stats").innerHTML = str;
	},
	// Display remaining guesses
	displayRemainingGuess() {
		if(this.guessRemaining === 8) {
			document.getElementsByClassName("guesses-remaining")[0].setAttribute("class", "guesses-remaining text-center");
		}
		else if(this.guessRemaining <= 3) {
			document.getElementsByClassName("guesses-remaining")[0].setAttribute("class", "guesses-remaining text-center animated pulse infinite text-danger");
		}

		document.getElementById("guessesRemaining").innerHTML = this.guessRemaining;
	},
	// Display the letters guessed
	displayLettersGuessed() {
		var str = "";
		for(var i = 0; i < this.letterGuessed.length; i++) {
			str += '<span class="letters-guessed">' + this.letterGuessed[i] + '&nbsp;</span<';
		}
		document.getElementById("lettersGuessed").innerHTML = str;
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
	game.initGuess();
	game.displayGuess();
	game.displayRemainingGuess();
	game.displayStats();
}

newGame();

// User presses a key
document.onkeyup = function(event) {
	// Store the key pressed
	var keyPress = event.key.toUpperCase();

	// Check if key pressed is an alphabet
	if(!(keyPress.length === 1) || !/[A-Z]/i.test(keyPress)) {
		return;
	}


	if(game.letterGuessed.indexOf(keyPress) === -1) {
		game.letterGuessed.push(keyPress);
		if(game.isInword(keyPress)) {
			document.getElementById("audio").play();
		}
		game.fillBlanks();
	} else {
		return;
	}

	game.displayGuess();

	// Check if word is guessed
	if(game.isGuessed()) {
		// If guessed update wins
		game.wins++;
		//alert("WINNER!");
		document.getElementById("modalTitle").innerHTML = "CONGRATULATIONS!";
		document.getElementById("modalBody").innerHTML = "You're a winner!<br/>You guessed the word: " + game.word + "<br/>";
		$('#myModal').modal("show");
		game.displayStats();
		// Start a new game
		newGame();
	}
	// If not guessed
	else {
		// If letter is not in the word then update remaining guesses
		if(!game.isInword(keyPress)) {
			game.guessRemaining--;
		}
		// Check if there are no more remaining guesses
		if(!game.hasGuesses()) {
			// Show that there is no more guesses
			game.displayRemainingGuess();
			// If no more guesses then update losses
			game.losses++;
			//alert("LOST!");
			document.getElementById("modalTitle").innerHTML = "Sorry!";
			document.getElementById("modalBody").innerHTML = "You lose!<br/>The word was: " + game.word + "<br/>";
			$('#myModal').modal("show");
			game.displayStats();
			// Start a new game
			newGame();
		}
	}
	game.displayRemainingGuess();
	game.displayLettersGuessed();
}