document.addEventListener('click', (e) => {
  const sectionBtn = e.target.closest('[data-section]');
  if (sectionBtn) { playTap(); showSets(sectionBtn.dataset.section); return; }

  const grammarBtn = e.target.closest('#btn-grammar');
  if (grammarBtn) { playTap(); showGrammarThemes(); return; }
  const masteredBtn = e.target.closest('#btn-mastered');
  if (masteredBtn) { playTap(); showMastered(); return; }

  const backBtn = e.target.closest('[data-back]');
  if (backBtn) {
    playTap();
    const t = backBtn.dataset.back;
    if (t === 'home') showHome();
    else if (t === 'sets') showSets(currentSection);
    else if (t === 'cards') { showScreen('cards'); renderCard(); }
    else if (t === 'thermo-game') { showScreen('cards'); renderCard(); }
    else if (t === 'grammar-themes') { showGrammarThemes(); }
    else if (t === 'grammar-theory') { showScreen('grammar-theory'); renderGrammarTheory(); }
    return;
  }
});

document.getElementById('card-prev').addEventListener('click', prevCard);
document.getElementById('card-next').addEventListener('click', nextCard);
document.getElementById('card-speak').addEventListener('click', speakCurrent);
document.getElementById('big-card').addEventListener('click', (e) => {
  if (e.target.closest('button')) return;
  speakCurrent();
});

// Универсальная кнопка "На главную" на экране победы
document.getElementById('victory-home').addEventListener('click', () => {
  playTap();
  // Если мы в грамматике — возвращаем к выбору темы
  if (document.getElementById('screen-grammar-game').classList.contains('active')) {
    showScreen('grammar-theory');
    renderGrammarTheory();
  } else {
    showHome();
  }
});

/* ---------- Свайпы ---------- */
(function initSwipe() {
  const el = document.getElementById('big-card');
  let sx = 0, sy = 0, active = false;
  el.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    sx = e.touches[0].clientX; sy = e.touches[0].clientY; active = true;
  }, { passive: true });
  el.addEventListener('touchend', (e) => {
    if (!active) return;
    active = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) prevCard(); else nextCard();
    }
  }, { passive: true });
})();

updateStarsDisplay();