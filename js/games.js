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

/* ============================================================
   ИГРА «СЛОВА» (с уровнями)
   ============================================================ */
function startGame() {
  if (currentSection === 'words' && currentSetKey === 'animals') {
    startWordsLevels('words');
    return;
  }
  if (currentSection === 'words' && currentSetKey === 'pronouns') {
    startWordsLevels('pronouns');
    return;
  }
  
  const uniqueCards = [...currentCards].sort(() => Math.random() - 0.5).slice(0, 5);
  gameState = {
    queue: uniqueCards,
    index: 0,
    correct: 0,
    total: uniqueCards.length,
    currentOptions: null,
    wrongQueue: [],
    _locked: false
  };
  showScreen('game');
  renderGameQuestion();
}

function renderGameQuestion() {
  const s = gameState;
  if (!s || s.index >= s.queue.length) { finishGame(); return; }
  
  const card = s.queue[s.index];
  s._locked = false;
  
  const setData = DATA[currentSection].sets[currentSetKey];
  const allCards = [...setData.cards, ...(setData.bonus || [])];
  
  let options = [card];
  const pool = allCards.filter(c => c.word !== card.word);
  const shuffledPool = pool.sort(() => Math.random() - 0.5);
  for (let i = 0; i < 3 && i < shuffledPool.length; i++) {
    options.push(shuffledPool[i]);
  }
  options = options.sort(() => Math.random() - 0.5);

  const container = document.getElementById('game-container');
  container.innerHTML = `
    <div class="game-progress">${s.index + 1} / ${s.queue.length}</div>
    <div class="game-prompt">
      Выбери правильный перевод:
      <span class="word">${card.ru}</span>
    </div>
    <div class="game-options" id="game-options"></div>
  `;

  const optsEl = document.getElementById('game-options');
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'game-opt';
    
    let visual = '';
    if (opt.img) visual = `<img src="${opt.img}" style="max-width:100%; max-height:80px; object-fit:contain;">`;
    else if (opt.emoji) visual = `<span class="opt-emoji">${opt.emoji}</span>`;
    else if (opt.color) visual = `<div style="width:40px; height:40px; border-radius:50%; background:${opt.color}; border:2px solid #333; margin:auto;"></div>`;
    
    btn.innerHTML = visual ? visual : `<span class="opt-emoji" style="font-size:1.2rem;">${opt.word}</span>`;
    
    btn.addEventListener('click', () => {
      if (s._locked) return;
      s._locked = true;
      
      const isCorrect = opt.word === card.word;
      const allBtns = Array.from(optsEl.children);
      allBtns.forEach(b => b.disabled = true);
      
      allBtns.forEach((b, idx) => {
        if (options[idx].word === card.word) b.classList.add('correct');
      });

      if (isCorrect) {
        playCorrect(); mascotReact('🎉'); s.correct++;
        recordCorrectAnswer(currentSection, currentSetKey, card.word);
      } else {
        btn.classList.add('wrong'); playWrong();
        s.queue.push(card);
      }

      setTimeout(() => {
        if (gameState !== s) return;
        s._locked = false;
        s.index++;
        renderGameQuestion();
      }, isCorrect ? 1500 : 2000);
    });
    optsEl.appendChild(btn);
  });
}

function finishGame() {
  const s = gameState;
  if (!s) return;
  const perfect = s.correct === s.total;
  markSetCompleted(currentSection + ':' + currentSetKey);
  recordPerfect(currentSection, currentSetKey, perfect);
  
  document.getElementById('victory-emoji').textContent = '🎉';
  document.getElementById('victory-title').textContent = 'Молодец!';
  document.getElementById('victory-sub').textContent = `Правильных ответов: ${s.correct} из ${s.total}`;
  showScreen('victory');
  playStar();
}

/* ============================================================
   УРОВНИ ДЛЯ СЛОВ (ANIMALS + PRONOUNS)
   ============================================================ */
function startWordsLevels(mode) {
  const allWords = [];
  const setKey = mode === 'pronouns' ? 'pronouns' : 'animals';
  
  const setData = DATA.words.sets[setKey];
  const cards = [...setData.cards, ...(setData.bonus || [])];
  
  const sessionWords = [...cards].sort(() => Math.random() - 0.5).slice(0, 5);
  
  gameState = {
    level: 1, index: 0, total: sessionWords.length,
    queue: [...sessionWords], _locked: false, _allWords: sessionWords,
    correct: 0, wrongQueue: [],
    mode: mode
  };
  showScreen('game');
  renderWordsLevel();
}

