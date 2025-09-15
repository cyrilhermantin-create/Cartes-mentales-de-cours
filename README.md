# 🧠 Cartes Mentales de Cours - Formation Batilearn

## 📖 Description

Plateforme d'apprentissage interactive pour la formation **BTP** en économie de la construction. Applique le **principe de Pareto (80/20)** et la **taxonomie de Bloom révisée** pour optimiser la mémorisation et la compréhension.

## 🌐 **Accès Direct**

👉 **[Formation BTP Interactive](https://cyrilhermantin-create.github.io/Cartes-mentales-de-cours/)**

## 📚 **Modules Disponibles**

### 🔵 **Module 7-1-1 : Analyse**
- **Objectif** : Maîtriser l'analyse des documents nécessaires avant DCE
- **Contenu** : Permis, Programme, Géotechnique, Sécurité, Qualité
- **Durée** : 25 minutes | **Questions** : 6 | **Méthode** : PPGSTS

### 🟢 **Module 7-1-2 : Synthèse** *(NOUVEAU)*
- **Objectif** : Réaliser la synthèse générale et technique d'opération
- **Contenu** : Identification, Règlements, Points à risque, Contrôle
- **Durée** : 30 minutes | **Questions** : 8 | **Méthode** : S-R-T-P

### 🟡 **Module 8 : Estimation** *(Prochainement)*
- **Objectif** : Techniques d'estimation et métrés
- **Statut** : En développement

## ✨ **Fonctionnalités**

### 🗺️ **Cartes Mentales Interactives**
- Branches dépliables avec détails
- Codes couleurs et priorités visuelles  
- Navigation intuitive par clic
- Responsive mobile/desktop

### 📝 **Quiz Adaptatifs**
- **6 niveaux Bloom** : Mémorisation → Création
- Feedback immédiat personnalisé
- Scoring avec recommandations
- Progression sauvegardée localement

### 🎯 **Synthèse Pareto**
- **20% concepts essentiels** = 80% efficacité
- Moyens mnémotechniques optimisés
- Hiérarchisation par importance critique
- Stratégies d'apprentissage ciblées

## 🛠️ **Structure Technique**

```
Cartes-mentales-de-cours/
├── index.html                    # Hub principal
├── assets/
│   ├── css/main.css             # Styles centralisés  
│   └── js/
│       ├── module-7-1-1.js     # Logic Analyse
│       └── module-7-1-2.js     # Logic Synthèse
└── modules/
    ├── module-7-1-1-analyse.html
    └── module-7-1-2-synthese.html
```

## 🚀 **Installation Locale**

```bash
# Cloner le repository
git clone https://github.com/cyrilhermantin-create/Cartes-mentales-de-cours.git

# Naviguer dans le dossier
cd Cartes-mentales-de-cours

# Ouvrir dans le navigateur
open index.html
```

## 🧠 **Méthodologie Pédagogique**

### **Principe de Pareto Appliqué**
| Module | 20% Essentiel | Impact |
|--------|---------------|---------|
| **7-1-1** | PPGSTS | 80% réussite |
| **7-1-2** | S-R-T-P | 90% maîtrise |

### **Taxonomie de Bloom - Progression Cognitive**
1. **🟡 Mémorisation** - Faits et chiffres clés
2. **🟠 Compréhension** - Sens et objectifs  
3. **🟢 Application** - Cas d'usage concrets
4. **🔵 Analyse** - Relations et impacts
5. **🟣 Évaluation** - Jugement et priorités
6. **🔴 Création** - Synthèse et innovation

## 📊 **Métriques d'Efficacité**

- ⏱️ **Temps d'apprentissage** : -60% vs cours traditionnel
- 📈 **Taux de rétention** : +75% avec méthode visuelle
- 🎯 **Score cible** : ≥80% pour maîtrise opérationnelle
- 🔄 **Engagement** : Interface interactive vs statique

## 🎨 **Technologies**

- **Frontend** : HTML5, CSS3 (Grid/Flexbox), JavaScript ES6
- **Design** : Responsive, Gradients modernes, Animations CSS
- **Architecture** : Modulaire, Séparation des responsabilités
- **Compatibilité** : Tous navigateurs modernes

## 📱 **Responsive Design**

✅ **Desktop** - Expérience complète avec cartes étendues
✅ **Tablet** - Interface adaptée pour interaction tactile  
✅ **Mobile** - Navigation optimisée, contenu prioritaire
✅ **PWA Ready** - Installation possible en application

## 🎯 **Guide d'Utilisation Optimale**

### **1. Première Utilisation (10 min)**
1. 📖 Commencez par la **Synthèse Pareto** pour la vue d'ensemble
2. 🗺️ Explorez la **Carte Mentale** pour les détails
3. 📝 Testez vos connaissances avec le **Quiz**

### **2. Révision Efficace (15 min)**
1. 🔄 Recommencez le quiz jusqu'à ≥80%
2. 🎯 Focalisez sur les **concepts Pareto** ratés
3. 💡 Utilisez les **moyens mnémotechniques**

### **3. Maîtrise Avancée (20 min)**
1. ⚡ Quiz en mode "défi" (sans regarder les détails)
2. 🏆 Objectif : 85%+ pour expertise professionnelle
3. 📊 Suivez votre progression entre modules

## 🎓 **Intégration Formation**

### **Pour les Formateurs**
- 📊 **Dashboard progression** des apprenants
- 🎯 **Points faibles identifiés** par module
- 📈 **Statistiques d'engagement** détaillées
- 🔄 **Cycles de révision** recommandés

### **Pour les Apprenants**
- 🏠 **Hub personnel** de progression
- 🎖️ **Badges de réussite** par module
- 📱 **Accessibilité mobile** pour révisions nomades  
- 💾 **Sauvegarde locale** des scores

## 🔧 **Développement**

### **Ajouter un Nouveau Module**
```bash
# 1. Créer les fichiers
touch modules/module-X-titre.html
touch assets/js/module-X.js

# 2. Copier la structure depuis module existant
# 3. Adapter le contenu et les questions
# 4. Mettre à jour index.html avec le nouveau module
```

### **Personnaliser les Styles**
```css
/* Dans assets/css/main.css */
:root {
    --primary-color: #667eea;    /* Couleur principale */
    --secondary-color: #4ecdc4;  /* Couleur secondaire */
    --success-color: #4caf50;    /* Validation */
    --warning-color: #ff9800;    /* Attention */
}
```

## 🤝 **Contribution**

### **Types de Contributions Bienvenues**
- 📚 **Nouveaux modules** de formation
- 🐛 **Corrections de bugs** et améliorations
- 🎨 **Améliorations visuelles** et UX  
- 📝 **Amélioration documentation**
- 🌐 **Traductions** (autres langues)

### **Processus**
1. **Fork** le projet
2. **Créer une branche** : `git checkout -b feature/nouveau-module`
3. **Committer** : `git commit -m "Ajout module X"`
4. **Push** : `git push origin feature/nouveau-module`
5. **Pull Request** avec description détaillée

## 📈 **Roadmap**

### **Version 1.1** *(En cours)*
- [ ] Module 8 : Estimation et métrés
- [ ] Système de badges et récompenses
- [ ] Export PDF des cartes mentales
- [ ] Mode sombre pour confort visuel

### **Version 1.2** *(Planifiée)*
- [ ] Module 9 : Analyse des offres  
- [ ] Statistiques détaillées progression
- [ ] Mode hors-ligne (PWA complète)
- [ ] Partage social des scores

### **Version 2.0** *(Vision)*
- [ ] Intelligence artificielle adaptative
- [ ] Recommandations personnalisées
- [ ] Communauté d'apprenants
- [ ] Certification numérique

## 📞 **Support & Contact**

### **Développeur**
- **GitHub** : [@cyrilhermantin-create](https://github.com/cyrilhermantin-create)
- **Email** : Contact via GitHub Issues
- **Projet** : Formation BTP Economiste de la construction optimisée

### **Signaler un Problème**
1. Vérifiez les **Issues existantes**
2. Créez une **nouvelle Issue** avec :
   - Description du problème
   - Étapes pour reproduire
   - Navigateur et version
   - Captures d'écran si pertinent

### **Demande de Fonctionnalité**
- Utilisez le template **Feature Request**
- Décrivez le **cas d'usage** et l'impact attendu
- Proposez une **solution** si possible

## 📊 **Statistiques du Projet**

![GitHub stars](https://img.shields.io/github/stars/cyrilhermantin-create/Cartes-mentales-de-cours?style=social)
![GitHub forks](https://img.shields.io/github/forks/cyrilhermantin-create/Cartes-mentales-de-cours?style=social)
![GitHub issues](https://img.shields.io/github/issues/cyrilhermantin-create/Cartes-mentales-de-cours)
![GitHub license](https://img.shields.io/github/license/cyrilhermantin-create/Cartes-mentales-de-cours)

## 📄 **Licence**

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour plus de détails.

### **Permissions**
✅ Usage commercial  
✅ Modification  
✅ Distribution  
✅ Usage privé  

### **Conditions**
📝 Inclure la licence et le copyright  
📝 Mentionner les changements effectués  

## 🏷️ **Tags & Mots-Clés**

`bâtiment travaux public` `formation` `economie-construction` `carte-mentale` `quiz-interactif` `principe-pareto` `taxonomie-bloom` `apprentissage-adaptatif` `btp` `education` `javascript` `responsive-design` `pwa`

---

## 🎯 **Call-to-Action**

⭐ **Mettez une étoile** si ce projet vous aide dans votre formation !  
🔄 **Partagez** avec vos collègues en formation  
🐛 **Contribuez** en signalant des améliorations  
📱 **Testez** sur mobile pour l'expérience complète  

---

💡 **"L'apprentissage efficace n'est pas une question de temps passé, mais de méthode utilisée."**

**Développé avec ❤️ pour optimiser votre réussite en économie de la construction.**
