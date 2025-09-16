
// ==========================================
// JAVASCRIPT POUR MODULE 7-1-3 : Rédaction DCE
// ==========================================

// Questions du quiz basées sur la taxonomie de Bloom
const questions = [

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
