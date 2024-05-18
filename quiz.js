const quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Lisbon",
        correct: "c"
    },
    {
        question: "Who is the CEO of Tesla?",
        a: "Jeff Bezos",
        b: "Elon Musk",
        c: "Bill Gates",
        d: "Steve Jobs",
        correct: "b"
    },
    {
        question: "What is the largest ocean on Earth?",
        a: "Atlantic Ocean",
        b: "Indian Ocean",
        c: "Southern Ocean",
        d: "Pacific Ocean",
        correct: "d"
    },
    {
        question: "Number Of States in India?",
        a: "23",
        b: "28",
        c: "42",
        d: "12",
        correct: "b"
    }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultContainer = document.getElementById('result');

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = '';

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = '';

    for (const [key, value] of Object.entries(currentQuestion).filter(([k]) => k !== 'question' && k !== 'correct')) {
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('answer');
        answerDiv.innerHTML = `
            <input type="radio" id="${key}" name="answer" value="${key}">
            <label for="${key}">${value}</label>
        `;
        answersElement.appendChild(answerDiv);
    }

    selectedAnswer = '';
    document.querySelectorAll('input[name="answer"]').forEach(input => {
        input.addEventListener('change', (e) => {
            selectedAnswer = e.target.value;
            nextBtn.style.display = 'block';
        });
    });

    if (currentQuestionIndex === quizData.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'none';
    }
}

nextBtn.addEventListener('click', () => {
    if (selectedAnswer) {
        if (selectedAnswer === quizData[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        }
    }
});

submitBtn.addEventListener('click', () => {
    if (selectedAnswer === quizData[currentQuestionIndex].correct) {
        score++;
    }
    questionContainer.style.display = 'none';
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'none';
    resultContainer.textContent = `You scored ${score} out of ${quizData.length}`;
});

loadQuestion();
