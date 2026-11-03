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
  hello: grammarSceneHello,
  
  cat_bench: () => `<img src="images/usualcat.jpg" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:12px;">`,
  cat_glasses: () => `<img src="images/totsamyi.jpg" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:12px;">`,
  cats_many: () => `<img src="images/cats.jpg" style="max-width:100%; max-height:100%; object-fit:contain; border-radius:12px;">`
  // ------------------------------------------
};

function showGrammarThemes() {
  const grid = document.getElementById('grammar-theme-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const themeKeys = ['present_simple', 'past_simple', 'future_simple', 'plural', 'articles', 'compare'];
  
  themeKeys.forEach(key => {
    if (key === 'compare') {
      const card = document.createElement('div');
      card.className = 'set-card';
      card.style.width = '200px';
      card.innerHTML = `
        <div class="set-icon" style="font-size: 4rem;">⚖️</div>
        <div class="set-title" style="font-size: 1.2rem;">Сравнения</div>
        <div class="set-ru">Comparisons</div>
      `;
      card.addEventListener('click', () => { playTap(); startCompareSizeGame(); });
      grid.appendChild(card);
      return;
    }
    const theme = GRAMMAR_THEMES[key];
    if (!theme) return;
    
    const card = document.createElement('div');
    card.className = 'set-card';
    card.style.width = '200px';
    card.innerHTML = `
      <div class="set-icon" style="font-size: 4rem;">${theme.icon}</div>
      <div class="set-title" style="font-size: 1.2rem;">${theme.title}</div>
      <div class="set-ru">${theme.ru}</div>
    `;
    card.addEventListener('click', () => { playTap(); openGrammarTheory(key); });
    grid.appendChild(card);
  });

  showScreen('grammar-themes');
}

function openGrammarTheory(themeKey) {
  const theme = GRAMMAR_THEMES[themeKey];
  if (!theme) return;

  const defaultSub = theme.subtopics ? Object.keys(theme.subtopics)[0] : null;
  
  grammarState = {
    themeKey: themeKey,
    theme: theme,
    subKey: defaultSub,
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
  
  let tabsHtml = '';
  if (theme.subtopics) {
    tabsHtml = `<div style="display:flex; gap:10px; margin-bottom:15px; flex-wrap:wrap; justify-content:center;">`;
    Object.entries(theme.subtopics).forEach(([subKey, sub]) => {
      const active = s.subKey === subKey;
      tabsHtml += `
        <button class="sub-tab" data-sub="${subKey}" style="padding:10px 16px; border-radius:16px; border:3px solid ${active ? theme.color : '#FFF'}; background:${active ? theme.color + '20' : '#FFF'}; font-weight:bold; color:${active ? theme.color : '#777'}; cursor:pointer; font-family:inherit; font-size:1rem;">
          ${sub.icon} ${sub.title}
        </button>
      `;
    });
    tabsHtml += `</div>`;
  }

  container.innerHTML = `
    <div class="grammar-intro">
      ${theme.icon} <b>${theme.title}</b> — ${theme.ru}<br>
      <span style="font-size:0.95rem; color:#777;">Прочитай правило, послушай примеры, потом проверь себя.</span>
    </div>
    ${tabsHtml}
    <div class="grammar-blocks" id="grammar-blocks"></div>
    <button class="grammar-start-btn" id="grammar-start">▶️ Начать тест</button>
  `;

  container.querySelectorAll('.sub-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      playTap();
      s.subKey = btn.dataset.sub;
      renderGrammarTheory();
    });
  });

  const blocksEl = document.getElementById('grammar-blocks');
  const blocks = theme.subtopics ? (theme.theory[s.subKey] || []) : theme.theory;
  
  blocks.forEach((block, i) => {
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
      speak(blocks[i].speak || blocks[i].en.replace(/<[^>]+>/g, ''));
    });
  });

  document.getElementById('grammar-start').addEventListener('click', () => {
    playTap();
    startGrammarInteractive();
  });
}

function startGrammarInteractive() {
  const s = grammarState;
  if (!s) return;
  
  s.stage = 2;
  let questions = s.theme.subtopics 
    ? (s.theme.questions[s.subKey] || [])
    : s.theme.questions;
    
   if (s.themeKey === 'articles') {
    s.queue = questions.slice(); // Оставляем строгий порядок (сначала 'a', потом 'the')
  } else {
    s.queue = questions.slice().sort(() => Math.random() - 0.5); // Остальные перемешиваем
  }
  s.index = 0;
  s.correct = 0;
  s.total = s.queue.length;
  s.wrongQueue = [];
  
  showScreen('grammar-game');
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
      recordCorrectAnswer('grammar', s.themeKey, q.answer);
    } else {
      btn.classList.add('wrong'); playWrong();
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

  const homeBtn = document.getElementById('victory-home');
  if (homeBtn) {
    homeBtn.innerHTML = '<span class="icon">⬅️</span>К выбору темы';
    homeBtn.onclick = () => {
      playTap();
      showScreen('grammar-theory');
      renderGrammarTheory();
    };
  }

  showScreen('victory');
}