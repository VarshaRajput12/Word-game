const inputs = document.querySelector(".inputs");
const resetBtn = document.querySelector(".reset_btn");
const hint = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess_left span");
const wrongLetters = document.querySelector(".wrong_letters span");
const typingInput = document.querySelector(".typing_input");
// const congratsMsg = document.querySelector(".congrats");

let word,
  maxGuesses,
  correct = [],
  incorrect = [];
function randomWord() {
  let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = ranObj.word;
//   console.log(word);
  maxGuesses = 8;
  correct = [];
  incorrect = [];
  hint.innerText = ranObj.hint;
  guessLeft.innerText = maxGuesses;
  wrongLetters.innerText = incorrect;
  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
  }
  inputs.innerHTML = html;
}
randomWord();

resetBtn.addEventListener("click", randomWord);

function initGame(e) {
  let key = e.target.value.toLowerCase();
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrect.includes(`  ${key.toUpperCase()}`) &&
    !correct.includes(key)
  ) {
    if (word.includes(key)) {
      // console.log("found")
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          correct.push(key);
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      // console.log("not found")
      maxGuesses--;
      incorrect.push(`  ${key}`);
    }
    guessLeft.innerText = maxGuesses;
    wrongLetters.innerText = incorrect;
  }
  typingInput.value = "";
  setTimeout(()=>{
    if (correct.length === word.length) {
      // congratsMsg.innerHTML = `congrats🎊🎉 you found the ${word.toUpperCase()}`;
      alert(`Congrat🎊🎉! you found the word "${word.toUpperCase()}"`);
      randomWord();
    } else if (maxGuesses === 0) {
      // setTimeout(())
      alert("Game over! You don't have remaining guesses");
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  })
}

typingInput.addEventListener("input", initGame);
// inputs.addEventListener("click", () => {
//   typingInput.focus();
// });
document.addEventListener("keydown", () => {
  typingInput.focus();
});
