// ==========================================
// JAVASCRIPT POUR MODULE 7-1-1 : ANALYSE
// ==========================================

// Questions du quiz basées sur la taxonomie de Bloom
const questions = [
    {
        level: "memorisation",
        question: "Qui établit le rapport géotechnique ?",
        options: [
            "Le maître d'œuvre",
            "Le bureau d'études de sol (géotechnicien)",
            "Le maître d'ouvrage",
            "Le coordonnateur de sécurité"
        ],
        correct: 1,
        feedback: "Le rapport géotechnique est établi par un bureau d'études de sol ou un géotechnicien pour déterminer la nature du sol."
    },
    {
        level: "comprehension",
        question: "Pourquoi le programme du maître d'ouvrage est-il obligatoire dans un marché public ?",
        options: [
            "Pour respecter la réglementation des marchés publics",
            "Pour définir les besoins, spécifications et contraintes du projet",
            "Pour assurer un financement adéquat",
            "Toutes les réponses ci-dessus"
        ],
        correct: 3,
        feedback: "Le programme est obligatoire car il centralise tous les éléments essentiels : besoins, spécifications, contraintes, réglementations et financement."
    },
    {
        level: "application",
        question: "Dans quel cas l'économiste doit-il consulter les diagnostics techniques d'amiante et de plomb ?",
        options: [
            "Pour tout nouveau bâtiment",
            "Uniquement pour les bâtiments de plus de 50 ans",
            "Lors d'interventions sur des bâtiments existants",
            "Seulement si le maître d'ouvrage le demande"
        ],
        correct: 2,
        feedback: "Les diagnostics techniques (amiante, plomb, termite, radon) sont nécessaires lors d'interventions sur des bâtiments existants pour connaître leur état."
    },
    {
        level: "analyse",
        question: "Analysez l'impact d'un sol argileux instable sur la rédaction du DCE :",
        options: [
            "Aucun impact, c'est du ressort de l'entreprise",
            "Nécessité de prévoir des fondations spéciales et d'informer les entreprises",
            "Simple mention dans les documents techniques",
            "Report de la consultation"
        ],
        correct: 1,
        feedback: "Un sol instable impose des contraintes techniques importantes qui doivent être anticipées dans le DCE pour que les entreprises puissent chiffrer correctement."
    },
    {
        level: "evaluation",
        question: "Évaluez l'ordre de priorité pour l'économiste : quel document consulter EN PREMIER ?",
        options: [
            "Le rapport géotechnique pour connaître les contraintes",
            "Le programme du maître d'ouvrage pour comprendre les objectifs",
            "Le permis de construire pour avoir la vision globale",
            "Le PGC-SPS pour la sécurité"
        ],
        correct: 1,
        feedback: "Le programme définit les objectifs et le cadre général du projet. Il oriente toute l'analyse et doit être consulté en premier."
    },
    {
        level: "creation",
        question: "Vous devez créer une checklist pour un projet de rénovation d'école. Quels documents sont INDISPENSABLES ?",
        options: [
            "Permis + Programme + Géotechnique uniquement",
            "Tous les documents mentionnés dans le cours",
            "Permis + Programme + Diagnostics existant + Sécurité + Accessibilité",
            "Programme + Géotechnique + Environnement"
        ],
        correct: 2,
        feedback: "Pour une école (ERP), tous ces documents sont critiques : réglementation stricte, sécurité renforcée, accessibilité obligatoire, état de l'existant crucial."
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
    
    // Activer le bouton correspondant
    const activeTab = Array.from(document.querySelectorAll('.tab-btn')).find(btn => {
        return btn.getAttribute('onclick').includes(section);
    });
    
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

function toggleDetails(id) {
    const details = document.getElementById(id);
    if (!details) {
        console.error('Élément non trouvé:', id);
        return;
    }
    
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
        resultMessage = 'Excellence ! Vous maîtrisez parfaitement l\'analyse DCE.';
        resultClass = 'correct';
        recommendations = 'Vous êtes prêt pour la mise en pratique professionnelle.';
    } else if (percentage >= 70) {
        resultMessage = 'Très bien ! Bonne maîtrise globale du module.';
        resultClass = 'correct';
        recommendations = 'Revoyez les questions ratées avec la carte mentale.';
    } else if (percentage >= 50) {
        resultMessage = 'Correct, mais des améliorations sont nécessaires.';
        resultClass = 'incorrect';
        recommendations = 'Focalisez-vous sur la synthèse Pareto (PPGSTS) et recommencez.';
    } else {
        resultMessage = 'Révision indispensable. Reprenez le cours complet.';
        resultClass = 'incorrect';
        recommendations = 'Commencez par mémoriser les 6 piliers PPGSTS, puis utilisez la carte mentale.';
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
// INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Module 7-1-1 initialisé avec succès');
    
    // Initialiser le quiz container
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) {
        quizContainer.innerHTML = `
            <div class="quiz-intro">
                <h3>🧠 Quiz Interactif - Module 7-1-1</h3>
                <p>Testez vos connaissances avec 6 questions organisées selon la taxonomie de Bloom.</p>
                <div class="quiz-features">
                    <span class="feature">📊 Analyse Pareto</span>
                    <span class="feature">🎓 Taxonomie Bloom</span>
                    <span class="feature">💡 Mnémotechnique</span>
                </div>
            </div>
        `;
    }
    
    console.log('✅ Module prêt !');
});
