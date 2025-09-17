// ===== VARIABLES GLOBALES MODULE 7-1-3 =====
let currentQuestion = 0;
let score = 0;
let questions = [];
let userAnswers = [];

// ===== FONCTIONS D'INTERACTIVITÉ =====

function showSection(sectionName) {
    // Cacher toutes les sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Désactiver tous les boutons d'onglet
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Afficher la section sélectionnée
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Activer l'onglet correspondant
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
        details.style.maxHeight = '0px';
        details.style.opacity = '0';
    } else {
        // Fermer tous les autres détails (accordéon)
        const allDetails = document.querySelectorAll('.branch-details');
        const allBranches = document.querySelectorAll('.branch');
        
        allDetails.forEach(detail => {
            detail.classList.remove('show');
            detail.style.maxHeight = '0px';
            detail.style.opacity = '0';
        });
        allBranches.forEach(br => br.classList.remove('expanded'));
        
        // Ouvrir le détail sélectionné avec animation
        details.classList.add('show');
        branch.classList.add('expanded');
        details.style.maxHeight = details.scrollHeight + 'px';
        details.style.opacity = '1';
        
        // Scroll vers l'élément ouvert
        setTimeout(() => {
            branch.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
    }
}

// ===== QUESTIONS QUIZ MODULE 7-1-3 =====
const quizQuestions = [
    // Niveau 1 - Connaissance (Bloom)
    {
        question: "Quel est le document principal du marché dans la hiérarchie des pièces ?",
        answers: [
            "Le CCAP", 
            "L'acte d'engagement", 
            "Le règlement de consultation", 
            "Le CCTP"
        ],
        correct: 1,
        explanation: "L'acte d'engagement (ou marché en privé) est LE document principal, au sommet de la hiérarchie contractuelle. Il contient parties, prix et délais.",
        level: "Connaissance",
        importance: "CRITIQUE - 25%",
        paretoCategory: "critical"
    },
    
    // Niveau 2 - Compréhension (Bloom)
    {
        question: "Que doit obligatoirement faire le CCAP pour être valide ?",
        answers: [
            "Reprendre intégralement le CCAG", 
            "Se référer au CCAG travaux (public) ou norme AFNOR (privé)", 
            "Être signé par toutes les parties", 
            "Contenir tous les prix détaillés"
        ],
        correct: 1,
        explanation: "Le CCAP doit OBLIGATOIREMENT se référer au CCAG (public) ou norme AFNOR (privé). Ces documents ne sont pas automatiquement applicables.",
        level: "Compréhension",
        importance: "CRITIQUE - 25%",
        paretoCategory: "critical"
    },
    
    // Niveau 3 - Application (Bloom)
    {
        question: "Dans le règlement de consultation, quelle information est ESSENTIELLE pour les entreprises ?",
        answers: [
            "Le nom du maître d'œuvre", 
            "Les documents à produire pour candidater", 
            "L'historique du projet", 
            "Les entreprises concurrentes"
        ],
        correct: 1,
        explanation: "Le règlement définit COMMENT candidater : documents à produire, délais, variantes acceptées... C'est le mode d'emploi pour les entreprises.",
        level: "Application",
        importance: "ESSENTIEL - 15%",
        paretoCategory: "essential"
    },
    
    // Niveau 4 - Analyse (Bloom)
    {
        question: "Analysez : Pourquoi séparer 'communication entre parties' et 'clauses financières' dans le CCAP ?",
        answers: [
            "Pour respecter la réglementation", 
            "Parce que ce sont les 2 sources principales de litiges", 
            "Pour simplifier la lecture", 
            "Par tradition administrative"
        ],
        correct: 1,
        explanation: "Analyse Pareto : Ces 2 rubriques représentent 80% des conflits contractuels. Une mauvaise communication + des clauses financières floues = litige quasi-certain.",
        level: "Analyse",
        importance: "CRITIQUE - 50%",
        paretoCategory: "critical"
    },
    
    // Niveau 5 - Synthèse (Bloom)
    {
        question: "Synthétisez : Selon Pareto, sur quoi concentrer 80% de votre effort de rédaction ?",
        answers: [
            "QSE + Insertion sociale", 
            "Acte d'engagement + CCAP (communication + finance)", 
            "Règlement consultation + Préparation chantier", 
            "Clauses juridiques + Assurances"
        ],
        correct: 1,
        explanation: "Synthèse Pareto parfaite : Acte (25%) + CCAP communication/finance (25%) = 50% de l'effort pour 80% d'efficacité. Le reste est complémentaire.",
        level: "Synthèse",
        importance: "CRITIQUE - 50%",
        paretoCategory: "critical"
    },
    
    // Niveau 6 - Évaluation (Bloom)
    {
        question: "Évaluez : Quelle affirmation sur les assurances est la plus critique à retenir ?",
        answers: [
            "Toutes les assurances sont facultatives", 
            "Seule l'assurance décennale est légalement obligatoire", 
            "La RC professionnelle suffit toujours", 
            "Les attestations ne sont pas nécessaires"
        ],
        correct: 1,
        explanation: "Évaluation critique : L'assurance décennale est la SEULE légalement obligatoire. Erreur fréquente = confusion avec RC pro (demandée par contrat).",
        level: "Évaluation",
        importance: "IMPORTANT - 10%",
        paretoCategory: "important"
    }
];

// ===== FONCTIONS QUIZ =====

function startQuiz() {
    questions = [...quizQuestions];
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    
    // Gestion boutons
    const startBtn = document.getElementById('startQuiz');
    const restartBtn = document.getElementById('restartQuiz');
    const nextBtn = document.getElementById('nextQuestion');
    
    if (startBtn) startBtn.style.display = 'none';
    if (restartBtn) restartBtn.style.display = 'none';
    if (nextBtn
