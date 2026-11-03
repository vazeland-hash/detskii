/* ============================================================
   GAMES: все игры
   ============================================================ */


/* ============ ОБЩАЯ ВИКТОРИНА ============ */
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
  const uniqueCards = [...currentCards];
  const queue = uniqueCards.sort(() => Math.random() - 0.5);
  gameState = {
    queue: queue,
    index: 0,
    correct: 0,
    total: queue.length,
    currentOptions: null,
    wrongQueue: [],
    _allWords: queue
  };
  showScreen('game');
  renderGameQuestion();
}

/* --- ИГРА "СЛОВА" (5 УРОВНЕЙ) --- */
function startWordsLevels() {
  const allWords = [];
  ['animals', 'pronouns'].forEach(setKey => {
    const setData = DATA.words.sets[setKey];
    const cards = [...setData.cards, ...(setData.bonus || [])];
    cards.forEach(c => {
      // Исключаем местоимения из общих тестов
      if (setKey !== 'pronouns') {
        allWords.push({ ...c, _setKey: setKey });
      }
    });
  });
  const sessionWords = [...allWords].sort(() => Math.random() - 0.5).slice(0, 10);
gameState = {
  level: 1, index: 0, total: sessionWords.length,
  queue: [...sessionWords], _locked: false, _allWords: sessionWords,
  correct: 0,          // ← добавили
  wrongQueue: []       // ← добавили
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
    // Определяем, к какой категории относится текущее слово
    if (['mother', 'father', 'sister', 'brother', 'grandmother', 'grandfather', 'baby', 'family', 'uncle', 'aunt', 'parents'].includes(card.word)) category = 'people';
    else if (['apple', 'banana', 'milk', 'bread', 'cheese', 'carrot', 'chicken', 'ice cream', 'pizza', 'chocolate', 'juice'].includes(card.word)) category = 'food';
    else if (['I', 'you', 'he', 'she', 'it', 'we', 'they'].includes(card.word)) category = 'pronoun';

    const isWordInCategory = (w) => {
      if (category === 'people') return ['mother', 'father', 'sister', 'brother', 'grandmother', 'grandfather', 'baby', 'family', 'uncle', 'aunt', 'parents'].includes(w);
      if (category === 'food') return ['apple', 'banana', 'milk', 'bread', 'cheese', 'carrot', 'chicken', 'ice cream', 'pizza', 'chocolate', 'juice'].includes(w);
      if (category === 'pronoun') {
        // ⛔️ Исключаем попадание "we" и "they" в один вопрос
        if ((card.word === 'we' && w === 'they') || (card.word === 'they' && w === 'we')) return false;
        return ['I', 'you', 'he', 'she', 'it', 'we', 'they'].includes(w);
      }
      // Если это животные (или что-то еще) — исключаем людей, еду и местоимения
      return !['mother', 'father', 'sister', 'brother', 'grandmother', 'grandfather', 'baby', 'family', 'uncle', 'aunt', 'parents', 'apple', 'banana', 'milk', 'bread', 'cheese', 'carrot', 'chicken', 'ice cream', 'pizza', 'chocolate', 'juice', 'I', 'you', 'he', 'she', 'it', 'we', 'they'].includes(w);
    };

    // Собираем слова из той же категории, исключая само правильное слово
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
    
    // Убираем дубликаты (например, если у двух слов одинаковая картинка или эмодзи)
    const uniquePool = [];
    const seen = new Set();
    pool.forEach(c => {
      const ident = c.img || c.emoji || c.word;
      if (!seen.has(ident)) {
        seen.add(ident);
        uniquePool.push(c);
      }
    });
    
    // Перемешиваем и отдаем нужное количество
    return uniquePool.sort(() => Math.random() - 0.5).slice(0, n);
  };

  if (s.level === 1) {
       const dist = getDistractors(2); // 2 неправильных + 1 правильный = 3 варианта
    const opts = [card, ...dist].sort(() => Math.random() - 0.5);
    s.currentOptions = opts;
    container.innerHTML = `
      <div class="game-progress">Уровень 1: Выбери картинку · ${s.index + 1}/${s.queue.length}</div>
      <div class="game-prompt">Найди: <span class="word">${card.word}</span></div>
      <button class="game-speak-btn" id="lvl-speak">🔊</button>
      <div class="game-options" id="game-options"></div>
      <div style="text-align:center; margin-top:10px;"><button class="help-btn" id="lvl-hint">?</button></div>
    `;
    document.getElementById('lvl-speak').addEventListener('click', () => speak(card.word));
    document.getElementById('lvl-hint').addEventListener('click', () => { speak(card.word); });
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
    const dist = getDistractors(2); // 2 неправильных + 1 правильный = 3 варианта
    const opts = [card, ...dist].sort(() => Math.random() - 0.5);
    s.currentOptions = opts;
    container.innerHTML = `
      <div class="game-progress">Уровень 2: Прочитай · ${s.index + 1}/${s.queue.length}</div>
      <div class="game-prompt">Выбери слово: <span class="word">${card.ru}</span></div>
      <div class="game-options" id="game-options" style="grid-template-columns: 1fr;"></div>
      <div style="text-align:center; margin-top:10px;"><button class="help-btn" id="lvl-hint">?</button></div>
    `;
    document.getElementById('lvl-hint').addEventListener('click', () => { speak(card.word); });
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
      <div class="game-options" id="game-options"></div>
    `;
    document.getElementById('lvl-speak').addEventListener('click', () => speak(card.word));
    document.getElementById('lvl-hint').addEventListener('click', () => alert("Подсказка: " + card.word));
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
      </div>
    `;
    document.getElementById('there-hint').addEventListener('click', () => {
      document.getElementById('there-is-input').value = 'there is a ';
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
      <div style="text-align:center; margin-top:10px;"><button class="help-btn" id="lvl-hint">?</button></div>
    `;
    document.getElementById('lvl-hint').addEventListener('click', () => speak(card.word));
    document.getElementById('mic-btn').addEventListener('click', () => {
      listenForWord(card.word,
        // ✅ Успех
        () => {
          playCorrect(); mascotReact('🎉'); speak('Perfect!');
          recordCorrectAnswer('words', correctSetKey, card.word);
          s.index++;
          setTimeout(renderWordsLevel, 1000);
        },
        // ❌ Провал — теперь различаем два случая
        (spoken) => {
          if (spoken === 'unsupported') {
            // Браузер не умеет слушать: показываем слово и идём дальше
            speak(card.word);
            setTimeout(() => {
              s.index++;
              renderWordsLevel();
            }, 1500);
            return;
          }
          // Ребёнок реально сказал неправильно
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
  s.correct++;                                        // ← добавили
  recordCorrectAnswer('words', setKey || 'animals', correct.word);
} else {
  allBtns[idx].classList.add('wrong'); playWrong();
  s.wrongQueue.push(correct);                         // ← добавили (для проверки "идеально")
}
  setTimeout(() => { s._locked = false; s.index++; renderWordsLevel(); }, 1200);
}

function key(card) { return card.word.toLowerCase(); }

function pickDistractors(correctCard, n) {
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
  const distractors = pickDistractors(card, 3);
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
    <div style="text-align:center; margin-top:10px;"><button class="help-btn" id="game-hint">?</button></div>
  `;

  setTimeout(() => speak(card.word), 300);
  document.getElementById('game-speak').addEventListener('click', () => speak(card.word));
  document.getElementById('game-hint').addEventListener('click', () => speak(card.word));

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
    stage: 'choice' // 'choice' | 'typing' | 'voice'
  };
  showScreen('prep-game');
  renderPrepGameQuestion();
}
function renderPrepGameQuestion() {
  const s = prepGameState;
  if (!s) return;

  // --- Переход между этапами ---
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

  // --- Отрисовка сцены и подсказки (одинакова для всех этапов) ---
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

  // --- Счётчик прогресса ---
  const stageText = s.stage === 'choice' ? 'Выбор' : s.stage === 'typing' ? 'Ввод' : 'Голос';
  document.getElementById('prep-progress').textContent = `${stageText} · ${s.index + 1} / ${s.queue.length}`;

  const optsEl = document.getElementById('prep-options');
  optsEl.innerHTML = '';

  // ==================== ЭТАП 3: ГОЛОС ====================
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
        <div style="margin-top:15px;"><button class="help-btn" id="prep-voice-hint" title="Подсказка">?</button></div>
      </div>
    `;
    document.getElementById('prep-voice-hint').addEventListener('click', () => speak(fullSentence));
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

  // ==================== ЭТАП 2: ВВОД ТЕКСТА ====================
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
        <button class="there-is-btn" id="prep-check">Проверить</button>
      </div>`;
    let hintPos = 0;
    const input = document.getElementById('prep-input');
    document.getElementById('prep-hint').addEventListener('click', () => {
      if (hintPos < task.prep.length) {
        input.value = task.prep.slice(0, ++hintPos);
        playTap();
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

  // ==================== ЭТАП 1: ВЫБОР ====================
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

  const sentence = `The ${task.itemWord} is ${task.prep} the box.`;
  const finalSentence = (task.prep === 'above' || task.prep === 'below') 
    ? `The thermometer is ${task.prep}.` : sentence;
    
  clearTimeout(s._advanceTimer);
  s._advanceTimer = setTimeout(() => {
    if (prepGameState !== s) return;
    s._locked = false;
    s.index++;
    renderPrepGameQuestion();
  }, 2200);
}

function renderPrepVoiceQuestion() {
  const s = prepGameState;
  if (!s) return;
  if (s.voiceIndex >= s.voiceQueue.length) { finishPrepGame(); return; }
  const phrase = s.voiceQueue[s.voiceIndex];
  const container = document.getElementById('prep-options');
  container.style.gridTemplateColumns = '1fr';
  container.innerHTML = `
    <div style="text-align:center; padding:20px;">
      <div style="font-size:1.3rem; font-weight:bold; color:#2E7BAE; margin-bottom:15px;">Скажи: ${phrase}</div>
      <button class="mic-btn" id="prep-mic-btn" style="margin: 0 auto;">🎤</button>
      <div style="margin-top:15px;"><button class="help-btn" id="prep-voice-hint">?</button></div>
    </div>
  `;
  document.getElementById('prep-voice-hint').addEventListener('click', () => speak(phrase));
  document.getElementById('prep-mic-btn').addEventListener('click', () => {
    listenForWord(phrase,
      () => { playCorrect(); mascotReact('🎉'); speak('Great!'); setTimeout(() => { s.voiceIndex++; renderPrepVoiceQuestion(); }, 1000); },
      () => { playWrong(); speak('Try again.'); },
      'prep-mic-btn'
    );
  });
  document.getElementById('prep-progress').textContent = `Голос: ${s.voiceIndex + 1} / ${s.voiceQueue.length}`;
  document.getElementById('prep-prompt').textContent = 'Этап 2: Говорим!';
  document.getElementById('prep-scene').innerHTML = '<div style="font-size:5rem; text-align:center;">🎤</div>';
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
   ИГРА «ФОРМЫ + ЦВЕТА» (с голосом)
   ============================================================ */
function startShapeColorGame() {
  scState = { queue: [], index: 0, correct: 0, total: 10, current: null, _locked: false, voiceMode: false };
  for (let i = 0; i < 10; i++) {
    const shape = SHAPE_COLOR_DATA.shapes[Math.floor(Math.random() * SHAPE_COLOR_DATA.shapes.length)];
    const color = SHAPE_COLOR_DATA.colors[Math.floor(Math.random() * SHAPE_COLOR_DATA.colors.length)];
    scState.queue.push({ shape, color, mode: i % 2 === 0 ? 'shape' : 'color' });
  }
  showScreen('shape-color');
  renderSCQuestion();
}

function renderSCQuestion() {
  const s = scState;
  if (!s) return;
  
  if (s.index >= s.total && !s.voiceMode) {
    s.voiceMode = true;
    s.voiceIndex = 0;
    s.voiceQueue = shuffle(['red', 'blue', 'green', 'circle', 'square', 'star', 'yellow', 'triangle', 'heart', 'orange']).slice(0, 10);
    renderSCVoiceQuestion();
    return;
  }
  if (s.voiceMode && s.voiceIndex >= s.voiceQueue.length) { finishSCGame(); return; }
  if (s.voiceMode) { renderSCVoiceQuestion(); return; }

  const task = s.queue[s.index];
  s.current = task;
  s._locked = false;
  const { shape, color, mode } = task;
  const colorHex = SHAPE_COLOR_DATA.colorHex[color];
  const shapeRu = SHAPE_COLOR_DATA.shapeRu[shape];
  const colorRu = SHAPE_COLOR_DATA.colorRu[color];

  let prompt, targetHtml, options;
  if (mode === 'shape') {
    prompt = `Что это за фигура? (цвет: <span class="hl">${colorRu}</span>)`;
    targetHtml = shapeSVG(shape, colorHex);
    const distractors = SHAPE_COLOR_DATA.shapes.filter(sh => sh !== shape).sort(() => Math.random() - 0.5).slice(0, 3);
    options = [shape, ...distractors].sort(() => Math.random() - 0.5);
  } else {
    prompt = `Какого цвета эта фигура? (фигура: <span class="hl">${shapeRu}</span>)`;
    targetHtml = shapeSVG(shape, colorHex);
    const distractors = SHAPE_COLOR_DATA.colors.filter(c => c !== color).sort(() => Math.random() - 0.5).slice(0, 3);
    options = [color, ...distractors].sort(() => Math.random() - 0.5);
  }

  const container = document.getElementById('sc-container');
  container.innerHTML = `
    <div class="game-progress">${s.index + 1} / ${s.total}</div>
    <div class="sc-prompt">${prompt}</div>
    <div class="sc-target">${targetHtml}</div>
    <div class="sc-options" id="sc-options"></div>
    <div style="text-align:center; margin-top:10px;"><button class="help-btn" id="sc-hint">?</button></div>
  `;

  const speakText = mode === 'shape'
    ? `What shape is it? It's a ${shape}.`
    : `What color is it? It's ${color}.`;
  setTimeout(() => speak(speakText), 300);
  document.getElementById('sc-hint').addEventListener('click', () => speak(speakText));

  const optsEl = document.getElementById('sc-options');
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'sc-opt';
    if (mode === 'shape') {
      btn.innerHTML = `<div class="sc-label">${SHAPE_COLOR_DATA.shapeRu[opt]}<br><small>${opt}</small></div>`;
    } else {
      btn.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
        <div style="width:50px;height:50px;border-radius:50%;background:${SHAPE_COLOR_DATA.colorHex[opt]};border:3px solid #333;"></div>
        <div class="sc-label">${SHAPE_COLOR_DATA.colorRu[opt]}<br><small>${opt}</small></div>
      </div>`;
    }
    btn.addEventListener('click', () => handleSCAnswer(opt, task, btn));
    optsEl.appendChild(btn);
  });
}

function renderSCVoiceQuestion() {
  const s = scState;
  if (!s) return;
  if (s.voiceIndex >= s.voiceQueue.length) { finishSCGame(); return; }
  const word = s.voiceQueue[s.voiceIndex];
  const container = document.getElementById('sc-container');
  container.innerHTML = `
    <div class="game-progress">Голос: ${s.voiceIndex + 1} / ${s.voiceQueue.length}</div>
    <div style="text-align:center; padding:20px;">
      <div style="font-size:3rem; font-weight:bold; color:#2E7BAE; margin-bottom:15px;">${word}</div>
      <button class="mic-btn" id="sc-mic-btn" style="margin: 0 auto;">🎤</button>
      <div style="margin-top:15px;"><button class="help-btn" id="sc-voice-hint">?</button></div>
    </div>
  `;
  document.getElementById('sc-voice-hint').addEventListener('click', () => speak(word));
  document.getElementById('sc-mic-btn').addEventListener('click', () => {
    listenForWord(word,
      () => { playCorrect(); mascotReact('🎉'); speak('Great!'); setTimeout(() => { s.voiceIndex++; renderSCVoiceQuestion(); }, 1000); },
      () => { playWrong(); speak('Try again.'); },
      'sc-mic-btn'
    );
  });
}

function handleSCAnswer(chosen, task, btn) {
  const s = scState;
  if (!s || s._locked) return;
  s._locked = true;

  const allBtns = Array.from(document.querySelectorAll('#sc-options .sc-opt'));
  allBtns.forEach(b => b.disabled = true);

  const isCorrect = chosen === (task.mode === 'shape' ? task.shape : task.color);
  const correctAnswer = task.mode === 'shape' ? task.shape : task.color;

  allBtns.forEach(b => {
    const label = b.querySelector('.sc-label small');
    if (label && label.textContent === correctAnswer) b.classList.add('correct');
  });

  if (isCorrect) {
    playCorrect(); mascotReact('🎉'); s.correct++;
    speak(`Yes! ${correctAnswer}.`);
    recordCorrectAnswer('colors', 'shapes-colors', correctAnswer);
  } else {
    btn.classList.add('wrong'); playWrong();
    speak(`No. It's ${correctAnswer}.`);
    s.queue.push(task);
  }

  setTimeout(() => {
    if (scState !== s) return;
    s._locked = false;
    s.index++;
    renderSCQuestion();
  }, isCorrect ? 1200 : 1600);
}

function finishSCGame() {
  const perfect = scState && scState.correct === scState.total;
  const passed = scState && scState.correct >= Math.ceil(scState.total * 0.6);
  if (passed) { markSetCompleted('shapes-colors:game'); playStar(); }
  recordPerfect('colors', 'shapes-colors', perfect);

  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent =
    `Правильных: ${scState.correct} из ${scState.total}` + (perfect ? ' — идеально!' : '');
  document.getElementById('victory-star').style.display = passed ? 'block' : 'none';

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
    <div style="text-align:center; margin-top:10px;"><button class="help-btn" id="action-hint">?</button></div>
  `;

  document.getElementById('action-hint').addEventListener('click', () => speak(task.phrase));

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

/* ============================================================
   ИГРЫ С ЧИСЛАМИ (с голосом)
   ============================================================ */
function startNumGame(mode) {
  if (mode === 'size') { startSizeGame(); return; }
  if (mode === 'next' || mode === 'text' || mode === 'mic') {
    startNumLevels();
    return;
  }
}

function startNumLevels() {
  numState = {
    mode: 'levels',
    level: 1,
    maxLevel: 5,
    index: 0,
    correct: 0,
    total: 0,
    overallCorrect: 0,
    overallTotal: 0,
    queue: [],
    _locked: false
  };
  buildNumLevel(1);
  showScreen('num-game');
  renderNumLevel();
}

function buildNumLevel(level) {
  const s = numState;
  s.level = level;
  s.index = 0;
  s.correct = 0;
  s.queue = [];
  const total = 5;
  for (let i = 0; i < total; i++) {
    s.queue.push({ n: Math.floor(Math.random() * 9) + 1 });
  }
  s.total = total;
  s._locked = false;
}

function renderNumLevel() {
  const s = numState;
  if (!s || s.mode !== 'levels') return;
  if (s.index >= s.queue.length) {
    s.overallCorrect += s.correct;
    s.overallTotal += s.total;
    if (s.level < s.maxLevel) {
      s.level++;
      buildNumLevel(s.level);
      setTimeout(renderNumLevel, 600);
    } else {
      finishNumLevels();
    }
    return;
  }

  const task = s.queue[s.index];
  const container = document.getElementById('num-container');
  s._locked = false;

  if (s.level === 1) {
    const correct = task.n + 1;
    const pool = [];
    for (let i = 1; i <= 10; i++) if (i !== correct) pool.push(i);
    const nums = [correct, ...shuffle(pool).slice(0, 3)].sort(() => Math.random() - 0.5);
    container.innerHTML = `
      <div class="game-progress">Уровень 1: Следующее · ${s.index + 1}/${s.queue.length}</div>
      <div class="num-prompt">Какое число идёт дальше?</div>
      <div class="num-visual"><div class="nv-big">${task.n}</div><div class="nv-arrow">→ ?</div></div>
      <div class="num-options" id="num-options"></div>
      <div style="text-align:center; margin-top:10px;"><button class="help-btn" id="num-hint">?</button></div>
    `;
    document.getElementById('num-hint').addEventListener('click', () => speak(NUMBER_WORDS[correct - 1]));
    const optsEl = document.getElementById('num-options');
    nums.forEach(n => {
      const btn = document.createElement('button');
      btn.className = 'num-opt';
      btn.textContent = NUMBER_WORDS[n - 1];
      btn.dataset.value = n;
      btn.addEventListener('click', () => handleNumLevelAnswer(Number(n), Number(correct), btn));
      optsEl.appendChild(btn);
    });
  } else if (s.level === 2) {
    const dist = [task.n - 1, task.n + 1, task.n + 2].filter(x => x > 0 && x <= 20);
    const opts = shuffle([task.n, ...dist.slice(0, 3)]);
    container.innerHTML = `
      <div class="game-progress">Уровень 2: Найди число · ${s.index + 1}/${s.queue.length}</div>
      <div class="num-prompt">Найди: <span class="hl">${NUMBER_WORDS[task.n - 1]}</span></div>
      <div class="num-options" id="num-options"></div>
      <div style="text-align:center; margin-top:10px;"><button class="help-btn" id="num-hint">?</button></div>
    `;
    document.getElementById('num-hint').addEventListener('click', () => speak(NUMBER_WORDS[task.n - 1]));
    const optsEl = document.getElementById('num-options');
    opts.forEach(n => {
      const btn = document.createElement('button');
      btn.className = 'num-opt';
      btn.textContent = n;
      btn.dataset.value = n;
      btn.addEventListener('click', () => handleNumLevelAnswer(Number(n), Number(task.n), btn));
      optsEl.appendChild(btn);
    });
  } else if (s.level === 3) {
    // УРОВЕНЬ 3: Напиши
    container.innerHTML = `
      <div class="game-progress">Уровень 3: Напиши · ${s.index + 1}/${s.queue.length}</div>
      <div class="num-visual"><div class="nv-big">${task.n}</div></div>
      <div class="there-is-container">
        <div style="font-size:1.2rem;font-weight:bold;">Напиши число цифрой или словом</div>
        <input type="text" id="num-write-input" class="there-is-input" placeholder="например: ${task.n} или ${NUMBER_WORDS[task.n-1]}">
        <button class="there-is-btn" id="num-write-check">Проверить</button>
      </div>`;
    document.getElementById('num-write-check').addEventListener('click', () => {
      const val = document.getElementById('num-write-input').value.toLowerCase().trim();
      const ok = val === String(task.n) || val === NUMBER_WORDS[task.n - 1];
      if (ok) {
        playCorrect(); s.correct++; speak('Great!');
        s.index++; setTimeout(renderNumLevel, 1000);
      } else { playWrong(); speak(`No. ${NUMBER_WORDS[task.n - 1]}.`); }
    });
  } else if (s.level === 4) {
    // УРОВЕНЬ 4: Скажи (There are...)
    const emojis = ['🍎', '🍌', '🐱', '⚽', '⭐'];
    const idx = Math.floor(Math.random() * emojis.length);
    const visual = Array.from({length: task.n}).map(() => `<span style="font-size:3rem;">${emojis[idx]}</span>`).join('');
    container.innerHTML = `
      <div class="game-progress">Уровень 4: Скажи · ${s.index + 1}/${s.queue.length}</div>
      <div class="num-visual">${visual}</div>
      <div style="font-size:1.2rem;font-weight:bold;text-align:center;">Скажи полностью: "There are ..."</div>
      <button class="mic-btn" id="mic-btn">🎤</button>
    `;
    document.getElementById('mic-btn').addEventListener('click', () => {
      listenForWord(`There are ${NUMBER_WORDS[task.n - 1]}`,
        () => { playCorrect(); s.correct++; speak('Perfect!'); s.index++; setTimeout(renderNumLevel, 1200); },
        (spoken) => {
          if (spoken === 'unsupported') {
            // Микрофона нет — пропускаем без штрафа
            speak(`There are ${NUMBER_WORDS[task.n - 1]}`);
            setTimeout(() => { s.index++; renderNumLevel(); }, 1500);
            return;
          }
          playWrong(); speak('Try again.');
        },
        'mic-btn'
      );
    });
  }
}
function handleNumLevelAnswer(chosen, correct, btn) {
  const s = numState;
  if (!s || s._locked) return;
  s._locked = true;
  const all = Array.from(document.querySelectorAll('#num-container .num-opt'));
  all.forEach(b => b.disabled = true);
  all.forEach(b => { if (String(b.dataset.value || b.dataset.v) === String(correct)) b.classList.add('correct'); });
  const ok = String(chosen) === String(correct);
  if (ok) { playCorrect(); mascotReact('🎉'); s.correct++; } else { if (btn) btn.classList.add('wrong'); playWrong(); }
  setTimeout(() => { s._locked = false; s.index++; renderNumLevel(); }, ok ? 1200 : 1600);
}

function finishNumLevels() {
  const s = numState;
  const passed = s.overallCorrect >= Math.ceil(s.overallTotal * 0.6);
  const perfect = s.overallCorrect === s.overallTotal;
  if (passed) { markSetCompleted('numbers:levels'); playStar(); }
  recordPerfect('numbers', 'levels', perfect);
  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent = `Все уровни пройдены! Правильных: ${s.overallCorrect} из ${s.overallTotal}`;
  document.getElementById('victory-star').style.display = passed ? 'block' : 'none';
  showScreen('victory');
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

/* ---------- РАЗМЕРЫ ---------- */
function startSizeGame() {
  numState = {
    mode: 'size', level: 1, maxLevel: 3, index: 0, correct: 0, total: 0,
    queue: [], _locked: false, showTheory: true, overallCorrect: 0, overallTotal: 0
  };
  buildSizeLevel(1);
  showScreen('num-game');
  renderSizeTheory();
}

function buildSizeLevel(level) {
  const s = numState;
  s.level = level; s.index = 0; s.correct = 0; s.queue = [];
  if (level === 1) {
    s.queue = shuffle([
      { answer: 'big', prompt: 'Кто большой? / big' },
      { answer: 'small', prompt: 'Кто маленький? / small' },
      { answer: 'medium', prompt: 'Кто средний? / medium' }
    ]);
  } else if (level === 2) {
    const base = [];
    for (let i = 0; i < 2; i++) {
      base.push({ answer: 'bigger', prompt: 'Кто больше? / bigger' });
      base.push({ answer: 'smaller', prompt: 'Кто меньше? / smaller' });
    }
    s.queue = shuffle(base);
  } else if (level === 3) {
    const base = [];
    for (let i = 0; i < 2; i++) {
      base.push({ answer: 'biggest', prompt: 'Кто самый большой? / biggest' });
      base.push({ answer: 'smallest', prompt: 'Кто самый маленький? / smallest' });
    }
    s.queue = shuffle(base);
  }
  s.total = s.queue.length;
  s._locked = false;
}

function renderSizeTheory() {
  const container = document.getElementById('num-container');
  container.innerHTML = `
    <div class="game-progress">Теория</div>
    <div class="theory-block">
      <h3>Размеры / Sizes</h3>
      <div class="theory-scene" style="gap:24px;">
        <div class="theory-item"><span class="t-emoji" style="font-size:40px;">🐘</span><span class="t-label">small<small>маленький</small></span></div>
        <div class="theory-item"><span class="t-emoji" style="font-size:65px;">🐘</span><span class="t-label">medium<small>средний</small></span></div>
        <div class="theory-item"><span class="t-emoji" style="font-size:95px;">🐘</span><span class="t-label">big<small>большой</small></span></div>
      </div>
      <div class="theory-note">
        <b>small</b> — маленький, <b>medium</b> — средний, <b>big</b> — большой.<br>
        <b>smaller</b> — меньше, <b>bigger</b> — больше.<br>
        <b>smallest</b> — самый маленький, <b>biggest</b> — самый большой.
      </div>
    </div>
    <button class="menu-btn" id="size-start" style="margin-top:12px; width:220px; padding:14px;"><span class="icon">▶️</span>Начать игру</button>
  `;
  document.getElementById('size-start').addEventListener('click', () => {
    playTap(); numState.showTheory = false; numState.index = 0; renderSizeQuestion();
  });
}

function renderSizeQuestion() {
  const s = numState;
  if (!s || s.mode !== 'size') return;
  if (s.index >= s.queue.length) {
    s.overallCorrect += s.correct; s.overallTotal += s.total;
    if (s.level < s.maxLevel) {
      s.level++;
      buildSizeLevel(s.level);
      setTimeout(renderSizeQuestion, 600);
    } else { finishSizeGame(); }
    return;
  }
  const q = s.queue[s.index];
  s._locked = false;
  let poolCount, sizes;
  if (s.level === 1) { poolCount = 3; sizes = q.answer === 'medium' ? [52, 82, 114] : [60, 110]; }
  else if (s.level === 2) { poolCount = 2; sizes = [60, 110]; }
  else { poolCount = 3; sizes = [52, 82, 114]; }

  const animal = SIZE_DATA.animals[Math.floor(Math.random() * SIZE_DATA.animals.length)];
  const sized = sizes.map((sz, i) => ({ emoji: animal.emoji, visualSize: sz, id: i }));
  let correctIndex;
  if (q.answer === 'big' || q.answer === 'bigger' || q.answer === 'biggest') correctIndex = sized.length - 1;
  else if (q.answer === 'small' || q.answer === 'smaller' || q.answer === 'smallest') correctIndex = 0;
  else if (q.answer === 'medium') correctIndex = 1;

  const visual = sized.map((a, i) => `<div class="size-animal" data-index="${i}" style="font-size:${a.visualSize}px;">${a.emoji}</div>`).join('');

  const container = document.getElementById('num-container');
  container.innerHTML = `
    <div class="game-progress">Уровень ${s.level}/3 · ${s.index + 1} / ${s.queue.length}</div>
    <div class="num-prompt">${q.prompt}</div>
    <div class="num-visual" style="min-height:200px;"><div class="size-scene" id="size-scene">${visual}</div></div>
    <div style="text-align:center; margin-top:10px;"><button class="help-btn" id="size-hint">?</button></div>
  `;
  document.getElementById('size-hint').addEventListener('click', () => speak(q.answer));
  document.querySelectorAll('#size-scene .size-animal').forEach((el, i) => {
    el.addEventListener('click', () => handleSizeAnswer(i, correctIndex, q));
  });
}

function handleSizeAnswer(chosenIndex, correctIndex, q) {
  const s = numState;
  if (!s || s._locked || s.mode !== 'size') return;
  s._locked = true;
  const animals = Array.from(document.querySelectorAll('#size-scene .size-animal'));
  const isCorrect = chosenIndex === correctIndex;
  animals.forEach((el, i) => {
    el.style.pointerEvents = 'none';
    if (i === correctIndex) el.classList.add('correct-size');
  });
  if (!isCorrect) animals[chosenIndex].classList.add('wrong-size');
  if (isCorrect) { playCorrect(); mascotReact('🎉'); s.correct++; } else { playWrong(); }
  setTimeout(() => { if (numState !== s) return; s._locked = false; s.index++; renderSizeQuestion(); }, isCorrect ? 1200 : 1600);
}

function finishSizeGame() {
  const s = numState;
  if (!s || s.mode !== 'size') return;
  const passed = s.overallCorrect >= Math.ceil(s.overallTotal * 0.6);
  const perfect = s.overallCorrect === s.overallTotal;
  if (passed) { markSetCompleted('numbers:size'); playStar(); }
  recordPerfect('numbers', 'size', perfect);
  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent = `Все уровни пройдены! Правильных: ${s.overallCorrect} из ${s.overallTotal}`;
  document.getElementById('victory-star').style.display = passed ? 'block' : 'none';
  showScreen('victory');
  setTimeout(() => speak(passed ? 'Well done!' : 'Try again!'), 500);
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

