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
            "Programme + Géotechnique + Environ

        // ===== VARIABLES GLOBALES =====
let currentQuestion = 0;
let score = 0;
let questions = [];
let userAnswers = [];

// ===== FONCTIONS PRINCIPALES D'INTERACTIVITÉ =====

/**
 * Fonction pour changer d'onglet (Carte Mentale, Quiz, Pareto)
 */
function showSection(sectionName) {
    // Cacher toutes les sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Désactiver tous les boutons d'onglet
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Afficher la section sélectionnée
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Activer l'onglet correspondant (chercher par contenu texte si event n'est pas disponible)
    const activeTab = Array.from(tabs).find(tab => {
        const text = tab.textContent.toLowerCase();
        return (sectionName === 'mindmap' && text.includes('carte')) ||
               (sectionName === 'quiz' && text.includes('quiz')) ||
               (sectionName === 'pareto' && text.includes('pareto'));
    });
    
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

/**
 * Fonction pour afficher/masquer les détails des branches (menu déroulant)
 * Utilise la méthode PARETO et taxonomie de Bloom
 */
function toggleDetails(branchId) {
    const details = document.getElementById(branchId);
    const branch = details?.parentElement;
    
    if (!details || !branch) {
        console.error(`Élément non trouvé: ${branchId}`);
        return;
    }
    
    // Si déjà ouvert, fermer
    if (details.classList.contains('show')) {
        details.classList.remove('show');
        branch.classList.remove('expanded');
        
        // Animation de fermeture
        details.style.maxHeight = '0px';
        details.style.opacity = '0';
    } else {
        // Fermer tous les autres détails d'abord (accordéon)
        const allDetails = document.querySelectorAll('.branch-details');
        const allBranches = document.querySelectorAll('.branch');
        
        allDetails.forEach(detail => {
            detail.classList.remove('show');
            detail.style.maxHeight = '0px';
            detail.style.opacity = '0';
        });
        allBranches.forEach(br => br.classList.remove('expanded'));
        
        // Ouvrir le détail sélectionné
        details.classList.add('show');
        branch.classList.add('expanded');
        
        // Animation d'ouverture
        details.style.maxHeight = details.scrollHeight + 'px';
        details.style.opacity = '1';
        
        // Scroll vers l'élément ouvert pour une meilleure UX
        setTimeout(() => {
            branch.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
    }
}

// ===== SYSTÈME DE QUIZ INTERACTIF =====

/**
 * Questions du quiz basées sur le module 7-1-1 et la transcription
 * Organisées selon la taxonomie de Bloom (Connaissance → Application → Analyse)
 */
const quizQuestions = [
    // Niveau 1 - Connaissance (Bloom)
    {
        question: "Qui fournit le programme dans un projet de construction ?",
        answers: [
            "Le maître d'œuvre", 
            "Le maître d'ouvrage", 
            "L'entreprise générale", 
            "Le bureau d'études"
        ],
        correct: 1,
        explanation: "Le programme est fourni par le maître d'ouvrage et définit ses besoins, spécifications et contraintes. Il est obligatoire en marché public.",
        level: "Connaissance",
        importance: "CRITIQUE - 25%"
    },
    
    // Niveau 2 - Compréhension (Bloom)
    {
        question: "Que contient principalement le rapport géotechnique ?",
        answers: [
            "Les plans architecturaux", 
            "La nature du sol et contraintes géotechniques", 
            "Les réseaux existants", 
            "Les normes environnementales"
        ],
        correct: 1,
        explanation: "Le rapport géotechnique, établi par un géotechnicien, analyse la nature du sol et détermine les contraintes qui impacteront les fondations.",
        level: "Compréhension",
        importance: "ESSENTIEL - 20%"
    },
    
    // Niveau 3 - Application (Bloom)
    {
        question: "Dans le contexte de la sécurité chantier, que signifie PGC-SPS ?",
        answers: [
            "Plan Général de Coordination-Sécurité et Protection de la Santé", 
            "Programme Général de Construction et Sécurité", 
            "Plan de Gestion des Chantiers Sécurisés", 
            "Protocole Général de Contrôle Sécurité"
        ],
        correct: 0,
        explanation: "PGC-SPS = Plan Général de Coordination-Sécurité et Protection de la Santé, établi par le coordonnateur de sécurité pour identifier les risques du site.",
        level: "Application",
        importance: "ESSENTIEL - 15%"
    },
    
    // Niveau 4 - Analyse (Bloom) 
    {
        question: "Selon le principe de Pareto, quels sont les 3 documents représentant 80% des informations critiques ?",
        answers: [
            "Permis + Programme + Géotechnique", 
            "Programme + Sécurité + Qualité", 
            "Géotechnique + Environnement + Réseaux", 
            "Permis + Sécurité + Environnement"
        ],
        correct: 0,
        explanation: "Les 3 documents critiques (80% de l'analyse) : Permis de construire (compréhension ouvrage), Programme (besoins MO), Rapport géotechnique (contraintes sol).",
        level: "Analyse",
        importance: "CRITIQUE - 60%"
    },
    
    // Niveau 5 - Synthèse (Bloom)
    {
        question: "Pour une intervention sur existant, quels diagnostics sont obligatoires ?",
        answers: [
            "Acoustique et thermique uniquement", 
            "Amiante, plomb, termite, radon", 
            "Géotechnique et topographie", 
            "Sécurité et environnement"
        ],
        correct: 1,
        explanation: "Sur existant : diagnostics techniques obligatoires (amiante, plomb, termite, radon) + relevé géomètre + plan cadastre. Permis de démolir si nécessaire.",
        level: "Synthèse",
        importance: "IMPORTANT - 15%"
    },
    
    // Niveau 6 - Évaluation (Bloom)
    {
        question: "Évaluez l'importance relative : quel document a le PLUS d'impact sur le DCE ?",
        answers: [
            "Rapport acoustique (confort)", 
            "Programme du MO (besoins fondamentaux)", 
            "Notice environnement (réglementation)", 
            "Plan cadastre (parcellaire)"
        ],
        correct: 1,
        explanation: "Le Programme du Maître d'Ouvrage est LE document fondamental : il définit TOUS les besoins, contraintes et objectifs qui orienteront l'ensemble du DCE.",
        level: "Évaluation",
        importance: "CRITIQUE - 25%"
    }
];

/**
 * Initialisation du quiz
 */
function startQuiz() {
    questions = [...quizQuestions];
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    
    // Gestion de l'affichage des boutons
    const startBtn = document.getElementById('startQuiz');
    const restartBtn = document.getElementById('restartQuiz');
    const nextBtn = document.getElementById('nextQuestion');
    
    if (startBtn) startBtn.style.display = 'none';
    if (restartBtn) restartBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    
    showQuestion();
    updateProgressBar();
    updateScore();
}

/**
 * Affichage d'une question
 */
function showQuestion() {
    if (currentQuestion >= questions.length) {
        showResults();
        return;
    }
    
    const question = questions[currentQuestion];
    const container = document.getElementById('quizContainer');
    
    if (!container) return;
    
    container.innerHTML = `
        <div class="question-card">
            <div class="question-header">
                <h3>Question ${currentQuestion + 1}/${questions.length}</h3>
                <div class="question-meta">
                    <span class="bloom-level">${question.level}</span>
                    <span class="importance-badge">${question.importance}</span>
                </div>
            </div>
            <p class="question-text">${question.question}</p>
            <div class="answers">
                ${question.answers.map((answer, index) => 
                    `<button class="answer-btn" onclick="selectAnswer(${index})" data-index="${index}">
                        <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="answer-text">${answer}</span>
                    </button>`
                ).join('')}
            </div>
            <div id="feedback" class="feedback" style="display: none;"></div>
        </div>
    `;
}

/**
 * Sélection d'une réponse
 */
function selectAnswer(selectedIndex) {
    const question = questions[currentQuestion];
    const answerBtns = document.querySelectorAll('.answer-btn');
    const feedback = document.getElementById('feedback');
    
    // Désactiver tous les boutons et marquer la bonne/mauvaise réponse
    answerBtns.forEach((btn, index) => {
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
        
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            btn.classList.add('incorrect');
        }
    });
    
    // Enregistrer la réponse
    userAnswers.push(selectedIndex);
    
    // Afficher le feedback avec taxonomie de Bloom
    const isCorrect = selectedIndex === question.correct;
    if (isCorrect) {
        score++;
        feedback.innerHTML = `
            <div class="correct-feedback">
                <div class="feedback-header">
                    <span class="feedback-icon">✅</span>
                    <span class="feedback-title">Excellent !</span>
                </div>
                <p><strong>Niveau ${question.level} maîtrisé</strong></p>
                <p>${question.explanation}</p>
            </div>
        `;
    } else {
        feedback.innerHTML = `
            <div class="incorrect-feedback">
                <div class="feedback-header">
                    <span class="feedback-icon">❌</span>
                    <span class="feedback-title">À réviser</span>
                </div>
                <p><strong>Niveau ${question.level} à approfondir</strong></p>
                <p>${question.explanation}</p>
            </div>
        `;
    }
    
    feedback.style.display = 'block';
    
    // Afficher le bouton suivant
    const nextBtn = document.getElementById('nextQuestion');
    if (nextBtn) nextBtn.style.display = 'inline-block';
    
    updateScore();
}

/**
 * Question suivante
 */
function nextQuestion() {
    currentQuestion++;
    showQuestion();
    updateProgressBar();
    
    const nextBtn = document.getElementById('nextQuestion');
    if (nextBtn) nextBtn.style.display = 'none';
}

/**
 * Affichage des résultats avec analyse Pareto
 */
function showResults() {
    const container = document.getElementById('quizContainer');
    const percentage = Math.round((score / questions.length) * 100);
    
    // Analyse selon Pareto et Bloom
    let bloomAnalysis = '';
    let paretoAnalysis = '';
    
    if (percentage >= 90) {
        bloomAnalysis = '🎓 Maîtrise excellente de tous les niveaux de Bloom';
        paretoAnalysis = '📊 Vous maîtrisez les 80% essentiels + les détails (20%)';
    } else if (percentage >= 80) {
        bloomAnalysis = '👍 Bonne maîtrise, approfondissez les niveaux supérieurs';
        paretoAnalysis = '✅ Vous maîtrisez les 80% essentiels du module';
    } else if (percentage >= 60) {
        bloomAnalysis = '📚 Connaissances de base acquises, travaillez l\'application';
        paretoAnalysis = '⚠️ Concentrez-vous sur les 20% critiques (PPGSTS)';
    } else {
        bloomAnalysis = '🔄 Révision nécessaire des concepts fondamentaux';
        paretoAnalysis = '🚨 Priorité absolue : Programme + Permis + Géotechnique';
    }
    
    if (!container) return;
    
    container.innerHTML = `
        <div class="results-card">
            <h3>🎯 Analyse de vos résultats</h3>
            <div class="final-score">${score}/${questions.length}</div>
            <div class="percentage">${percentage}%</div>
            
            <div class="analysis-section">
                <div class="bloom-analysis">
                    <h4>📚 Taxonomie de Bloom</h4>
                    <p>${bloomAnalysis}</p>
                </div>
                
                <div class="pareto-analysis">
                    <h4>⚖️ Principe de Pareto</h4>
                    <p>${paretoAnalysis}</p>
                </div>
            </div>
            
            <div class="detailed-results">
                <h4>📋 Détail par question</h4>
                ${questions.map((q, index) => {
                    const isCorrect = userAnswers[index] === q.correct;
                    return `
                        <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                            <div class="result-header">
                                <span class="result-icon">${isCorrect ? '✅' : '❌'}</span>
                                <span class="result-level">${q.level}</span>
                                <span class="result-importance">${q.importance}</span>
                            </div>
                            <p class="result-question">${q.question}</p>
                        </div>
                    `;
                }).join('')}
            </div>
            
            <div class="recommendation">
                <h4>💡 Recommandation</h4>
                <p>Mémorisez le moyen mnémotechnique : <strong>PPGSTS</strong><br>
                <em>Permis + Programme + Géotechnique + Sécurité + Technique + Spécifique</em></p>
            </div>
        </div>
    `;
    
    const restartBtn = document.getElementById('restartQuiz');
    if (restartBtn) restartBtn.style.display = 'inline-block';
    
    updateProgressBar();
}

/**
 * Recommencer le quiz
 */
function restartQuiz() {
    const startBtn = document.getElementById('startQuiz');
    const restartBtn = document.getElementById('restartQuiz');
    const nextBtn = document.getElementById('nextQuestion');
    
    if (startBtn) startBtn.style.display = 'inline-block';
    if (restartBtn) restartBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    
    const container = document.getElementById('quizContainer');
    if (container) {
        container.innerHTML = `
            <div class="quiz-intro">
                <h3>🧠 Quiz Interactif - Module 7-1-1</h3>
                <p>Testez vos connaissances avec 6 questions organisées selon la taxonomie de Bloom et analysées par le principe de Pareto.</p>
                <div class="quiz-features">
                    <span class="feature">📊 Analyse Pareto</span>
                    <span class="feature">🎓 Taxonomie Bloom</span>
                    <span class="feature">💡 Mnémotechnique</span>
                </div>
            </div>
        `;
    }
    
    // Reset des indicateurs
    const progressBar = document.getElementById('progressBar');
    const scoreDisplay = document.getElementById('scoreDisplay');
    
    if (progressBar) progressBar.style.width = '0%';
    if (scoreDisplay) scoreDisplay.textContent = 'Score: 0/0';
}

/**
 * Mise à jour de la barre de progression
 */
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;
    
    const progress = Math.min((currentQuestion / questions.length) * 100, 100);
    progressBar.style.width = progress + '%';
    
    // Changement de couleur selon le progrès
    if (progress === 100) {
        progressBar.style.backgroundColor = '#10b981'; // Vert
    } else if (progress >= 50) {
        progressBar.style.backgroundColor = '#f59e0b'; // Orange
    } else {
        progressBar.style.backgroundColor = '#3b82f6'; // Bleu
    }
}

