const words = [
    {
        word: "Empatia",
        hints: [
            "Dica 1: Começa com 'E' e tem 7 letras.",
            "Dica 2: É uma qualidade importante nas relações humanas.",
            "Dica 3: Está relacionada à capacidade de se colocar no lugar do outro.",
            "Dica 4: Ajuda a compreender e compartilhar os sentimentos de outra pessoa.",
            "Dica 5: Tem um significado ligado à conexão emocional.",
            "Dica 6: É frequentemente associada a comportamentos de apoio e compreensão.",
            "Dica 7: Uma pessoa empática é capaz de demonstrar cuidado e compaixão.",
            "Dica 8: É essencial para a construção de relações saudáveis.",
            "Dica 9: Está relacionada à escuta ativa e compreensão profunda.",
            "Dica 10: Essa habilidade pode ser desenvolvida ao longo do tempo."
        ],
        meaning: "Empatia é a capacidade de compreender e compartilhar os sentimentos de outra pessoa, colocando-se no lugar dela, e se demonstrando solidário com suas emoções e experiências."
    },
];

let currentWordIndex = new Date().getDate() % words.length;
let currentWord = words[currentWordIndex];

let attempts = 0;
let correctAttempts = 0;
let currentHintIndex = 0;
let musicIframe = null;

document.getElementById("hint").textContent = currentWord.hints[currentHintIndex];

function playCelebrationMusic() {
    if (musicIframe) return;

    const playerContainer = document.getElementById('audioContainer');
    musicIframe = document.createElement('iframe');
    musicIframe.width = '0';
    musicIframe.height = '0';
    musicIframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
    musicIframe.frameBorder = "0";
    musicIframe.allow = "autoplay; encrypted-media";
    playerContainer.appendChild(musicIframe);
}

function stopCelebrationMusic() {
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
        feedback.innerHTML = `Parabéns! Você acertou. <br> 🎉🎆🥂🎊🍾`;
        feedback.className = "feedback correct";
        playCelebrationMusic();
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
    stopCelebrationMusic();

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
