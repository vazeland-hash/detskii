/* ============================================================
   GRAMMAR: грамматика — темы, теория, тест
   ============================================================ */

const GRAMMAR_SCENES = {
  boy: grammarSceneBoy,
  girl: grammarSceneGirl,
  kids: grammarSceneKids,
  family: grammarSceneFamily,
  cat: grammarSceneCat,
  dog: grammarSceneDog,
  ball: grammarSceneBall,
  book: grammarSceneBook,
  school: grammarSceneSchool,
  sun: grammarSceneSun,
  clock: grammarSceneClock,
  tv: grammarSceneTV,
  apple: grammarSceneApple,
  catTwo: grammarSceneCatTwo,
  kidsMany: grammarSceneKidsMany,
  bus: grammarSceneBus,
  box: grammarSceneBox,
  baby: grammarSceneBaby,
  man: grammarSceneMan,
  woman: grammarSceneWoman,
  mouse: grammarSceneMouse,
  feet: grammarSceneFeet,
  fish: grammarSceneFish,
  home: grammarSceneHome,
  hello: grammarSceneHello
};

function showGrammarThemes() {
  const grid = document.getElementById('grammar-theme-grid');
  if (!grid) return;
  
  grid.innerHTML = '';

  const themeMap = { ...GRAMMAR_THEMES };

  Object.entries(themeMap).forEach(([key, theme]) => {
    const card = document.createElement('div');
    card.className = 'set-card';
    card.innerHTML = `
      <div class="set-icon">${theme.icon}</div>
      <div class="set-title">${theme.title}</div>
      <div class="set-ru">${theme.ru}</div>
    `;
    card.addEventListener('click', () => { playTap(); openGrammarTheory(key); });
    grid.appendChild(card);
  });
  showScreen('grammar-themes');
}

function openGrammarTheory(themeKey) {
  grammarState = {
    themeKey: themeKey,
    theme: GRAMMAR_THEMES[themeKey],
    queue: [],
    index: 0,
    correct: 0,
    total: 0,
    current: null,
    _locked: false,
    wrongQueue: [],
    stage: 1
  };
  showScreen('grammar-theory');
  renderGrammarTheory();
}

function renderGrammarTheory() {
  const s = grammarState;
  if (!s) return;
  const theme = s.theme;
  const container = document.getElementById('grammar-theory-container');
  
  container.innerHTML = `
    <div class="grammar-intro">
      ${theme.icon} <b>${theme.title}</b> — ${theme.ru}<br>
      <span style="font-size:0.95rem; color:#777;">Прочитай правило, послушай примеры, потом проверь себя.</span>
    </div>
    <div class="grammar-blocks" id="grammar-blocks"></div>
    <button class="grammar-start-btn" id="grammar-start">▶️ Начать интерактив</button>
  `;
  const blocksEl = document.getElementById('grammar-blocks');
  theme.theory.forEach((block, i) => {
    const div = document.createElement('div');
    div.className = 'grammar-block';
    div.style.borderLeftColor = theme.color;
    div.innerHTML = `
      <div class="gb-head">
        <div class="gb-title">${block.title}</div>
        <button class="gb-speak" data-speak="${i}" aria-label="Слушать">🔊</button>
      </div>
      <div class="gb-en">${block.en}</div>
      <div class="gb-ru">${block.ru}</div>
      ${block.note ? `<div class="gb-note">${block.note}</div>` : ''}
    `;
    blocksEl.appendChild(div);
  });
  container.querySelectorAll('.gb-speak').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = Number(btn.dataset.speak);
      speak(theme.theory[i].speak || theme.theory[i].en.replace(/<[^>]+>/g, ''));
    });
  });
  document.getElementById('grammar-start').addEventListener('click', () => {
    playTap();
    startGrammarInteractive();
  });
  setTimeout(() => speak(theme.theory[0].speak || theme.theory[0].en.replace(/<[^>]+>/g, '')), 400);
}

function startGrammarInteractive() {
  const s = grammarState;
  if (!s) return;
  
  s.stage = 2;
  s.queue = s.theme.questions.slice().sort(() => Math.random() - 0.5);
  s.index = 0;
  s.correct = 0;
  s.total = s.queue.length;
  s.wrongQueue = [];
  showScreen('grammar-game');
  
  if (s.themeKey === 'present_simple') {
    // Мы используем Drag-and-Drop логику, которая подходит и для be, и для -s
    renderGrammarDragBe(); 
  } else {
    startGrammarTest();
  }
}

