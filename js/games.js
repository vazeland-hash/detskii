/* ============================================================
   GAMES: все игры
   ============================================================ */

let actionCanvasRAF = null;

function recordPerfect(sectionKey, setKey, perfect) {
  if (!perfect) return;
  const p = loadPerfect();
  const key = sectionKey + ':' + setKey;
  p[key] = (p[key] || 0) + 1;
  savePerfect(p);
}

function startGame() {
  if (currentSetKey === 'animals') {
    startWordsLevels();
    return;
  }
  // Берем только 5 карточек для теста
  const uniqueCards = [...currentCards].sort(() => Math.random() - 0.5).slice(0, 5);
  gameState = {
    queue: uniqueCards,
    index: 0,
    correct: 0,
    total: uniqueCards.length,
    currentOptions: null,
    wrongQueue: [],
    _allWords: uniqueCards
  };
  showScreen('game');
  renderGameQuestion();
}

function startWordsLevels() {
  const allWords = [];
  ['animals', 'pronouns'].forEach(setKey => {
    const setData = DATA.words.sets[setKey];
    const cards = [...setData.cards, ...(setData.bonus || [])];
    cards.forEach(c => {
      if (setKey !== 'pronouns') {
        allWords.push({ ...c, _setKey: setKey });
      }
    });
  });
  // Берем только 5 слов для сессии
  const sessionWords = [...allWords].sort(() => Math.random() - 0.5).slice(0, 5);
  gameState = {
    level: 1, index: 0, total: sessionWords.length,
    queue: [...sessionWords], _locked: false, _allWords: sessionWords,
    correct: 0,
    wrongQueue: []
  };
  showScreen('game');
  renderWordsLevel();
}

// ... (логика renderWordsLevel и handleWordsLvl1 остаётся, но теперь работает с 5 словами)

function pickDistractors(correctCard, n = 3) {
  const setData = DATA[currentSection].sets[currentSetKey];
  const allCards = [...setData.cards, ...(setData.bonus || [])];
  const correctKey = key(correctCard);
  const correctEmoji = correctCard.emoji;

  const seen = new Set();
  const pool = allCards.filter(c => {
    if (key(c) === correctKey) return false;
    if (correctEmoji && c.emoji === correctEmoji) return false;
    if (seen.has(key(c))) return false;
    seen.add(key(c));
    return true;
  });
  return pool.sort(() => Math.random() - 0.5).slice(0, n);
}

// ... (renderGameQuestion, handleAnswer и finishGame остаются без изменений)

/* ============================================================
   ИГРА С ПРЕДЛОГАМИ (микрофон: "нажми и держи")
   ============================================================ */
function startPrepGame() {
  // Берем только 5 предлогов
  const shuffledPreps = [...PREP_GAME_DATA.preps].sort(() => Math.random() - 0.5).slice(0, 5);
  const tasks = shuffledPreps.map((p, i) => {
    const item = PREP_GAME_DATA.items[i % PREP_GAME_DATA.items.length];
    return { prep: p.key, prepRu: p.ru, item: item.emoji, itemWord: item.word, itemRu: item.ru };
  });

  prepGameState = {
    queue: tasks,
    index: 0,
    correct: 0,
    total: tasks.length,
    current: null,
    _locked: false,
    stage: 'choice'
  };
  showScreen('prep-game');
  renderPrepGameQuestion();
}

// ... (renderPrepGameQuestion без изменений)

function handlePrepGameAnswer(chosenPrep, btn) {
  const s = prepGameState;
  if (!s || s._locked) return;
  s._locked = true;

  const task = s.current;
  const allBtns = Array.from(document.querySelectorAll('#prep-options .prep-opt'));
  allBtns.forEach(b => b.disabled = true);

  const isCorrect = chosenPrep === task.prep;
  allBtns.forEach(b => { if (b.dataset.prep === task.prep) b.classList.add('correct'); });

  if (isCorrect) {
    playCorrect(); mascotReact('🎉'); s.correct++;
    speak(`Yes! The ${task.itemWord} is ${task.prep} the box.`); // Успевает проговорить
    recordCorrectAnswer('words', 'prepositions', task.prep);
  } else {
    btn.classList.add('wrong'); playWrong();
    speak(`No. The ${task.itemWord} is ${task.prep} the box.`);
    s.queue.push(task); s.total++;
  }

  clearTimeout(s._advanceTimer);
  s._advanceTimer = setTimeout(() => {
    if (prepGameState !== s) return;
    s._locked = false;
    s.index++;
    renderPrepGameQuestion();
  }, isCorrect ? 2500 : 3000);
}

// ... (finishPrepGame без изменений)

/* ============================================================
   ИГРА «ГЛАГОЛЫ/ДЕЙСТВИЯ»
   ============================================================ */
// ... (startActionGame, renderActionQuestion, handleActionAnswer, finishActionGame остаются, но картинки в data.js исправлены)

/* ============================================================
   ИГРА «ЧИСЛА: THERE IS / THERE ARE» (микрофон: "нажми и держи")
   ============================================================ */
function startNumGame(mode) {
  if (mode === 'there-is') {
    startThereIsGame();
  }
}

