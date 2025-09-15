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
