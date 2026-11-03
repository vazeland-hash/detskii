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
  const uniqueCards = [...currentCards].sort(() => Math.random() - 0.5).slice(0, 10); // Ограничение до 10
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
  const sessionWords = [...allWords].sort(() => Math.random() - 0.5).slice(0, 10);
  gameState = {
    level: 1, index: 0, total: sessionWords.length,
    queue: [...sessionWords], _locked: false, _allWords: sessionWords,
    correct: 0,
    wrongQueue: []
  };
  showScreen('game');
  renderWordsLevel();
}

function renderWordsLevel() {
  const s = gameState;
  if (!s) return;
  if (s.index >= s.queue.length) {
    if (s.level < 5) {
      s.level++;
      s.index = 0;
      s.queue = [...s._allWords].sort(() => Math.random() - 0.5);
      renderWordsLevel();
    } else {
      finishGame();
    }
    return;
  }

  const card = s.queue[s.index];
  const container = document.getElementById('game-container');
  s._locked = false;

  const correctSetKey = card._setKey || 'animals';
  const getDistractors = (n) => {
    let category = 'animal';
    if (['mother', 'father', 'sister', 'brother', 'grandmother', 'grandfather', 'baby', 'family', 'uncle', 'aunt', 'parents'].includes(card.word)) category = 'people';
    else if (['apple', 'banana', 'milk', 'bread', 'cheese', 'carrot', 'chicken', 'ice cream', 'pizza', 'chocolate', 'juice'].includes(card.word)) category = 'food';
    else if (['I', 'you', 'he', 'she', 'it', 'we', 'they'].includes(card.word)) category = 'pronoun';

    const isWordInCategory = (w) => {
      if (category === 'people') return ['mother', 'father', 'sister', 'brother', 'grandmother', 'grandfather', 'baby', 'family', 'uncle', 'aunt', 'parents'].includes(w);
      if (category === 'food') return ['apple', 'banana', 'milk', 'bread', 'cheese', 'carrot', 'chicken', 'ice cream', 'pizza', 'chocolate', 'juice'].includes(w);
      if (category === 'pronoun') {
        if ((card.word === 'we' && w === 'they') || (card.word === 'they' && w === 'we')) return false;
        return ['I', 'you', 'he', 'she', 'it', 'we', 'they'].includes(w);
      }
      return !['mother', 'father', 'sister', 'brother', 'grandmother', 'grandfather', 'baby', 'family', 'uncle', 'aunt', 'parents', 'apple', 'banana', 'milk', 'bread', 'cheese', 'carrot', 'chicken', 'ice cream', 'pizza', 'chocolate', 'juice', 'I', 'you', 'he', 'she', 'it', 'we', 'they'].includes(w);
    };

    const pool = s._allWords.filter(c => 
      c.word.toLowerCase() !== card.word.toLowerCase() && 
      (c.emoji !== card.emoji || c.img !== card.img) &&
      isWordInCategory(c.word) &&
      c.word !== card.word
    );
    if (pool.length < n) {
      const extra = s._allWords.filter(c => 
        c.word !== card.word && 
        !pool.includes(c) &&
        (c.emoji !== card.emoji || c.img !== card.img)
      );
      pool.push(...extra.sort(() => Math.random() - 0.5).slice(0, n - pool.length));
    }
    
    const uniquePool = [];
    const seen = new Set();
    pool.forEach(c => {
      const ident = c.img || c.emoji || c.word;
      if (!seen.has(ident)) {
        seen.add(ident);
        uniquePool.push(c);
      }
    });
    
    return uniquePool.sort(() => Math.random() - 0.5).slice(0, n);
  };

  const setupHint = () => {
    const hintBtn = document.getElementById('lvl-hint');
    if (!hintBtn) return;
    hintBtn.addEventListener('click', () => {
      const hintEl = document.getElementById('lvl-hint-text');
      if (hintEl.classList.contains('show')) {
        hintEl.classList.remove('show');
      } else {
        hintEl.textContent = `Правильный ответ: ${card.word} (${card.ru})`;
        hintEl.classList.add('show');
      }
    });
  };

  if (s.level === 1) {
    const dist = getDistractors(3); // Теперь 3 дистрактора + 1 правильный = 4
    const opts = [card, ...dist].sort(() => Math.random() - 0.5);
    s.currentOptions = opts;
    container.innerHTML = `
      <div class="game-progress">Уровень 1: Выбери картинку · ${s.index + 1}/${s.queue.length}</div>
      <div class="game-prompt">Найди: <span class="word">${card.word}</span></div>
      <button class="game-speak-btn" id="lvl-speak">🔊</button>
      <div class="game-options" id="game-options"></div>
      <div style="text-align:center; margin-top:10px;">
        <button class="help-btn" id="lvl-hint">?</button>
        <div id="lvl-hint-text" class="hint-text"></div>
      </div>
    `;
    document.getElementById('lvl-speak').addEventListener('click', () => speak(card.word));
    setupHint();
    const optsEl = document.getElementById('game-options');
    opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'game-opt';
      btn.innerHTML = opt.img 
        ? `<img src="${opt.img}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 16px;">` 
        : `<div class="animal-img">${opt.emoji}</div>`;
      btn.addEventListener('click', () => handleWordsLvl1(i, card, correctSetKey));
      optsEl.appendChild(btn);
    });
    setTimeout(() => speak(card.word), 300);
  }
  else if (s.level === 2) {
    const dist = getDistractors(3);
    const opts = [card, ...dist].sort(() => Math.random() - 0.5);
    s.currentOptions = opts;
    container.innerHTML = `
      <div class="game-progress">Уровень 2: Прочитай · ${s.index + 1}/${s.queue.length}</div>
      <div class="game-prompt">Выбери слово: <span class="word">${card.ru}</span></div>
      <div class="game-options" id="game-options" style="grid-template-columns: 1fr;"></div>
      <div style="text-align:center; margin-top:10px;">
        <button class="help-btn" id="lvl-hint">?</button>
        <div id="lvl-hint-text" class="hint-text"></div>
      </div>
    `;
    setupHint();
    const optsEl = document.getElementById('game-options');
    opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'game-opt';
      btn.innerHTML = `<div class="lvl-title-text">${opt.word}</div>`;
      btn.addEventListener('click', () => handleWordsLvl1(i, card, correctSetKey));
      optsEl.appendChild(btn);
    });
  }
  else if (s.level === 3) {
    const dist = getDistractors(3);
    const opts = [card, ...dist].sort(() => Math.random() - 0.5);
    s.currentOptions = opts;
    container.innerHTML = `
      <div class="game-progress">Уровень 3: Слушай · ${s.index + 1}/${s.queue.length}</div>
      <div style="display:flex; align-items:center; gap:10px;">
        <button class="game-speak-btn" id="lvl-speak">🔊</button>
        <button class="help-btn" id="lvl-hint">?</button>
      </div>
      <div id="lvl-hint-text" class="hint-text"></div>
      <div class="game-options" id="game-options"></div>
    `;
    document.getElementById('lvl-speak').addEventListener('click', () => speak(card.word));
    setupHint();
    const optsEl = document.getElementById('game-options');
    opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'game-opt';
      btn.innerHTML = `<div class="animal-img">${opt.emoji}</div>`;
      btn.addEventListener('click', () => handleWordsLvl1(i, card, correctSetKey));
      optsEl.appendChild(btn);
    });
    setTimeout(() => speak(card.word), 300);
  }
  else if (s.level === 4) {
    container.innerHTML = `
      <div class="game-progress">Уровень 4: Составь фразу · ${s.index + 1}/${s.queue.length}</div>
      <div style="font-size: 8rem; text-align:center;">${card.emoji}</div>
      <div class="there-is-container">
        <div style="font-size: 1.3rem; font-weight:bold;">Напиши фразу с here / there</div>
        <input type="text" id="there-is-input" class="there-is-input" placeholder="here is a... / there is a...">
        <button class="there-is-btn" id="there-is-check">Проверить</button>
        <button class="help-btn" id="there-hint">?</button>
        <div id="lvl-hint-text" class="hint-text"></div>
      </div>
    `;
    document.getElementById('there-hint').addEventListener('click', () => {
      const hintEl = document.getElementById('lvl-hint-text');
      if (hintEl.classList.contains('show')) {
        hintEl.classList.remove('show');
      } else {
        hintEl.textContent = `Подсказка: there is a ${card.word}`;
        hintEl.classList.add('show');
      }
    });
    document.getElementById('there-is-check').addEventListener('click', () => {
      const raw = document.getElementById('there-is-input').value.toLowerCase().replace(/\s+/g, ' ').trim();
      const hasHereOrThere = /\b(here|there)\b/.test(raw);
      const hasIs = /\bis\b/.test(raw);
      const hasWord = raw.includes(card.word);
      if (hasHereOrThere && hasIs && hasWord) {
        playCorrect(); mascotReact('🎉'); speak('Great job!');
        recordCorrectAnswer('words', correctSetKey, card.word);
        s.index++; setTimeout(renderWordsLevel, 1200);
      } else {
        playWrong(); speak('Try again. There is a ' + card.word);
        if (!s.wrongQueue.includes(card)) s.wrongQueue.push(card);
      }
    });
  }
  else if (s.level === 5) {
    container.innerHTML = `
      <div class="game-progress">Уровень 5: Скажи слово · ${s.index + 1}/${s.queue.length}</div>
      <div style="font-size: 8rem; text-align:center;">${card.emoji}</div>
      <div style="font-size: 1.5rem; font-weight:bold; margin-bottom:10px;">Скажи: ${card.word}</div>
      <button class="mic-btn" id="mic-btn">🎤</button>
      <div style="text-align:center; margin-top:10px;">
        <button class="help-btn" id="lvl-hint">?</button>
        <div id="lvl-hint-text" class="hint-text"></div>
      </div>
    `;
    setupHint();
    document.getElementById('mic-btn').addEventListener('click', () => {
      listenForWord(card.word,
        () => {
          playCorrect(); mascotReact('🎉'); speak('Perfect!');
          recordCorrectAnswer('words', correctSetKey, card.word);
          s.index++;
          setTimeout(renderWordsLevel, 1000);
        },
        (spoken) => {
          if (spoken === 'unsupported') {
            speak(card.word);
            setTimeout(() => {
              s.index++;
              renderWordsLevel();
            }, 1500);
            return;
          }
          playWrong(); speak("Try again.");
          if (!s.wrongQueue.includes(card)) s.wrongQueue.push(card);
        },
        'mic-btn'
      );
    });
  }
}

