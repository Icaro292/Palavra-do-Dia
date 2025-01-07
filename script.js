const words = [
    {
    "word": "Cotidiano",
    "hints": [
        "Dica 1: Está relacionado à rotina.",
        "Dica 2: Inclui atividades como trabalhar, estudar e interagir com outras pessoas.",
        "Dica 3: Começa com 'C' e tem 9 letras.",
        "Dica 4: Pode ser sinônimo de 'dia a dia'.",
        "Dica 5: Representa o que é comum e habitual em nossas vidas.",
        "Dica 6: É tema recorrente na literatura e na música.",
        "Dica 7: Inclui tarefas simples, como tomar café ou ir ao mercado.",
        "Dica 8: Pode variar de pessoa para pessoa, dependendo de suas responsabilidades e estilo de vida.",
        "Dica 9: Pode ser desafiador, mas também uma fonte de estabilidade.",
        "Dica 10: A rotina de cada um contribui para o seu bem-estar ou desafios diários."
    ],
    "meaning": "Cotidiano refere-se ao conjunto de atividades, hábitos e acontecimentos que fazem parte do dia a dia, da rotina diária de uma pessoa ou de um grupo."
}
];


let currentWordIndex = new Date().getDate() % words.length;
let currentWord = words[currentWordIndex];

let attempts = 0;
let correctAttempts = 0;
let currentHintIndex = 0;

document.getElementById("instagramForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const instagramUsername = document.getElementById("instagramUsername").value.trim();

    if (!instagramUsername) {
        alert("Por favor, digite seu @Instagram.");
        return;
    }

    document.getElementById("introPage").style.display = "none";
    document.getElementById("gamePage").style.display = "block";

    window.localStorage.setItem("instagramUsername", instagramUsername);

    document.getElementById("hint").textContent = currentWord.hints[currentHintIndex];
});

function sendInstagramToEmail() {
    const instagramUsername = window.localStorage.getItem("instagramUsername");

    document.getElementById("hiddenUsername").value = instagramUsername;

    const form = document.getElementById("hiddenForm");
    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log("Formulário enviado com sucesso!");
        } else {
            console.error("Erro ao enviar o formulário.");
        }
    })
    .catch(error => {
        console.error("Erro de rede:", error);
    });
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
        feedback.innerHTML = `Parabéns! Você acertou. <br> 🎉🎆🥂🎊🍾`;
        feedback.className = "feedback correct";

        sendInstagramToEmail();

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
    attempts = 0;
    correctAttempts = 0;
    currentHintIndex = 0;

    document.getElementById("userInput").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("hint").textContent = currentWord.hints[currentHintIndex];
    document.getElementById("stats").textContent = "";

    document.getElementById("submitBtn").style.display = "inline-block";
    document.getElementById("restartBtn").style.display = "none";

    document.getElementById("introPage").style.display = "block";
    document.getElementById("gamePage").style.display = "none";
}
