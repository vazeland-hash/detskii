/* ============================================================
   GRAMMAR: грамматика — темы, теория, тест
   Файл: js/grammar.js
   Часть 1: GRAMMAR_SCENES, showGrammarThemes,
            openGrammarTheory, renderGrammarTheory
   ============================================================ */

/* ---------- Карта сцен для вопросов ---------- */
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
  grid.innerHTML = '';
  Object.entries(GRAMMAR_THEMES).forEach(([key, theme]) => {
    const card = document.createElement('div');
    card.className = 'set-card';
    card.innerHTML = `
      <div class="set-icon">${theme.icon}</div>
      <div class="set-title">${theme.title}</div>
      <div class="set-ru">${theme.ru}</div>
    `;
    card.addEventListener('click', () => {
      playTap();
      openGrammarTheory(key);
    });
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
    wrongQueue: []
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
    <button class="grammar-start-btn" id="grammar-start">▶️ Проверить себя</button>
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
    startGrammarTest();
  });
  setTimeout(() => speak(theme.theory[0].speak || theme.theory[0].en.replace(/<[^>]+>/g, '')), 400);
}
/* ============================================================
   Часть 2: грамматический тест
   ============================================================ */

function startGrammarTest() {
  const s = grammarState;
  if (!s) return;
  const questions = s.theme.questions.slice();
  s.queue = questions.sort(() => Math.random() - 0.5);
  s.index = 0;
  s.correct = 0;
  s.total = s.queue.length;
  s.current = null;
  s._locked = false;
  s.wrongQueue = [];
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

  const speakText = q.en.replace('___', q.answer);
  setTimeout(() => speak(speakText), 300);
}

function handleGrammarAnswer(chosen, q, btn) {
  const s = grammarState;
  if (!s || s._locked) return;
  s._locked = true;

  const allBtns = Array.from(document.querySelectorAll('#grammar-options .grammar-opt'));
  allBtns.forEach(b => b.disabled = true);

  const isCorrect = chosen === q.answer;
  allBtns.forEach(b => {
    if (b.dataset.value === q.answer) b.classList.add('correct');
  });

  if (isCorrect) {
    playCorrect();
    mascotReact('🎉');
    s.correct++;
    speak(`Yes! ${q.en.replace('___', q.answer)}`);
  } else {
    btn.classList.add('wrong');
    playWrong();
    speak(`No. ${q.en.replace('___', q.answer)}`);
    s.queue.push(q);
    s.wrongQueue.push(q);
  }

  setTimeout(() => {
    s._locked = false;
    s.index++;
    renderGrammarQuestion();
  }, isCorrect ? 1600 : 2200);
}

function finishGrammarTest() {
  const s = grammarState;
  if (!s) return;
  const perfect = s.correct === s.total && s.wrongQueue.length === 0;
  const passed = s.correct >= Math.ceil(s.total * 0.6);
  const keyFull = 'grammar:' + s.themeKey;
  if (passed) { markSetCompleted(keyFull); playStar(); }

  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent =
    `Правильных: ${s.correct} из ${s.total}` + (perfect ? ' — идеально!' : '');
  document.getElementById('victory-star').style.display = passed ? 'block' : 'none';

  showScreen('victory');
  setTimeout(() => speak(passed ? 'Well done!' : 'Try again!'), 500);
}