function handleWordsLvl1(idx, correct, setKey) {
  const s = gameState;
  if (s._locked) return;
  s._locked = true;
  const allBtns = document.querySelectorAll('#game-options .game-opt');
  const chosen = s.currentOptions[idx];
  allBtns.forEach((b, i) => {
    b.disabled = true;
    if (s.currentOptions[i].word === correct.word) b.classList.add('correct');
  });
  if (chosen.word === correct.word) {
    playCorrect(); mascotReact('🎉'); speak(correct.word);
    s.correct++;
    recordCorrectAnswer('words', setKey || 'animals', correct.word);
  } else {
    allBtns[idx].classList.add('wrong'); playWrong();
    s.wrongQueue.push(correct);
  }
  setTimeout(() => { s._locked = false; s.index++; renderWordsLevel(); }, 1200);
}

function key(card) { return card.word.toLowerCase(); }

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

function renderGameQuestion() {
  const s = gameState;
  if (!s) return;
  if (s.index >= s.queue.length) { finishGame(); return; }

  const card = s.queue[s.index];
  const distractors = pickDistractors(card, 3); // 4 варианта
  const options = [card, ...distractors].sort(() => Math.random() - 0.5);
  s.currentOptions = options;

  const isNumbers = currentSection === 'numbers';
  const titleText = isNumbers ? 'Найди число:' : 'Найди:';

  const container = document.getElementById('game-container');
  container.innerHTML = `
    <div class="game-progress">${s.index + 1} / ${s.queue.length}</div>
    <div class="game-prompt">
      ${titleText}
      <span class="word">${card.word}</span>
    </div>
    <button class="game-speak-btn" id="game-speak">🔊</button>
    <div class="game-options" id="game-options"></div>
    <div style="text-align:center; margin-top:10px;">
      <button class="help-btn" id="game-hint">?</button>
      <div id="lvl-hint-text" class="hint-text"></div>
    </div>
  `;

  setTimeout(() => speak(card.word), 300);
  document.getElementById('game-speak').addEventListener('click', () => speak(card.word));
  document.getElementById('game-hint').addEventListener('click', () => {
    const hintEl = document.getElementById('lvl-hint-text');
    if (hintEl.classList.contains('show')) {
      hintEl.classList.remove('show');
    } else {
      hintEl.textContent = `Правильный ответ: ${card.word} (${card.ru})`;
      hintEl.classList.add('show');
    }
  });

  const optsEl = document.getElementById('game-options');
  options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'game-opt';
    btn.innerHTML = renderGameOption(opt);
    btn.addEventListener('click', () => handleAnswer(i, card));
    optsEl.appendChild(btn);
  });
}

