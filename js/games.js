/* ============================================================
   GAMES: все игры
   Файл: js/games.js
   ============================================================ */

/* ============ ОБЩАЯ ВИКТОРИНА ============ */

/* ============ ОБЩАЯ ВИКТОРИНА ============ */

function startGame() {
  // Если это набор "animals", запускаем кастомную игру "Слова" из 5 уровней
  if (currentSetKey === 'animals') {
    startWordsLevels();
    return;
  }

  // Для остальных наборов оставляем старую викторину
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

/* --- НОВАЯ ИГРА "СЛОВА" (5 УРОВНЕЙ) --- */
function startWordsLevels() {
  gameState = {
    level: 1, // 1: выбор из картинок, 2: текст, 3: аудио + ?, 4: there is a, 5: микрофон
    index: 0,
    total: currentCards.length,
    queue: [...currentCards].sort(() => Math.random() - 0.5),
    _locked: false
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
      s.queue = [...currentCards].sort(() => Math.random() - 0.5);
      renderWordsLevel();
    } else {
      finishGame();
    }
    return;
  }

  const card = s.queue[s.index];
  const container = document.getElementById('game-container');
  s._locked = false;

  // УРОВЕНЬ 1: Выбор картинки (как было, но крупнее)
  if (s.level === 1) {
    const dist = pickDistractors(card, 3);
    const opts = [card, ...dist].sort(() => Math.random() - 0.5);
    s.currentOptions = opts;
    container.innerHTML = `
      <div class="game-progress">Уровень 1: Выбери картинку · ${s.index + 1}/${s.queue.length}</div>
      <div class="game-prompt">Найди: <span class="word">${card.word}</span></div>
      <button class="game-speak-btn" onclick="speak('${card.word}')">🔊</button>
      <div class="game-options" id="game-options"></div>
    `;
    const optsEl = document.getElementById('game-options');
    opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'game-opt';
      btn.innerHTML = `<div class="animal-img">${opt.emoji}</div>`;
      btn.addEventListener('click', () => handleWordsLvl1(i, card));
      optsEl.appendChild(btn);
    });
    setTimeout(() => speak(card.word), 300);
  }
  
  // УРОВЕНЬ 2: Крупный текст
  else if (s.level === 2) {
    const dist = pickDistractors(card, 3);
    const opts = [card, ...dist].sort(() => Math.random() - 0.5);
    s.currentOptions = opts;
    container.innerHTML = `
      <div class="game-progress">Уровень 2: Прочитай · ${s.index + 1}/${s.queue.length}</div>
      <div class="game-prompt">Выбери слово: <span class="word">${card.ru}</span></div>
      <div class="game-options" id="game-options" style="grid-template-columns: 1fr;"></div>
    `;
    const optsEl = document.getElementById('game-options');
    opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'game-opt';
      btn.innerHTML = `<div class="lvl-title-text">${opt.word}</div>`;
      btn.addEventListener('click', () => handleWordsLvl2(i, card));
      optsEl.appendChild(btn);
    });
  }
  
  // УРОВЕНЬ 3: Аудирование + кнопка "?"
  else if (s.level === 3) {
    const dist = pickDistractors(card, 3);
    const opts = [card, ...dist].sort(() => Math.random() - 0.5);
    s.currentOptions = opts;
    container.innerHTML = `
      <div class="game-progress">Уровень 3: Слушай · ${s.index + 1}/${s.queue.length}</div>
      <div style="display:flex; align-items:center; gap:10px;">
        <button class="game-speak-btn" onclick="speak('${card.word}')">🔊</button>
        <button class="help-btn" id="help-btn">?</button>
      </div>
      <div class="game-options" id="game-options"></div>
    `;
    const optsEl = document.getElementById('game-options');
    opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'game-opt';
      btn.innerHTML = `<div class="animal-img">${opt.emoji}</div>`;
      btn.addEventListener('click', () => handleWordsLvl1(i, card));
      optsEl.appendChild(btn);
    });
    document.getElementById('help-btn').addEventListener('click', () => {
      alert("Подсказка: " + card.word);
    });
    setTimeout(() => speak(card.word), 300);
  }

  // УРОВЕНЬ 4: There is a...
  else if (s.level === 4) {
    container.innerHTML = `
      <div class="game-progress">Уровень 4: Составь фразу · ${s.index + 1}/${s.queue.length}</div>
      <div style="font-size: 8rem; text-align:center;">${card.emoji}</div>
      <div class="there-is-container">
        <div style="font-size: 1.3rem; font-weight:bold;">Напиши: "Там есть..."</div>
        <input type="text" id="there-is-input" class="there-is-input" placeholder="there is a...">
        <button class="there-is-btn" id="there-is-check">Проверить</button>
      </div>
    `;
    document.getElementById('there-is-check').addEventListener('click', () => {
      const val = document.getElementById('there-is-input').value.toLowerCase().replace(/\s+/g, ' ').trim();
      if (val === 'there is a ' + card.word || val === 'there is an ' + card.word) {
        playCorrect(); mascotReact('🎉'); speak('Great job!');
        s.index++; setTimeout(renderWordsLevel, 1000);
      } else {
        playWrong(); speak('Try again. There is a ' + card.word);
      }
    });
  }

  // УРОВЕНЬ 5: Микрофон
  else if (s.level === 5) {
    container.innerHTML = `
      <div class="game-progress">Уровень 5: Скажи слово · ${s.index + 1}/${s.queue.length}</div>
      <div style="font-size: 8rem; text-align:center;">${card.emoji}</div>
      <div style="font-size: 1.5rem; font-weight:bold; margin-bottom:10px;">Скажи: ${card.word}</div>
      <button class="mic-btn" id="mic-btn">🎤</button>
    `;
    document.getElementById('mic-btn').addEventListener('click', () => {
      listenForWord(card.word, 
        () => { playCorrect(); mascotReact('🎉'); speak('Perfect!'); s.index++; setTimeout(renderWordsLevel, 1000); },
        (spoken) => { playWrong(); speak("Try again."); }
      );
    });
  }
}

function handleWordsLvl1(idx, correct) {
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
  } else {
    allBtns[idx].classList.add('wrong'); playWrong();
  }
  setTimeout(() => { s._locked = false; s.index++; renderWordsLevel(); }, 1200);
}

