# Exercise 181: Quiz Game - Complete Application

## Overview

Build a **complete, extensible quiz application** that combines multiple features:
- ✅ Display questions with multiple choice answers
- ✅ Track scores and correct/incorrect answers
- ✅ Implement a countdown timer for each question
- ✅ Display progress through the quiz
- ✅ Show final results with statistics
- ✅ Allow users to review their answers

This is your **entry point** for a capstone project where you can add more features!

## What You'll Build

A professional quiz game system with a clean architecture that separates game logic from UI concerns. By the end, you'll have:

```
QuizGame Class
├── Question Navigation
│   ├── getCurrentQuestion()
│   └── getProgress()
├── Answer Tracking
│   ├── answerQuestion()
│   └── answers array
├── Scoring System
│   ├── score tracking
│   └── getResults()
├── Timer Management
│   ├── startTimer()
│   ├── stopTimer()
│   └── timeRemaining
└── Review System
    ├── getAnswerReview()
    └── isQuizComplete()
```

## Key Concepts

### 1. State Management

The QuizGame class manages all application state:

```javascript
class QuizGame {
  constructor(questions, config) {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answers = [];
    this.isComplete = false;
    this.timeRemaining = this.config.timePerQuestion;
  }
}
```

### 2. Question Flow

Questions progress linearly through the quiz:

```
Question 1 → Answer 1 → Question 2 → Answer 2 → ... → Results
```

### 3. Score Calculation

Implement a scoring system (simplest: 1 point per correct answer):

```javascript
// Example scoring
correctAnswers = 4
totalQuestions = 5
percentageScore = (4 / 5) * 100 = 80%
passed = (80 >= 60) ? true : false
```

### 4. Timer System

Use `setInterval` to create a countdown timer:

```javascript
startTimer(onTick, onTimeUp) {
  let remaining = this.config.timePerQuestion;
  this.timerInterval = setInterval(() => {
    remaining--;
    onTick(remaining);
    if (remaining <= 0) {
      onTimeUp();
      clearInterval(this.timerInterval);
    }
  }, 1000);
}
```

## Your Tasks (TODOs)

### TODO 1: Implement `getCurrentQuestion()`

Return the current question object based on `currentQuestionIndex`.

**Requirements:**
- Return the question at current index
- Return `undefined` if quiz is complete
- Handle out-of-bounds gracefully

**Example:**
```javascript
quiz.currentQuestionIndex = 0;
quiz.getCurrentQuestion(); // { id: 1, question: "...", answers: [...], ... }
quiz.currentQuestionIndex = 5; // Past end
quiz.getCurrentQuestion(); // undefined
```

### TODO 2: Implement `answerQuestion(userAnswerIndex)`

Process user's answer and advance to next question.

**Requirements:**
- Get current question
- Check if `userAnswerIndex` matches `correctAnswer`
- Store answer in `this.answers` array
- Update `this.score` if correct
- Advance `currentQuestionIndex`
- Mark quiz complete if all questions answered

**Answer object format:**
```javascript
{
  questionId: 1,
  userAnswer: 2,
  correctAnswer: 2,
  isCorrect: true,
  questionText: "What is the capital of France?"
}
```

### TODO 3: Implement `getProgress()`

Return current progress through the quiz.

**Requirements:**
- Return object with `current`, `total`, `percentage`
- `current` = currentQuestionIndex + 1 (1-based)
- `total` = length of questions array
- `percentage` = (current / total) * 100

**Example:**
```javascript
quiz.currentQuestionIndex = 0;
quiz.getProgress();
// { current: 1, total: 5, percentage: 20 }
```

### TODO 4: Implement `startTimer(onTick, onTimeUp)`

Create a countdown timer for the current question.

**Requirements:**
- Initialize `timeRemaining` to `this.config.timePerQuestion`
- Create `setInterval` that decrements time every 1000ms (1 second)
- Call `onTick(timeRemaining)` each second for UI updates
- When time reaches 0, call `onTimeUp()` and stop timer
- Store interval ID in `this.timerInterval` for cleanup

**Example:**
```javascript
quiz.startTimer(
  (remaining) => console.log(`${remaining}s left`),
  () => console.log("Time's up!")
);
```

### TODO 5: Implement `getResults()`

Generate final quiz results after all questions answered.

**Requirements:**
- Calculate total correct answers
- Calculate incorrect answers
- Calculate percentage score
- Determine if user passed (percentage >= config.passingScore)
- Return results object

**Results object format:**
```javascript
{
  totalQuestions: 5,
  correctAnswers: 4,
  incorrectAnswers: 1,
  percentageScore: 80,
  passed: true,
  answers: [ /* all answer records */ ]
}
```

