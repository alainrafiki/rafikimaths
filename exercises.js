// exercises.js

function generateAdditionExercise(level) {
    let num1, num2;
    switch (level) {
        case 'pre-k':
        case 'kindergarten':
            num1 = getRandomInt(1, 10);
            num2 = getRandomInt(1, 10);
            break;
        case '1st':
        case '2nd':
            num1 = getRandomInt(1, 20);
            num2 = getRandomInt(1, 20);
            break;
        case '3rd':
        case '4th':
            num1 = getRandomInt(10, 50);
            num2 = getRandomInt(10, 50);
            break;
        case '5th':
        case '6th':
            num1 = getRandomInt(50, 100);
            num2 = getRandomInt(50, 100);
            break;
    }
    return {
        question: `${num1} + ${num2} = ?`,
        answer: num1 + num2
    };
}

function generateSubtractionExercise(level) {
    let num1, num2;
    switch (level) {
        case 'pre-k':
        case 'kindergarten':
            num1 = getRandomInt(1, 10);
            num2 = getRandomInt(1, 10);
            break;
        case '1st':
        case '2nd':
            num1 = getRandomInt(1, 20);
            num2 = getRandomInt(1, 20);
            break;
        case '3rd':
        case '4th':
            num1 = getRandomInt(10, 50);
            num2 = getRandomInt(10, 50);
            break;
        case '5th':
        case '6th':
            num1 = getRandomInt(50, 100);
            num2 = getRandomInt(50, 100);
            break;
    }
    // Ensure num1 is greater than num2 to avoid negative results
    if (num1 < num2) [num1, num2] = [num2, num1];
    return {
        question: `${num1} - ${num2} = ?`,
        answer: num1 - num2
    };
}

function generateMultiplicationExercise(level) {
    let num1, num2;
    switch (level) {
        case '1st':
        case '2nd':
            num1 = getRandomInt(1, 5);
            num2 = getRandomInt(1, 5);
            break;
        case '3rd':
        case '4th':
            num1 = getRandomInt(1, 10);
            num2 = getRandomInt(1, 10);
            break;
        case '5th':
        case '6th':
            num1 = getRandomInt(5, 12);
            num2 = getRandomInt(5, 12);
            break;
    }
    return {
        question: `${num1} * ${num2} = ?`,
        answer: num1 * num2
    };
}

function generateDivisionExercise(level) {
    let num1, num2, quotient;
    switch (level) {
        case '3rd':
        case '4th':
            num1 = getRandomInt(1, 10);
            num2 = getRandomInt(1, 10);
            quotient = num1 * num2; // Ensuring the division results in an integer
            return {
                question: `${quotient} / ${num1} = ?`,
                answer: num2
            };
        case '5th':
        case '6th':
            num1 = getRandomInt(1, 12);
            num2 = getRandomInt(1, 12);
            quotient = num1 * num2; // Ensuring the division results in an integer
            return {
                question: `${quotient} / ${num1} = ?`,
                answer: num2
            };
    }
}

// Utility function to get a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// // exercises.js

// function generateAdditionExercise(level) {
//     const num1 = getRandomInt(1, 10);
//     const num2 = getRandomInt(1, 10);
//     return {
//         question: `${num1} + ${num2} = ?`,
//         answer: num1 + num2
//     };
// }

// function generateSubtractionExercise(level) {
//     const num1 = getRandomInt(5, 15);
//     const num2 = getRandomInt(1, 5);
//     return {
//         question: `${num1} - ${num2} = ?`,
//         answer: num1 - num2
//     };
// }

// function generateMultiplicationExercise(level) {
//     const num1 = getRandomInt(1, 10);
//     const num2 = getRandomInt(1, 10);
//     return {
//         question: `${num1} * ${num2} = ?`,
//         answer: num1 * num2
//     };
// }

// function generateDivisionExercise(level) {
//     const num1 = getRandomInt(10, 50);
//     const num2 = getRandomInt(1, 10);
//     return {
//         question: `${num1} / ${num2} = ?`,
//         answer: (num1 / num2).toFixed(2)
//     };
// }

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
