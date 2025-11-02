/**
 * Quiz Game - Browser Integration
 *
 * This file connects the QuizGame class with the HTML interface.
 * Once you complete the TODOs in quiz.js, this will bring your quiz to life!
 */

// ============================================================================
// DOM ELEMENTS
// ============================================================================

const questionSection = document.getElementById("questionSection");
const questionText = document.getElementById("questionText");
const answersGrid = document.getElementById("answersGrid");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const timerDisplay = document.getElementById("timer");

const resultsSection = document.getElementById("resultsSection");
const finalScore = document.getElementById("finalScore");
const correctCount = document.getElementById("correctCount");
const passStatus = document.getElementById("passStatus");

const reviewSection = document.getElementById("reviewSection");
const reviewContainer = document.getElementById("reviewContainer");

const reviewBtn = document.getElementById("reviewBtn");
const restartBtn = document.getElementById("restartBtn");
const backToResultsBtn = document.getElementById("backToResultsBtn");

// ============================================================================
// QUIZ INSTANCE & STATE
// ============================================================================

let quiz;
let currentTimer = null;

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  initializeQuiz();
});

function initializeQuiz() {
  quiz = new QuizGame();
  displayQuestion();
}

// ============================================================================
// QUESTION DISPLAY
// ============================================================================

function displayQuestion() {
  // Clear previous state
  answersGrid.innerHTML = "";
  currentTimer && quiz.stopTimer();

  // Get current question
  const question = quiz.getCurrentQuestion();

  if (!question) {
    // Quiz is complete
    displayResults();
    return;
  }

  // Update question text
  questionText.textContent = question.question;

  // Display answer buttons
  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;
    button.onclick = () => handleAnswer(index, button);
    answersGrid.appendChild(button);
  });

  // Update progress
  updateProgress();

  // Start timer
  startQuestionTimer();
}

function handleAnswer(answerIndex, buttonElement) {
  // Disable all buttons
  disableAnswerButtons();

  // Get current question for visual feedback
  const question = quiz.getCurrentQuestion();
  const isCorrect = answerIndex === question.correctAnswer;

  // Show visual feedback
  const allButtons = document.querySelectorAll(".answer-btn");
  allButtons[answerIndex].classList.add(
    isCorrect ? "correct" : "incorrect"
  );
  allButtons[question.correctAnswer].classList.add("correct");

  // Record answer
  quiz.answerQuestion(answerIndex);

  // Move to next question after delay
  setTimeout(() => {
    displayQuestion();
  }, 1500);
}

function disableAnswerButtons() {
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((btn) => (btn.disabled = true));
}

function enableAnswerButtons() {
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach((btn) => (btn.disabled = false));
}

// ============================================================================
// PROGRESS TRACKING
// ============================================================================

function updateProgress() {
  const progress = quiz.getProgress();
  progressText.textContent = `Question ${progress.current} of ${progress.total}`;
  progressFill.style.width = `${progress.percentage}%`;
}

// ============================================================================
// TIMER MANAGEMENT
// ============================================================================

function startQuestionTimer() {
  const config = quiz.config;

  quiz.startTimer(
    (remaining) => {
      updateTimerDisplay(remaining);

      // Change color based on time remaining
      if (remaining <= 5) {
        timerDisplay.classList.add("danger");
        timerDisplay.classList.remove("warning");
      } else if (remaining <= 10) {
        timerDisplay.classList.add("warning");
        timerDisplay.classList.remove("danger");
      } else {
        timerDisplay.classList.remove("warning", "danger");
      }
    },
    () => {
      // Auto-submit when time runs out
      handleTimeUp();
    }
  );
}

function updateTimerDisplay(remaining) {
  timerDisplay.textContent = `${remaining}s`;
}

function handleTimeUp() {
  // Auto-submit with no answer (or first answer)
  const buttons = document.querySelectorAll(".answer-btn");
  if (buttons.length > 0) {
    handleAnswer(0, buttons[0]);
  }
}

// ============================================================================
// RESULTS DISPLAY
// ============================================================================

function displayResults() {
  const results = quiz.getResults();

  // Hide question section, show results section
  questionSection.classList.add("hidden");
  resultsSection.classList.remove("hidden");
  reviewSection.classList.add("hidden");

  // Display statistics
  finalScore.textContent = `${results.percentageScore.toFixed(1)}%`;
  correctCount.textContent = `${results.correctAnswers} / ${results.totalQuestions}`;

  // Set pass status
  passStatus.textContent = results.passed ? "PASSED ✓" : "FAILED ✗";
  passStatus.classList.add(results.passed ? "pass" : "fail");

  // Scroll to results
  window.scrollTo(0, 0);
}

// ============================================================================
// REVIEW FUNCTIONALITY
// ============================================================================

reviewBtn.addEventListener("click", () => {
  displayReview();
});

function displayReview() {
  // Hide results, show review
  resultsSection.classList.add("hidden");
  reviewSection.classList.remove("hidden");

  // Clear previous review
  reviewContainer.innerHTML = "";

  // Display review for each question
  for (let i = 0; i < quiz.questions.length; i++) {
    const review = quiz.getAnswerReview(i);
    const reviewItem = createReviewItem(review, i);
    reviewContainer.appendChild(reviewItem);
  }
}

function createReviewItem(review, index) {
  const item = document.createElement("div");
  item.className = `review-item ${review.isCorrect ? "correct" : "incorrect"}`;

  // Question text
  const questionDiv = document.createElement("div");
  questionDiv.className = "review-question";
  questionDiv.textContent = `${index + 1}. ${review.question} ${
    review.isCorrect ? "✓" : "✗"
  }`;
  item.appendChild(questionDiv);

  // Answer options
  const answersDiv = document.createElement("div");
  answersDiv.className = "review-answers";

  review.answers.forEach((answer, idx) => {
    const answerDiv = document.createElement("div");
    answerDiv.className = "review-answer";

    // Add labels
    let label = "";
    if (idx === review.correctAnswer) {
      answerDiv.classList.add("correct-answer");
      label = " (Correct)";
    }
    if (idx === review.userAnswer && idx !== review.correctAnswer) {
      answerDiv.classList.add("user-answer");
      label = " (Your answer)";
    } else if (idx === review.userAnswer) {
      label = " (Your answer)";
    }

    answerDiv.textContent = `${String.fromCharCode(65 + idx)}. ${answer}${label}`;
    answersDiv.appendChild(answerDiv);
  });

  item.appendChild(answersDiv);
  return item;
}

// ============================================================================
// RESTART FUNCTIONALITY
// ============================================================================

restartBtn.addEventListener("click", () => {
  quiz.reset();
  quiz.stopTimer();
  resultsSection.classList.add("hidden");
  reviewSection.classList.add("hidden");
  questionSection.classList.remove("hidden");
  passStatus.classList.remove("pass", "fail");
  displayQuestion();
});

backToResultsBtn.addEventListener("click", () => {
  reviewSection.classList.add("hidden");
  resultsSection.classList.remove("hidden");
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

window.addEventListener("error", (event) => {
  console.error("Error:", event.error);
  questionText.textContent =
    "An error occurred. Check the console for details.";
});
