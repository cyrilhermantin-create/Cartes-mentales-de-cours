
// ==========================================
// JAVASCRIPT POUR MODULE 7-1-3 : Rédaction DCE
// ==========================================

// Questions du quiz basées sur la taxonomie de Bloom
const questions = [
  /*---Rédaction du quiz Rédaction DCE**, basé sur la méthode de Pareto(80/20) et la taxonomie de Bloom révisée.---*/

## 🧠 Structure du quiz : 5 questions clés

Chaque question cible un document stratégique du DCE (Pareto 20%) et un niveau Bloom.

<AnswerCard type="quiz">{"quiz":[
  {
    "question":"Quel document définit les modalités de passation du marché, les variantes acceptées et les délais de réponse ?",
    "options":["Le CCAP","Le règlement de la consultation","Le CCTP","L'acte d'engagement"],
    "answer":[1],
    "explanation":"Le règlement de la consultation précise la procédure, les variantes, les délais et les documents à fournir. Il structure la phase de consultation.",
    "type":"singleSelect"
  },
  {
    "question":"Dans un marché privé, quelle norme remplace le CCAG pour les clauses administratives générales ?",
    "options":["NFP 03-001 / NFP 03-002","ISO 9001","NF DTU 45.1","CCAG travaux"],
    "answer":[0],
    "explanation":"La norme NFP 03-001 (bâtiment) ou NFP 03-002 (VRD) est utilisée dans les marchés privés en lieu du CCAG.",
    "type":"singleSelect"
  },
  {
    "question":"Quel document contient les clauses relatives aux délais de paiement, pénalités et modalités de révision des prix ?",
    "options":["Le CCTP","Le règlement de la consultation","Le CCAP","Le rapport géotechnique"],
    "answer":[2],
    "explanation":"Le CCAP regroupe les clauses financières, juridiques et organisationnelles du marché. Il est contractuel après attribution.",
    "type":"singleSelect"
  },
  {
    "question":"Pourquoi l’acte d’engagement est-il considéré comme le document principal du marché ?",
    "options":["Il contient les plans d’exécution","Il définit les responsabilités juridiques","Il formalise le contrat entre les parties","Il décrit les exigences environnementales"],
    "answer":[2],
    "explanation":"L’acte d’engagement formalise le contrat, les parties, le prix et les délais. C’est la base du marché.",
    "type":"singleSelect"
  },
  {
    "question":"Quelle clause du CCAP permet de traiter les litiges entre les parties pendant l’exécution des travaux ?",
    "options":["Clause d’insertion sociale","Clause d’arbitrage","Clause de qualité","Clause de conformité"],
    "answer":[1],
    "explanation":"La clause d’arbitrage permet de confier le règlement du litige à un arbitre ou collège d’arbitres désigné.",
    "type":"singleSelect"
  }
],"title":"Quiz Rédaction du DCE – Module 7-1-3","type":"quiz"}</AnswerCard>

let currentQuestion = 0;
let score = 0;
let quizStarted = false;
// ==========================================
// FONCTIONS DE NAVIGATION
// ==========================================

function showSection(sectionId) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`.tab-btn[onclick="showSection('${sectionId}')"]`).classList.add('active');
}

function toggleDetails(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === 'block' ? 'none' : 'block';
}
function toggleDetails(id) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = el.style.display === 'block' ? 'none' : 'block';
  }
}
// ==========================================
// FONCTIONS DU QUIZ
// ==========================================

