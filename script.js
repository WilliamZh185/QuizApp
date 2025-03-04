// Quiz Data
const quizData = [
    {
      question: "See the picture below. What is the name of this fruit?",
      questionImage: "./images/apple.jpeg",
      options: [
        { text: "Apple" },
        { text: "Banana" },
        { text: "Orange" },
        { text: "Grapes" },
      ],
      correctAnswer: "Apple",
    },
    {
      question: "Which one is the city of Rome?",
      options: [
        { text: "A", image: "./images/rome.jpeg" },
        { text: "B", image: "./images/paris.jpeg" },
        { text: "C", image: "./images/london.jpeg" },
        { text: "D", image: "./images/berlin.jpeg" },
      ],
      correctAnswer: "A",
    },
    {
      question: "What is 2 + 2?",
      options: [
        { text: "3" },
        { text: "4" },
        { text: "5" },
        { text: "6" },
      ],
      correctAnswer: "4",
    },
    {
      question: "What is the color of the sky?",
      options: [
        { text: "Red" },
        { text: "Blue" },
        { text: "Green" },
        { text: "Yellow" },
      ],
      correctAnswer: "Blue",
    },
    {
      question: "Which Country is the largest?",
      options: [
        { text: "Vatican" },
        { text: "Brazil" },
        { text: "China" },
        { text: "Finland" },
      ],
      correctAnswer: "China",
    },
    {
      question: "What is staple food for Indonesian people?",
      options: [
        { text: "Rice" },
        { text: "Bread" },
        { text: "Steak" },
        { text: "Casava" },
      ],
      correctAnswer: "Rice",
    },
    {
      question: "Where's Lion came from?",
      options: [
        { text: "India" },
        { text: "China" },
        { text: "Africa" },
        { text: "Peru" },
      ],
      correctAnswer: "Africa",
    },
    // Add more questions here
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  
  // DOM Elements
  const quizSection = document.getElementById("quiz-section");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const answerBox = document.getElementById("answer-box");
  const resultsSection = document.getElementById("results-section");
  const resultsMessage = document.getElementById("results-message");
  const incorrectAnswersElement = document.getElementById("incorrect-answers");
  const tryAgainButton = document.getElementById("try-again");
  
  // Audio Elements
  const coinSound = new Audio("coin.mp3"); // Sound for dragging an answer
  const fanfareSound = new Audio("fanfare.mp3"); // Sound for scoring > 65%
  const encouragementSound = new Audio("encouragement.mp3"); // Sound for scoring < 35%
  
  // Play coin sound when an answer is dragged
  function playCoinSound() {
    coinSound.currentTime = 0; // Reset sound to start
    coinSound.play();
  }
  
  // Play fanfare sound for high scores
  function playFanfareSound() {
    fanfareSound.currentTime = 0; // Reset sound to start
    fanfareSound.play();
  }
  
  // Play encouragement sound for low scores
  function playEncouragementSound() {
    encouragementSound.currentTime = 0; // Reset sound to start
    encouragementSound.play();
  }
  
  // Load Question
  function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerHTML = ""; // Clear previous content

    // Add question text
    const questionText = document.createElement("p");
    questionText.textContent = currentQuestion.question;
    questionElement.appendChild(questionText);

    // Add question image (if available)
    if (currentQuestion.questionImage) {
        const questionImg = document.createElement("img");
        questionImg.src = currentQuestion.questionImage;
        questionImg.alt = "Question Image";
        questionImg.style.width = "300px"; // Set image size for questions
        questionImg.style.height = "300px";
        questionImg.style.marginTop = "10px";
        questionElement.appendChild(questionImg);
    }

    // Clear options
    optionsElement.innerHTML = "";

    // Add options
    currentQuestion.options.forEach((option) => {
        const optionCard = document.createElement("div");
        optionCard.classList.add("option-card");

        // Add option image (if available)
        if (option.image) {
        const optionImg = document.createElement("img");
        optionImg.src = option.image;
        optionImg.alt = "Option Image";
        optionImg.style.width = "150px"; // Set image size for options
        optionImg.style.height = "150px";
        optionImg.style.marginBottom = "10px";
        optionCard.appendChild(optionImg);
        }

        // Add option text
        const optionText = document.createElement("p");
        optionText.textContent = option.text;
        optionCard.appendChild(optionText);

        // Make option draggable
        optionCard.draggable = true;
        optionCard.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", option.text);
        });

        optionsElement.appendChild(optionCard);
    });
    }
  
  // Handle Drag-and-Drop
  answerBox.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  
  answerBox.addEventListener("drop", (e) => {
    e.preventDefault();
    const selectedAnswer = e.dataTransfer.getData("text/plain");
    playCoinSound(); // Play coin sound when an answer is dragged
    checkAnswer(selectedAnswer);
  });
  
  // Check Answer
  function checkAnswer(selectedAnswer) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      score++;
    } else {
      // Store incorrect answers for later display
      currentQuestion.userAnswer = selectedAnswer;
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }
  
  // Show Results
  function showResults() {
    quizSection.style.display = "none"; // Hide quiz section
    resultsSection.style.display = "block"; // Show results section
  
    const totalQuestions = quizData.length;
    const percentageCorrect = (score / totalQuestions) * 100;
  
    if (percentageCorrect >= 65) {
      resultsMessage.textContent = `Congratulations! You've answered ${score} out of ${totalQuestions} questions correctly. Great job! 🎉`;
      resultsMessage.style.color = "#4caf50"; // Green color
      playFanfareSound(); // Play fanfare sound for high scores
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else if (percentageCorrect <= 35) {
      resultsMessage.textContent = `You've answered ${totalQuestions - score} out of ${totalQuestions} questions wrongly. Let's review the mistakes and try again! You can do it! 💪`;
      resultsMessage.style.color = "#ff6f61"; // Coral color for attention
      playEncouragementSound(); // Play encouragement sound for low scores
    } else {
      resultsMessage.textContent = `You've answered ${score} out of ${totalQuestions} questions correctly. Good effort! Keep practicing! 😊`;
      resultsMessage.style.color = "#ffa500"; // Orange color for medium scores
    }
  
    // Display incorrect answers
    incorrectAnswersElement.innerHTML = ""; // Clear previous incorrect answers
    quizData.forEach((question) => {
      if (question.userAnswer) {
        const incorrectAnswer = document.createElement("p");
        incorrectAnswer.textContent = `Q: ${question.question} | Your Answer: ${question.userAnswer} | Correct Answer: ${question.correctAnswer}`;
        incorrectAnswersElement.appendChild(incorrectAnswer);
      }
    });
  }
  
  // Try Again
  tryAgainButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
  
    // Reset userAnswer for all questions
    quizData.forEach((question) => {
      delete question.userAnswer;
    });
  
    // Clear previous incorrect answers
    incorrectAnswersElement.innerHTML = "";
  
    // Reset UI
    quizSection.style.display = "block"; // Show quiz section
    resultsSection.style.display = "none"; // Hide results section
    loadQuestion();
  });
  
  // Initialize
  loadQuestion();