function handleWordsLvl2(idx, correct) {
  handleWordsLvl1(idx, correct);
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
  `;

  setTimeout(() => speak(card.word), 300);
  document.getElementById('game-speak').addEventListener('click', () => speak(card.word));

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
    playCorrect();
    mascotReact('🎉');
    s.correct++;
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
  if (gotNewWord) {
    sub += ' 🔓 Открыто новое слово!';
  }

  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent = sub;
  document.getElementById('victory-star').style.display = passed ? 'block' : 'none';

  showScreen('victory');
  setTimeout(() => speak(passed ? 'Well done!' : 'Try again!'), 500);
}

/* ============================================================
   Часть 2: игра «Покорми животное»
   ============================================================ */

function startFeedGame() {
  feedState = { selectedFruit: null, eatenCount: 0 };
  const basket = document.getElementById('feed-basket');
  basket.innerHTML = '';

  FEED_DATA.fruits.forEach(fruit => {
    const el = document.createElement('div');
    el.className = 'feed-item';
    el.textContent = fruit.emoji;
    el.dataset.word = fruit.word;
    el.addEventListener('click', () => selectFruit(el, fruit));
    basket.appendChild(el);
  });

  document.getElementById('feed-prompt').textContent = 'Выбери фрукт или овощ';
  document.getElementById('feed-repeat-btn').classList.remove('show');
  document.getElementById('feed-animal').textContent = '🐛';

  showScreen('feed');
}

function selectFruit(el, fruit) {
  playTap();
  document.querySelectorAll('.feed-item').forEach(i => i.classList.remove('selected'));
  el.classList.add('selected');

  feedState.selectedFruit = { el, fruit };
  document.getElementById('feed-prompt').textContent = `Это ${fruit.ru}. Скажи: ${fruit.word}!`;
  speak(fruit.word);

  const repeatBtn = document.getElementById('feed-repeat-btn');
  repeatBtn.classList.add('show');
  repeatBtn.onclick = () => { playTap(); speak(fruit.word); };
}

document.getElementById('feed-animal').addEventListener('click', () => {
  if (!feedState || !feedState.selectedFruit) {
    document.getElementById('feed-prompt').textContent = 'Сначала выбери фрукт!';
    playWrong();
    return;
  }

  const { el, fruit } = feedState.selectedFruit;
  const animal = document.getElementById('feed-animal');

  animal.classList.add('eating');
  playCorrect();
  mascotReact('😋');

  el.classList.add('eaten');

  speak('Yum! Thank you!');
  document.getElementById('feed-prompt').textContent = 'Ням-ням! Спасибо!';
  document.getElementById('feed-repeat-btn').classList.remove('show');

  setTimeout(() => {
    animal.classList.remove('eating');
    el.remove();
    feedState.selectedFruit = null;
    feedState.eatenCount++;

    if (document.querySelectorAll('.feed-item').length === 0) {
      setTimeout(() => {
        document.getElementById('victory-emoji').textContent = '🐛';
        document.getElementById('victory-title').textContent = 'Гусеница сыта!';
        document.getElementById('victory-sub').textContent = 'Ты покормил(а) гусеницу всеми фруктами и овощами!';
        document.getElementById('victory-star').style.display = 'block';
        markSetCompleted('feed:all');
        playStar();
        showScreen('victory');
      }, 1000);
    } else {
      document.getElementById('feed-prompt').textContent = 'Выбери следующий фрукт';
    }
  }, 800);
});

/* ============================================================
   Часть 3: игра с предлогами (общая)
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
    _locked: false
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

  // Специальные сцены для картины и термометра (они остаются как были)
  if (task.prep === 'above') {
    document.getElementById('prep-scene').innerHTML = pictureSceneDynamic('above');
    document.getElementById('prep-prompt').innerHTML = 
      `Где находится <span class="target-word">картина</span>?<br>Выбери предлог:`;
    task.itemWord = 'picture'; 
  } 
  else if (task.prep === 'below') {
    document.getElementById('prep-scene').innerHTML = `
      <div class="thermo-scene" style="width: 100%; height: 100%; background: none; border: none; box-shadow: none;">
        ${thermoSceneDynamic('below')}
      </div>
    `;
    document.getElementById('prep-prompt').innerHTML = 
      `Куда показывает <span class="target-word">стрелка</span>?<br>Выбери предлог:`;
    task.itemWord = 'arrow';
  }
  // Для всех остальных предлогов используем единую SVG-сцену из карточек!
  else {
    document.getElementById('prep-scene').innerHTML = `
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
        ${prepositionCardScene(task.prep)}
      </div>
    `;
    
    // Определяем правильный текст для вопроса
    let itemNameRu = 'кот';
    let itemNameEn = 'cat';
    if (task.prep === 'under') {
      itemNameRu = 'мяч';
      itemNameEn = 'ball';
    }
    
    document.getElementById('prep-prompt').innerHTML =
      `Где находится <span class="target-word">${itemNameRu} (${itemNameEn})</span>?<br>Выбери предлог:`;
      
    task.itemWord = itemNameEn; // Для озвучки
  }

  document.getElementById('prep-progress').textContent = `${s.index + 1} / ${s.queue.length}`;
  const optsEl = document.getElementById('prep-options');
  optsEl.innerHTML = '';
  
  const allPreps = [...PREP_GAME_DATA.preps].sort(() => Math.random() - 0.5);
  const wrongOptions = allPreps.filter(p => p.key !== task.prep).slice(0, 3);
  const correctOption = PREP_GAME_DATA.preps.find(p => p.key === task.prep);
  let opts = [...wrongOptions, correctOption];
  opts.sort(() => Math.random() - 0.5);
  
  opts.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'prep-opt';
    btn.dataset.prep = p.key;
    btn.textContent = p.key;
    btn.addEventListener('click', () => handlePrepGameAnswer(p.key, btn));
    optsEl.appendChild(btn);
  });

  speak(`Where is the ${task.itemWord}?`);
}

function handlePrepGameAnswer(chosenPrep, btn) {
  const s = prepGameState;
  if (!s || s._locked) return;
  s._locked = true;

  const task = s.current;
  const allBtns = Array.from(document.querySelectorAll('#prep-options .prep-opt'));
  allBtns.forEach(b => b.disabled = true);

  const isCorrect = chosenPrep === task.prep;
  
  allBtns.forEach(b => {
    if (b.dataset.prep === task.prep) b.classList.add('correct');
  });

  if (isCorrect) {
    playCorrect();
    mascotReact('🎉');
    s.correct++;
  } else {
    btn.classList.add('wrong');
    playWrong();
    s.queue.push(task);
    s.total++;
  }

  const sentence = `The ${task.itemWord} is ${task.prep} the box.`;
  const finalSentence = (task.prep === 'above' || task.prep === 'below') 
    ? `The thermometer is ${task.prep}.` 
    : sentence;
    
  setTimeout(() => speak(finalSentence), 300);

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

  const perfect = s.correct === s.total;
  const passed = s.correct >= Math.ceil(s.total * 0.6);
  
  if (passed) { markSetCompleted('words:prepositions'); playStar(); }
  recordPerfect('words', 'prepositions', perfect);

  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent =
    `Правильных: ${s.correct} из ${s.total}` + (perfect ? ' — идеально!' : '');

  showScreen('victory');
  setTimeout(() => speak(passed ? 'Well done!' : 'Try again!'), 500);
}

/* ============================================================
   Часть 4: игра «Формы + Цвета»
   ============================================================ */

function startShapeColorGame() {
  scState = { queue: [], index: 0, correct: 0, total: 10, current: null, _locked: false };
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
  if (!s || s.index >= s.total) { finishSCGame(); return; }

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
  `;

  const speakText = mode === 'shape'
    ? `What shape is it? It's a ${shape}.`
    : `What color is it? It's ${color}.`;
  setTimeout(() => speak(speakText), 300);

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
    playCorrect();
    mascotReact('🎉');
    s.correct++;
    speak(`Yes! ${correctAnswer}.`);
  } else {
    btn.classList.add('wrong');
    playWrong();
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
    `Правильных: ${scState.correct} из ${scState.total}` +
    (perfect ? ' — идеально!' : '');
  document.getElementById('victory-star').style.display = passed ? 'block' : 'none';

  showScreen('victory');
  setTimeout(() => speak(passed ? 'Well done!' : 'Try again!'), 500);
}

