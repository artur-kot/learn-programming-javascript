/**
 * Quiz Game Application
 *
 * A complete quiz system that combines multiple features:
 * - Question display with multiple choice answers
 * - Score tracking
 * - Timer system with countdown for each question
 * - Progress bar visualization
 * - Results screen with review options
 *
 * This is your entry point to extend with more features!
 */

// ============================================================================
// STARTER DATA - Sample Quiz Questions
// ============================================================================

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the capital of France?",
    answers: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2, // index of correct answer
    category: "Geography",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    answers: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    category: "Science",
  },
  {
    id: 3,
    question: "What is 2 + 2 × 2?",
    answers: ["6", "8", "4", "12"],
    correctAnswer: 0,
    category: "Math",
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    answers: ["Van Gogh", "Leonardo da Vinci", "Michelangelo", "Raphael"],
    correctAnswer: 1,
    category: "Art",
  },
  {
    id: 5,
    question: "What is the largest ocean on Earth?",
    answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: 3,
    category: "Geography",
  },
];

const QUIZ_CONFIG = {
  timePerQuestion: 30, // seconds
  passingScore: 60, // percentage
};

// ============================================================================
// QUIZ STATE MANAGEMENT
// ============================================================================

class QuizGame {
  constructor(questions = QUIZ_QUESTIONS, config = QUIZ_CONFIG) {
    this.questions = questions;
    this.config = config;
    this.reset();
  }

  reset() {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answers = []; // Store user answers
    this.isComplete = false;
    this.timeRemaining = this.config.timePerQuestion;
    this.timerInterval = null;
  }

  /**
   * TODO 1: DISPLAY CURRENT QUESTION
   * Implement a method that returns the current question object
   * Should handle case when quiz is complete or index is out of bounds
   */
  getCurrentQuestion() {
    // TODO: Return current question from this.questions array
    // TODO: Handle edge case where we're past the last question
  }

  /**
   * TODO 2: TRACK ANSWERS AND SCORING
   * Implement method to record user's answer and check if correct
   * Updates score if answer is correct
   */
  answerQuestion(userAnswerIndex) {
    // TODO: Get current question
    // TODO: Check if userAnswerIndex matches correctAnswer
    // TODO: Store the answer object { questionId, userAnswer, isCorrect, timeSpent }
    // TODO: Update score if correct (consider what scoring system to use)
    // TODO: Move to next question
  }

  /**
   * TODO 3: TRACK QUIZ PROGRESS
   * Implement methods to track progress through the quiz
   */
  getProgress() {
    // TODO: Return { current: currentIndex + 1, total: total questions, percentage: % }
  }

  /**
   * TODO 4: TIMER MANAGEMENT
   * Implement method to start countdown timer for current question
   * Timer should track remaining time and auto-advance to next question when time runs out
   */
  startTimer(onTick, onTimeUp) {
    // TODO: Initialize timeRemaining to config.timePerQuestion
    // TODO: Create setInterval that:
    //   - Decrements timeRemaining every 1000ms (1 second)
    //   - Calls onTick(timeRemaining) for UI updates
    //   - When timeRemaining reaches 0, call onTimeUp and stop timer
    //   - Store intervalId for cleanup
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  /**
   * TODO 5: CALCULATE FINAL RESULTS
   * Implement method to generate comprehensive results after quiz completes
   */
  getResults() {
    // TODO: Calculate total correct answers
    // TODO: Calculate percentage score
    // TODO: Determine pass/fail based on passingScore
    // TODO: Return results object:
    //   {
    //     totalQuestions,
    //     correctAnswers,
    //     incorrectAnswers,
    //     percentageScore,
    //     passed,
    //     answers (the full answer history)
    //   }
  }

  /**
   * TODO 6: QUIZ COMPLETION CHECK
   * Implement method to check if quiz is complete
   */
  isQuizComplete() {
    // TODO: Return true if currentQuestionIndex >= questions.length
  }

  /**
   * TODO 7: GET ANSWER REVIEW
   * Implement method to review specific question with user's answer vs correct answer
   */
  getAnswerReview(questionIndex) {
    // TODO: Return object with:
    //   - question text
    //   - all answers with labels
    //   - user's selected answer (marked)
    //   - correct answer (marked)
    //   - whether user got it right
  }

  /**
   * BONUS: Add your own features!
   * Some ideas:
   * - Shuffle questions or answers
   * - Filter questions by category
   * - Add difficulty levels
   * - Implement streaks (consecutive correct answers)
   * - Add hints system
   * - Implement time-based scoring (faster answers = more points)
   * - Add question skipping
   */
}

// ============================================================================
// EXAMPLE USAGE (Uncomment to test)
// ============================================================================

/*
const quiz = new QuizGame();

// Display first question
console.log("Question:", quiz.getCurrentQuestion());

// Answer first question
quiz.answerQuestion(2);

// Check progress
console.log("Progress:", quiz.getProgress());

// Move through quiz
quiz.answerQuestion(1);
quiz.answerQuestion(0);
quiz.answerQuestion(3);
quiz.answerQuestion(3);

// Get final results
console.log("Results:", quiz.getResults());
*/

// ============================================================================
// EXPORT FOR TESTING & BROWSER USE
// ============================================================================

// For Node.js (testing)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    QuizGame,
    QUIZ_QUESTIONS,
    QUIZ_CONFIG,
  };
}

// For browser (add to window object)
if (typeof window !== "undefined") {
  window.QuizGame = QuizGame;
  window.QUIZ_QUESTIONS = QUIZ_QUESTIONS;
  window.QUIZ_CONFIG = QUIZ_CONFIG;
}
