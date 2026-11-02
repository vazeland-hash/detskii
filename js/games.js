/* ============================================================
   GAMES: все игры
   ============================================================ */

/* ============ ОБЩАЯ ВИКТОРИНА ============ */

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
    wrongQueue: []
  };
  showScreen('game');
  renderGameQuestion();
}

/* --- ИГРА "СЛОВА" (5 УРОВНЕЙ) --- */
function startWordsLevels() {
  const allWords = [];
  const sets = ['animals', 'pronouns'];
  sets.forEach(setKey => {
    const cards = getCards('words', setKey);
    cards.forEach(c => allWords.push({ ...c, _setKey: setKey }));
  });
  
  gameState = {
    level: 1,
    index: 0,
    total: allWords.length,
    queue: [...allWords].sort(() => Math.random() - 0.5),
    _locked: false,
    _allWords: allWords
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
    const pool = s._allWords.filter(c => c.word.toLowerCase() !== card.word.toLowerCase());
    return pool.sort(() => Math.random() - 0.5).slice(0, n);
  };

  if (s.level === 1) {
    const dist = getDistractors(3);
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
      btn.innerHTML = `<div class="animal-img">${opt.emoji}</div>`;
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
        () => { playCorrect(); mascotReact('🎉'); speak('Perfect!'); recordCorrectAnswer('words', correctSetKey, card.word); s.index++; setTimeout(renderWordsLevel, 1000); },
        (spoken) => { playWrong(); speak("Try again."); }
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
    recordCorrectAnswer('words', setKey || 'animals', correct.word);
  } else {
    allBtns[idx].classList.add('wrong'); playWrong();
  }
  setTimeout(() => { s._locked = false; s.index++; renderWordsLevel(); }, 1200);
}

function key(card) { return card.word.toLowerCase(); }

function pickDistractors(correctCard, n) {
  const pool = currentCards.filter(c => key(c) !== key(correctCard));
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
  if (card.digit) {
    return `<div class="opt-digit anim-pop">${card.digit}</div>`;
  }
  if (card.emoji) return `<div class="opt-emoji anim-bounce">${card.emoji}</div>`;
  if (card.color) {
    const isLight = ['#FDD835', '#FAFAFA'].includes(card.color);
    return `<div class="anim-pulse" style="width:78px;height:78px;border-radius:50%;background:${card.color};border:4px solid ${isLight?'#333':'#FFF'};box-shadow:0 4px 12px rgba(0,0,0,0.2);"></div>`;
  }
  if (card.shape) {
    return `<div class="opt-svg anim-pulse">${shapeSVG(card.shape)}</div>`;
  }
  if (card.svg)  return `<div style="width:100%;height:100px;">${card.svg()}</div>`;
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
  const perfect = gameState && gameState.correct === gameState.total && gameState.wrongQueue.length === 0;
  const passed = gameState && gameState.correct >= Math.ceil(gameState.total * 0.6);
  const keyFull = currentSection + ':' + currentSetKey;
  if (passed) { markSetCompleted(keyFull); playStar(); }
  const unlockedBefore = getUnlockedCount(currentSection, currentSetKey);
  recordPerfect(currentSection, currentSetKey, perfect);
  const unlockedAfter = getUnlockedCount(currentSection, currentSetKey);
  const gotNewWord = perfect && unlockedAfter > unlockedBefore;

  let sub = passed
    ? `Ты выучил(а) набор! Правильных: ${gameState.correct} из ${gameState.total}`
    : `Правильных: ${gameState.correct} из ${gameState.total}`;
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
    voiceMode: false
  };
  showScreen('prep-game');
  renderPrepGameQuestion();
}

function renderPrepGameQuestion() {
  const s = prepGameState;
  if (!s) return;
  
  if (s.index >= s.queue.length && !s.voiceMode) {
    s.voiceMode = true;
    s.voiceIndex = 0;
    s.voiceQueue = shuffle([...VOICE_PHRASES]).slice(0, 10);
    renderPrepVoiceQuestion();
    return;
  }
  if (s.voiceMode && s.voiceIndex >= s.voiceQueue.length) { finishPrepGame(); return; }

  if (s.voiceMode) { renderPrepVoiceQuestion(); return; }

  const task = s.queue[s.index];
  s.current = task;
  s._locked = false;

  const typingMode = (s.index % 3 === 2);

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

  document.getElementById('prep-progress').textContent = `${s.index + 1} / ${s.queue.length}`;
  const optsEl = document.getElementById('prep-options');

  if (typingMode) {
    const fullText = (task.prep === 'above' || task.prep === 'below')
      ? `The thermometer is ___ .`
      : `The ${task.itemWord} is ___ the box.`;
    optsEl.style.gridTemplateColumns = '1fr';
    optsEl.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;">
        <div style="font-size:1.3rem;font-weight:bold;color:#2E7BAE;text-align:center;">${fullText}</div>
        <div style="display:flex;gap:10px;align-items:center;width:100%;max-width:320px;">
          <input type="text" id="prep-input" class="there-is-input" placeholder="впиши предлог" style="flex:1;">
          <button class="help-btn" id="prep-hint" title="Подсказка (буква)">?</button>
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
    input.focus();
    return;
  }

  optsEl.style.gridTemplateColumns = '';
  optsEl.innerHTML = '';
  const allPreps = [...PREP_GAME_DATA.preps].sort(() => Math.random() - 0.5);
  const wrongOptions = allPreps.filter(p => p.key !== task.prep).slice(0, 3);
  const correctOption = PREP_GAME_DATA.preps.find(p => p.key === task.prep);
  let opts = [...wrongOptions, correctOption].sort(() => Math.random() - 0.5);
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
    
  setTimeout(() => speak(finalSentence), 300);

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
      () => { playWrong(); speak('Try again.'); }
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
  if (passed) { markSetCompleted('words:prepositions'); playStar(); }
  recordPerfect('words', 'prepositions', passed);

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
      () => { playWrong(); speak('Try again.'); }
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
    wrongQueue: [],
    voiceMode: false
  };
  showScreen('action');
  renderActionQuestion();
}

