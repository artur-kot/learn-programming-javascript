/**
 * Quiz Game Tests
 *
 * Test suite for the QuizGame class
 * Tests core functionality and edge cases
 */

const { QuizGame, QUIZ_QUESTIONS, QUIZ_CONFIG } = require("./quiz");

describe("QuizGame", () => {
  let quiz;

  beforeEach(() => {
    quiz = new QuizGame();
  });

  // ========================================================================
  // INITIALIZATION TESTS
  // ========================================================================

  describe("Initialization", () => {
    test("should initialize with default questions", () => {
      expect(quiz.questions.length).toBe(QUIZ_QUESTIONS.length);
    });

    test("should start at question 0", () => {
      expect(quiz.currentQuestionIndex).toBe(0);
    });

    test("should start with score 0", () => {
      expect(quiz.score).toBe(0);
    });

    test("should have empty answers array initially", () => {
      expect(quiz.answers.length).toBe(0);
    });

    test("should not be complete initially", () => {
      expect(quiz.isComplete).toBe(false);
    });

    test("should respect custom config", () => {
      const customConfig = { timePerQuestion: 60, passingScore: 70 };
      const customQuiz = new QuizGame(QUIZ_QUESTIONS, customConfig);
      expect(customQuiz.config.timePerQuestion).toBe(60);
    });
  });

  // ========================================================================
  // QUESTION NAVIGATION TESTS
  // ========================================================================

  describe("getCurrentQuestion", () => {
    test("should return first question initially", () => {
      const question = quiz.getCurrentQuestion();
      expect(question).toBeDefined();
      expect(question.id).toBe(1);
    });

    test("should return correct question after advancing", () => {
      // Assuming answerQuestion advances to next question
      quiz.answerQuestion(0);
      const question = quiz.getCurrentQuestion();
      expect(question.id).toBe(2);
    });

    test("should return undefined when quiz is complete", () => {
      // Answer all questions
      for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
        quiz.answerQuestion(0);
      }
      const question = quiz.getCurrentQuestion();
      expect(question).toBeUndefined();
    });
  });

  // ========================================================================
  // ANSWER TRACKING TESTS
  // ========================================================================

  describe("answerQuestion", () => {
    test("should record answer correctly", () => {
      quiz.answerQuestion(2); // Answer first question
      expect(quiz.answers.length).toBe(1);
    });

    test("should advance to next question", () => {
      quiz.answerQuestion(0);
      expect(quiz.currentQuestionIndex).toBe(1);
    });

    test("should increment score for correct answer", () => {
      const correctAnswerIndex = quiz.questions[0].correctAnswer;
      quiz.answerQuestion(correctAnswerIndex);
      expect(quiz.score).toBeGreaterThan(0);
    });

    test("should not increment score for wrong answer", () => {
      const correctAnswerIndex = quiz.questions[0].correctAnswer;
      const wrongAnswerIndex =
        (correctAnswerIndex + 1) % quiz.questions[0].answers.length;
      quiz.answerQuestion(wrongAnswerIndex);
      expect(quiz.score).toBe(0);
    });

    test("should track all answers in order", () => {
      quiz.answerQuestion(0);
      quiz.answerQuestion(1);
      quiz.answerQuestion(2);
      expect(quiz.answers.length).toBe(3);
    });
  });

  // ========================================================================
  // PROGRESS TRACKING TESTS
  // ========================================================================

  describe("getProgress", () => {
    test("should return progress object", () => {
      const progress = quiz.getProgress();
      expect(progress).toHaveProperty("current");
      expect(progress).toHaveProperty("total");
      expect(progress).toHaveProperty("percentage");
    });

    test("should show 1/5 at start", () => {
      const progress = quiz.getProgress();
      expect(progress.current).toBe(1);
      expect(progress.total).toBe(QUIZ_QUESTIONS.length);
    });

    test("should update progress after answering", () => {
      quiz.answerQuestion(0);
      const progress = quiz.getProgress();
      expect(progress.current).toBe(2);
    });

    test("should calculate percentage correctly", () => {
      const progress = quiz.getProgress();
      expect(progress.percentage).toBe((1 / QUIZ_QUESTIONS.length) * 100);
    });
  });

  // ========================================================================
  // TIMER TESTS
  // ========================================================================

  describe("Timer System", () => {
    test("should start timer", (done) => {
      let tickCount = 0;
      quiz.startTimer(
        () => {
          tickCount++;
        },
        () => {}
      );
      setTimeout(() => {
        expect(tickCount).toBeGreaterThan(0);
        quiz.stopTimer();
        done();
      }, 1500);
    });

    test("should call onTimeUp when timer expires", (done) => {
      let timeUpCalled = false;
      quiz.startTimer(
        () => {},
        () => {
          timeUpCalled = true;
        }
      );
      setTimeout(() => {
        expect(timeUpCalled).toBe(true);
        done();
      }, quiz.config.timePerQuestion * 1000 + 100);
    });

    test("should stop timer", (done) => {
      quiz.startTimer(() => {}, () => {});
      quiz.stopTimer();
      const remainingBefore = quiz.timeRemaining;
      setTimeout(() => {
        const remainingAfter = quiz.timeRemaining;
        expect(remainingBefore).toBe(remainingAfter);
        done();
      }, 500);
    });

    test("should decrement timeRemaining", (done) => {
      const initialTime = quiz.timeRemaining;
      quiz.startTimer(() => {}, () => {});
      setTimeout(() => {
        expect(quiz.timeRemaining).toBeLessThan(initialTime);
        quiz.stopTimer();
        done();
      }, 1500);
    });
  });

  // ========================================================================
  // RESULTS TESTS
  // ========================================================================

  describe("getResults", () => {
    test("should return results object with required properties", () => {
      // Answer all questions
      for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
        quiz.answerQuestion(0);
      }
      const results = quiz.getResults();
      expect(results).toHaveProperty("totalQuestions");
      expect(results).toHaveProperty("correctAnswers");
      expect(results).toHaveProperty("incorrectAnswers");
      expect(results).toHaveProperty("percentageScore");
      expect(results).toHaveProperty("passed");
      expect(results).toHaveProperty("answers");
    });

    test("should calculate correct answer count", () => {
      const question = quiz.questions[0];
      quiz.answerQuestion(question.correctAnswer);
      quiz.answerQuestion(0);
      quiz.answerQuestion(0);
      quiz.answerQuestion(0);
      quiz.answerQuestion(0);
      const results = quiz.getResults();
      expect(results.correctAnswers).toBe(1);
    });

    test("should calculate percentage score", () => {
      for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
        quiz.answerQuestion(quiz.questions[i].correctAnswer);
      }
      const results = quiz.getResults();
      expect(results.percentageScore).toBe(100);
    });

    test("should determine pass status", () => {
      // Answer all correctly
      for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
        quiz.answerQuestion(quiz.questions[i].correctAnswer);
      }
      let results = quiz.getResults();
      expect(results.passed).toBe(true);

      // Reset and answer incorrectly
      quiz.reset();
      for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
        quiz.answerQuestion(9999); // Invalid answer
      }
      results = quiz.getResults();
      expect(results.passed).toBe(false);
    });
  });

  // ========================================================================
  // COMPLETION TESTS
  // ========================================================================

  describe("isQuizComplete", () => {
    test("should return false initially", () => {
      expect(quiz.isQuizComplete()).toBe(false);
    });

    test("should return true after answering all questions", () => {
      for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
        quiz.answerQuestion(0);
      }
      expect(quiz.isQuizComplete()).toBe(true);
    });
  });

  // ========================================================================
  // REVIEW TESTS
  // ========================================================================

  describe("getAnswerReview", () => {
    test("should return review object", () => {
      quiz.answerQuestion(0);
      const review = quiz.getAnswerReview(0);
      expect(review).toBeDefined();
      expect(review).toHaveProperty("question");
      expect(review).toHaveProperty("answers");
      expect(review).toHaveProperty("userAnswer");
      expect(review).toHaveProperty("correctAnswer");
      expect(review).toHaveProperty("isCorrect");
    });

    test("should include all answer options", () => {
      quiz.answerQuestion(0);
      const review = quiz.getAnswerReview(0);
      expect(review.answers.length).toBe(QUIZ_QUESTIONS[0].answers.length);
    });

    test("should identify correct answer", () => {
      quiz.answerQuestion(0);
      const review = quiz.getAnswerReview(0);
      expect(review.correctAnswer).toBe(QUIZ_QUESTIONS[0].correctAnswer);
    });

    test("should track user's selected answer", () => {
      quiz.answerQuestion(2);
      const review = quiz.getAnswerReview(0);
      expect(review.userAnswer).toBe(2);
    });
  });

  // ========================================================================
  // RESET TESTS
  // ========================================================================

  describe("reset", () => {
    test("should reset state to initial values", () => {
      quiz.answerQuestion(0);
      quiz.answerQuestion(1);
      quiz.reset();
      expect(quiz.currentQuestionIndex).toBe(0);
      expect(quiz.score).toBe(0);
      expect(quiz.answers.length).toBe(0);
      expect(quiz.isComplete).toBe(false);
    });
  });

  // ========================================================================
  // EDGE CASE TESTS
  // ========================================================================

  describe("Edge Cases", () => {
    test("should handle answering with out-of-bounds index gracefully", () => {
      expect(() => {
        quiz.answerQuestion(9999);
      }).not.toThrow();
    });

    test("should handle negative index gracefully", () => {
      expect(() => {
        quiz.answerQuestion(-1);
      }).not.toThrow();
    });

    test("should handle multiple resets", () => {
      quiz.answerQuestion(0);
      quiz.reset();
      quiz.reset();
      expect(quiz.currentQuestionIndex).toBe(0);
      expect(quiz.score).toBe(0);
    });

    test("should handle quiz with no questions", () => {
      const emptyQuiz = new QuizGame([]);
      expect(emptyQuiz.isQuizComplete()).toBe(true);
    });
  });
});
