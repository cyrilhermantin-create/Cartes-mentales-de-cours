document.getElementById('niveau').addEventListener('change', function () {
  const niveauChoisi = this.value;
  document.querySelectorAll('.branche li').forEach(item => {
    if (!niveauChoisi || item.dataset.niveau === niveauChoisi) {
      item.style.display = 'list-item';
    } else {
      item.style.display = 'none';
    }
  });
});