function renderGameOption(card) {
  if (card.img) {
    return `<img src="${card.img}" style="width: 100%; height: 100%; max-height: 100px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);" alt="${card.word}">`;
  }
  if (card.digit) return `<div class="opt-digit anim-pop">${card.digit}</div>`;
  if (card.emoji) return `<div class="opt-emoji">${card.emoji}</div>`;
  if (card.color) {
    const isLight = ['#FDD835', '#FAFAFA'].includes(card.color);
    return `<div class="anim-pulse" style="width:78px;height:78px;border-radius:50%;background:${card.color};border:4px solid ${isLight?'#333':'#FFF'};box-shadow:0 4px 12px rgba(0,0,0,0.2);"></div>`;
  }
  if (card.shape) return `<div class="opt-svg anim-pulse">${shapeSVG(card.shape)}</div>`;
  if (card.svg) return `<div style="width:100%;height:100px;">${card.svg()}</div>`;
  return '';
}

function handleAnswer(idx, correct) {
  const s = gameState;
  const allBtns = Array.from(document.querySelectorAll('#game-options .game-opt'));
  if (allBtns.some(b => b.disabled)) return;
  allBtns.forEach(b => b.disabled = true);

  const chosen = s.currentOptions[idx];
  const isCorrect = key(chosen) === key(correct);

  allBtns.forEach((b, i) => {
    if (key(s.currentOptions[i]) === key(correct)) b.classList.add('correct');
  });

  let advanced = false;
  const advance = () => {
    if (advanced) return;
    advanced = true;
    s.index++;
    renderGameQuestion();
  };

  if (isCorrect) {
    playCorrect(); mascotReact('🎉');
    s.correct++;
    recordCorrectAnswer(currentSection, currentSetKey, correct.word);
    setTimeout(() => speak(correct.word, advance), 200);
    setTimeout(advance, 2000);
  } else {
    allBtns[idx].classList.add('wrong');
    playWrong();
    const existsInQueue = s.queue.slice(s.index + 1).some(c => key(c) === key(correct));
    if (!existsInQueue) s.queue.push(correct);
    s.wrongQueue.push(correct);
    setTimeout(advance, 1400);
  }
}

