/*
 * Create a list that holds all of your cards
 */
let totalMove = document.querySelector('.moves')
let cards = document.querySelectorAll('.card')
let allCards = [...cards];
const deck = document.querySelector('.deck')
let openedCards = []
let counter = 0
let umatchCount = 0
let start = 0
// Get the modal
const modal = document.getElementById('myModal');


document.body.onload = refresh()

function refresh() {
	//moveCounter()
	//total = 0
	//let counter = 0
	//let umatchCount = 0
	//moveCounter()
	//totalMove.textContent = `0  Move`;
	modal.style.display = "none";
	for (let card of shuffle(allCards)) {
		deck.appendChild(card)
		card.classList.remove('open', 'show', 'match')	
	}
	openedCards.length = 0
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


startGame()



function startGame(){
	for (let card of allCards) {
		card.addEventListener("click", function(){
			openCard(card)
			matchCards()
			moveCounter()
			startTime(umatchCount)
			showModal(counter)
			console.log(umatchCount-(counter*0.5))
			//console.log(startGame())
		})
	}
//return 1
}



function addToList(card) {
	if (openedCards.length <= 1) {
		openedCards.push(card.children[0].classList.value)
	} else {
		if (openedCards[0].localeCompare(card.children[0].classList.value) != 0) {
			openedCards.shift()
			openedCards.push(card.children[0].classList.value)
		}
	}
}


function openCard(card) {
	start = 1
	if (!card.classList.contains('open')) {
		card.classList.add('open', 'show')
		//check if there is atmost 1 item, if not remove the first one and replace with the current one
		addToList(card)
	}
} 


function hideUmatchedCards(element) {
	if (element.parentElement.classList.contains('open')) {
		//umatchCount += 1/2
			element.parentElement.classList.add('unmatch')
			setTimeout(function() {
				element.parentElement.classList.remove('unmatch','open','show')
			},300)
		}
		openedCards.length = 0
	}


function matchCards() {
	//check if the list items are the same and apply match 
	if (openedCards.length > 1 && openedCards[0].localeCompare(openedCards[1]) == 0) {
		let matched = document.querySelectorAll(`.${openedCards[1].substring(3,openedCards[1].length)}`)
		matched.forEach(function(element){
			element.parentElement.classList.add('match')
			counter += 1/2
		})
		openedCards.length = 0
	} else {
			umatchCount += 1/2
		setTimeout(function() {
			if (openedCards.length > 1 && openedCards[0].localeCompare(openedCards[1]) != 0) {
				let unmatched = document.querySelectorAll(`.${openedCards[0].substring(3,openedCards[0].length)}`)
				let unmatchedtwo = document.querySelectorAll(`.${openedCards[1].substring(3,openedCards[1].length)}`)
				unmatchedtwo.forEach(hideUmatchedCards)
				unmatched.forEach(hideUmatchedCards)
			}
		},300)
	}
}

function moveCounter() {
	let total = Math.floor(0.5*counter + umatchCount);
	if (total > 1 || total ==0) {
		totalMove.textContent = `${total}  Moves`;
	} else {
		totalMove.textContent = `${total}  Move`;
	}
	
}

let time = 0;
let timeLaps = document.querySelector('.timer');

function startTime() {
	if (umatchCount > 0 && counter < 8) {
	setTimeout(function () {
		time++;
		let hr = Math.floor(time/1000/60/60);
		let min = Math.floor((time/100/60) % 60);
		let sec = Math.floor((time/10) % 60);
		let tenths = time % 10;
		timeLaps.textContent = `${hr}:${min}:${sec}:${tenths}`;
		startTime();
	},100);
	}
}


if (counter > 0 ) {
	startTime()
}


function showModal(counter){
	if (counter === 8 ){
			modal.style.display = "block";
		}
}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
function closeModal() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}