function renderWordsLevel() {
  const s = gameState;
  if (!s || s.index >= s.queue.length) { finishGame(); return; }
  const card = s.queue[s.index];
  s._locked = false;
  
  const container = document.getElementById('game-container');
  container.innerHTML = `
    <div class="game-progress">${s.index + 1} / ${s.total}</div>
    <div class="game-prompt">Выбери правильный перевод:<br><span class="word" style="font-size:2rem; color:#FF8C42;">${card.ru}</span></div>
    <div class="game-options" id="game-options"></div>
  `;

  const setKey = s.mode === 'pronouns' ? 'pronouns' : 'animals';
  const setData = DATA.words.sets[setKey];
  let allCards = [];
  if (setKey === 'pronouns') {
    allCards = [
      ...setData.cards,
      ...(setData.possessives || []),
      ...(setData.pairs || [])
    ];
  } else {
    allCards = [...setData.cards, ...(setData.bonus || [])];
  }
  
  const pool = allCards.filter(c => c.word !== card.word).sort(() => Math.random() - 0.5);
  const options = [card, ...pool.slice(0, 3)].sort(() => Math.random() - 0.5);

  const optsEl = document.getElementById('game-options');
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'game-opt';
    
    // 1. ПРИТЯЖАТЕЛЬНЫЕ МЕСТОИМЕНИЯ (только текст)
    if (opt.textOnly) {
      btn.innerHTML = `<span style="font-size: 2.2rem; color: #2E7BAE; font-weight: bold;">${opt.word}</span>`;
    } 
    // 2. КАРТИНКИ ИЗ ПАПКИ IMAGES (I, you, we)
    else if (opt.img) {
      btn.innerHTML = `<img src="${opt.img}" style="width:100%; height:100%; max-height: 150px; object-fit: contain; border-radius:12px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                       <span style="display:none; font-size: 2rem; color: #2E7BAE; font-weight: bold;">${opt.word}</span>`;
    } 
    // 3. ЭМОДЗИ (he, she, it, they, животные)
    else if (opt.emoji) {
      btn.innerHTML = `<span class="opt-emoji" style="font-size: 4.5rem;">${opt.emoji}</span>`;
    } 
    // 4. ЗАПАСНОЙ ТЕКСТ
    else {
      btn.innerHTML = `<span style="font-size: 2rem; color: #2E7BAE; font-weight: bold;">${opt.word}</span>`;
    }
    
    btn.addEventListener('click', () => {
      if (s._locked) return;
      s._locked = true;
      const allBtns = Array.from(optsEl.children);
      allBtns.forEach(b => b.disabled = true);
      
      const isCorrect = opt.word === card.word;
      allBtns.forEach((b, i) => { if (options[i].word === card.word) b.classList.add('correct'); });
      
      if (isCorrect) {
        playCorrect(); s.correct++;
        recordCorrectAnswer('words', setKey, card.word);
      } else {
        btn.classList.add('wrong'); playWrong();
        s.queue.push(card);
        s.total++;
      }
      
      setTimeout(() => {
        if (gameState !== s) return;
        s._locked = false;
        s.index++;
        
        if (s.index >= s.queue.length && s.mode === 'words') {
          startSpeakWordsGame();
          return;
        }
        
        renderWordsLevel();
      }, isCorrect ? 1200 : 1800);
    });
    optsEl.appendChild(btn);
  });
}

/* ============================================================
   ИГРА «СКАЖИ СЛОВО» (запускается после теста)
   ============================================================ */
