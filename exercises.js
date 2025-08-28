// exercises.js

function generateExercise(level, topic) {
    let num1, num2;
    switch (topic) {
        case 'Addition':
            return generateAdditionExercise(level);
        case 'Subtraction':
            return generateSubtractionExercise(level);
        case 'Multiplication':
            return generateMultiplicationExercise(level);
        case 'Division':
            return generateDivisionExercise(level);
        default:
            return null;
    }
}

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

function generateFractionsExercise(level) {
    const operations = ['add', 'subtract', 'simplify'];
    const operation = operations[getRandomInt(0, operations.length - 1)];
    
    switch (operation) {
        case 'add':
            const num1 = getRandomInt(1, 8);
            const num2 = getRandomInt(1, 8);
            const denom = getRandomInt(2, 10);
            return {
                question: `${num1}/${denom} + ${num2}/${denom} = ?`,
                answer: `${num1 + num2}/${denom}`
            };
        case 'subtract':
            const a = getRandomInt(3, 10);
            const b = getRandomInt(1, a - 1);
            const denomSub = getRandomInt(2, 8);
            return {
                question: `${a}/${denomSub} - ${b}/${denomSub} = ?`,
                answer: `${a - b}/${denomSub}`
            };
        case 'simplify':
            const numerator = getRandomInt(2, 12);
            const denominator = numerator * getRandomInt(2, 4);
            const gcd = numerator;
            return {
                question: `Simplify: ${denominator}/${numerator} = ?`,
                answer: `${denominator / gcd}/${numerator / gcd}`
            };
    }
}

function generateWordProblemExercise(level) {
    const problems = [
        {
            question: "Sarah has 12 apples. She gives 4 apples to her friend. How many apples does she have left?",
            answer: 8
        },
        {
            question: "A box contains 24 chocolates. If there are 6 children and they share equally, how many chocolates does each child get?",
            answer: 4
        },
        {
            question: "Tom buys 3 packs of stickers. Each pack has 8 stickers. How many stickers does Tom have in total?",
            answer: 24
        },
        {
            question: "A classroom has 6 rows of desks. Each row has 5 desks. How many desks are there in total?",
            answer: 30
        },
        {
            question: "Emma collects 18 seashells at the beach. She gives 6 to her sister. How many seashells does Emma keep?",
            answer: 12
        }
    ];
    
    const problem = problems[getRandomInt(0, problems.length - 1)];
    return problem;
}

function generateGeometryExercise(level) {
    const exercises = [
        {
            question: "A rectangle has length 8 units and width 4 units. What is its area?",
            answer: 32
        },
        {
            question: "A square has sides of length 6 units. What is its perimeter?",
            answer: 24
        },
        {
            question: "A triangle has a base of 10 units and height of 6 units. What is its area?",
            answer: 30
        },
        {
            question: "A circle has a radius of 5 units. What is its diameter?",
            answer: 10
        },
        {
            question: "A rectangle has length 12 units and width 3 units. What is its perimeter?",
            answer: 30
        }
    ];
    
    const exercise = exercises[getRandomInt(0, exercises.length - 1)];
    return exercise;
}

function generateMixedPracticeExercise(level) {
    const topics = ['Addition', 'Subtraction', 'Multiplication', 'Division', 'Fractions'];
    const randomTopic = topics[getRandomInt(0, topics.length - 1)];
    
    switch (randomTopic) {
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
    }
}