function startThereIsGame() {
  const queue = [];
  const usedNumbers = new Set();
  
  while (queue.length < 5) { // Сократили до 5
    const n = Math.floor(Math.random() * 10) + 1;
    if (usedNumbers.has(n)) continue;
    usedNumbers.add(n);
    
    const items = [
      { emoji: '🍎', singular: 'apple', plural: 'apples' },
      { emoji: '🍌', singular: 'banana', plural: 'bananas' },
      { emoji: '🐱', singular: 'cat', plural: 'cats' },
      { emoji: '⚽', singular: 'ball', plural: 'balls' },
      { emoji: '⭐', singular: 'star', plural: 'stars' }
    ];
    const item = items[Math.floor(Math.random() * items.length)];
    const word = n === 1 ? item.singular : item.plural;
    
    queue.push({ count: n, emoji: item.emoji, word: word });
  }

  numState = {
    mode: 'there-is',
    queue: queue,
    index: 0,
    correct: 0,
    total: 5,
    _locked: false
  };
  
  showScreen('num-game');
  renderThereIsQuestion();
}

function renderThereIsQuestion() {
  const s = numState;
  if (!s || s.index >= s.queue.length) { finishNumGame(); return; }
  
  const task = s.queue[s.index];
  s._locked = false;
  const isSingle = task.count === 1;
  const correctPhrase = isSingle 
    ? `There is a ${task.word}` 
    : `There are ${task.count} ${task.word}`;

  const container = document.getElementById('num-container');
  container.innerHTML = `
    <div class="game-progress">Скажи · ${s.index + 1}/${s.total}</div>
    <div class="num-visual" style="display:flex; flex-wrap:wrap; justify-content:center; gap:5px; min-height: 150px;">
      ${Array.from({length: task.count}).map(() => `<span style="font-size:3rem;">${task.emoji}</span>`).join('')}
    </div>
    <div style="font-size:1.2rem;font-weight:bold;text-align:center; margin-top:10px;">
      Скажи: "${correctPhrase}"
    </div>
    <button class="mic-btn" id="mic-btn">🎤</button>
    <div style="text-align:center; margin-top:10px;">
      <button class="help-btn" id="num-hint">?</button>
      <div id="num-hint-text" class="hint-text"></div>
    </div>
  `;

  // Микрофон: нажми и держи
  const micBtn = document.getElementById('mic-btn');
  let isHolding = false;
  let recognition = null;

  const startRec = () => {
    if (isHolding) return;
    isHolding = true;
    micBtn.classList.add('holding');
    
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-GB';
    recognition.interimResults = false;
    
    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript.toLowerCase().trim();
      const normTarget = correctPhrase.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
      const normSpoken = spoken.replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
      
      if (normSpoken.includes(normTarget) || normTarget.includes(normSpoken)) {
        playCorrect(); mascotReact('🎉'); s.correct++;
        speak('Perfect!');
        s.index++; setTimeout(renderThereIsQuestion, 1200);
      } else {
        playWrong(); speak('Try again.');
      }
    };
    
    recognition.onerror = () => {
      isHolding = false;
      micBtn.classList.remove('holding');
    };
    
    recognition.onend = () => {
      isHolding = false;
      micBtn.classList.remove('holding');
    };
    
    try { recognition.start(); } catch(e) {}
  };

  const stopRec = () => {
    if (!isHolding) return;
    isHolding = false;
    micBtn.classList.remove('holding');
    if (recognition) {
      try { recognition.stop(); } catch(e) {}
    }
  };

  micBtn.addEventListener('mousedown', startRec);
  micBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startRec(); }, { passive: false });
  micBtn.addEventListener('mouseup', stopRec);
  micBtn.addEventListener('touchend', stopRec);
  micBtn.addEventListener('mouseleave', stopRec);

  document.getElementById('num-hint').addEventListener('click', () => {
    const hintEl = document.getElementById('num-hint-text');
    if (hintEl.classList.contains('show')) {
      hintEl.classList.remove('show');
    } else {
      hintEl.textContent = `Правильно: ${correctPhrase}`;
      hintEl.classList.add('show');
    }
  });
}
function startCompareGame() {
  const container = document.getElementById('game-container');
  const s = { index: 0, total: 5, correct: 0 };
  showScreen('game');
  
  function next() {
    if (s.index >= s.total) {
      document.getElementById('victory-emoji').textContent = '🎉';
      document.getElementById('victory-title').textContent = 'Молодец!';
      document.getElementById('victory-sub').textContent = `Правильных ответов: ${s.correct} из ${s.total}`;
      showScreen('victory');
      return;
    }
    const a = Math.floor(Math.random() * 10) + 1;
    let b = Math.floor(Math.random() * 10) + 1;
    while (b === a) b = Math.floor(Math.random() * 10) + 1;
    const correct = a > b ? '>' : '<';
    
    container.innerHTML = `
      <div class="game-progress">${s.index + 1} / ${s.total}</div>
      <div style="display:flex; align-items:center; gap:20px; font-size:4rem; font-weight:bold; color:#2E7BAE;">
        <span>${a}</span><span style="color:#FF8C42;">?</span><span>${b}</span>
      </div>
      <div style="display:flex; gap:20px; margin-top:20px;">
        <button class="game-opt" data-val=">" style="font-size:2rem; padding:20px 40px;">&gt;</button>
        <button class="game-opt" data-val="<" style="font-size:2rem; padding:20px 40px;">&lt;</button>
      </div>
    `;
    
    container.querySelectorAll('.game-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.dataset.val === correct) { playCorrect(); s.correct++; btn.classList.add('correct'); } 
        else { playWrong(); btn.classList.add('wrong'); }
        s.index++;
        setTimeout(next, 800);
      });
    });
  }
  next();
}