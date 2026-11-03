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

/* ---------- Экран выбора темы ---------- */
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

/* ---------- Открытие теории ---------- */
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

/* ---------- Рендер теории ---------- */
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

/* ============================================================
   ИНТЕРАКТИВНЫЙ ЭТАП (Уникальный для каждой темы)
   ============================================================ */
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
  
  if (s.themeKey === 'be') {
    renderGrammarDragBe();
  } else if (s.themeKey === 'suffix') {
    renderGrammarDragSuffix();
  } else if (s.themeKey === 'plural') {
    renderGrammarDragPlural();
  } else {
    startGrammarTest();
  }
}

/* --- 1. ГЛАГОЛ BE: Перетаскивание am/is/are --- */
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

/* --- 2. ОКОНЧАНИЕ -S: Перетаскивание окончания --- */
function renderGrammarDragSuffix() {
  const s = grammarState;
  if (s.index >= s.queue.length) { finishGrammarTest(); return; }
  const q = s.queue[s.index];
  const sceneFn = GRAMMAR_SCENES[q.scene] || grammarSceneBoy;

  const container = document.getElementById('grammar-game-container');
  container.innerHTML = `
    <div class="grammar-progress">Этап 1: Выбери форму · ${s.index + 1} / ${s.total}</div>
    <div class="grammar-q-card" style="position:relative;">
      <div class="grammar-q-scene">${sceneFn()}</div>
      <div class="grammar-q-sentence" style="display:flex; flex-wrap:wrap; justify-content:center; gap:8px; align-items:center;">
        <span>${q.en.split('___')[0]}</span>
        <div class="drop-zone" id="drop-zone" style="width:90px; height:44px; border:3px dashed #4FA8D8; border-radius:10px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.5);"></div>
        <span>${(q.en.split('___')[1] || '')}</span>
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
    makeDraggable(btn, (draggedEl, zone) => handleDropSuffix(draggedEl, zone, q));
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

function handleDropSuffix(draggedEl, zone, q) {
  const s = grammarState;
  if (!s || s._locked) return;
  if (zone.classList.contains('filled')) return;
  const val = draggedEl.dataset.value;
  if (val === q.answer) {
    playCorrect(); mascotReact('🎉');
    zone.textContent = val;
    zone.style.background = '#E8F5E9'; zone.style.borderColor = '#4CAF50';
    zone.classList.add('filled');
    draggedEl.style.display = 'none';
    recordCorrectAnswer('grammar', grammarState.themeKey, q.answer);
    setTimeout(() => { s._locked = false; grammarState.index++; renderGrammarDragSuffix(); }, 1500);
  } else {
    playWrong();
    draggedEl.style.borderColor = '#E53935';
    setTimeout(() => { draggedEl.style.borderColor = '#FFF'; }, 500);
  }
}

/* --- 3. МНОЖЕСТВЕННОЕ ЧИСЛО: Перетаскивание картинки --- */
function renderGrammarDragPlural() {
  const s = grammarState;
  if (s.index >= s.queue.length) { finishGrammarTest(); return; }
  const q = s.queue[s.index];
  const sceneFn = GRAMMAR_SCENES[q.scene] || grammarSceneBoy;

  const container = document.getElementById('grammar-game-container');
  container.innerHTML = `
    <div class="grammar-progress">Этап 1: Сделай много · ${s.index + 1} / ${s.total}</div>
    <div class="grammar-q-card" style="position:relative;">
      <div class="grammar-q-scene">${sceneFn()}</div>
      <div class="grammar-q-sentence" style="display:flex; flex-wrap:wrap; justify-content:center; gap:8px; align-items:center;">
        <span>${q.en.split('___')[0]}</span>
        <div class="drop-zone" id="drop-zone" style="width:100px; height:60px; border:3px dashed #4FA8D8; border-radius:12px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.5);"></div>
       <span>${(q.en.split('___')[1] || '')}</span>
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
    makeDraggable(btn, (draggedEl, zone) => handleDropPlural(draggedEl, zone, q));
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

function handleDropPlural(draggedEl, zone, q) {
  const s = grammarState;
  if (!s || s._locked) return;
  if (zone.classList.contains('filled')) return;
  const val = draggedEl.dataset.value;
  if (val === q.answer) {
    playCorrect(); mascotReact('🎉');
    zone.textContent = val;
    zone.style.background = '#E8F5E9'; zone.style.borderColor = '#4CAF50';
    zone.classList.add('filled');
    draggedEl.style.display = 'none';
    recordCorrectAnswer('grammar', grammarState.themeKey, q.answer);
   setTimeout(() => { s._locked = false; grammarState.index++; renderGrammarDragPlural(); }, 1500);
  } else {
    playWrong();
    draggedEl.style.borderColor = '#E53935';
    setTimeout(() => { draggedEl.style.borderColor = '#FFF'; }, 500);
  }
}

/* ============================================================
   СТАРЫЙ ТЕСТ (для других тем)
   ============================================================ */
function startGrammarTest() {
  const s = grammarState;
  if (!s) return;
  const questions = s.theme.questions.slice();
  s.queue = questions.sort(() => Math.random() - 0.5);
  s.index = 0; s.correct = 0; s.total = s.queue.length; s.current = null;
  s._locked = false; s.wrongQueue = [];
  showScreen('grammar-game');
  renderGrammarQuestion();
}

function renderGrammarQuestion() {
  const s = grammarState;
  if (!s) return;
  if (s.index >= s.queue.length) { finishGrammarTest(); return; }
  const q = s.queue[s.index];
  s.current = q;
  const theme = s.theme;
  const sceneFn = GRAMMAR_SCENES[q.scene] || grammarSceneBoy;
  const sentenceHtml = q.en.replace('___', '<span class="blank">___</span>');

  const container = document.getElementById('grammar-game-container');
  container.innerHTML = `
    <div class="grammar-progress">${s.index + 1} / ${s.queue.length}</div>
    <div class="grammar-q-card">
      <div class="grammar-q-scene">${sceneFn()}</div>
      <div class="grammar-q-sentence">${sentenceHtml}</div>
      <div class="grammar-q-ru">${q.ru}</div>
    </div>
    <div class="grammar-options" id="grammar-options"></div>
    <div style="text-align:center; margin-top:15px;">
      <button class="help-btn" id="grammar-hint-btn" title="Подсказка">?</button>
    </div>
  `;

  const optsEl = document.getElementById('grammar-options');
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'grammar-opt' + (q.options.length <= 2 ? ' opt-full' : '');
    btn.textContent = opt;
    btn.dataset.value = opt;
    btn.addEventListener('click', () => handleGrammarAnswer(opt, q, btn));
    optsEl.appendChild(btn);
  });

  document.getElementById('grammar-hint-btn').addEventListener('click', () => {
    document.querySelectorAll('.grammar-opt').forEach(b => {
      if (b.dataset.value === q.answer) {
        b.style.boxShadow = '0 0 15px #FFD700';
        b.style.borderColor = '#FFD700';
      }
    });
    s._hintUsed = true;
  });

  setTimeout(() => speak(q.en.replace('___', q.answer)), 300);
}

function handleGrammarAnswer(chosen, q, btn) {
  const s = grammarState;
  if (!s || s._locked) return;
  s._locked = true;
  const allBtns = Array.from(document.querySelectorAll('#grammar-options .grammar-opt'));
  allBtns.forEach(b => b.disabled = true);
  const isCorrect = chosen === q.answer;
  allBtns.forEach(b => { if (b.dataset.value === q.answer) b.classList.add('correct'); });
  if (isCorrect) {
    playCorrect(); mascotReact('🎉'); s.correct++;
    speak(`Yes! ${q.en.replace('___', q.answer)}`);
    recordCorrectAnswer('grammar', s.themeKey, q.answer);
  } else {
    btn.classList.add('wrong'); playWrong();
    speak(`No. ${q.en.replace('___', q.answer)}`);
    s.queue.push(q); s.wrongQueue.push(q);
  }
  setTimeout(() => { s._locked = false; s.index++; renderGrammarQuestion(); }, isCorrect ? 1600 : 2200);
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