/* ============================================================
   Часть 5: игра «Глаголы/действия»
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

  // Добавляем 6-й уровень для глаголов
  if (s.index === s.queue.length - 1 && !s.micLevelDone) {
    s.micLevelDone = true;
    const task = s.queue[s.index];
    const container = document.getElementById('action-container');
    container.innerHTML = `
      <div class="game-progress">Скажи, что происходит</div>
      <div class="action-scene" style="position:relative; overflow:hidden; background:#E8F4F8; display:flex; align-items:center; justify-content:center;">
        ${task.action === 'eat' ? catEatingScene() : task.action === 'read' ? catReadingScene() : `<canvas id="action-canvas" style="width:100%; height:100%; display:block;"></canvas>`}
      </div>
      <div class="action-prompt" style="font-size: 1.5rem; margin-top: 10px;">${task.phrase}</div>
      <button class="mic-btn" id="mic-btn">🎤</button>
    `;
    if (task.action !== 'eat' && task.action !== 'read') {
      setTimeout(() => drawActionCanvas(task.action), 0);
    }
    document.getElementById('mic-btn').addEventListener('click', () => {
      listenForWord(task.action, 
        () => { playCorrect(); mascotReact('🎉'); speak('Yes! ' + task.phrase); setTimeout(() => { s.index++; renderActionQuestion(); }, 1000); },
        () => { playWrong(); speak("Try again."); }
      );
    });
    return;
  }

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
  `;

  setTimeout(() => speak(task.phrase), 300);
  if (!useSvgScene) setTimeout(() => drawActionCanvas(task.action), 0);

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
  allBtns.forEach(b => {
    if (b.textContent === task.phrase) b.classList.add('correct');
  });

  if (isCorrect) {
    playCorrect();
    mascotReact('🎉');
    s.correct++;
    speak(`Yes! ${task.phrase}.`);
  } else {
    btn.classList.add('wrong');
    playWrong();
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
  }, isCorrect ? 1500 : 2000);
}

function finishActionGame() {
  if (actionCanvasRAF) { cancelAnimationFrame(actionCanvasRAF); actionCanvasRAF = null; }
  const perfect = actionState && actionState.correct === actionState.total && actionState.wrongQueue.length === 0;
  const passed = actionState && actionState.correct >= Math.ceil(actionState.total * 0.6);
  if (passed) { markSetCompleted('words:verbs'); playStar(); }
  recordPerfect('words', 'verbs', perfect);

  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent =
    `Правильных: ${actionState.correct} из ${actionState.total}` +
    (perfect ? ' — идеально!' : '');
  document.getElementById('victory-star').style.display = passed ? 'block' : 'none';

  showScreen('victory');
  setTimeout(() => speak(passed ? 'Well done!' : 'Try again!'), 500);
}

/* ============================================================
   Часть 6: числа («Следующее») и размеры (три уровня)
   ============================================================ */

function startNumGame(mode) {
  if (mode === 'size') {
    startSizeGame();
    return;
  }
  
  // Новые уровни для чисел (текст и микрофон)
  if (mode === 'text' || mode === 'mic') {
    startNumTextMicGame(mode);
    return;
  }

  const total = 8;
  numState = {
    mode: mode,
    index: 0,
    correct: 0,
    total: total,
    queue: [],
    _locked: false
  };
  for (let i = 0; i < total; i++) {
    numState.queue.push({ type: 'next', n: Math.floor(Math.random() * 9) + 1 });
  }
  showScreen('num-game');
  renderNumQuestion();
}

