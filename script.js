let q = document.querySelector("#Q");
let answerBtns = document.querySelector("#answer-btns");
let nextBtn = document.querySelector("#next-btn");

let questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest continent?",
    answers: [
      { text: "Asia", correct: false },
      { text: "America", correct: false },
      { text: "Arctic", correct: false },
      { text: "Australia", correct: true },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "gobi", correct: false },
      { text: "sahara", correct: false },
      { text: "Antarctica", correct: true },
      { text: "kalhari", correct: false },
    ],
  },
  {
    question: "Which is the smallest city in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Shri Lanka", correct: false },
      { text: "Nepal", correct: false },
      { text: "Bhutan", correct: false },
    ],
  },
];
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
   currentQuestionIndex = 0;
   score = 0;
   nextBtn.innerHTML = "Next";
   showQuestion();
}

function showQuestion() {
  resetState();
  let currQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  q.innerHTML = questionNo + ". " + currQuestion.question;

  currQuestion.answers.forEach((answer) => {
    let newBtn = document.createElement("button");
    newBtn.innerHTML = answer.text;
    newBtn.classList.add("btn");
    answerBtns.appendChild(newBtn);
    if (answer.correct) {
      newBtn.dataset.correct = answer.correct;
    }
    newBtn.addEventListener("click", selectAnswer);
    newBtn.addEventListener("click",()=>{
      newBtn.style.mixBlendMode = "normal"
    })
  });
}
function resetState() {
  nextBtn.style.display = "none";
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
}
function selectAnswer(e) {
  let selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtns.children).forEach((button) => {
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function displayScore() {
  resetState();
  q.innerHTML = `your scored ${score} out of ${questions.length}`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}
function handleNextBtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    displayScore();
  }
}
nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  } else {
    startQuiz();
  }
});
startQuiz();