function renderActionQuestion() {
  const s = actionState;
  if (!s) return;
  
  if (s.index >= s.queue.length && !s.voiceMode) {
    s.voiceMode = true;
    s.voiceIndex = 0;
    s.voiceQueue = shuffle([...VOICE_PHRASES]).slice(0, 10);
    renderActionVoiceQuestion();
    return;
  }
  if (s.voiceMode && s.voiceIndex >= s.voiceQueue.length) { finishActionGame(); return; }
  if (s.voiceMode) { renderActionVoiceQuestion(); return; }

  const task = s.queue[s.index];
  s.current = task;
  s._locked = false;

  const distractors = ACTION_DATA.tasks
    .filter(t => t.phrase !== task.phrase)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  const options = [task, ...distractors].sort(() => Math.random() - 0.5);

  if (actionCanvasRAF) { cancelAnimationFrame(actionCanvasRAF); actionCanvasRAF = null; }

  const useSvgScene = (task.action === 'eat' || task.action === 'read');
  const sceneHtml = useSvgScene
    ? (task.action === 'eat' ? catEatingScene() : catReadingScene())
    : `<canvas id="action-canvas" style="width:100%; height:100%; display:block;"></canvas>`;

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

  if (!useSvgScene) setTimeout(() => drawActionCanvas(task.action), 0);
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

function renderActionVoiceQuestion() {
  const s = actionState;
  if (!s) return;
  if (s.voiceIndex >= s.voiceQueue.length) { finishActionGame(); return; }
  const phrase = s.voiceQueue[s.voiceIndex];
  const container = document.getElementById('action-container');
  container.innerHTML = `
    <div class="game-progress">Голос: ${s.voiceIndex + 1} / ${s.voiceQueue.length}</div>
    <div style="text-align:center; padding:20px; background:#FFF; border-radius:20px; width:100%;">
      <div style="font-size:1.3rem; font-weight:bold; color:#2E7BAE; margin-bottom:15px;">Скажи: ${phrase}</div>
      <button class="mic-btn" id="action-mic-btn" style="margin: 0 auto;">🎤</button>
      <div style="margin-top:15px;"><button class="help-btn" id="action-voice-hint">?</button></div>
    </div>
  `;
  document.getElementById('action-voice-hint').addEventListener('click', () => speak(phrase));
  document.getElementById('action-mic-btn').addEventListener('click', () => {
    listenForWord(phrase,
      () => { playCorrect(); mascotReact('🎉'); speak('Great!'); setTimeout(() => { s.voiceIndex++; renderActionVoiceQuestion(); }, 1000); },
      () => { playWrong(); speak('Try again.'); }
    );
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
  if (actionCanvasRAF) { cancelAnimationFrame(actionCanvasRAF); actionCanvasRAF = null; }
  const passed = actionState && actionState.correct >= Math.ceil(actionState.total * 0.6);
  if (passed) { markSetCompleted('words:verbs'); playStar(); }
  recordPerfect('words', 'verbs', passed);

  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent = `Правильных: ${actionState.correct} из ${actionState.total}`;
  document.getElementById('victory-star').style.display = passed ? 'block' : 'none';

  showScreen('victory');
  setTimeout(() => speak(passed ? 'Well done!' : 'Try again!'), 500);
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
    container.innerHTML = `
      <div class="game-progress">Уровень 3: Напиши · ${s.index + 1}/${s.queue.length}</div>
      <div class="num-visual"><div class="nv-big">${task.n}</div></div>
      <div class="there-is-container">
        <div style="font-size:1.2rem;font-weight:bold;">Напиши число цифрой или словом</div>
        <input type="text" id="num-write-input" class="there-is-input" placeholder="например: ${task.n} или ${NUMBER_WORDS[task.n-1]}">
        <button class="there-is-btn" id="num-write-check">Проверить</button>
        <button class="help-btn" id="num-write-hint">?</button>
      </div>`;
    document.getElementById('num-write-hint').addEventListener('click', () => {
      document.getElementById('num-write-input').value = NUMBER_WORDS[task.n - 1];
    });
    document.getElementById('num-write-check').addEventListener('click', () => {
      const val = document.getElementById('num-write-input').value.toLowerCase().trim();
      const ok = val === String(task.n) || val === NUMBER_WORDS[task.n - 1];
      if (ok) {
        playCorrect(); mascotReact('🎉'); s.correct++; speak('Great!');
        recordCorrectAnswer('numbers', 'numbers', NUMBER_WORDS[task.n - 1]);
        s.index++; setTimeout(renderNumLevel, 1000);
      } else { playWrong(); speak(`No. ${NUMBER_WORDS[task.n - 1]}.`); }
    });
  } else if (s.level === 4) {
    const items = ['apples', 'bananas', 'cats', 'balls', 'stars'];
    const emojis = ['🍎', '🍌', '🐱', '⚽', '⭐'];
    const idx = Math.floor(Math.random() * items.length);
    const visual = Array.from({length: task.n}).map(() => `<span style="font-size:3rem;">${emojis[idx]}</span>`).join('');
    container.innerHTML = `
      <div class="game-progress">Уровень 4: Скажи · ${s.index + 1}/${s.queue.length}</div>
      <div class="num-visual">${visual}</div>
      <div style="font-size:1.2rem;font-weight:bold;text-align:center;">Скажи полностью: "There are ..."</div>
      <button class="mic-btn" id="mic-btn">🎤</button>
      <div style="text-align:center; margin-top:10px;"><button class="help-btn" id="num-mic-hint">?</button></div>
    `;
    document.getElementById('num-mic-hint').addEventListener('click', () => speak(`There are ${NUMBER_WORDS[task.n - 1]}`));
    const micBtn = document.getElementById('mic-btn');
    let recording = false;
    const startRec = () => {
      if (recording) return;
      recording = true;
      micBtn.classList.add('holding');
      listenForWord(NUMBER_WORDS[task.n - 1],
        () => { playCorrect(); mascotReact('🎉'); s.correct++; speak('Perfect!'); recordCorrectAnswer('numbers', 'numbers', NUMBER_WORDS[task.n - 1]); s.index++; setTimeout(renderNumLevel, 1200); },
        () => { playWrong(); speak('Try again.'); }
      );
    };
    const stopRec = () => { recording = false; micBtn.classList.remove('holding'); };
    micBtn.addEventListener('mousedown', startRec);
    micBtn.addEventListener('touchstart', startRec, { passive: true });
    micBtn.addEventListener('mouseup', stopRec);
    micBtn.addEventListener('mouseleave', stopRec);
    micBtn.addEventListener('touchend', stopRec);
  } else if (s.level === 5) {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    const correct = a > b ? '>' : a < b ? '<' : '=';
    container.innerHTML = `
      <div class="game-progress">Уровень 5: Сравни · ${s.index + 1}/${s.queue.length}</div>
      <div class="num-visual" style="gap:20px;">
        <div class="nv-big">${a}</div>
        <div class="nv-big">${b}</div>
      </div>
      <div class="num-options" style="grid-template-columns: repeat(3, 1fr);">
        <button class="num-opt" data-v=">">></button>
        <button class="num-opt" data-v="<"><</button>
        <button class="num-opt" data-v="=">=</button>
      </div>
      <div style="text-align:center; margin-top:10px;"><button class="help-btn" id="num-hint">?</button></div>
    `;
    document.getElementById('num-hint').addEventListener('click', () => speak(`The correct sign is ${correct}`));
    container.querySelectorAll('.num-opt').forEach(btn => {
      btn.addEventListener('click', () => handleNumLevelAnswer(btn.dataset.v, correct, btn));
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
  if (passed) { markSetCompleted('numbers:levels'); playStar(); }
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
    if (s.level < s.maxLevel) { showLevelComplete(); } else { finishSizeGame(); }
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
  if (passed) { markSetCompleted('numbers:size'); playStar(); }
  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent = `Все уровни пройдены! Правильных: ${s.overallCorrect} из ${s.overallTotal}`;
  document.getElementById('victory-star').style.display = passed ? 'block' : 'none';
  showScreen('victory');
  setTimeout(() => speak(passed ? 'Well done!' : 'Try again!'), 500);
}

/* ============================================================
   Canvas-анимации и остальное
   ============================================================ */
let actionCanvasRAF = null;

function drawActionCanvas(action) {
  const canvas = document.getElementById('action-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 300;
  canvas.height = 300;
  
  ctx.fillStyle = '#A8E6A3';
  ctx.fillRect(0, 150, 300, 150);
  
  ctx.font = '80px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(action === 'run' ? '🏃' : action === 'jump' ? '🤸' : action === 'swim' ? '🏊' : '🏃', 150, 180);
}