function startSpeakWordsGame() {
  const container = document.getElementById('game-container');
  const allCards = [...DATA.words.sets.animals.cards, ...(DATA.words.sets.animals.bonus || [])];
  const s = { index: 0, total: 3, correct: 0, queue: [...allCards].sort(() => Math.random() - 0.5).slice(0, 3) };
  
  showScreen('game');

  function next() {
    if (s.index >= s.queue.length) {
      document.getElementById('victory-emoji').textContent = '🎉';
      document.getElementById('victory-title').textContent = 'Молодец!';
      document.getElementById('victory-sub').textContent = `Ты сказал ${s.correct} слов из ${s.total}`;
      showScreen('victory');
      return;
    }

    const card = s.queue[s.index];
    container.innerHTML = `
      <div class="game-progress">${s.index + 1} / ${s.total}</div>
      <div class="animal-img" style="font-size:8rem; margin:20px 0;">${card.emoji}</div>
      <div class="game-prompt" style="font-size:2rem; margin-bottom:20px;">
        Скажи: <span style="color:#FF8C42;">${card.word}</span>
      </div>
      <div style="font-size:1.2rem; color:#777; margin-bottom:10px;">Нажми и держи микрофон, чтобы сказать</div>
      <button class="mic-btn" id="mic-btn">🎤</button>
    `;

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
        const target = card.word.toLowerCase();
        if (spoken.includes(target) || target.includes(spoken)) {
          playCorrect(); s.correct++;
          micBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)';
          setTimeout(() => { s.index++; next(); }, 1000);
        } else {
          playWrong();
          micBtn.style.background = 'linear-gradient(135deg, #E53935 0%, #EF5350 100%)';
          setTimeout(() => { micBtn.style.background = ''; }, 600);
        }
      };
      
      recognition.onerror = () => { isHolding = false; micBtn.classList.remove('holding'); };
      recognition.onend = () => { isHolding = false; micBtn.classList.remove('holding'); };
      try { recognition.start(); } catch(e) {}
    };

    const stopRec = () => {
      if (!isHolding) return;
      isHolding = false;
      micBtn.classList.remove('holding');
      if (recognition) { try { recognition.stop(); } catch(e) {} }
    };

    micBtn.addEventListener('mousedown', startRec);
    micBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startRec(); }, { passive: false });
    micBtn.addEventListener('mouseup', stopRec);
    micBtn.addEventListener('touchend', stopRec);
    micBtn.addEventListener('mouseleave', stopRec);
  }

  next();
}

/* ============================================================
   ИГРА С ПРЕДЛОГАМИ
   ============================================================ */
function startPrepGame() {
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

function renderPrepGameQuestion() {
  const s = prepGameState;
  if (!s || s.index >= s.queue.length) { finishPrepGame(); return; }
  
  const task = s.queue[s.index];
  s.current = task;
  s._locked = false;

  document.getElementById('prep-progress').textContent = `${s.index + 1} / ${s.queue.length}`;
  document.getElementById('prep-prompt').innerHTML = `
    Где находится <span class="target-word">${task.itemWord}</span>?
    <br><span style="font-size:1rem; color:#777;">(${task.itemRu})</span>
  `;
  
  document.getElementById('prep-scene').innerHTML = prepositionCardScene(task.prep);
  
  const optsContainer = document.getElementById('prep-options');
  optsContainer.innerHTML = '';
  const options = [...PREP_GAME_DATA.preps].sort(() => Math.random() - 0.5).slice(0, 4);
  if (!options.find(o => o.key === task.prep)) {
    options[0] = PREP_GAME_DATA.preps.find(p => p.key === task.prep);
  }

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'prep-opt';
    btn.dataset.prep = opt.key;
    btn.innerHTML = `<span style="font-size: 1.8rem; color: #2E7BAE; font-weight: bold;">${opt.key}</span>`;
    btn.addEventListener('click', () => handlePrepGameAnswer(opt.key, btn));
    optsContainer.appendChild(btn);
  });
}

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
    recordCorrectAnswer('words', 'prepositions', task.prep);
  } else {
    btn.classList.add('wrong'); playWrong();
    s.queue.push(task); s.total++;
  }

  setTimeout(() => {
    if (prepGameState !== s) return;
    s._locked = false;
    s.index++;
    renderPrepGameQuestion();
  }, isCorrect ? 2500 : 3000);
}

function finishPrepGame() {
  const s = prepGameState;
  if (!s) return;
  markSetCompleted('words:prepositions');
  document.getElementById('victory-emoji').textContent = '🎉';
  document.getElementById('victory-title').textContent = 'Молодец!';
  document.getElementById('victory-sub').textContent = 'Ты справился с предлогами!';
  showScreen('victory');
  playStar();
}

/* ============================================================
   ИГРА «ГЛАГОЛЫ/ДЕЙСТВИЯ»
   ============================================================ */
function startActionGame() {
  const tasks = [...ACTION_DATA.tasks].sort(() => Math.random() - 0.5).slice(0, 5);
  actionState = {
    queue: tasks,
    index: 0,
    correct: 0,
    total: tasks.length,
    current: null,
    _locked: false
  };
  showScreen('game');
  renderActionQuestion();
}

