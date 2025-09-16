
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


