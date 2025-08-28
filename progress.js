// progress.js

function updateProgress(correctAnswers, totalExercises) {
    const progress = document.getElementById('progress');
    const progressBar = document.getElementById('progress-bar');
    
    const progressPercentage = (correctAnswers / totalExercises) * 100;
    
    // If progress element exists, update its width, otherwise update progress bar directly
    if (progress) {
        progress.style.width = `${progressPercentage}%`;
        progressBar.textContent = `${correctAnswers} / ${totalExercises}`;
    } else {
        // Recreate the proper structure if missing
        progressBar.innerHTML = `<div id="progress" style="width: ${progressPercentage}%; height: 100%; background-color: #4caf50; transition: width 0.3s;"></div>`;
        progressBar.style.position = 'relative';
        progressBar.style.fontSize = '12px';
        progressBar.style.lineHeight = '20px';
        progressBar.style.textAlign = 'center';
        progressBar.style.color = 'white';
        progressBar.appendChild(document.createTextNode(`${correctAnswers} / ${totalExercises}`));
    }
}

function showFeedback(isCorrect, correctAnswer = null, bonusMessage = null) {
    const feedback = document.getElementById('feedback');
    let message = isCorrect ? 'Correct!' : `Incorrect. The correct answer was ${correctAnswer}.`;
    if (bonusMessage) {
        message += ` ${bonusMessage}`;
    }
    feedback.textContent = message;
    feedback.className = isCorrect ? 'correct' : 'incorrect';
    setTimeout(() => {
        feedback.textContent = '';
        feedback.className = '';
    }, 2000);
}
