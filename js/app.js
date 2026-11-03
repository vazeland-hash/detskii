/* ============================================================
   APP: инициализация и обработчики
   Файл: js/app.js
   Часть 1: глобальные обработчики (меню, назад, карточки)
   ============================================================ */

/* ---------- Делегирование кликов ---------- */
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

/* ---------- Кнопки карточек ---------- */
document.getElementById('card-prev').addEventListener('click', prevCard);
document.getElementById('card-next').addEventListener('click', nextCard);
document.getElementById('card-speak').addEventListener('click', speakCurrent);
document.getElementById('big-card').addEventListener('click', (e) => {
  if (e.target.closest('button')) return;
  speakCurrent();
});
document.getElementById('victory-home').addEventListener('click', () => { playTap(); showHome(); });
/* ============================================================
   Часть 2: свайпы, клавиатура, запуск
   ============================================================ */

/* ---------- Свайпы по большой карточке ---------- */
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

/* ---------- Клавиатура на экране карточек ---------- */
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('screen-cards').classList.contains('active')) return;
  if (e.key === 'ArrowLeft') prevCard();
  else if (e.key === 'ArrowRight') nextCard();
  else if (e.key === ' ') { e.preventDefault(); speakCurrent(); }
});

/* ---------- Запуск ---------- */
updateStarsDisplay();