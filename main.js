// main.js

document.addEventListener('DOMContentLoaded', () => {
    const levelSelect = document.getElementById('level-select');
    const topicSelect = document.getElementById('topic-select');
    const questionContainer = document.getElementById('question-container');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const feedback = document.getElementById('feedback');
    let currentLevel = null;
    let currentTopic = null;
    let currentExercise = null;
    let correctAnswers = 0;
    let totalExercises = 10;
    let challengeMode = false;
    let challengeTimer = null;
    let timeLeft = 30;
    let questionStartTime = null;

    // Initialize gamification system
    window.gameSystem.initializeDisplay();

    // Challenge mode toggle
    const challengeModeToggle = document.getElementById('challenge-mode-toggle');
    const timerDisplay = document.getElementById('timer-display');
    const timerElement = document.getElementById('timer');

    challengeModeToggle.addEventListener('change', () => {
        challengeMode = challengeModeToggle.checked;
        if (challengeMode) {
            timerDisplay.style.display = 'block';
        } else {
            timerDisplay.style.display = 'none';
            if (challengeTimer) {
                clearInterval(challengeTimer);
                challengeTimer = null;
            }
        }
    });

    levelSelect.addEventListener('change', () => {
        currentLevel = levelSelect.value;
        loadTopics(currentLevel);
    });

    topicSelect.addEventListener('change', () => {
        currentTopic = topicSelect.value;
        startExercises();
    });

    function loadTopics(level) {
        const topics = getTopicsForLevel(level);
        topicSelect.innerHTML = topics.map(topic => `<option value="${topic}">${topic}</option>`).join('');
        if (topics.length === 1) {
            currentTopic = topics[0];
            topicSelect.value = currentTopic;
            startExercises();
        }
    }

    function getTopicsForLevel(level) {
        const topics = {
            'pre-k': ['Addition'],
            'kindergarten': ['Addition', 'Subtraction'],
            '1st': ['Addition', 'Subtraction', 'Multiplication'],
            '2nd': ['Addition', 'Subtraction', 'Multiplication'],
            '3rd': ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Fractions'],
            '4th': ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Fractions', 'Word Problems'],
            '5th': ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Fractions', 'Word Problems', 'Geometry'],
            '6th': ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Fractions', 'Word Problems', 'Geometry', 'Mixed Practice']
        };
        return topics[level] || [];
    }

    function startExercises() {
        correctAnswers = 0;
        window.performanceTracker.startSession();
        updateProgress(correctAnswers, totalExercises);
        loadNextExercise();
    }

    function loadNextExercise() {
        currentExercise = generateExercise(currentLevel, currentTopic);
        displayExercise(currentExercise);
        questionStartTime = Date.now();
    }

    function generateExercise(level, topic) {
        switch (topic) {
            case 'Addition':
                return generateAdditionExercise(level);
            case 'Subtraction':
                return generateSubtractionExercise(level);
            case 'Multiplication':
                return generateMultiplicationExercise(level);
            case 'Division':
                return generateDivisionExercise(level);
            case 'Fractions':
                return generateFractionsExercise(level);
            case 'Word Problems':
                return generateWordProblemExercise(level);
            case 'Geometry':
                return generateGeometryExercise(level);
            case 'Mixed Practice':
                return generateMixedPracticeExercise(level);
        }
    }

    function displayExercise(exercise) {
        questionContainer.innerHTML = `
            <div>${exercise.question}</div>
            <input type="text" id="answer-input" autofocus>
            <button id="submit-button">Submit</button>
        `;
        const submitButton = document.getElementById('submit-button');
        submitButton.addEventListener('click', submitAnswer);
        document.getElementById('answer-input').addEventListener('keydown', event => {
            if (event.key === 'Enter') submitAnswer();
        });

        // Start challenge timer if in challenge mode
        if (challengeMode) {
            startChallengeTimer();
        }
    }

    function submitAnswer() {
        const userAnswer = document.getElementById('answer-input').value;
        checkAnswer(userAnswer);
    }

    function startChallengeTimer() {
        timeLeft = 30;
        const timerElement = document.getElementById('timer');
        timerElement.textContent = timeLeft;
        
        if (challengeTimer) {
            clearInterval(challengeTimer);
        }
        
        challengeTimer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(challengeTimer);
                challengeTimer = null;
                // Auto-submit incorrect answer when time runs out
                window.gameSystem.resetStreak();
                showFeedback(false, currentExercise.answer);
                setTimeout(() => {
                    loadNextExercise();
                }, 2000);
            }
        }, 1000);
    }

    function stopChallengeTimer() {
        if (challengeTimer) {
            clearInterval(challengeTimer);
            challengeTimer = null;
        }
    }

    function checkAnswer(userAnswer) {
        // Stop timer if in challenge mode
        if (challengeMode) {
            stopChallengeTimer();
        }

        const timeSpent = Date.now() - questionStartTime;
        const isCorrect = userAnswer == currentExercise.answer;

        // Record performance data
        window.performanceTracker.recordAnswer(isCorrect, currentTopic, timeSpent);
        window.performanceTracker.updateStreak(window.gameSystem.streak);

        if (isCorrect) {
            correctAnswers++;
            // Gamification: Award points and increment streak
            let points = 10;
            if (challengeMode) {
                points += Math.floor(timeLeft / 3); // Bonus points for speed
            }
            window.gameSystem.addPoints(points);
            window.gameSystem.incrementStreak();
            
            updateProgress(correctAnswers, totalExercises);
            showFeedback(true, null, challengeMode ? `+${points} points (${Math.floor(timeLeft / 3)} speed bonus!)` : null);
            if (correctAnswers >= totalExercises) {
                // Bonus points for completing a session
                window.gameSystem.addPoints(50);
                // Show performance report
                setTimeout(() => {
                    window.performanceTracker.showPerformanceReport();
                }, 1000);
                feedback.textContent = 'Congratulations! You have completed the exercises. +50 bonus points!';
                return;
            }
            setTimeout(() => {
                loadNextExercise();
            }, 1500);
        } else {
            // Reset streak on wrong answer
            window.gameSystem.resetStreak();
            showFeedback(false, currentExercise.answer);
            setTimeout(() => {
                loadNextExercise();
            }, 2000);
        }
    }
});