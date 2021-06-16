const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect-letters');
const finalMessage = document.getElementById('final-message')
const popup = document.getElementById('popup-container');
const playbtn = document.getElementById('play-btn');
const notification = document.getElementById('notification-container');

const figureParts = document.querySelectorAll('.figure-part');

const words = ["fire","impartial","squeak","bomb","lunch","cave","teaching","pleasant","elated","noiseless","impress","laughable"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLettersArray = [];
const incorrectLettersArray =[];

function displayWord(){
    word.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLettersArray.includes(letter) ? letter :''}
                </span>`
            )
            .join('')
        }
    `;

    const innerWord = word.innerText.replace(/\n/g,'');

    if (innerWord === selectedWord){
        finalMessage.innerText = 'Congratulation You Won';
        popup.style.display ='flex';

    }
};

function showNotification(){
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    },2000);

}

function updateIncorrectletters(){
    incorrectLetters.innerHTML = `
    ${incorrectLettersArray.length > 0 ? '<p>Incorrect Letters</p>' : ''}
    ${incorrectLettersArray.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part,index) => {
        const errors = incorrectLettersArray.length;
        if(index < errors){
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }
    });
    if(incorrectLettersArray.length === figureParts.length){
        finalMessage.innerText = "YOU LOST";
        popup.style.display = 'flex';
    }

}

window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLettersArray.includes(letter)){
                correctLettersArray.push(letter);


                displayWord();
            }else{
                showNotification();

        }
        }else{
            if(!incorrectLettersArray.includes(letter)){
                incorrectLettersArray.push(letter);
                updateIncorrectletters();
            }else{
                showNotification();
            }
        }
    }
});

playbtn.addEventListener('click', () =>{
    correctLettersArray.splice(0);
    incorrectLettersArray.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    updateIncorrectletters();
    popup.style.display = 'none';
    displayWord();
})

displayWord();