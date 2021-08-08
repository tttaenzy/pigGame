'use strict';
//selected elements 
const score0 = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let score, currentScore, activePlayer, playing;
//function to init game
const init = function () {
    //starting condition



    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;



    current0.textContent = 0;
    current1.textContent = 0;
    score0.textContent = 0;
    score1EL.textContent = 0;
    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player1.classList.remove('player--active');
    player0.classList.add('player--active');

}



const switchPlayer = function () {

    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

init();
//rolling dice funtionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        //1.generate random number
        const randomNumber = Math.trunc(Math.random() * 6) + 1;
        // console.log(randomNumber);
        //display dice
        dice.classList.remove('hidden');
        dice.src = `dice-${randomNumber}.png`;
        //check for roll 1 if true switch to next player
        if (randomNumber !== 1) {
            //add dice to the current score
            currentScore = currentScore + randomNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;


        } else {
            //switch to next player
            switchPlayer();
        }
    }
});

//holding dice functionality
btnHold.addEventListener('click', function () {
    if (playing) {
        //add current score of active player  to total score
        score[activePlayer] = score[activePlayer] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];


        //player win if score > 50
        if (score[activePlayer] >= 10) {
            playing = false;
            dice.classList.add('hidden');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');



        } else {
            // or switch player 
            switchPlayer();

        }
    }
});

//resetting game
btnNew.addEventListener('click', init);

