const quizData = [
  {
    question: "Quel document est essentiel pour comprendre les contraintes techniques du sol avant la rédaction du DCE ?",
    options: ["Le programme", "Le permis de construire", "Le rapport géotechnique", "Le PGC-SPS"],
    answer: 2,
    difficulty: "Facile"
  },
  {
    question: "Quel est le rôle principal du programme dans l’analyse du DCE ?",
    options: ["Définir les contraintes du sol", "Exprimer les besoins et objectifs du maître d’ouvrage", "Déterminer les normes acoustiques", "Identifier les risques du chantier"],
    answer: 1,
    difficulty: "Facile"
  },
  {
    question: "Pourquoi la méthode Pareto est-elle utile dans l’analyse du DCE ?",
    options: ["Elle identifie les 20% de documents qui apportent 80% de la valeur analytique", "Elle permet de réduire les coûts du projet", "Elle élimine les documents non conformes", "Elle classe les documents par ordre alphabétique"],
    answer: 0,
    difficulty: "Moyen"
  }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");
const scoreContainer = document.getElementById("score-container");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <div class="question">
      <h3>${q.question}</h3>
      <div class="options">
        ${q.options.map((opt, i) => `<button onclick="checkAnswer(${i})">${opt}</button>`).join("")}
      </div>
      <div class="feedback" id="feedback"></div>
    </div>
  `;
}

function checkAnswer(selected) {
  const correct = quizData[currentQuestion].answer;
  const feedback = document.getElementById("feedback");

  if (selected === correct) {
    score++;
    feedback.textContent = "✅ Bonne réponse !";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Mauvaise réponse.";
    feedback.style.color = "red";
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showScore();
    }
  }, 1000);
}

function showScore() {
  quizContainer.innerHTML = "";
  scoreContainer.innerHTML = `<h2>Score final : ${score} / ${quizData.length}</h2>`;
  if (score === quizData.length) {
    scoreContainer.innerHTML += `<div class="badge">🏅 Badge Or : Maîtrise parfaite !</div>`;
  } else if (score >= quizData.length / 2) {
    scoreContainer.innerHTML += `<div class="badge">🥈 Badge Argent : Bonne compréhension</div>`;
  } else {
    scoreContainer.innerHTML += `<div class="badge">🥉 Badge Bronze : À retravailler</div>`;
  }
  restartBtn.style.display = "block";
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  scoreContainer.innerHTML = "";
  restartBtn.style.display = "none";
  loadQuestion();
});

loadQuestion();