/* Универсальный рендер Drag-and-Drop для Present Simple (и be, и -s) */
function renderGrammarDragBe() {
  const s = grammarState;
  if (s.index >= s.queue.length) { finishGrammarTest(); return; }
  const q = s.queue[s.index];
  const sceneFn = GRAMMAR_SCENES[q.scene] || grammarSceneBoy;
  const parts = q.en.split('___');
  if (parts.length < 2) parts[1] = '';
  
  const container = document.getElementById('grammar-game-container');
  container.innerHTML = `
    <div class="grammar-progress">Этап 1: Перетащи слово · ${s.index + 1} / ${s.total}</div>
    <div class="grammar-q-card" style="position:relative;">
      <div class="grammar-q-scene">${sceneFn()}</div>
      <div class="grammar-q-sentence" style="display:flex; flex-wrap:wrap; justify-content:center; gap:8px; align-items:center;">
        <span>${parts[0]}</span>
        <div class="drop-zone" id="drop-zone" style="width:80px; height:50px; border:3px dashed #4FA8D8; border-radius:12px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.5);"></div>
        <span>${parts[1]}</span>
      </div>
      <div class="grammar-q-ru">${q.ru}</div>
    </div>
    <div class="drag-options" id="drag-options" style="display:flex; gap:15px; justify-content:center; margin-top:20px; flex-wrap:wrap;"></div>
    <div style="text-align:center; margin-top:15px;">
      <button class="help-btn" id="hint-btn" title="Подсказка">?</button>
    </div>
  `;

  const optsEl = document.getElementById('drag-options');
  q.options.forEach(opt => {
    const btn = document.createElement('div');
    btn.className = 'drag-item';
    btn.textContent = opt;
    btn.dataset.value = opt;
    btn.style.cssText = `
      padding: 12px 24px; background: #FFF; border: 4px solid #FFF; border-radius: 16px;
      font-size: 1.3rem; font-weight: bold; color: #2E7BAE; cursor: pointer;
      box-shadow: 0 6px 15px rgba(0,0,0,0.1); user-select: none;
    `;
    makeDraggable(btn, (draggedEl, zone) => handleDropBe(draggedEl, zone, q));
    optsEl.appendChild(btn);
  });

  document.getElementById('hint-btn').addEventListener('click', () => {
    const zone = document.getElementById('drop-zone');
    if (zone && !zone.classList.contains('filled')) {
      zone.textContent = q.answer;
      zone.style.background = '#E8F5E9';
      zone.style.borderColor = '#4CAF50';
      zone.classList.add('filled');
      s._hintUsed = true;
    }
  });
}

function handleDropBe(draggedEl, zone, q) {
  const s = grammarState;
  if (!s || s._locked) return;
  if (zone.classList.contains('filled')) return;
  const val = draggedEl.dataset.value;
  if (val === q.answer) {
    s._locked = true;
    playCorrect(); mascotReact('🎉');
    zone.textContent = val;
    zone.style.background = '#E8F5E9'; zone.style.borderColor = '#4CAF50';
    zone.classList.add('filled');
    draggedEl.style.display = 'none';
    recordCorrectAnswer('grammar', grammarState.themeKey, q.answer);
    setTimeout(() => { s._locked = false; grammarState.index++; renderGrammarDragBe(); }, 1500);
  } else {
    playWrong();
    draggedEl.style.borderColor = '#E53935';
    setTimeout(() => { draggedEl.style.borderColor = '#FFF'; }, 500);
  }
}

function finishGrammarTest() {
  const s = grammarState;
  if (!s) return;
  const keyFull = 'grammar:' + s.themeKey;
  markSetCompleted(keyFull); 
  playStar();

  document.getElementById('victory-emoji').textContent = '🎉';
  document.getElementById('victory-title').textContent = 'Молодец!';
  document.getElementById('victory-sub').textContent = 'Ты прошел все этапы!';
  document.getElementById('victory-star').style.display = 'block';

  showScreen('victory');
  setTimeout(() => speak('Well done!'), 500);
}