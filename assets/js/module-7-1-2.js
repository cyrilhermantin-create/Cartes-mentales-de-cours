// ==========================================
// JAVASCRIPT POUR MODULE 7-1-2 : SYNTHÈSE
// ==========================================

// Questions du quiz basées sur la taxonomie de Bloom
const questions = [
    {
        level: "memorisation",
        question: "Au-delà de quelle durée un marché est-il obligatoirement révisable ?",
        options: [
            "1 mois",
            "3 mois", 
            "6 mois",
            "12 mois"
        ],
        correct: 1,
        feedback: "Un marché de plus de 3 mois est obligatoirement révisable pour tenir compte de l'influence du temps sur les prix."
    },
    {
        level: "memorisation",
        question: "Quel est le pourcentage maximum de la retenue de garantie ?",
        options: [
            "3%",
            "5%",
            "7%",
            "10%"
        ],
        correct: 1,
        feedback: "La retenue de garantie ne peut pas excéder 5% du montant du marché."
    },
    {
        level: "comprehension", 
        question: "Pourquoi organise-t-on une synthèse technique avec tous les intervenants ?",
        options: [
            "Pour respecter la réglementation",
            "Pour détecter les oublis, imprécisions et redondances",
            "Pour valider les prix des entreprises", 
            "Pour établir le planning des travaux"
        ],
        correct: 1,
        feedback: "La synthèse technique permet de détecter les oublis, imprécisions et redondances dans les marchés, et d'améliorer la connaissance du champ d'intervention de chacun."
    },
    {
        level: "application",
        question: "Dans un projet de construction d'école, quels participants DOIVENT être présents aux réunions de synthèse technique ?",
        options: [
            "Seulement le maître d'œuvre et les entreprises",
            "MOE, MOA, Bureau de contrôle, entreprises, bureau d'études",
            "Uniquement le responsable prévention et les entreprises",
            "Seulement le maître d'ouvrage et le bureau de contrôle"
        ],
        correct: 1,
        feedback: "Les réunions de synthèse technique doivent réunir : maître d'œuvre, maître d'ouvrage, bureau de contrôle, entreprises et bureau d'études pour une analyse complète."
    },
    {
        level: "analyse",
        question: "Analysez l'impact d'un défaut d'identification des interfaces techniques lors de la synthèse :",
        options: [
            "Simple retard dans le planning",
            "Dysfonctionnements, non-conformités et litiges entre entreprises",
            "Augmentation légère des coûts",
            "Aucun impact majeur sur le projet"
        ],
        correct: 1,
        feedback: "Un défaut d'identification des interfaces techniques peut causer des dysfonctionnements majeurs, des non-conformités et des litiges coûteux entre entreprises."
    },
    {
        level: "evaluation",
        question: "Évaluez l'ordre de priorité : quel élément traiter EN PREMIER lors de la synthèse ?",
        options: [
            "Les points à risque techniques",
            "L'organisation du contrôle",
            "La synthèse générale de l'opération (identification, marché)",
            "Les modalités de règlement"
        ],
        correct: 2,
        feedback: "La synthèse générale doit être traitée en premier car elle définit le cadre général, la nature du marché et les modes d'intervention qui conditionnent tout le reste."
    },
    {
        level: "creation",
        question: "Vous devez créer le processus de synthèse pour un projet complexe (hôpital). Quelle approche adoptez-vous ?",
        options: [
            "Synthèse générale → Points à risque → Contrôle → Règlements",
            "Synthèse générale → Règlements → Synthèse technique → Prévention/Contrôle", 
            "Points à risque → Synthèse technique → Règlements → Contrôle",
            "Règlements → Synthèse générale → Technique → Points à risque"
        ],
        correct: 1,
        feedback: "L'approche logique : 1) Cadre général, 2) Aspects financiers, 3) Analyse technique avec tous les intervenants, 4) Organisation de la prévention et du contrôle."
    },
    {
        level: "application",
        question: "Un marché en lots séparés avec 8 lots bâtiment et 3 lots VRD. Que devez-vous préciser dans la synthèse ?",
        options: [
            "Seulement le nombre total de lots",
            "Le nombre de lots + liste et montants en annexe + coordination",
            "Uniquement les montants par lot",
            "Seulement les entreprises retenues"
        ],
        correct: 1,
        feedback: "Pour l'allotissement, il faut préciser : le nombre de lots par catégorie, fournir la liste et montants en annexe, et définir la coordination des travaux."
    }
];

let currentQuestion = 0;
let score = 0;
let quizStarted = false;

// ==========================================
// FONCTIONS DE NAVIGATION
// ==========================================

function showSection(section) {
    // Masquer toutes les sections
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    // Afficher la section sélectionnée
    document.getElementById(section).classList.add('active');
    event.target.classList.add('active');
}

function toggleDetails(id) {
    const details = document.getElementById(id);
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}

// ==========================================
// FONCTIONS DU QUIZ
// ==========================================

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
    saveProgress('module-7-1-2', percentage);
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
        const savedProgress = localStorage.getItem('batilearn_module-7-1-2');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            console.log('Progression précédente chargée:', progress);
        }
    } catch(e) {
        console.log('Pas de progression sauvegardée trouvée');
    }
});
