// ==========================================
// module-7-1-3.js — Rédaction DCE (interactive)
// ==========================================

/* ------------------------
   Questions (extraites et structurées)
   - niveau: Bloom (memorisation, comprehension, application, analyse, evaluation, creation)
-------------------------*/
const questions = [
  {
    level: "memorisation",
    question: "Quel document précise la procédure de passation, les variantes acceptées et les délais de réponse ?",
    options: ["Le CCAP", "Le règlement de consultation", "Le CCTP", "L'acte d'engagement"],
    correct: 1,
    feedback: "Le règlement de consultation précise la procédure, les variantes, les délais et les pièces à produire."
  },
  {
    level: "memorisation",
    question: "Quelle norme est souvent utilisée en marché privé en lieu et place du CCAG ?",
    options: ["NFP 03-001 / NFP 03-002", "ISO 9001", "NF DTU 45.1", "CCAG travaux"],
    correct: 0,
    feedback: "En marché privé on fait souvent référence à la norme NFP 03-001 (bâtiment) ou NFP 03-002 (VRD)."
  },
  {
    level: "comprehension",
    question: "Quel document regroupe les clauses relatives aux délais de paiement, pénalités et révision des prix ?",
    options: ["Le CCTP", "Le règlement de consultation", "Le CCAP", "Le rapport géotechnique"],
    correct: 2,
    feedback: "Le CCAP contient les clauses financières et contractuelles applicables au marché."
  },
  {
    level: "application",
    question: "Pourquoi l'acte d'engagement est-il essentiel au contrat ?",
    options: ["Il contient les plans d'exécution", "Il formalise le contrat entre les parties", "Il décrit l'impact environnemental", "Il remplace le CCAP"],
    correct: 1,
    feedback: "L'acte d'engagement formalise le contrat : parties, prix, délais et conditions."
  },
  {
    level: "analysis",
    question: "Quelle clause permet de confier le règlement d'un litige à un tiers ?",
    options: ["Clause d'insertion sociale", "Clause d'arbitrage", "Clause qualité", "Clause de conformité"],
    correct: 1,
    feedback: "La clause d'arbitrage permet de régler un litige via un arbitre ou un collège d'arbitres."
  }
];

let currentQuestion = 0;
let score = 0;
let quizStarted = false;

/* ------------------------
   Accessibility-friendly tab switching and branch toggles
-------------------------*/
function initTabsAndBranches() {
  const tabs = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.content-section');

  function activateTab(tab) {
    const target = tab.dataset.target;
    // sections
    sections.forEach(s => {
      const active = s.id === target;
      s.classList.toggle('active', active);
      s.setAttribute('aria-hidden', !active);
    });
    // tab buttons
    tabs.forEach(b => b.classList.toggle('active', b === tab));
    tab.focus();
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateTab(tab);
      }
    });
  });

  // Branch toggles (click + keyboard)
  const branches = document.querySelectorAll('.branch');
  branches.forEach(branch => {
    const targetId = branch.dataset.target;
    const details = targetId ? document.getElementById(targetId) : null;
    if (details) {
      // click handler
      branch.addEventListener('click', () => toggleDetails(targetId));
      // keyboard handler
      branch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleDetails(targetId);
        }
      });
    }
  });
}

/* ------------------------
   toggleDetails: affiche / cache une branche, gère classes CSS
-------------------------*/
function toggleDetails(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const branch = el.closest('.branch');
  const showing = el.classList.contains('show');
  if (showing) {
    el.classList.remove('show');
    if (branch) branch.classList.remove('expanded');
    branch && branch.setAttribute('aria-expanded', 'false');
  } else {
    el.classList.add('show');
    if (branch) branch.classList.add('expanded');
    branch && branch.setAttribute('aria-expanded', 'true');
  }
}

/* ------------------------
   Quiz functions
-------------------------*/
function startQuiz() {
  quizStarted = true;
  currentQuestion = 0;
  score = 0;
  document.getElementById('startQuiz').style.display = 'none';
  document.getElementById('restartQuiz').style.display = 'none';
  showQuestion();
  updateScore();
}

function showQuestion() {
  const container = document.getElementById('quizContainer');
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }
  const q = questions[currentQuestion];
  const bloomLabels = {
    memorisation: 'Mémorisation',
    comprehension: 'Compréhension',
    application: 'Application',
    analyse: 'Analyse',
    evaluation: 'Évaluation',
    creation: 'Création'
  };

  container.innerHTML = `
    <div class="quiz-container">
      <div class="bloom-level bloom-${q.level}">Niveau Bloom: ${bloomLabels[q.level] || q.level}</div>
      <div class="question">${q.question}</div>
      <div class="options">
        ${q.options.map((opt, idx) => `<div class="option" role="button" tabindex="0" data-index="${idx}">${opt}</div>`).join('')}
      </div>
      <div class="quiz-feedback" id="feedback" style="display:none"></div>
    </div>
  `;

  // attach handlers to options
  document.querySelectorAll('.option').forEach(optEl => {
    const idx = parseInt(optEl.dataset.index, 10);
    optEl.addEventListener('click', () => selectOption(idx));
    optEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectOption(idx);
      }
    });
  });

  updateProgress();
  updateScore();
}

