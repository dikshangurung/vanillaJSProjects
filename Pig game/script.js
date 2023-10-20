// alert("ok");
const batman_write = document.querySelector(".batman_write");
const continue_btn = document.querySelector(".continue_btn");
const p1score = document.querySelector(".p1score");
const p2score = document.querySelector(".p2score");
const outerCircle1 = document.querySelector(".circle1");
const outerCircle2 = document.querySelector(".circle2");
const hold_btn = document.querySelector(".hold_btn");
const roll_btn = document.querySelector(".roll_btn");
const diceImage = document.querySelector(".dice img");
const player1 = document.querySelector(".p1");
const player2 = document.querySelector(".p2");
const hide = document.querySelector(".hide");
const cross_mark = document.querySelector(".cross_mark");
const finish_btn = document.querySelector(".finish_btn");
const winner_name = document.querySelector(".winner_name");
const left_arrow = document.querySelector(".left_arrow");
const right_arrow = document.querySelector(".right_arrow");
const image_src = document.querySelector(".batman img");
let index = 0;
let targetScore = 75;
let roll_counter = 0;
let selected_character;
const tutorial = [
  "This is a classic Pig game",
  "Hold to bank score",
  "Roll to increase hold score",
  "If 1 rolls you lose hold score",
  "Score 100 to win",
  `And last,
   I am BATMAN`,
];
const batman = {
  start: "I am batman",
  dialogue: [
    "I am Vengeance",
    "Dice rolls, justice unfolds",
    "Don't Spam Roll button",
    "I'm Batman",
  ],
  taunt: "True strength lies in avoiding unnecessary risks.",
  save: "Good No unnecessary risks.",
  image: "./batman.jpg",
};
const joker = {
  start: "Hey Batsy, your cape needs a fashion upgrade!",
  dialogue: [
    "Hey Batsy, your cape needs a fashion upgrade!",
    "Dice don't lie, unless they're laughing at you.",
    "Yesss, Spam the Roll button",
    "Hahahahahhhhh...",
  ],
  taunt: "Do it.You know you want it :}",
  save: "Ughh Somebody too Scare to roll..",
  image: "./joker.jpg",
};
const imposter = {
  dialogue: [
    "ahh a victim.. I mean .. I'm here to help",
    "I am not Sus...",
    "Where are the crewmates btw",
  ],
  taunt: "Just do it, I am not Sus trust me...",
  save: "See told ya.I'm not the imposter (I'll get ya next time)",
  image: "./imposter.jpg",
};
const levi = {
  dialogue: [
    "Just give up your dreams and <--censored:(-->",
    "I'll leave chance to the fools. I rely on skill and strategy.",
    "Dice games? Childish distractions. I focus on the mission.",
  ],
  taunt: "So what is it gonna be?",
  save: "Your score will never kill a titan",
  image: "./levi.jpg",
};
const characters = [batman, joker, imposter, levi];
function character_talk(ch) {
  image_src.src = ch.image;
  if (roll_counter == 5) {
    batman_write.textContent = ch.taunt;
  } else {
    batman_write.textContent =
      ch.dialogue[Math.trunc(Math.random() * ch.dialogue.length)];
  }
}
function save(ch) {
  batman_write.textContent = ch.save;
}
continue_btn.addEventListener("click", function () {
  batman_write.textContent = tutorial[index];
  index++;
  if (index == tutorial.length) {
    continue_btn.style.display = "none";
  }
});

//Roll dice
let current_score, total_score, activePlayer, playing;
const intial = function () {
  current_score = [0, 0];
  total_score = [0, 0];
  activePlayer = 0;
  playing = true;
  player1.classList.add("active");
  hide.style.display = "none";
  outerCircle1.style.backgroundImage = `conic-gradient(#2d2c2a 0deg, #2d2c2a
    ${0}%, transparent ${0}%, transparent 100%)`;
  outerCircle2.style.backgroundImage = `conic-gradient(#2d2c2a 0deg, #2d2c2a ${0}%, transparent ${0}%, transparent
    100%)`;
  // player1El.classList.remove("player_winner");
  // player2El.classList.remove("player_winner");
  p1score.textContent = 0;
  p2score.textContent = 0;
  // total_score1.textContent = 0;
  // total_score2.textContent = 0;
};
intial();

//choices
const active_status = function () {
  current_score[activePlayer] = 0;
  p1score.textContent = current_score[0];
  p2score.textContent = current_score[1];
  roll_counter = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  if (activePlayer) {
    left_arrow.style.display = "none";
    right_arrow.style.display = "block";
  } else {
    left_arrow.style.display = "block";
    right_arrow.style.display = "none";
  }
  player1.classList.toggle("active");
  player2.classList.toggle("active");
};
roll_btn.addEventListener("click", function () {
  continue_btn.style.display = "none";
  roll_counter++;
  selected_character = characters[Math.trunc(Math.random() * 4)];
  if (playing) {
    const dice_number = Math.trunc(Math.random() * 6) + 1;
    diceImage.src = `dice-${dice_number}.png`;
    // diceImage.classList.remove("hidden");
    if (dice_number !== 1 && activePlayer === 0) {
      current_score[0] += dice_number;
      p1score.textContent = current_score[0];
      character_talk(selected_character);
    } else if (dice_number !== 1 && activePlayer === 1) {
      current_score[1] += dice_number;
      p2score.textContent = current_score[1];
      character_talk(selected_character);
    } else {
      active_status();
    }
  }
});
hold_btn.addEventListener("click", function () {
  continue_btn.style.display = "none";
  save(selected_character);
  if (playing) {
    if (activePlayer === 0) {
      left_arrow.style.display = "block";
      right_arrow.style.display = "none";
      // total_score[0] += current_score[0];
      total_score[0] += current_score[0];
      outerCircle1.style.backgroundImage = `conic-gradient(#2d2c2a 0deg, #2d2c2a ${total_score[0]}%, transparent ${total_score[0]}%, transparent 100%)`;
      if (total_score[activePlayer] >= 100) {
        playing = false;
        hide.style.display = "block";
        winner_name.textContent = `Player1`;
        // diceImage.classList.add("hidden");
      }
    } else {
      left_arrow.style.display = "none";
      right_arrow.style.display = "block";
      total_score[1] += current_score[1];
      outerCircle2.style.backgroundImage = `conic-gradient(#2d2c2a 0deg, #2d2c2a ${total_score[1]}%, transparent ${total_score[1]}%, transparent 100%)`;
      if (total_score[activePlayer] >= 100) {
        playing = false;
        hide.style.display = "block";
        winner_name.textContent = `Player2`;
      }
    }
    active_status();
  }
});
cross_mark.addEventListener("click", function () {
  intial();
});
finish_btn.addEventListener("click", function () {
  intial();
});
