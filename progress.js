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
    feedback.textContent = isCorrect ? 'Correct!' : `Incorrect. The correct answer was ${correctAnswer}.`;
    feedback.className = isCorrect ? 'correct' : 'incorrect';
    setTimeout(() => {
        feedback.textContent = '';
        feedback.className = '';
    }, 2000);
}