function renderActionQuestion() {
  const s = actionState;
  if (!s || s.index >= s.queue.length) { finishActionGame(); return; }
  
  const task = s.queue[s.index];
  s.current = task;
  s._locked = false;
  const container = document.getElementById('game-container');
  
  const allVerbs = [...DATA.words.sets.verbs.cards, ...(DATA.words.sets.verbs.bonus || [])];
  const currentCard = allVerbs.find(c => c.word === task.action);
  
  let visualHtml = '';
  let canvasId = null;

  if (currentCard && currentCard.img) {
    // Картинка на всю карточку без обрезки
    visualHtml = `<img src="${currentCard.img}" style="width:100%; height:100%; object-fit: contain; border-radius:20px;">`;
  } 
  else if (currentCard && currentCard.canvasAnim) {
    canvasId = 'action-canvas-' + Math.random().toString(36).substr(2, 9);
    visualHtml = `<canvas id="${canvasId}" style="width:100%; height:200px; display:block;"></canvas>`;
  }
  else if (currentCard && currentCard.emoji) {
    visualHtml = `<div style="font-size:7rem;">${currentCard.emoji}</div>`;
  } else {
    visualHtml = `<div style="font-size:7rem;">❓</div>`;
  }
  
  const allActions = allVerbs.map(v => v.word);
  const wrongActions = allActions.filter(a => a !== task.action).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [task.action, ...wrongActions].sort(() => Math.random() - 0.5);

  let subject = 'кот';
  if (currentCard && currentCard.word === 'swim') subject = 'рыба';
  else if (currentCard && currentCard.word === 'walk') subject = 'слон';
  else if (currentCard && currentCard.emoji === '✍️') subject = 'мальчик';
  else if (currentCard && currentCard.emoji === '👂') subject = 'мальчик';
  else if (currentCard && currentCard.emoji === '👀') subject = 'мальчик';

  container.innerHTML = `
    <div class="game-progress">${s.index + 1} / ${s.total}</div>
    <div class="action-scene" style="display:flex; align-items:center; justify-content:center; padding:10px; overflow:hidden;">${visualHtml}</div>
    <div class="game-prompt" style="margin: 15px 0; font-size: 1.4rem;">Что любит делать ${subject}?</div>
    <div class="game-options" id="action-options"></div>
  `;

  if (canvasId) {
    setTimeout(() => {
      if (typeof CanvasAnimations !== 'undefined') {
        CanvasAnimations.start(canvasId, currentCard.canvasAnim);
      }
    }, 50);
  }

  const optsEl = document.getElementById('action-options');
  options.forEach(act => {
    const btn = document.createElement('button');
    btn.className = 'action-opt';
    btn.innerHTML = `<span style="font-size: 1.5rem; color: #2E7BAE; font-weight: bold;">${act}</span>`;
    btn.addEventListener('click', () => {
      if (s._locked) return;
      s._locked = true;
      const allBtns = Array.from(optsEl.children);
      allBtns.forEach(b => b.disabled = true);
      
      const isCorrect = act === task.action;
      allBtns.forEach((b, i) => { if (options[i] === task.action) b.classList.add('correct'); });
      
      if (isCorrect) {
        playCorrect(); s.correct++;
      } else {
        btn.classList.add('wrong'); playWrong();
        s.queue.push(task);
      }
      
      setTimeout(() => {
        if (actionState !== s) return;
        if (canvasId && typeof CanvasAnimations !== 'undefined') {
          CanvasAnimations.stop(canvasId);
        }
        s._locked = false;
        s.index++;
        renderActionQuestion();
      }, 1200);
    });
    optsEl.appendChild(btn);
  });
}

function finishActionGame() {
  const s = actionState;
  if (!s) return;
  markSetCompleted('words:verbs');
  document.getElementById('victory-emoji').textContent = '🎉';
  document.getElementById('victory-title').textContent = 'Молодец!';
  document.getElementById('victory-sub').textContent = `Ты угадал ${s.correct} глаголов!`;
  showScreen('victory');
  playStar();
}

/* ============================================================
   ИГРА «ЧИСЛА: THERE IS / THERE ARE» (микрофон)
   ============================================================ */
function startThereIsGame() {
  const queue = [];
  const usedNumbers = new Set();
  
  while (queue.length < 5) {
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

  numState = { mode: 'there-is', queue: queue, index: 0, correct: 0, total: 5, _locked: false };
  showScreen('num-game');
  renderThereIsQuestion();
}

function renderThereIsQuestion() {
  const s = numState;
  if (!s || s.index >= s.queue.length) { finishNumGame(); return; }
  
  const task = s.queue[s.index];
  s._locked = false;
  const isSingle = task.count === 1;
  const correctPhrase = isSingle ? `There is a ${task.word}` : `There are ${task.count} ${task.word}`;

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
    
    recognition.onerror = () => { isHolding = false; micBtn.classList.remove('holding'); };
    recognition.onend = () => { isHolding = false; micBtn.classList.remove('holding'); };
    try { recognition.start(); } catch(e) {}
  };

  const stopRec = () => {
    if (!isHolding) return;
    isHolding = false;
    micBtn.classList.remove('holding');
    if (recognition) { try { recognition.stop(); } catch(e) {} }
  };

  micBtn.addEventListener('mousedown', startRec);
  micBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startRec(); }, { passive: false });
  micBtn.addEventListener('mouseup', stopRec);
  micBtn.addEventListener('touchend', stopRec);
  micBtn.addEventListener('mouseleave', stopRec);

  document.getElementById('num-hint').addEventListener('click', () => {
    const hintEl = document.getElementById('num-hint-text');
    if (hintEl.classList.contains('show')) hintEl.classList.remove('show');
    else { hintEl.textContent = `Правильно: ${correctPhrase}`; hintEl.classList.add('show'); }
  });
}