function finishGame() {
  const hasStats = gameState && typeof gameState.correct === 'number';
  const correct = hasStats ? gameState.correct : 0;
  const wrongCount = (gameState && gameState.wrongQueue) ? gameState.wrongQueue.length : 0;
  const perfect = hasStats && correct > 0 && wrongCount === 0;
  const passed = hasStats ? correct > 0 : true;

  const keyFull = currentSection + ':' + currentSetKey;
  if (passed) { markSetCompleted(keyFull); playStar(); }

  const unlockedBefore = getUnlockedCount(currentSection, currentSetKey);
  recordPerfect(currentSection, currentSetKey, perfect);
  if (passed) markWordsMastered(currentSection, currentSetKey);
  const unlockedAfter = getUnlockedCount(currentSection, currentSetKey);
  const gotNewWord = perfect && unlockedAfter > unlockedBefore;

  let sub = passed
    ? `Ты выучил(а) набор! Правильных: ${correct}`
    : `Попробуй ещё раз! Правильных: ${correct}`;
  if (gotNewWord) { sub += ' 🔓 Открыто новое слово!'; }

  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent = sub;
  document.getElementById('victory-star').style.display = passed ? 'block' : 'none';

  showScreen('victory');
  setTimeout(() => speak(passed ? 'Well done!' : 'Try again!'), 500);
}

/* ============================================================
   ИГРА С ПРЕДЛОГАМИ (с голосовым этапом)
   ============================================================ */
