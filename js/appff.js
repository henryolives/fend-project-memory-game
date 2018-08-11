/*
 * Create a list that holds all of your cards
 */

let cards = document.querySelectorAll('.card')
let allCards = [...cards];
const deck = document.querySelector('.deck')
document.body.onload = refresh()
function refresh(){
	
for(let card of shuffle(allCards)){
	deck.appendChild(card)
	card.classList.remove('open', 'show')
}}

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
let totalMove = document.querySelector('.moves')
let openedCards = []
let counter = 0
let moveCount = 0
let start = 0

for (let card of cards){
		start =1
		card.addEventListener("click", function(){
		//startTime()
		
		//check if the card is not opened, if not open
		openCard(card)
		/*if(openedCards.length == 1){
			startTime()
		}*/
		//add card to opened card list
		addCardToList(card)
		//check if the list items are the same and apply match
		showMatchedCards()
		moveCounter()
		// 
		showModal(counter)

		//console.log(counter + moveCount)
		console.log(start)
	})
}


		

function closeUnmatchedCards(){
	if(openedCards.length > 1 && openedCards[0].localeCompare(openedCards[1]) != 0){
		moveCount += 1
		let unmatched = document.querySelectorAll(`.${openedCards[0].substring(3,openedCards[0].length)}`)
		let unmatchedtwo = document.querySelectorAll(`.${openedCards[1].substring(3,openedCards[1].length)}`)
		unmatched.forEach(hideUmatchedCards)
		unmatchedtwo.forEach(hideUmatchedCards)
	}
	
}


function openCard(card){
	if(!card.classList.contains('open')){
			card.classList.add('open', 'show')
		}
}


function addCardToList(card){
	//check if there is atmost 1 item, if not remove the first one and replace with the current one
		if (openedCards.length <= 1 && !card.classList.contains('open')){
			openedCards.push(card.children[0].classList.value)
		}else{
			if(openedCards[0].localeCompare(card.children[0].classList.value) != 0){
			openedCards.shift()
			openedCards.push(card.children[0].classList.value)
		}
		}
}

function showMatchedCards(){
if(openedCards.length > 1 && openedCards[0].localeCompare(openedCards[1]) == 0){
			let matched = document.querySelectorAll(`.${openedCards[1].substring(3,openedCards[1].length)}`)
			matched.forEach(function(element){
				element.parentElement.classList.add('match')
				counter += (1/2)
			})
			openedCards.length = 0
		}else{setTimeout(closeUnmatchedCards,300)
			//moveCount += (1/2)
		}
}

function hideUmatchedCards(element){
	if(element.parentElement.classList.contains('open')){
			element.parentElement.classList.add('unmatch')
			setTimeout(function(){
				element.parentElement.classList.remove('unmatch','open','show')
			},300)
		}
		openedCards.length = 0
	}


function moveCounter(){
	let total =  counter+ moveCount;
	if(total > 1){
		totalMove.textContent = `${total}  Moves`;
	}else{
		totalMove.textContent = `${total}  Move`;
	}
	
	}



let time = 0;
let timeLaps = document.querySelector('.timer');

function startTime(){
	if(counter < 8){
	setTimeout(function(){
		time++;
		let hr = Math.floor(time/10/60/60);
		let min = Math.floor((time/100/60) % 60);
		let sec = Math.floor((time/100) % 60);
		let tenths = time % 60;
		timeLaps.textContent = `${hr}:${min}:${sec}:${tenths}`;
		startTime();
	},100);
	}
}



function showModal(counter){
	if (counter === 8 ){
			modal.style.display = "block";
		}
}

// Get the modal
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}