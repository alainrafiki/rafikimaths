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

    levelSelect.addEventListener('change', () => {
        currentLevel = levelSelect.value;
        loadTopics(currentLevel);
    });

    topicSelect.addEventListener('change', () => {
        currentTopic = topicSelect.value;
        startExercises();
    });

    function loadTopics(level) {
        // Load topics based on level
        const topics = getTopicsForLevel(level);
        topicSelect.innerHTML = topics.map(topic => `<option value="${topic}">${topic}</option>`).join('');
    }

    function getTopicsForLevel(level) {
        // Define topics for each level
        const topics = {
            'pre-k': ['Addition'],
            'kindergarten': ['Addition', 'Subtraction'],
            '1st': ['Addition', 'Subtraction'],
            '2nd': ['Addition', 'Subtraction', 'Multiplication'],
            '3rd': ['Addition', 'Subtraction', 'Multiplication', 'Division'],
            '4th': ['Addition', 'Subtraction', 'Multiplication', 'Division'],
            '5th': ['Addition', 'Subtraction', 'Multiplication', 'Division'],
            '6th': ['Addition', 'Subtraction', 'Multiplication', 'Division']
        };
        return topics[level] || [];
    }

    // function startExercises() {
    //     correctAnswers = 0;
    //     updateProgress();
    //     loadNextExercise();
    // }
    function startExercises() {
        correctAnswers = 0;
        updateProgress(correctAnswers, totalExercises); // Use function from progress.js
        loadNextExercise();
    }

    function loadNextExercise() {
        currentExercise = generateExercise(currentLevel, currentTopic);
        displayExercise(currentExercise);
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
        }
    }

    // function generateExercise(level, topic) {
    //     // Generate an exercise based on level and topic
    //     // Simple implementation example:
    //     let num1 = Math.floor(Math.random() * 10);
    //     let num2 = Math.floor(Math.random() * 10);
    //     let operator = '';
    //     let answer = 0;

    //     switch (topic) {
    //         case 'Addition':
    //             operator = '+';
    //             answer = num1 + num2;
    //             break;
    //         case 'Subtraction':
    //             operator = '-';
    //             answer = num1 - num2;
    //             break;
    //         case 'Multiplication':
    //             operator = '*';
    //             answer = num1 * num2;
    //             break;
    //         case 'Division':
    //             operator = '/';
    //             answer = (num1 / num2).toFixed(2); // Limiting to 2 decimal places
    //             break;
    //     }

    //     return {
    //         question: `${num1} ${operator} ${num2} = ?`,
    //         answer: answer
    //     };
    // }

    function displayExercise(exercise) {
        questionContainer.innerHTML = `
            <div>${exercise.question}</div>
            <input type="text" id="answer-input">
            <button onclick="submitAnswer()">Submit</button>
        `;
    }

    window.submitAnswer = function() {
        const answerInput = document.getElementById('answer-input');
        const userAnswer = answerInput.value;
        checkAnswer(userAnswer);
    }

    // function checkAnswer(userAnswer) {
    //     if (userAnswer == currentExercise.answer) {
    //         feedback.textContent = 'Correct!';
    //         correctAnswers++;
    //         if (correctAnswers >= totalExercises) {
    //             feedback.textContent = 'Congratulations! You have completed the exercises.';
    //             return;
    //         }
    //     } else {
    //         feedback.textContent = `Incorrect. The correct answer was ${currentExercise.answer}.`;
    //     }
    //     updateProgress();
    //     loadNextExercise();
    // }

    function checkAnswer(userAnswer) {
        if (userAnswer == currentExercise.answer) {
            showFeedback(true); // Use function from progress.js
            correctAnswers++;
            if (correctAnswers >= totalExercises) {
                feedback.textContent = 'Congratulations! You have completed the exercises.';
                return;
            }
        } else {
            showFeedback(false, currentExercise.answer); // Use function from progress.js
        }
        updateProgress(correctAnswers, totalExercises); // Use function from progress.js
        loadNextExercise();
    }

    function updateProgress() {
        progress.style.width = `${(correctAnswers / totalExercises) * 100}%`;
        progressBar.textContent = `${correctAnswers} / ${totalExercises}`;
    }
});