function startPrepGame() {
  const shuffledPreps = [...PREP_GAME_DATA.preps].sort(() => Math.random() - 0.5);
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
  if (!s) return;

  if (s.index >= s.queue.length) {
    if (s.stage === 'choice') {
      s.stage = 'typing';
      s.index = 0;
      s.queue.sort(() => Math.random() - 0.5);
    } else if (s.stage === 'typing') {
      s.stage = 'voice';
      s.index = 0;
      s.queue.sort(() => Math.random() - 0.5);
    } else {
      finishPrepGame();
      return;
    }
  }

  const task = s.queue[s.index];
  s.current = task;
  s._locked = false;

  if (task.prep === 'above') {
    document.getElementById('prep-scene').innerHTML = pictureSceneDynamic('above');
    document.getElementById('prep-prompt').innerHTML = `Где находится <span class="target-word">картина</span>?`;
    task.itemWord = 'picture';
  } else if (task.prep === 'below') {
    document.getElementById('prep-scene').innerHTML = `
      <div class="thermo-scene" style="width: 100%; height: 100%; background: none; border: none; box-shadow: none;">
        ${thermoSceneDynamic('below')}
      </div>`;
    document.getElementById('prep-prompt').innerHTML = `Куда показывает <span class="target-word">стрелка</span>?`;
    task.itemWord = 'arrow';
  } else {
    document.getElementById('prep-scene').innerHTML = `
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
        ${prepositionCardScene(task.prep)}
      </div>`;
    let itemNameRu = 'кот', itemNameEn = 'cat';
    if (task.prep === 'under') { itemNameRu = 'мяч'; itemNameEn = 'ball'; }
    document.getElementById('prep-prompt').innerHTML = `Где находится <span class="target-word">${itemNameRu} (${itemNameEn})</span>?`;
    task.itemWord = itemNameEn;
  }

  const stageText = s.stage === 'choice' ? 'Выбор' : s.stage === 'typing' ? 'Ввод' : 'Голос';
  document.getElementById('prep-progress').textContent = `${stageText} · ${s.index + 1} / ${s.queue.length}`;

  const optsEl = document.getElementById('prep-options');
  optsEl.innerHTML = '';

  if (s.stage === 'voice') {
    const fullSentence = (task.prep === 'above')
      ? `The picture is ${task.prep} the box.`
      : (task.prep === 'below')
        ? `The arrow is ${task.prep}.`
        : `The ${task.itemWord} is ${task.prep} the box.`;

    optsEl.style.gridTemplateColumns = '1fr';
    optsEl.innerHTML = `
      <div style="text-align:center; padding:20px;">
        <div style="font-size:1.2rem; font-weight:bold; color:#2E7BAE; margin-bottom:15px;">Скажи предложение полностью</div>
        <button class="mic-btn" id="prep-mic-btn" style="margin: 0 auto;">🎤</button>
        <div style="margin-top:15px;">
          <button class="help-btn" id="prep-voice-hint" title="Подсказка">?</button>
          <div id="prep-hint-text" class="hint-text"></div>
        </div>
      </div>
    `;
    document.getElementById('prep-voice-hint').addEventListener('click', () => {
      const hintEl = document.getElementById('prep-hint-text');
      if (hintEl.classList.contains('show')) {
        hintEl.classList.remove('show');
      } else {
        hintEl.textContent = `Правильное предложение: ${fullSentence}`;
        hintEl.classList.add('show');
      }
    });
    document.getElementById('prep-mic-btn').addEventListener('click', () => {
      listenForWord(fullSentence,
        () => {
          playCorrect(); mascotReact('🎉'); s.correct++; speak('Great!');
          setTimeout(() => { s.index++; renderPrepGameQuestion(); }, 1200);
        },
        (spoken) => {
          if (spoken === 'unsupported') {
            speak(fullSentence);
            setTimeout(() => { s.index++; renderPrepGameQuestion(); }, 1800);
            return;
          }
          playWrong(); speak('Try again.');
        },
        'prep-mic-btn'
      );
    });
    return;
  }

  if (s.stage === 'typing') {
    const fullText = (task.prep === 'above')
      ? `The picture is ___ the box.`
      : (task.prep === 'below')
        ? `The arrow is ___ .`
        : `The ${task.itemWord} is ___ the box.`;

    optsEl.style.gridTemplateColumns = '1fr';
    optsEl.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;">
        <div style="font-size:1.3rem;font-weight:bold;color:#2E7BAE;text-align:center;">${fullText}</div>
        <div style="display:flex;gap:10px;align-items:center;width:100%;max-width:320px;">
          <input type="text" id="prep-input" class="there-is-input" placeholder="впиши предлог" style="flex:1;">
          <button class="help-btn" id="prep-hint" title="Подсказка">?</button>
        </div>
        <div id="prep-hint-text" class="hint-text"></div>
        <button class="there-is-btn" id="prep-check">Проверить</button>
      </div>`;
    let hintPos = 0;
    const input = document.getElementById('prep-input');
    document.getElementById('prep-hint').addEventListener('click', () => {
      const hintEl = document.getElementById('prep-hint-text');
      if (hintEl.classList.contains('show')) {
        hintEl.classList.remove('show');
      } else {
        hintEl.textContent = `Подсказка: ${task.prep}`;
        hintEl.classList.add('show');
      }
    });
    document.getElementById('prep-check').addEventListener('click', () => {
      if (s._locked) return;
      const val = input.value.toLowerCase().trim().replace(/\s+/g, ' ');
      const ok = val === task.prep;
      s._locked = true;
      if (ok) {
        playCorrect(); mascotReact('🎉'); s.correct++;
        speak(`Yes! ${fullText.replace('___', task.prep)}`);
        recordCorrectAnswer('words', 'prepositions', task.prep);
        setTimeout(() => { s._locked = false; s.index++; renderPrepGameQuestion(); }, 1500);
      } else {
        playWrong(); speak(`No. ${fullText.replace('___', task.prep)}`);
        setTimeout(() => { s._locked = false; }, 1200);
      }
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); document.getElementById('prep-check').click(); }
    });
    input.focus();
    return;
  }

  optsEl.style.gridTemplateColumns = '';
  const allPreps = [...PREP_GAME_DATA.preps].sort(() => Math.random() - 0.5);
  const wrongOptions = allPreps.filter(p => p.key !== task.prep).slice(0, 3);
  const correctOption = PREP_GAME_DATA.preps.find(p => p.key === task.prep);
  const opts = [...wrongOptions, correctOption].sort(() => Math.random() - 0.5);
  opts.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'prep-opt';
    btn.dataset.prep = p.key;
    btn.textContent = p.key;
    btn.addEventListener('click', () => handlePrepGameAnswer(p.key, btn));
    optsEl.appendChild(btn);
  });
  setTimeout(() => speak(`Where is the ${task.itemWord}?`), 300);
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

  clearTimeout(s._advanceTimer);
  s._advanceTimer = setTimeout(() => {
    if (prepGameState !== s) return;
    s._locked = false;
    s.index++;
    renderPrepGameQuestion();
  }, 2200);
}

function finishPrepGame() {
  const s = prepGameState;
  if (!s) return;
  const passed = s.correct >= Math.ceil(s.total * 0.6);
  const perfect = s.correct === s.total;
  if (passed) { markSetCompleted('words:prepositions'); playStar(); }
  recordPerfect('words', 'prepositions', perfect);
  if (passed) markWordsMastered('words', 'prepositions');

  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent = `Правильных: ${s.correct} из ${s.total}`;
  showScreen('victory');
  setTimeout(() => speak(passed ? 'Well done!' : 'Try again!'), 500);
}

/* ============================================================
   ИГРА «ГЛАГОЛЫ/ДЕЙСТВИЯ» (с голосом)
   ============================================================ */
function startActionGame() {
  const queue = [...ACTION_DATA.tasks].sort(() => Math.random() - 0.5);
  actionState = {
    queue: queue,
    index: 0,
    correct: 0,
    total: queue.length,
    current: null,
    _locked: false,
    wrongQueue: []
  };
  showScreen('action');
  renderActionQuestion();
}

function renderActionQuestion() {
  const s = actionState;
  if (!s) return;
  
  if (s.index >= s.queue.length) { finishActionGame(); return; }

  const task = s.queue[s.index];
  s.current = task;
  s._locked = false;

  const distractors = ACTION_DATA.tasks
    .filter(t => t.phrase !== task.phrase)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  const options = [task, ...distractors].sort(() => Math.random() - 0.5);

  const sceneHtml = actionSceneSVG(task.animal, task.action);

  const container = document.getElementById('action-container');
  container.innerHTML = `
    <div class="game-progress">${s.index + 1} / ${s.queue.length}</div>
    <div class="action-scene" style="position:relative; overflow:hidden; background:#E8F4F8; display:flex; align-items:center; justify-content:center;">
      ${sceneHtml}
    </div>
    <div class="action-prompt">Что происходит? / What's happening?</div>
    <div class="action-options" id="action-options"></div>
    <div style="text-align:center; margin-top:10px;">
      <button class="help-btn" id="action-hint">?</button>
      <div id="lvl-hint-text" class="hint-text"></div>
    </div>
  `;

  document.getElementById('action-hint').addEventListener('click', () => {
    const hintEl = document.getElementById('lvl-hint-text');
    if (hintEl.classList.contains('show')) {
      hintEl.classList.remove('show');
    } else {
      hintEl.textContent = `Правильный ответ: ${task.phrase} (${task.ru})`;
      hintEl.classList.add('show');
    }
  });

  const optsEl = document.getElementById('action-options');
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'action-opt';
    btn.textContent = opt.phrase;
    btn.addEventListener('click', () => handleActionAnswer(opt, task, btn));
    optsEl.appendChild(btn);
  });
}

function handleActionAnswer(chosen, task, btn) {
  const s = actionState;
  if (!s || s._locked) return;
  s._locked = true;

  const allBtns = Array.from(document.querySelectorAll('#action-options .action-opt'));
  allBtns.forEach(b => b.disabled = true);

  const isCorrect = chosen.phrase === task.phrase;
  allBtns.forEach(b => { if (b.textContent === task.phrase) b.classList.add('correct'); });

  if (isCorrect) {
    playCorrect(); mascotReact('🎉'); s.correct++;
    speak(`Yes! ${task.phrase}.`);
    recordCorrectAnswer('words', 'verbs', task.action);
  } else {
    btn.classList.add('wrong'); playWrong();
    speak(`No. ${task.phrase}.`);
    const existsInQueue = s.queue.slice(s.index + 1).some(t => t.phrase === task.phrase);
    if (!existsInQueue) s.queue.push(task);
    s.wrongQueue.push(task);
  }
  setTimeout(() => {
    if (actionState !== s) return;
    s._locked = false;
    s.index++;
    renderActionQuestion();
  }, isCorrect ? 1800 : 2200);
}

function finishActionGame() {
  const s = actionState;
  if (!s) return;
  const perfect = s.correct === s.total;
  const passed = s.correct >= Math.ceil(s.total * 0.6);
  if (passed) { markSetCompleted('words:verbs'); playStar(); }
  recordPerfect('words', 'verbs', perfect);
  if (passed) markWordsMastered('words', 'verbs');

  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent = `Правильных: ${s.correct} из ${s.total}`;
  document.getElementById('victory-star').style.display = passed ? 'block' : 'none';

  showScreen('victory');
  setTimeout(() => speak(passed ? 'Well done!' : 'Try again!'), 500);
}

/* ============================================================
   ИГРА «ЧИСЛА: THERE IS / THERE ARE» (с голосом)
   ============================================================ */
function startNumGame(mode) {
  if (mode === 'there-is') {
    startThereIsGame();
  }
}

function startThereIsGame() {
  const queue = [];
  const usedNumbers = new Set();
  
  while (queue.length < 10) {
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
    total: 10,
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

  document.getElementById('num-hint').addEventListener('click', () => {
    const hintEl = document.getElementById('num-hint-text');
    if (hintEl.classList.contains('show')) {
      hintEl.classList.remove('show');
    } else {
      hintEl.textContent = `Правильно: ${correctPhrase}`;
      hintEl.classList.add('show');
    }
  });

  document.getElementById('mic-btn').addEventListener('click', () => {
    listenForWord(correctPhrase, 
      () => {
        playCorrect(); mascotReact('🎉'); s.correct++;
        speak('Perfect!');
        s.index++; setTimeout(renderThereIsQuestion, 1200);
      },
      (spoken) => {
        if (spoken === 'unsupported') {
          speak(correctPhrase);
          setTimeout(() => { s.index++; renderThereIsQuestion(); }, 1500);
          return;
        }
        playWrong(); speak('Try again.');
      },
      'mic-btn'
    );
  });
}

function finishNumGame() {
  const s = numState;
  if (!s) return;
  const passed = s.correct >= Math.ceil(s.total * 0.6);
  const perfect = s.correct === s.total;
  
  if (passed) { markSetCompleted('numbers:there-is'); playStar(); }
  recordPerfect('numbers', 'there-is', perfect);

  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent = `Правильных: ${s.correct} из ${s.total}`;
  document.getElementById('victory-star').style.display = passed ? 'block' : 'none';

  showScreen('victory');
  setTimeout(() => speak(passed ? 'Well done!' : 'Try again!'), 500);
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}