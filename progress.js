// progress.js

function updateProgress(correctAnswers, totalExercises) {
    const progress = document.getElementById('progress');
    const progressBar = document.getElementById('progress-bar');
    
    const progressPercentage = (correctAnswers / totalExercises) * 100;
    progress.style.width = `${progressPercentage}%`;
    progressBar.textContent = `${correctAnswers} / ${totalExercises}`;
}

function showFeedback(isCorrect, correctAnswer = null) {
    const feedback = document.getElementById('feedback');
    if (isCorrect) {
        feedback.textContent = 'Correct!';
        feedback.classList.add('correct');
        feedback.classList.remove('incorrect');
    } else {
        feedback.textContent = `Incorrect. The correct answer was ${correctAnswer}.`;
        feedback.classList.add('incorrect');
        feedback.classList.remove('correct');
    }
}