### TODO 6: Implement `isQuizComplete()`

Check if all questions have been answered.

**Requirements:**
- Return `true` if `currentQuestionIndex >= questions.length`
- Return `false` otherwise

### TODO 7: Implement `getAnswerReview(questionIndex)`

Return detailed review of a specific question and user's answer.

**Requirements:**
- Get question at specified index
- Get user's answer for that question
- Return review object with question, all answers, user answer, correct answer, and whether correct

**Review object format:**
```javascript
{
  question: "What is the capital of France?",
  answers: ["London", "Berlin", "Paris", "Madrid"],
  userAnswer: 2,
  correctAnswer: 2,
  isCorrect: true
}
```

## Bonus Features to Explore

Once you complete the core TODOs, extend your quiz with:

### 🎲 Shuffle Features
- Randomize question order
- Randomize answer order per question

### 📊 Difficulty Levels
- Add difficulty to questions
- Show difficulty in UI
- Potentially weight scoring by difficulty

### 💡 Hints System
- Add hint property to questions
- Implement `getHint()` method
- Track hint usage in results

### 🔥 Streak Tracking
- Track consecutive correct answers
- Show longest streak in results
- Display current streak in UI

### ⏭️ Skip Feature
- Allow users to skip questions (unanswered)
- Show skipped questions in review
- Weight scoring/results appropriately

### ⏰ Smart Timing
- Award bonus points for fast answers
- Penalize points for thinking too long
- Show time spent per question in review

### 📈 Statistics
- Calculate average time per question
- Show stats by category
- Track question difficulty statistics

### 🎯 Categories & Filtering
- Group questions by category
- Filter quiz by category
- Show category-based results

## Testing Your Code

Run the test suite:

```bash
npm test
```

The test file includes 30+ comprehensive tests covering:
- ✅ Initialization
- ✅ Question navigation
- ✅ Answer tracking
- ✅ Score calculation
- ✅ Progress tracking
- ✅ Timer functionality
- ✅ Results generation
- ✅ Quiz completion
- ✅ Answer review
- ✅ Edge cases

Tests will help validate your implementation and prevent bugs.

## Browser Usage

Once you complete the quiz.js, you can integrate it with the browser interface:

```javascript
// In app.js or your browser code
const quiz = new QuizGame();

// Display current question
const question = quiz.getCurrentQuestion();
console.log(question.question);
console.log(question.answers);

// Handle answer selection
quiz.answerQuestion(userSelectedIndex);

// Show progress
const progress = quiz.getProgress();
console.log(`Question ${progress.current} of ${progress.total}`);

// Start timer
quiz.startTimer(
  (remaining) => updateTimerDisplay(remaining),
  () => autoSubmitAnswer()
);

// Get results when done
if (quiz.isQuizComplete()) {
  const results = quiz.getResults();
  displayResults(results);
}
```

## Implementation Tips

1. **Start with the simplest methods first** (getCurrentQuestion, isQuizComplete)
2. **Test frequently** - Run tests after each TODO completion
3. **Use console.log** to debug state changes
4. **Plan your scoring system** before implementing answerQuestion
5. **Test edge cases** - What happens at quiz boundaries?
6. **Consider user experience** - How should the timer affect gameplay?

## File Structure

```
181-quiz-game/
├── quiz.js                 # Main QuizGame class (COMPLETE THIS)
├── quiz.test.js            # Test suite (DO NOT MODIFY)
├── index.html              # Browser interface
├── styles.css              # Quiz styling
├── app.js                  # Browser integration
├── package.json            # Project config
├── exercise.json           # Exercise metadata
└── README.md               # This file
```

## Getting Started

1. Open `quiz.js` and find all TODO comments
2. Read the requirements for each TODO
3. Implement the method to satisfy the requirements
4. Run tests: `npm test`
5. Fix any failing tests
6. Move to the next TODO
7. Bonus: Implement additional features!

## Success Criteria

✅ All 7 core TODOs implemented
✅ All tests passing
✅ No console errors
✅ Quiz progresses smoothly from question to question
✅ Score calculated correctly
✅ Timer works and auto-advances
✅ Results show accurate statistics
✅ Answer review shows correct answer and user's answer

## Going Further

After completing this exercise:

1. **Deploy it online** - Share your quiz with friends
2. **Add question categories** - Filter by topic
3. **Create an admin panel** - Add/edit questions
4. **Implement multiplayer** - Race against others
5. **Add persistence** - Save progress to localStorage
6. **Mobile optimization** - Make it responsive
7. **Analytics** - Track which questions are difficult

Have fun building! 🎮
