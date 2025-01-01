const words = [
    {
        word: "Resiliência",
        hints: [
            "Dica 1: Começa com 'R' e tem 10 letras.",
    "Dica 2: É uma qualidade importante em momentos difíceis.",
    "Dica 3: Está relacionada à capacidade de adaptação.",
    "Dica 4: Ajuda a superar desafios e adversidades.",
    "Dica 5: Tem um acento na penúltima sílaba.",
    "Dica 6: É uma habilidade mental e emocional.",
    "Dica 7: Muitas pessoas desenvolvem essa qualidade após dificuldades.",
    "Dica 8: É frequentemente associada à força interior.",
    "Dica 9: Tem a ver com flexibilidade emocional e mental.",
    "Dica 10: A palavra é usada para descrever quem consegue se reerguer."
    ],
        meaning: "Resiliência é a capacidade de se adaptar, superar desafios e se reerguer diante de adversidades."


    },
];

let currentWordIndex = new Date().getDate() % words.length;
let currentWord = words[currentWordIndex];

let attempts = 0;
let correctAttempts = 0;
let currentHintIndex = 0;
let musicIframe = null;

document.getElementById("hint").textContent = currentWord.hints[currentHintIndex];

function playNewYearMusic() {
    if (musicIframe) return;

    const playerContainer = document.getElementById('audioContainer');
    musicIframe = document.createElement('iframe');
    musicIframe.width = '0';
    musicIframe.height = '0';
    musicIframe.src = "https://www.youtube.com/embed/x3PHpXx0Mfw?autoplay=1&mute=0&loop=1&playlist=x3PHpXx0Mfw";
    musicIframe.frameBorder = "0";
    musicIframe.allow = "autoplay; encrypted-media";
    playerContainer.appendChild(musicIframe);
}

function stopNewYearMusic() {
    if (musicIframe) {
        musicIframe.remove();
        musicIframe = null;
    }
}

function checkAnswer() {
    let userInput = document.getElementById("userInput").value.trim().toLowerCase();
    let correctAnswer = currentWord.word.toLowerCase();
    let feedback = document.getElementById("feedback");
    let stats = document.getElementById("stats");

    attempts++;

    let correctLetters = 0;
    for (let i = 0; i < userInput.length && i < correctAnswer.length; i++) {
        if (userInput[i] === correctAnswer[i]) {
            correctLetters++;
        }
    }

    let accuracy = (correctLetters / correctAnswer.length) * 100;
    accuracy = accuracy.toFixed(2);

    if (userInput === correctAnswer) {
        correctAttempts++;
        feedback.innerHTML = `Parabéns! Você acertou. <br> FELIZ ANO NOVO 🎉🎆🥂🎊🍾`;
        feedback.className = "feedback correct";

        playNewYearMusic();

        document.getElementById("submitBtn").style.display = "none";
        document.getElementById("restartBtn").style.display = "inline-block";
    } else {
        feedback.textContent = `Você acertou ${correctLetters} letra(s) correta(s). Tente novamente!`;
        feedback.className = "feedback incorrect";

        currentHintIndex++;
        if (currentHintIndex >= currentWord.hints.length) {
            currentHintIndex = 0;
        }

        document.getElementById("hint").textContent = currentWord.hints[currentHintIndex];
    }

    stats.textContent = `Tentativas: ${attempts} | Porcentagem de acerto: ${accuracy}%`;
}

function restartGame() {
    stopNewYearMusic();

    attempts = 0;
    correctAttempts = 0;
    currentHintIndex = 0;

    document.getElementById("userInput").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("hint").textContent = currentWord.hints[currentHintIndex];
    document.getElementById("stats").textContent = "";

    document.getElementById("submitBtn").style.display = "inline-block";
    document.getElementById("restartBtn").style.display = "none";
}

document.getElementById("restartBtn").addEventListener("click", restartGame);