function selectOption(selectedIndex) {
  const q = questions[currentQuestion];
  const optionEls = document.querySelectorAll('.option');
  const feedbackEl = document.getElementById('feedback');

  // prevent multiple clicks
  optionEls.forEach((el, i) => {
    el.onclick = null;
    el.onkeydown = null;
    if (i === q.correct) el.classList.add('correct');
    if (i === selectedIndex && i !== q.correct) el.classList.add('incorrect');
  });

  if (selectedIndex === q.correct) {
    score++;
    feedbackEl.className = 'quiz-feedback correct';
    feedbackEl.innerHTML = '✅ ' + q.feedback;
  } else {
    feedbackEl.className = 'quiz-feedback incorrect';
    feedbackEl.innerHTML = '❌ ' + q.feedback;
  }
  feedbackEl.style.display = 'block';
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
  let message = '', cls = '', rec = '';

  if (percentage >= 85) {
    message = 'Excellence ! Vous maîtrisez parfaitement le module.';
    cls = 'correct';
    rec = "Vous êtes prêt pour la mise en pratique.";
  } else if (percentage >= 70) {
    message = "Très bien ! Bonne maîtrise globale.";
    cls = 'correct';
    rec = "Revoyez les points faibles et refaites le quiz.";
  } else if (percentage >= 50) {
    message = "Correct, mais des améliorations sont nécessaires.";
    cls = 'incorrect';
    rec = "Focus sur la synthèse Pareto et les clauses financières/juridiques.";
  } else {
    message = "Révision indispensable.";
    cls = 'incorrect';
    rec = "Reprenez les 4 blocs essentiels et retentez le quiz.";
  }

  container.innerHTML = `
    <div class="quiz-container">
      <h2 style="text-align:center; color:#667eea">🎯 Résultats</h2>
      <div class="score" style="font-size:2em; text-align:center">${score}/${questions.length} (${percentage}%)</div>
      <div class="quiz-feedback ${cls}" style="display:block; text-align:center;"><strong>${message}</strong></div>
      <div style="margin-top:20px; padding:15px; background:rgba(102,126,234,0.06); border-radius:8px;">
        <h3>Recommandation</h3>
        <p>${rec}</p>
      </div>
    </div>
  `;
  document.getElementById('restartQuiz').style.display = 'inline-block';
  saveProgress('module-7-1-3', percentage);
}

function restartQuiz() {
  document.getElementById('restartQuiz').style.display = 'none';
  document.getElementById('startQuiz').style.display = 'inline-block';
  document.getElementById('quizContainer').innerHTML = '';
  document.getElementById('progressBar').style.width = '0%';
  score = 0;
  currentQuestion = 0;
  quizStarted = false;
  updateScore();
}

function updateProgress() {
  const progressEl = document.getElementById('progressBar');
  const progress = Math.round(((currentQuestion + 1) / questions.length) * 100);
  if (progressEl) progressEl.style.width = `${progress}%`;
}

function updateScore() {
  const sd = document.getElementById('scoreDisplay');
  if (sd) sd.textContent = `Score: ${score}/${quizStarted ? (currentQuestion + 1) : 0}`;
}

/* ------------------------
   Sauvegarde / initialisation
-------------------------*/
function saveProgress(moduleId, percentage) {
  const progress = {
    moduleId,
    score: percentage,
    completedAt: new Date().toISOString(),
    total: questions.length,
    correct: score
  };
  try {
    localStorage.setItem(`batilearn_${moduleId}`, JSON.stringify(progress));
  } catch (e) {
    console.warn('Impossible d\'enregistrer la progression', e);
  }
}

function loadSavedProgress(moduleId) {
  try {
    const raw = localStorage.getItem(`batilearn_${moduleId}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

/* ------------------------
   DOM ready : hook events
-------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  // init tabs & branches
  initTabsAndBranches();

  // buttons
  const startBtn = document.getElementById('startQuiz');
  const nextBtn = document.getElementById('nextQuestion');
  const restartBtn = document.getElementById('restartQuiz');

  startBtn && startBtn.addEventListener('click', startQuiz);
  nextBtn && nextBtn.addEventListener('click', nextQuestion);
  restartBtn && restartBtn.addEventListener('click', restartQuiz);

  // load progress if present (only console logging)
  const saved = loadSavedProgress('module-7-1-3');
  if (saved) {
    console.log('Progression trouvée pour module-7-1-3:', saved);
  }
});