/**
 * Mise à jour du score
 */
function updateScore() {
    const scoreDisplay = document.getElementById('scoreDisplay');
    if (!scoreDisplay) return;
    
    const totalAnswered = Math.max(currentQuestion, userAnswers.length);
    scoreDisplay.textContent = `Score: ${score}/${totalAnswered}`;
    
    // Couleur du score selon performance
    if (totalAnswered > 0) {
        const percentage = (score / totalAnswered) * 100;
        if (percentage >= 80) {
            scoreDisplay.style.color = '#10b981'; // Vert
        } else if (percentage >= 60) {
            scoreDisplay.style.color = '#f59e0b'; // Orange
        } else {
            scoreDisplay.style.color = '#ef4444'; // Rouge
        }
    }
}

// ===== INITIALISATION =====

/**
 * Initialisation au chargement de la page
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Module 7-1-1 initialisé avec succès');
    
    // Initialisation du quiz
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) {
        quizContainer.innerHTML = `
            <div class="quiz-intro">
                <h3>🧠 Quiz Interactif - Module 7-1-1</h3>
                <p>Testez vos connaissances avec 6 questions organisées selon la taxonomie de Bloom et analysées par le principe de Pareto.</p>
                <div class="quiz-features">
                    <span class="feature">📊 Analyse Pareto</span>
                    <span class="feature">🎓 Taxonomie Bloom</span>
                    <span class="feature">💡 Mnémotechnique</span>
                </div>
            </div>
        `;
    }
    
    // Vérification que tous les éléments sont présents
    const requiredElements = ['mindmap', 'quiz', 'pareto'];
    requiredElements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`⚠️ Élément manquant: ${id}`);
        }
    });
    
    // Ajout des écouteurs d'événements pour les branches
    const branches = document.querySelectorAll('.branch');
    branches.forEach(branch => {
        branch.addEventListener('click', function() {
            // Récupérer l'ID depuis l'attribut onclick ou data
            const onclickAttr = this.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/toggleDetails\('([^']+)'\)/);
                if (match) {
                    toggleDetails(match[1]);
                }
            }
        });
    });
    
    console.log('✅ Carte mentale interactive prête !');
});
