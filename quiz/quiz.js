const questions = [
    {
        question: "Who is the current President of the United States?",
        options: ["Joe Biden", "Donald Trump", "Barack Obama", "George W. Bush"],
        answer: 0
    },
    {
        question: "Which country hosted the 2022 FIFA World Cup?",
        options: ["Brazil", "Russia", "Qatar", "Germany"],
        answer: 2
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.querySelector(".start-button");
    const quizContainer = document.getElementById("quiz-container");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const nextButton = document.getElementById("next-button");
    const resultsContainer = document.getElementById("results-container");
    const scoreElement = document.getElementById("score");

    startButton.addEventListener("click", function() {
        startButton.style.display = "none";
        quizContainer.style.display = "block";
        loadQuestion();
    });

    nextButton.addEventListener("click", function() {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            const answerIndex = parseInt(selectedOption.value);
            if (answerIndex === questions[currentQuestionIndex].answer) {
                score++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                showResults();
            }
        } else {
            alert("Please select an option!");
        }
    });

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = "";
        currentQuestion.options.forEach((option, index) => {
            optionsElement.innerHTML += `
                <li>
                    <input type="radio" name="option" value="${index}" id="option${index}">
                    <label for="option${index}">${option}</label>
                </li>
            `;
        });
    }

    function showResults() {
        quizContainer.style.display = "none";
        resultsContainer.style.display = "block";
        scoreElement.textContent = `You scored ${score} out of ${questions.length}`;
    }
});