/* --- НОВЫЕ УРОВНИ ЧИСЕЛ (ТЕКСТ / МИКРОФОН) --- */
function startNumTextMicGame(mode) {
  numState = {
    mode: mode, // 'text' или 'mic'
    index: 0,
    total: 5, // 5 заданий
    queue: []
  };
  const nums = [1, 2, 3, 4, 5];
  const items = ['apple', 'banana', 'cat', 'ball', 'star'];
  const emojis = ['🍎', '🍌', '🐱', '⚽', '⭐'];
  
  for (let i = 0; i < numState.total; i++) {
    const n = nums[Math.floor(Math.random() * nums.length)];
    const itemIdx = Math.floor(Math.random() * items.length);
    numState.queue.push({ n, item: items[itemIdx], emoji: emojis[itemIdx], itemRu: 'предмет' });
  }
  
  showScreen('num-game');
  renderNumTextMic();
}

function renderNumTextMic() {
  const s = numState;
  if (!s || (s.mode !== 'text' && s.mode !== 'mic')) return;
  if (s.index >= s.queue.length) {
    finishNumGame(); return;
  }
  
  const task = s.queue[s.index];
  const container = document.getElementById('num-container');
  const visual = Array.from({length: task.n}).map(() => `<span style="font-size: 3rem; margin: 0 5px;">${task.emoji}</span>`).join('');
  
  if (s.mode === 'text') {
    // Уровень с вводом текста
    container.innerHTML = `
      <div class="game-progress">Уровень: Напиши · ${s.index + 1}/${s.total}</div>
      <div class="num-visual" style="flex-wrap: wrap; justify-content: center;">${visual}</div>
      <div class="there-is-container" style="margin-top:20px;">
        <div style="font-size: 1.3rem; font-weight: bold;">Напиши: "здесь ${task.n} ${task.item}"</div>
        <input type="text" id="num-text-input" class="there-is-input" placeholder="здесь 3 apple">
        <button class="there-is-btn" id="num-text-check">Проверить</button>
      </div>
    `;
    document.getElementById('num-text-check').addEventListener('click', () => {
      const val = document.getElementById('num-text-input').value.toLowerCase().trim();
      // Простая проверка, что есть число и слово
      const numWords = ['one','two','three','four','five'];
      const expectedWord = numWords[task.n - 1];
      if (val.includes(expectedWord) && val.includes(task.item)) {
        playCorrect(); mascotReact('🎉'); speak('Great!');
        s.index++; setTimeout(renderNumTextMic, 1000);
      } else {
        playWrong(); speak(`Try again. There are ${task.n} ${task.item}s.`);
      }
    });
  } else {
    // Уровень с микрофоном и скрытой подсказкой
    container.innerHTML = `
      <div class="game-progress">Уровень: Скажи · ${s.index + 1}/${s.total}</div>
      <div class="num-visual" style="flex-wrap: wrap; justify-content: center;">${visual}</div>
      <div style="font-size: 1.3rem; font-weight: bold; text-align: center; margin-top: 15px;">
        Скажи, сколько предметов на экране
      </div>
      <div style="display:flex; justify-content:center; gap: 20px; align-items:center; margin-top:20px;">
        <button class="help-btn" onclick="alert('Подсказка: ${task.n} ${task.item}')">?</button>
        <button class="mic-btn" id="mic-btn" style="margin:0;">🎤</button>
      </div>
    `;
    document.getElementById('mic-btn').addEventListener('click', () => {
      // Ожидаем фразу типа "three apples"
      const targetPhrase = `${task.n} ${task.item}`;
      listenForWord(targetPhrase, 
        () => { playCorrect(); mascotReact('🎉'); speak('Perfect!'); s.index++; setTimeout(renderNumTextMic, 1000); },
        () => { playWrong(); speak("Try again."); }
      );
    });
  }
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

/* ---------- РАЗМЕРЫ: ТРИ УРОВНЯ ---------- */
function startSizeGame() {
  numState = {
    mode: 'size',
    level: 1,
    maxLevel: 3,
    index: 0,
    correct: 0,
    total: 0,
    queue: [],
    _locked: false,
    showTheory: true,
    overallCorrect: 0,
    overallTotal: 0
  };
  buildSizeLevel(1);
  showScreen('num-game');
  renderSizeTheory();
}

function buildSizeLevel(level) {
  const s = numState;
  s.level = level;
  s.index = 0;
  s.correct = 0;
  s.queue = [];

  if (level === 1) {
    const base = shuffle([
      { answer: 'big',    prompt: 'Кто большой? / big' },
      { answer: 'small',  prompt: 'Кто маленький? / small' },
      { answer: 'medium', prompt: 'Кто средний? / medium' }
    ]);
    s.queue = base;
  } else if (level === 2) {
    const base = [];
    for (let i = 0; i < 2; i++) {
      base.push({ answer: 'bigger',  prompt: 'Кто больше? / bigger' });
      base.push({ answer: 'smaller', prompt: 'Кто меньше? / smaller' });
    }
    s.queue = shuffle(base);
  } else if (level === 3) {
    const base = [];
    for (let i = 0; i < 2; i++) {
      base.push({ answer: 'biggest',  prompt: 'Кто самый большой? / biggest' });
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
        <div class="theory-item">
          <span class="t-emoji" style="font-size:40px;">🐘</span>
          <span class="t-label">small<small>маленький</small></span>
        </div>
        <div class="theory-item">
          <span class="t-emoji" style="font-size:65px;">🐘</span>
          <span class="t-label">medium<small>средний</small></span>
        </div>
        <div class="theory-item">
          <span class="t-emoji" style="font-size:95px;">🐘</span>
          <span class="t-label">big<small>большой</small></span>
        </div>
      </div>
      <div class="theory-note">
        <b>small</b> — маленький, <b>medium</b> — средний, <b>big</b> — большой.<br>
        <b>smaller</b> — меньше, <b>bigger</b> — больше (сравнение).<br>
        <b>smallest</b> — самый маленький, <b>biggest</b> — самый большой.
      </div>
    </div>
    <button class="menu-btn" id="size-start" style="margin-top:12px; width:220px; padding:14px;">
      <span class="icon">▶️</span>Начать игру
    </button>
  `;
  document.getElementById('size-start').addEventListener('click', () => {
    playTap();
    numState.showTheory = false;
    numState.index = 0;
    renderSizeQuestion();
  });
  speak('Small, medium, big. The smallest and the biggest.');
}

function renderSizeQuestion() {
  const s = numState;
  if (!s || s.mode !== 'size') return;
  if (s.index >= s.queue.length) {
    s.overallCorrect += s.correct;
    s.overallTotal += s.total;
    if (s.level < s.maxLevel) {
      showLevelComplete();
    } else {
      finishSizeGame();
    }
    return;
  }
  const q = s.queue[s.index];
  s._locked = false;

  let poolCount, sizes;
  if (s.level === 1) {
    if (q.answer === 'medium') {
      poolCount = 3; sizes = [52, 82, 114];
    } else {
      poolCount = 2; sizes = [60, 110];
    }
  } else if (s.level === 2) {
    poolCount = 2; sizes = [60, 110];
  } else {
    poolCount = 3; sizes = [52, 82, 114];
  }

  const animal = SIZE_DATA.animals[Math.floor(Math.random() * SIZE_DATA.animals.length)];
  const sized = sizes.map((sz, i) => ({ emoji: animal.emoji, visualSize: sz, id: i }));

  let correctIndex;
  if (q.answer === 'big' || q.answer === 'bigger' || q.answer === 'biggest') {
    correctIndex = sized.length - 1;
  } else if (q.answer === 'small' || q.answer === 'smaller' || q.answer === 'smallest') {
    correctIndex = 0;
  } else if (q.answer === 'medium') {
    correctIndex = 1;
  }

  const visual = sized.map((a, i) =>
    `<div class="size-animal" data-index="${i}" style="font-size:${a.visualSize}px;">${a.emoji}</div>`
  ).join('');

  const container = document.getElementById('num-container');
  container.innerHTML = `
    <div class="game-progress">Уровень ${s.level}/3 · ${s.index + 1} / ${s.queue.length}</div>
    <div class="num-prompt">${q.prompt}</div>
    <div class="num-visual" style="min-height:200px;">
      <div class="size-scene" id="size-scene">${visual}</div>
    </div>
    <button class="game-speak-btn" id="num-speak" style="margin: 0 auto;">🔊</button>
  `;

  document.getElementById('num-speak').addEventListener('click', () => speak(q.prompt.split('/')[0].trim()));

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
  if (!isCorrect) {
    animals[chosenIndex].classList.add('wrong-size');
  }

  if (isCorrect) {
    playCorrect();
    mascotReact('🎉');
    s.correct++;
    speak('Yes!');
  } else {
    playWrong();
    speak('No.');
  }

  setTimeout(() => {
    if (numState !== s) return;
    s._locked = false;
    s.index++;
    renderSizeQuestion();
  }, isCorrect ? 1200 : 1600);
}


function finishSizeGame() {
  const s = numState;
  if (!s || s.mode !== 'size') return;
  const perfect = s.overallCorrect === s.overallTotal;
  const passed = s.overallCorrect >= Math.ceil(s.overallTotal * 0.6);
  if (passed) { markSetCompleted('numbers:size'); playStar(); }

  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent =
    `Все уровни пройдены! Правильных: ${s.overallCorrect} из ${s.overallTotal}` +
    (perfect ? ' — идеально!' : '');
  document.getElementById('victory-star').style.display = passed ? 'block' : 'none';

  showScreen('victory');
  setTimeout(() => speak(passed ? 'Well done!' : 'Try again!'), 500);
}

/* ---------- ЧИСЛА: СЛЕДУЮЩЕЕ ---------- */
function renderNumQuestion() {
  const s = numState;
  if (!s || s.mode === 'size') return;
  if (s.index >= s.total) { finishNumGame(); return; }

  const task = s.queue[s.index];
  s._locked = false;
  const container = document.getElementById('num-container');
  const prompt = 'Какое число идёт дальше?';
  const visual = `<div class="nv-big">${task.n}</div><div class="nv-arrow">→ ?</div>`;
  const correct = task.n + 1;
  const pool = [];
  for (let i = 1; i <= 10; i++) if (i !== correct) pool.push(i);
  const nums = [correct, ...shuffle(pool).slice(0, 3)].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <div class="game-progress">${s.index + 1} / ${s.total}</div>
    <div class="num-prompt">${prompt}</div>
    <div class="num-visual">${visual}</div>
    <button class="game-speak-btn" id="num-speak" style="margin: 0 auto;">🔊</button>
    <div class="num-options" id="num-options"></div>
  `;

  document.getElementById('num-speak').addEventListener('click', () => speak(`${NUMBER_WORDS[task.n - 1]}... what's next?`));

  const optsEl = document.getElementById('num-options');
  nums.forEach(n => {
    const btn = document.createElement('button');
    btn.className = 'num-opt';
    btn.textContent = NUMBER_WORDS[n - 1];
    btn.dataset.value = n;
    btn.addEventListener('click', () => handleNextAnswer(n, correct, btn));
    optsEl.appendChild(btn);
  });
}

function handleNextAnswer(chosen, correct, btn) {
  const s = numState;
  if (!s || s._locked || s.mode === 'size') return;
  s._locked = true;

  const allBtns = Array.from(document.querySelectorAll('#num-options .num-opt'));
  allBtns.forEach(b => b.disabled = true);

  const isCorrect = Number(chosen) === Number(correct);
  allBtns.forEach(b => {
    if (Number(b.dataset.value) === Number(correct)) b.classList.add('correct');
  });

  if (isCorrect) {
    playCorrect();
    mascotReact('🎉');
    s.correct++;
    speak(`Yes!`);
  } else {
    btn.classList.add('wrong');
    playWrong();
    speak(`No.`);
  }

  setTimeout(() => {
    if (numState !== s) return;
    s._locked = false;
    s.index++;
    renderNumQuestion();
  }, isCorrect ? 1200 : 1600);
}

function finishNumGame() {
  if (numState && numState.mode === 'size') return;
  const perfect = numState && numState.correct === numState.total;
  const passed = numState && numState.correct >= Math.ceil(numState.total * 0.6);
  if (passed) { markSetCompleted('numbers:' + numState.mode); playStar(); }

  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent =
    `Правильных: ${numState.correct} из ${numState.total}` +
    (perfect ? ' — идеально!' : '');
  document.getElementById('victory-star').style.display = passed ? 'block' : 'none';

  showScreen('victory');
  setTimeout(() => speak(passed ? 'Well done!' : 'Try again!'), 500);
}

/* ============================================================
   Часть 5b: игра с градусником (above / below)
   ============================================================ */

function startThermoGame() {
  const thermoPreps = [
    { key: 'above', ru: 'над' },
    { key: 'below', ru: 'под (ниже)' }
  ];

  const tasks = [];
  for (let i = 0; i < 4; i++) {
    const p = thermoPreps[i % 2];
    tasks.push({ prep: p.key, prepRu: p.ru });
  }

  thermoState = {
    queue: shuffle(tasks),
    index: 0,
    correct: 0,
    total: tasks.length,
    current: null,
    _locked: false,
    _advanceTimer: null
  };

  showScreen('prep-game');
  renderThermoQuestion();
}

function renderThermoQuestion() {
  const s = thermoState;
  if (!s) return;
  clearTimeout(s._advanceTimer);

  if (s.index >= s.total) { finishThermoGame(); return; }

  const task = s.queue[s.index];
  s.current = task;
  s._locked = false;

  document.getElementById('prep-progress').textContent = `${s.index + 1} / ${s.total}`;

  const directionRu = task.prep === 'above' ? 'ВВЕРХ (выше)' : 'ВНИЗ (ниже)';
  document.getElementById('prep-prompt').innerHTML =
    `Куда показывает стрелка?<br><span style="font-size:1.1em; color:#FF8C42;">${directionRu}</span>`;

  const sceneEl = document.getElementById('prep-scene');
  sceneEl.innerHTML = `
    <div class="thermo-scene" style="width: 100%; height: 100%; background: none; border: none; box-shadow: none;">
      ${thermoSceneDynamic(task.prep)}
    </div>
  `;

  setTimeout(() => speak(`The arrow points ${task.prep}.`), 350);

  const optsEl = document.getElementById('prep-options');
  optsEl.innerHTML = '';

  const allPreps = ['above', 'below', 'on', 'under'];
  let opts = shuffle(allPreps).slice(0, 4);
  if (!opts.includes(task.prep)) opts[0] = task.prep;
  opts = shuffle(opts);

  opts.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'prep-opt';
    btn.textContent = opt;
    btn.dataset.prep = opt;
    btn.addEventListener('click', () => handleThermoAnswer(opt, task.prep, btn));
    optsEl.appendChild(btn);
  });
}

function handleThermoAnswer(chosen, correct, btn) {
  const s = thermoState;
  if (!s || s._locked) return;
  s._locked = true;

  const allBtns = Array.from(document.querySelectorAll('#prep-options .prep-opt'));
  allBtns.forEach(b => b.disabled = true);
  allBtns.forEach(b => {
    if (b.dataset.prep === correct) b.classList.add('correct');
  });

  const isCorrect = chosen === correct;
  if (isCorrect) {
    playCorrect();
    mascotReact('🎉');
    s.correct++;
    speak(`Yes! The arrow points ${correct}.`);
  } else {
    btn.classList.add('wrong');
    playWrong();
    speak(`No. The arrow points ${correct}.`);
    s.queue.push(s.current);
    s.total++;
  }

  s._advanceTimer = setTimeout(() => {
    if (thermoState !== s) return;
    s.index++;
    renderThermoQuestion();
  }, isCorrect ? 1500 : 2000);
}

function finishThermoGame() {
  const s = thermoState;
  if (!s) return;

  const passed = s.correct >= Math.ceil(s.total * 0.5);
  if (passed) {
    markSetCompleted('words:prepositions');
    playStar();
  }

  document.getElementById('victory-emoji').textContent = passed ? '🎉' : '💪';
  document.getElementById('victory-title').textContent = passed ? 'Молодец!' : 'Попробуй ещё раз!';
  document.getElementById('victory-sub').textContent = `Правильных: ${s.correct} из ${s.total}`;
  document.getElementById('victory-star').style.display = passed ? 'block' : 'none';

  showScreen('victory');
  setTimeout(() => speak(passed ? 'Well done!' : 'Try again!'), 500);
}

/* ============================================================
   Часть 7: Анимационный движок для Canvas
   ============================================================ */

let actionCanvasRAF = null;

function drawActionCanvas(action) {
  const canvas = document.getElementById('action-canvas');
  if (!canvas) return;

  if (actionCanvasRAF) cancelAnimationFrame(actionCanvasRAF);

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const W = rect.width;
  const H = rect.height;

  // --- Слон (ходит) ---
  function drawElephant(x, y, t) {
    const walk = Math.sin(t * 4) * 3;
    ctx.save();
    ctx.translate(x, y + walk);
    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(0, 30, 55, 8, 0, 0, Math.PI * 2); ctx.fill();
    ctx.scale(-1, 1);
    ctx.fillStyle = '#6b6b7d';
    const legs = [-30, -10, 15, 35];
    legs.forEach((lx, i) => {
      const swing = Math.sin(t * 8 + i * 1.5) * 8;
      ctx.save(); ctx.translate(lx, 10); ctx.rotate(swing * 0.02);
      ctx.fillRect(-6, 0, 12, 22);
      ctx.beginPath(); ctx.ellipse(0, 22, 8, 5, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    });
    ctx.fillStyle = '#9b9bb0'; ctx.beginPath(); ctx.ellipse(0, 0, 50, 35, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#8f8fa5'; ctx.beginPath(); ctx.ellipse(-45, -10, 28, 25, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#a0a0b8'; ctx.beginPath(); ctx.ellipse(-35, -15, 15, 20, 0.3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#9b9bb0'; ctx.lineWidth = 10; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-65, -5); ctx.quadraticCurveTo(-85, 10 + Math.sin(t * 3) * 5, -75, 30); ctx.stroke();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(-52, -18, 3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#f5f5dc'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(-62, 5); ctx.quadraticCurveTo(-75, 10, -70, 20); ctx.stroke();
    ctx.restore();
  }

  // --- Кот (бег, танцы, еда, чтение) ---
  function drawCat(x, y, t, mode = 'run') {
    const isEating = mode === 'eat';
    const isReading = mode === 'read';
    const isDancing = mode === 'dance';

    const bounce = (mode === 'run' || mode === 'dance') ? Math.abs(Math.sin(t * 10)) * 8 : 0;
    const danceRock = isDancing ? Math.sin(t * 8) * 0.15 : 0;
    const eatLean = isEating ? Math.max(0, Math.sin(t * 6)) * 0.25 : 0;

    ctx.save();
    ctx.translate(x, y - bounce);

    if (isDancing) ctx.rotate(danceRock);
    if (isEating) {
      ctx.translate(-10, 10);
      ctx.rotate(eatLean);
    }

    ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(0, bounce + 25, 30, 5, 0, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#ff8c42'; ctx.lineWidth = 5; ctx.lineCap = 'round';
    const tailWave = isDancing ? Math.sin(t * 20) * 15 : Math.sin(t * 12) * 8;
    ctx.beginPath(); ctx.moveTo(25, 0); ctx.quadraticCurveTo(45, -15 + tailWave, 40, -30); ctx.stroke();

    ctx.fillStyle = '#e07b39'; const legPhase = mode === 'run' ? t * 14 : 0;
    ctx.save(); ctx.translate(15, 10); ctx.rotate(Math.sin(legPhase) * 0.5); ctx.fillRect(-3, 0, 6, 18); ctx.restore();
    ctx.save(); ctx.translate(5, 10); ctx.rotate(Math.sin(legPhase + Math.PI) * 0.5); ctx.fillRect(-3, 0, 6, 18); ctx.restore();
    if (isReading) {
      ctx.save(); ctx.translate(-12, 10); ctx.rotate(-0.5); ctx.fillRect(-3, 0, 6, 18); ctx.restore();
      ctx.save(); ctx.translate(-22, 10); ctx.rotate(-0.4); ctx.fillRect(-3, 0, 6, 18); ctx.restore();
    } else {
      ctx.save(); ctx.translate(-12, 10); ctx.rotate(Math.sin(legPhase + Math.PI) * 0.5); ctx.fillRect(-3, 0, 6, 18); ctx.restore();
      ctx.save(); ctx.translate(-22, 10); ctx.rotate(Math.sin(legPhase) * 0.5); ctx.fillRect(-3, 0, 6, 18); ctx.restore();
    }

    ctx.fillStyle = '#ff9f5a'; ctx.beginPath(); ctx.ellipse(0, 0, 28, 16, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffb070'; ctx.beginPath(); ctx.arc(-28, -8, 14, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#ff9f5a';
    ctx.beginPath(); ctx.moveTo(-35, -18); ctx.lineTo(-32, -30); ctx.lineTo(-25, -20); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-25, -18); ctx.lineTo(-20, -30); ctx.lineTo(-18, -18); ctx.fill();

    ctx.fillStyle = '#000';
    const eyeY = isReading ? -5 : -8;
    ctx.beginPath(); ctx.arc(-32, eyeY, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-24, eyeY, 2.5, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#ff6b6b'; ctx.beginPath(); ctx.arc(-28, -3, 2, 0, Math.PI * 2); ctx.fill();

    if (isReading) {
      ctx.fillStyle = '#FFF';
      ctx.beginPath(); ctx.moveTo(-28, -2); ctx.lineTo(-10, -8); ctx.lineTo(-10, 15); ctx.lineTo(-28, 10); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-28, -2); ctx.lineTo(-45, -8); ctx.lineTo(-45, 15); ctx.lineTo(-28, 10); ctx.fill();
      ctx.strokeStyle = '#333'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#333'; ctx.font = 'bold 5px Arial';
      ctx.fillText('ABC', -25, 5);
      ctx.fillText('123', -40, 5);
    }

    ctx.restore();
  }

  // --- Собака (прыгает или спит) ---
  function drawDog(x, y, t, isSleeping = false) {
    const jump = isSleeping ? 0 : Math.abs(Math.sin(t * 3)) * 40;
    ctx.save();
    ctx.translate(x, y - jump);
    if (isSleeping) {
      ctx.rotate(-0.1);
      ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.beginPath(); ctx.ellipse(0, 30, 35, 6, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#FFF'; ctx.font = 'bold 16px Arial';
      ctx.fillText('Z', 15, -20 - Math.sin(t * 2) * 5); ctx.fillText('z', 25, -30 - Math.sin(t * 2) * 5);
    } else {
      ctx.fillStyle = `rgba(0,0,0,${0.3 - jump / 200})`; ctx.beginPath(); ctx.ellipse(0, jump + 30, 35 - jump / 4, 6, 0, 0, Math.PI * 2); ctx.fill();
    }
    ctx.strokeStyle = '#b5651d'; ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(28, -5); ctx.quadraticCurveTo(45, -15 + Math.sin(t * 15) * 10, 50, -25); ctx.stroke();
    ctx.fillStyle = '#a0522d';
    ctx.save(); ctx.translate(15, 10); ctx.rotate(-0.3); ctx.fillRect(-4, 0, 8, 20); ctx.restore();
    ctx.save(); ctx.translate(20, 10); ctx.rotate(-0.2); ctx.fillRect(-4, 0, 8, 20); ctx.restore();
    ctx.fillStyle = '#c87f3e'; ctx.beginPath(); ctx.ellipse(0, 0, 32, 18, 0, 0, Math.PI * 2); ctx.fill();
    const legLift = jump > 5 ? -0.6 : 0;
    ctx.fillStyle = '#a0522d';
    ctx.save(); ctx.translate(-18, 10); ctx.rotate(legLift); ctx.fillRect(-4, 0, 8, 20); ctx.restore();
    ctx.save(); ctx.translate(-24, 10); ctx.rotate(legLift + 0.1); ctx.fillRect(-4, 0, 8, 20); ctx.restore();
    ctx.fillStyle = '#d48f4f'; ctx.beginPath(); ctx.arc(-32, -8, 16, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.translate(-38, -20); ctx.rotate(Math.sin(t * 8) * 0.15);
    ctx.fillStyle = '#a0522d'; ctx.beginPath(); ctx.ellipse(0, 8, 6, 12, 0.2, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#e0a76c'; ctx.beginPath(); ctx.ellipse(-42, -2, 10, 8, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(-48, -3, 3, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(-35, -12, 2.5, 0, Math.PI * 2); ctx.fill();
    if (jump > 10 && !isSleeping) { ctx.fillStyle = '#ff6b6b'; ctx.beginPath(); ctx.ellipse(-45, 5 + Math.sin(t * 20) * 2, 4, 6, 0, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  }

  // --- Рыба (плавает) ---
  function drawFish(x, y, t, dir) {
    const bob = Math.sin(t * 2) * 10;
    ctx.save(); ctx.translate(x, y + bob);
    for (let i = 0; i < 3; i++) {
      const by = -20 - ((t * 30 + i * 40) % 80);
      ctx.fillStyle = `rgba(255,255,255,0.6)`; ctx.beginPath(); ctx.arc(-30 + i * 8, by, 2 + i, 0, Math.PI * 2); ctx.fill();
    }
    ctx.scale(dir, 1); ctx.rotate(Math.sin(t * 6) * 0.2);
    ctx.fillStyle = '#ff6b9d'; ctx.beginPath(); ctx.moveTo(25, 0); ctx.lineTo(45, -12); ctx.lineTo(45, 12); ctx.fill();
    ctx.fillStyle = '#ff9ec7'; ctx.beginPath(); ctx.ellipse(0, 0, 30, 16, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ff6b9d'; ctx.beginPath(); ctx.moveTo(-5, -15); ctx.quadraticCurveTo(5, -28, 15, -14); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-18, -3, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(-19, -3, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  // --- Птица (поёт) ---
  function drawBird(x, y, t) {
    const bob = Math.sin(t * 3) * 3;
    const flap = Math.sin(t * 12) * 0.4;
    ctx.save(); ctx.translate(x, y + bob); ctx.scale(-1, 1);

    ctx.save(); ctx.scale(-1, 1);
    ctx.fillStyle = '#333'; ctx.font = 'bold 20px serif';
    const noteY = -45 - (t * 25 % 40);
    ctx.globalAlpha = Math.max(0, 1 - (noteY + 45) / 40);
    ctx.fillText('♪', -10, noteY); ctx.fillText('♫', 10, noteY - 15);
    ctx.globalAlpha = 1; ctx.restore();

    ctx.fillStyle = '#4a90d9'; ctx.beginPath(); ctx.moveTo(15, 0); ctx.lineTo(30, -8); ctx.lineTo(30, 8); ctx.fill();
    ctx.fillStyle = '#6bb0f5'; ctx.beginPath(); ctx.ellipse(0, 0, 18, 13, 0, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.translate(-2, -2); ctx.rotate(flap);
    ctx.fillStyle = '#4a90d9'; ctx.beginPath(); ctx.ellipse(0, 0, 12, 6, -0.5, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    ctx.fillStyle = '#6bb0f5'; ctx.beginPath(); ctx.arc(-15, -8, 10, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#ffb400'; const beakOpen = Math.abs(Math.sin(t * 10)) * 4;
    ctx.beginPath(); ctx.moveTo(-24, -8); ctx.lineTo(-34, -8 - beakOpen); ctx.lineTo(-24, -4); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-24, -4); ctx.lineTo(-34, -4 + beakOpen); ctx.lineTo(-24, 0); ctx.fill();

    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(-18, -10, 2, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  // Главный цикл анимации
  function loop(now) {
    const t = now / 1000;
    ctx.clearRect(0, 0, W, H);

    const isNight = action === 'sleep';
    ctx.fillStyle = isNight ? '#1A237E' : '#87CEEB';
    ctx.fillRect(0, 0, W, H);

    const groundY = H * 0.7;
    if (action === 'swim') {
      ctx.fillStyle = '#4FC3F7'; ctx.fillRect(0, groundY, W, H - groundY);
    } else {
      ctx.fillStyle = '#7ccf7c'; ctx.fillRect(0, groundY, W, H - groundY);
    }

    if (isNight) {
      ctx.fillStyle = '#FFD700'; ctx.beginPath(); ctx.arc(W - 40, 40, 20, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#1A237E'; ctx.beginPath(); ctx.arc(W - 50, 35, 18, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = '#FFD700'; ctx.beginPath(); ctx.arc(W - 40, 40, 25, 0, Math.PI * 2); ctx.fill();
    }

    const cx = W / 2;
    const cy = groundY - 20;

    if (action === 'walk') {
      drawElephant(cx, cy, t);
    }
    else if (action === 'run' || action === 'play') {
      drawCat(cx, cy, t, 'run');
      if (action === 'play') {
        const ballX = cx - 45;
        const ballY = groundY - 10 - Math.abs(Math.sin(t * 8)) * 25;
        ctx.font = '32px Arial'; ctx.textAlign = 'center';
        ctx.fillText('⚽', ballX, ballY);
      }
    }
    else if (action === 'dance') {
      ctx.fillStyle = '#333'; ctx.fillRect(cx - 80, groundY - 40, 40, 40);
      ctx.fillStyle = '#555'; ctx.beginPath(); ctx.arc(cx - 60, groundY - 20, 12, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#555'; ctx.beginPath(); ctx.arc(cx - 60, groundY - 20, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#00FF00';
      const h1 = 5 + Math.abs(Math.sin(t * 10)) * 15;
      const h2 = 5 + Math.abs(Math.sin(t * 12 + 1)) * 15;
      ctx.fillRect(cx - 72, groundY - 10 - h1, 4, h1);
      ctx.fillRect(cx - 64, groundY - 10 - h2, 4, h2);

      drawCat(cx, cy, t, 'dance');
    }
    else if (action === 'eat') {
      ctx.fillStyle = '#E53935';
      ctx.beginPath(); ctx.ellipse(cx - 40, groundY - 5, 22, 10, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#8D6E63';
      ctx.beginPath(); ctx.ellipse(cx - 40, groundY - 10, 18, 7, 0, 0, Math.PI * 2); ctx.fill();

      drawCat(cx, cy, t, 'eat');
    }
    else if (action === 'jump' || action === 'sleep') {
      drawDog(cx, cy, t, action === 'sleep');
    }
    else if (action === 'swim') {
      drawFish(cx, groundY + 30, t, -1);
    }
    else if (action === 'sing') {
      drawBird(cx + 20, cy - 20, t);
    }
    else if (action === 'read') {
      drawCat(cx, cy, t, 'read');
    }

    ctx.textAlign = 'left';

    actionCanvasRAF = requestAnimationFrame(loop);
  }

  actionCanvasRAF = requestAnimationFrame(loop);
}