function finishNumGame() {
  const s = numState;
  if (!s) return;
  document.getElementById('victory-emoji').textContent = '🎉';
  document.getElementById('victory-title').textContent = 'Молодец!';
  document.getElementById('victory-sub').textContent = 'Ты справился!';
  showScreen('victory');
  playStar();
}

/* ============================================================
   ИГРА «СРАВНИ РАЗМЕРЫ»
   ============================================================ */
function startCompareSizeGame() {
  const container = document.getElementById('game-container');
  const s = { stage: 1, index: 0, total: 0, correct: 0 };
  
  const sizes = [
    { key: 'small',  emoji: '🐭', ru: 'маленький',  en: 'small',  fontSize: '3rem' },
    { key: 'medium', emoji: '🐶', ru: 'средний',    en: 'medium', fontSize: '5rem' },
    { key: 'big',    emoji: '🐘', ru: 'большой',    en: 'big',    fontSize: '7rem' }
  ];

  function showTheory() {
    container.innerHTML = `
      <div class="theory-block">
        <h3>Размеры: Small, Medium, Big</h3>
        <div class="theory-scene" style="display:flex; gap:20px; justify-content:center; align-items:flex-end; flex-wrap:wrap;">
          ${sizes.map(size => `
            <div class="theory-item">
              <span class="t-emoji" style="font-size:${size.fontSize}; display:block;">${size.emoji}</span>
              <span class="t-label" style="font-size:1rem;">${size.en}<br><small>${size.ru}</small></span>
            </div>
          `).join('')}
        </div>
        <div class="theory-note" style="font-size:1rem; margin-top:15px;">
          Слова <b>small</b>, <b>medium</b> и <b>big</b> описывают размер.
        </div>
        <button class="grammar-start-btn" id="size-start">▶️ Начать игру</button>
      </div>
    `;
    document.getElementById('size-start').addEventListener('click', () => { playTap(); startStage1(); });
  }

  // УРОВЕНЬ 1: Выбор картинки по слову (5 вопросов: 2 по 2 картинки, 3 по 3 картинки)
  function startStage1() {
    s.stage = 1;
    s.index = 0;
    s.total = 5;
    s.correct = 0;
    
    function nextStage1() {
      if (s.index >= s.total) { startStage2(); return; }
      
      let optionsPool;
      let target;
      
      if (s.index < 2) {
        // Первые 2 задания: только small и big
        optionsPool = [
          { key: 'small', emoji: '🐭', en: 'small', fontSize: '3rem' },
          { key: 'big',   emoji: '🐘', en: 'big',   fontSize: '7rem' }
        ];
      } else {
        // Следующие 3 задания: small, medium, big
        optionsPool = sizes;
      }

      const shuffled = [...optionsPool].sort(() => Math.random() - 0.5);
      
      // Выбираем правильный ответ из доступных вариантов
      target = shuffled[0];
      const options = shuffled;

      container.innerHTML = `
        <div class="game-progress">Уровень 1 · ${s.index + 1} / ${s.total}</div>
        <div class="game-prompt" style="font-size:1.5rem; margin-bottom:20px;">
          Выбери: <span style="color:#FF8C42; font-weight:bold;">${target.en}</span>
        </div>
        <div style="display:flex; gap:30px; justify-content:center; align-items:flex-end; min-height: 150px;">
          ${options.map(opt => `
            <div class="size-animal" data-size="${opt.key}" style="font-size:${opt.fontSize}; text-align:center; cursor:pointer; padding:15px; border-radius:20px; border:3px solid #FFF; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
              ${opt.emoji}
            </div>
          `).join('')}
        </div>
      `;

      container.querySelectorAll('.size-animal').forEach(el => {
        el.addEventListener('click', () => {
          if (el.dataset.size === target.key) {
            playCorrect(); s.correct++;
            el.style.borderColor = '#4CAF50';
            setTimeout(() => { s.index++; nextStage1(); }, 800);
          } else {
            playWrong();
            el.style.borderColor = '#E53935';
            setTimeout(() => { el.style.borderColor = '#FFF'; }, 500);
          }
        });
      });
    }
    nextStage1();
  }

  // УРОВЕНЬ 2: Выбор правильной степени (big, bigger, the biggest)
  function startStage2() {
    s.stage = 2;
    s.index = 0;
    s.total = 3;
    s.correct = 0;

    const tasks = [
      { adj: 'big', question: 'больше', options: ['big', 'bigger', 'the biggest'], answer: 'bigger' },
      { adj: 'small', question: 'самый маленький', options: ['small', 'smaller', 'the smallest'], answer: 'the smallest' },
      { adj: 'big', question: 'самый большой', options: ['big', 'bigger', 'the biggest'], answer: 'the biggest' }
    ];

    function nextStage2() {
      if (s.index >= s.total) { startStage3(); return; }
      const task = tasks[s.index];
      const opts = [...task.options].sort(() => Math.random() - 0.5);

      container.innerHTML = `
        <div class="game-progress">Уровень 2 · ${s.index + 1} / ${s.total}</div>
        <div class="game-prompt" style="font-size:1.6rem; margin-bottom:20px;">
          <span style="color:#2E7BAE; font-size: 2rem; text-transform:capitalize;">${task.question}</span><br>
          <span style="font-size: 1.2rem; color:#777;">(для слова: ${task.adj})</span>
        </div>
        <div style="display:flex; gap:15px; justify-content:center; flex-direction:column; align-items:center;">
          ${opts.map(opt => `
            <button class="grammar-start-btn" data-ans="${opt}" style="width:260px; background:#4FA8D8; margin: 0;">${opt}</button>
          `).join('')}
        </div>
      `;

      container.querySelectorAll('.grammar-start-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (btn.dataset.ans === task.answer) {
            playCorrect(); s.correct++;
            btn.style.background = '#4CAF50';
            setTimeout(() => { s.index++; nextStage2(); }, 1000);
          } else {
            playWrong();
            btn.style.background = '#E53935';
            setTimeout(() => { btn.style.background = '#4FA8D8'; }, 800);
          }
        });
      });
    }
    nextStage2();
  }

  // УРОВЕНЬ 3: Сравнение с than (Ввод или микрофон)
  function startStage3() {
    s.stage = 3;
    s.index = 0;
    s.total = 3;
    s.correct = 0;

    const writeTasks = [
      { a: { emoji: '🐱', en: 'cat', ru: 'кот' }, b: { emoji: '🐭', en: 'mouse', ru: 'мышь' }, adj: 'bigger' },
      { a: { emoji: '🐘', en: 'elephant', ru: 'слон' }, b: { emoji: '🐶', en: 'dog', ru: 'собака' }, adj: 'bigger' },
      { a: { emoji: '🐶', en: 'dog', ru: 'собака' }, b: { emoji: '🐘', en: 'elephant', ru: 'слон' }, adj: 'smaller' }
    ];

    function nextStage3() {
      if (s.index >= s.total) { startStage4(); return; }
      const task = writeTasks[s.index];
      
      const correctSentence = `The ${task.a.en} is ${task.adj} than the ${task.b.en}`;
      
      container.innerHTML = `
        <div class="game-progress">Уровень 3 · ${s.index + 1} / ${s.total}</div>
        
        <div style="display:flex; justify-content:center; align-items:center; gap:15px; font-size:4rem; margin-bottom: 10px;">
          <span>${task.a.emoji}</span>
          <span style="font-size:2rem; color:#777;">vs</span>
          <span>${task.b.emoji}</span>
        </div>

        <div class="game-prompt" style="font-size:1.2rem; margin-bottom:15px;">
          Напиши или скажи предложение:<br>
          <span style="color:#FF8C42;">${task.a.ru} (${task.a.en})</span> больше/меньше, чем <span style="color:#FF8C42;">${task.b.ru} (${task.b.en})</span>
        </div>

        <input type="text" id="compare-input" placeholder="Введи текст..." style="width: 90%; max-width: 400px; padding: 12px; font-size: 1.2rem; border-radius: 15px; border: 3px solid #4FA8D8; font-family: inherit; text-align: center; margin-bottom: 15px; outline:none;">
        
        <div style="display:flex; gap: 15px; align-items:center; margin-bottom: 10px;">
          <button class="mic-btn" id="compare-mic" style="width: 60px; height: 60px; font-size: 1.8rem; margin:0;">🎤</button>
          <button class="grammar-start-btn" id="compare-submit" style="width: auto; padding: 12px 25px; margin:0; background:#4CAF50;">Проверить</button>
        </div>

        <button class="help-btn" id="compare-hint-btn" style="margin-top: 10px;">?</button>
        <div id="compare-hint-text" class="hint-text" style="margin-top:10px;"></div>
      `;

      const inputEl = document.getElementById('compare-input');
      const micBtn = document.getElementById('compare-mic');
      const submitBtn = document.getElementById('compare-submit');
      const hintBtn = document.getElementById('compare-hint-btn');
      const hintText = document.getElementById('compare-hint-text');
      let isChecking = false; // Защита от двойного клика

      const checkAnswer = (text) => {
        let norm = text.toLowerCase().trim().replace(/\s+/g, ' ');
        norm = norm.replace(/\b(a|an|the)\b/g, '').replace(/\s+/g, ' ').trim();
        
        let correctNorm = correctSentence.toLowerCase().replace(/\b(a|an|the)\b/g, '').replace(/\s+/g, ' ').trim();
        let correctNorm2 = `the ${task.a.en} is ${task.adj} than ${task.b.en}`.toLowerCase().replace(/\b(a|an|the)\b/g, '').replace(/\s+/g, ' ').trim();
        
        return norm === correctNorm || norm === correctNorm2;
      };

      const handleSubmit = () => {
        if (isChecking) return; // Блокировка
        const val = inputEl.value;
        if (!val.trim()) return;
        
        isChecking = true;
        if (checkAnswer(val)) {
          playCorrect(); s.correct++;
          mascotReact('🎉');
          submitBtn.style.background = '#4CAF50';
          submitBtn.textContent = 'Верно!';
          setTimeout(() => { s.index++; nextStage3(); }, 1500);
        } else {
          playWrong();
          submitBtn.style.background = '#E53935';
          submitBtn.textContent = 'Ещё раз';
          setTimeout(() => { 
            submitBtn.style.background = '#4CAF50'; 
            submitBtn.textContent = 'Проверить'; 
            isChecking = false; // Разблокировка
          }, 1500);
        }
      };

      submitBtn.addEventListener('click', handleSubmit);
      inputEl.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSubmit(); });

      hintBtn.addEventListener('click', () => {
        hintText.textContent = `Правильно: ${correctSentence}`;
        hintText.classList.add('show');
        hintBtn.style.opacity = '0.5';
      });

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
          const spoken = event.results[0][0].transcript;
          inputEl.value = spoken;
          handleSubmit();
        };
        
        recognition.onerror = () => { isHolding = false; micBtn.classList.remove('holding'); };
        recognition.onend = () => { isHolding = false; micBtn.classList.remove('holding'); };
        try { recognition.start(); } catch(e) {}
      };

      const stopRec = () => {
        if (!isHolding) return;
        isHolding = false;
        micBtn.classList.remove('holding');
        if (recognition) { try { recognition.stop(); } catch(e) {} }
      };

      micBtn.addEventListener('mousedown', startRec);
      micBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startRec(); }, { passive: false });
      micBtn.addEventListener('mouseup', stopRec);
      micBtn.addEventListener('touchend', stopRec);
      micBtn.addEventListener('mouseleave', stopRec);
    }
    nextStage3();
  }

  // УРОВЕНЬ 4: Превосходная степень (с выбором из трех животных на экране)
  function startStage4() {
    s.stage = 4;
    s.index = 0;
    s.total = 3;
    s.correct = 0;

    const writeTasks = [
      { question: 'Кто самый большой?', correct: 'The elephant is the biggest' },
      { question: 'Кто самый маленький?', correct: 'The mouse is the smallest' },
      { question: 'Кто средний?', correct: 'The dog is the medium one' }
    ];

    function nextStage4() {
      if (s.index >= s.total) { finish(); return; }
      const task = writeTasks[s.index];
      
      container.innerHTML = `
        <div class="game-progress">Уровень 4 · ${s.index + 1} / ${s.total}</div>
        
        <!-- Отрисовка трёх животных на экране -->
        <div style="display:flex; justify-content:center; align-items:flex-end; gap:15px; margin-bottom: 15px;">
          <div style="text-align:center;">
            <div style="font-size:2.5rem;">🐭</div>
            <div style="font-size:0.9rem; color:#777;">mouse</div>
          </div>
          <div style="text-align:center;">
            <div style="font-size:4rem;">🐶</div>
            <div style="font-size:0.9rem; color:#777;">dog</div>
          </div>
          <div style="text-align:center;">
            <div style="font-size:6rem;">🐘</div>
            <div style="font-size:0.9rem; color:#777;">elephant</div>
          </div>
        </div>

        <div class="game-prompt" style="font-size:1.4rem; margin-bottom:15px;">
          Напиши или скажи:<br>
          <span style="color:#FF8C42; font-size:1.6rem;">${task.question}</span>
        </div>

        <input type="text" id="compare-input" placeholder="Введи текст..." style="width: 90%; max-width: 400px; padding: 12px; font-size: 1.2rem; border-radius: 15px; border: 3px solid #4FA8D8; font-family: inherit; text-align: center; margin-bottom: 15px; outline:none;">
        
        <div style="display:flex; gap: 15px; align-items:center; margin-bottom: 10px;">
          <button class="mic-btn" id="compare-mic" style="width: 60px; height: 60px; font-size: 1.8rem; margin:0;">🎤</button>
          <button class="grammar-start-btn" id="compare-submit" style="width: auto; padding: 12px 25px; margin:0; background:#4CAF50;">Проверить</button>
        </div>

        <button class="help-btn" id="compare-hint-btn" style="margin-top: 10px;">?</button>
        <div id="compare-hint-text" class="hint-text" style="margin-top:10px;"></div>
      `;

      const inputEl = document.getElementById('compare-input');
      const micBtn = document.getElementById('compare-mic');
      const submitBtn = document.getElementById('compare-submit');
      const hintBtn = document.getElementById('compare-hint-btn');
      const hintText = document.getElementById('compare-hint-text');
      let isChecking = false; // Защита от двойного клика

      const checkAnswer = (text) => {
        let norm = text.toLowerCase().trim().replace(/\s+/g, ' ');
        norm = norm.replace(/\b(a|an|the)\b/g, '').replace(/\s+/g, ' ').trim();
        
        let correctNorm = task.correct.toLowerCase().replace(/\b(a|an|the)\b/g, '').replace(/\s+/g, ' ').trim();
        let correctNorm2 = task.correct.replace(' one', '').toLowerCase().replace(/\b(a|an|the)\b/g, '').replace(/\s+/g, ' ').trim();
        
        return norm === correctNorm || norm === correctNorm2;
      };

      const handleSubmit = () => {
        if (isChecking) return; // Блокировка
        const val = inputEl.value;
        if (!val.trim()) return;
        
        isChecking = true;
        if (checkAnswer(val)) {
          playCorrect(); s.correct++;
          mascotReact('🎉');
          submitBtn.style.background = '#4CAF50';
          submitBtn.textContent = 'Верно!';
          setTimeout(() => { s.index++; nextStage4(); }, 1500);
        } else {
          playWrong();
          submitBtn.style.background = '#E53935';
          submitBtn.textContent = 'Ещё раз';
          setTimeout(() => { 
            submitBtn.style.background = '#4CAF50'; 
            submitBtn.textContent = 'Проверить'; 
            isChecking = false; // Разблокировка
          }, 1500);
        }
      };

      submitBtn.addEventListener('click', handleSubmit);
      inputEl.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSubmit(); });

      hintBtn.addEventListener('click', () => {
        hintText.textContent = `Правильно: ${task.correct}`;
        hintText.classList.add('show');
        hintBtn.style.opacity = '0.5';
      });

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
          const spoken = event.results[0][0].transcript;
          inputEl.value = spoken;
          handleSubmit();
        };
        
        recognition.onerror = () => { isHolding = false; micBtn.classList.remove('holding'); };
        recognition.onend = () => { isHolding = false; micBtn.classList.remove('holding'); };
        try { recognition.start(); } catch(e) {}
      };

      const stopRec = () => {
        if (!isHolding) return;
        isHolding = false;
        micBtn.classList.remove('holding');
        if (recognition) { try { recognition.stop(); } catch(e) {} }
      };

      micBtn.addEventListener('mousedown', startRec);
      micBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startRec(); }, { passive: false });
      micBtn.addEventListener('mouseup', stopRec);
      micBtn.addEventListener('touchend', stopRec);
      micBtn.addEventListener('mouseleave', stopRec);
    }
    nextStage4();
  }

  function finish() {
    document.getElementById('victory-emoji').textContent = '🎉';
    document.getElementById('victory-title').textContent = 'Молодец!';
    document.getElementById('victory-sub').textContent = `Правильных ответов: ${s.correct}`;
    showScreen('victory');
  }

  showScreen('game');
  showTheory();
}