<div class="quiz-container">
  <div class="quiz-question">Quel document formalise le contrat entre les parties ?</div>
  <div class="quiz-options">
    <button class="button" onclick="checkAnswer(0)">Le CCTP</button>
    <button class="button" onclick="checkAnswer(1)">Le règlement de la consultation</button>
    <button class="button" onclick="checkAnswer(2)">L’acte d’engagement</button>
    <button class="button" onclick="checkAnswer(3)">Le CCAP</button>
  </div>
  <div class="quiz-feedback"></div>
  function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    score = 0;
    document.getElementById('startQuiz').style.display = 'none';
    document.getElementById('restartQuiz').style.display = 'none';
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        showResults();
        return;
    }

    const question = questions[currentQuestion];
    const container = document.getElementById('quizContainer');
    
    const bloomLabels = {
        'memorisation': 'Mémorisation',
        'comprehension': 'Compréhension', 
        'application': 'Application',
        'analyse': 'Analyse',
        'evaluation': 'Évaluation',
        'creation': 'Création'
    };

    container.innerHTML = `
        <div class="quiz-container">
            <div class="bloom-level bloom-${question.level}">
                Niveau Bloom: ${bloomLabels[question.level]}
            </div>
            <div class="question">${question.question}</div>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option" onclick="selectOption(${index})">${option}</div>
                `).join('')}
            </div>
            <div class="quiz-feedback" id="feedback"></div>
        </div>
    `;

    updateProgress();
    updateScore();
}

function selectOption(selectedIndex) {
    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    const feedback = document.getElementById('feedback');
    
    // Désactiver tous les clics
    options.forEach((option, index) => {
        option.onclick = null;
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex) {
            option.classList.add('incorrect');
        }
    });

    // Afficher le feedback
    if (selectedIndex === question.correct) {
        score++;
        feedback.className = 'quiz-feedback correct';
        feedback.innerHTML = '✅ ' + question.feedback;
    } else {
        feedback.className = 'quiz-feedback incorrect';
        feedback.innerHTML = '❌ ' + question.feedback;
    }
    feedback.style.display = 'block';

    // Afficher le bouton suivant
    document.getElementById('nextQuestion').style.display = 'inline-block';
    updateScore();
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('nextQuestion').style.display = 'none';
    showQuestion();
}

function showResults() {
    const container = document.getElementById('quizContainer');
    const percentage = Math.round((score / questions.length) * 100);
    
    let resultMessage = '';
    let resultClass = '';
    let recommendations = '';
    
    if (percentage >= 85) {
        resultMessage = 'Excellence ! Vous maîtrisez parfaitement la synthèse.';
        resultClass = 'correct';
        recommendations = 'Vous êtes prêt pour la mise en pratique professionnelle.';
    } else if (percentage >= 70) {
        resultMessage = 'Très bien ! Bonne maîtrise globale du module.';
        resultClass = 'correct';
        recommendations = 'Revoyez les questions ratées avec la carte mentale.';
    } else if (percentage >= 50) {
        resultMessage = 'Correct, mais des améliorations sont nécessaires.';
        resultClass = 'incorrect';
        recommendations = 'Focalisez-vous sur la synthèse Pareto (S-R-T-P) et recommencez.';
    } else {
        resultMessage = 'Révision indispensable. Reprenez le cours complet.';
        resultClass = 'incorrect';
        recommendations = 'Commencez par mémoriser les 4 piliers S-R-T-P, puis utilisez la carte mentale.';
    }

    container.innerHTML = `
        <div class="quiz-container">
            <h2 style="text-align: center; color: #667eea; margin-bottom: 20px;">🎯 Résultats du Quiz</h2>
            <div class="score" style="font-size: 2.5em; margin: 20px 0;">${score}/${questions.length} (${percentage}%)</div>
            <div class="quiz-feedback ${resultClass}" style="display: block; text-align: center; font-size: 1.1em;">
                <strong>${resultMessage}</strong>
            </div>
            <div style="margin-top: 25px; padding: 20px; background: rgba(102, 126, 234, 0.1); border-radius: 12px;">
                <h3 style="color: #667eea; margin-bottom: 15px;">📚 Recommandations :</h3>
                <p style="line-height: 1.6;">${recommendations}</p>
            </div>
            <div style="margin-top: 20px; text-align: center;">
                <p style="color: #666; font-style: italic;">
                    💡 Conseil : Un score ≥ 80% indique une maîtrise opérationnelle du module.
                </p>
            </div>
        </div>
    `;

    document.getElementById('restartQuiz').style.display = 'inline-block';
    
    // Sauvegarder le score pour la progression
    saveProgress('module-7-1-3', percentage);
}

function restartQuiz() {
    document.getElementById('restartQuiz').style.display = 'none';
    document.getElementById('startQuiz').style.display = 'inline-block';
    document.getElementById('quizContainer').innerHTML = '';
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('scoreDisplay').textContent = 'Score: 0/0';
    quizStarted = false;
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

function updateScore() {
    document.getElementById('scoreDisplay').textContent = `Score: ${score}/${currentQuestion + (quizStarted ? 1 : 0)}`;
}

</div>
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".content-section");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.target;

      sections.forEach(section => section.classList.remove("active"));
      document.getElementById(target).classList.add("active");

      tabs.forEach(btn => btn.classList.remove("active"));
      tab.classList.add("active");
    });
  });
});
// ==========================================
// SAUVEGARDE DE PROGRESSION
// ==========================================

function saveProgress(moduleId, percentage) {
    // Sauvegarde locale du score
    const progress = {
        moduleId: moduleId,
        score: percentage,
        completedAt: new Date().toISOString(),
        questionsTotal: questions.length,
        questionsCorrect: score
    };
    
    // Stocker dans les données de session (pas localStorage car non supporté)
    if (typeof(Storage) !== "undefined") {
        try {
            localStorage.setItem(`batilearn_${moduleId}`, JSON.stringify(progress));
        } catch(e) {
            // Fallback si localStorage non disponible
            console.log('Progression enregistrée en mémoire:', progress);
        }
    }
}

// ==========================================
// INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Charger la progression sauvegardée si disponible
    try {
        const savedProgress = localStorage.getItem('batilearn_module-7-1-3');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            console.log('Progression précédente chargée:', progress);
        }
    } catch(e) {
        console.log('Pas de progression sauvegardée trouvée');
    }
});


