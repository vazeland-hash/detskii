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

  const groups = {
    'present_simple': { title: 'Present Simple', icon: '📝', items: [] },
    'past_simple':    { title: 'Past Simple',    icon: '⏪', items: [] },
    'future_simple':  { title: 'Future Simple',  icon: '⏩', items: [] },
  };

  Object.entries(GRAMMAR_THEMES).forEach(([key, theme]) => {
    let groupKey = null;
    if (key.startsWith('present_simple')) groupKey = 'present_simple';
    else if (key.startsWith('past_simple')) groupKey = 'past_simple';
    else if (key.startsWith('future_simple')) groupKey = 'future_simple';
    
    if (groupKey && groups[groupKey]) {
      groups[groupKey].items.push({ key, ...theme });
    } else {
      const card = document.createElement('div');
      card.className = 'set-card';
      card.innerHTML = `<div class="set-icon">${theme.icon}</div><div class="set-title">${theme.title}</div><div class="set-ru">${theme.ru}</div>`;
      card.addEventListener('click', () => { playTap(); openGrammarTheory(key); });
      grid.appendChild(card);
    }
  });

  Object.entries(groups).forEach(([gKey, group]) => {
    if (group.items.length === 0) return;
    const header = document.createElement('div');
    header.style.cssText = 'width:100%; margin:20px 0 10px; font-size:1.3rem; font-weight:bold; color:#2E7BAE; text-align:center;';
    header.textContent = `${group.icon} ${group.title}`;
    grid.appendChild(header);
    
    group.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'set-card';
      card.innerHTML = `<div class="set-icon">${item.icon}</div><div class="set-title" style="font-size:1rem;">${item.title}</div><div class="set-ru">${item.ru}</div>`;
      card.addEventListener('click', () => { playTap(); openGrammarTheory(item.key); });
      grid.appendChild(card);
    });
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
    <button class="grammar-start-btn" id="grammar-start">▶️ Начать тест</button>
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
  // Убрали авто-озвучку
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
  
  // Теперь везде тест с кнопками
  startGrammarTest();
}

function startGrammarTest() {
  const s = grammarState;
  if (!s) return;
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
  
  try {
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
  } catch (e) {
    console.error('Ошибка в тесте:', e);
  }
  
  setTimeout(() => { 
    if (grammarState !== s) return;
    s._locked = false; 
    s.index++; 
    renderGrammarQuestion(); 
  }, 1600);
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