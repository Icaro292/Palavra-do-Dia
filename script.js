const words = [
    {
        word: "Réveillon",
        hints: [
            "Esta palavra descreve uma celebração tradicional que ocorre na virada do ano.",
            "É um evento associado à mudança de ano, onde as pessoas comemoram a chegada do novo ciclo.",
            "A palavra tem origem no francês e é muito usada no Brasil para se referir à festa de Ano Novo.",
            "No Brasil, é comum celebrar com fogos de artifício, música, ceias e danças.",
            "Muitas pessoas usam roupas brancas para celebrar a virada do ano, uma tradição ligada à paz.",
            "É o nome de uma festa de final de ano que costuma acontecer na noite de 31 de dezembro.",
            "É uma celebração comumente realizada à meia-noite, com as primeiras horas do novo ano.",
            "Esta palavra é usada para descrever uma festa cheia de alegria, amizade e desejos para o novo ano.",
            "Em algumas culturas, além da festa, as pessoas fazem resoluções para o próximo ano durante o Réveillon.",
            "Os fogos de artifício são uma parte essencial dessa celebração, especialmente nas grandes cidades."
        ],
        meaning: "Réveillon é a celebração tradicional da passagem de ano, onde as pessoas comemoram a chegada do novo ano com festas e confraternizações."
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
