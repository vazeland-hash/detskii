/* ============================================================
   CORE: состояние, localStorage, звуки, речь, навигация
   ============================================================ */

let currentSection = null;
let currentSetKey = null;
let currentCardIndex = 0;
let currentCards = [];
let gameState = null;
let feedState = null;
let prepGameState = null;
let scState = null;
let actionState = null;
let numState = null;
let grammarState = null;
let thermoState = null;

const STARS_KEY = 'kids_completed_sets';
const PERFECT_KEY = 'kids_perfect_counts';
const WORDS_KEY = 'kids_unlocked_words';
const MASTERED_KEY = 'kids_mastered_words';

function loadCompleted() {
  try { return JSON.parse(localStorage.getItem(STARS_KEY) || '[]'); }
  catch { return []; }
}
function saveCompleted(arr) {
  try { localStorage.setItem(STARS_KEY, JSON.stringify(arr)); } catch {}
}
function loadPerfect() {
  try { return JSON.parse(localStorage.getItem(PERFECT_KEY) || '{}'); }
  catch { return {}; }
}
function savePerfect(obj) {
  try { localStorage.setItem(PERFECT_KEY, JSON.stringify(obj)); } catch {}
}
function loadUnlockedWords() {
  try { return JSON.parse(localStorage.getItem(WORDS_KEY) || '{}'); }
  catch { return {}; }
}
function saveUnlockedWords(obj) {
  try { localStorage.setItem(WORDS_KEY, JSON.stringify(obj)); } catch {}
}
function loadMastered() {
  try { return JSON.parse(localStorage.getItem(MASTERED_KEY) || '{}'); }
  catch { return {}; }
}
function saveMastered(obj) {
  try { localStorage.setItem(MASTERED_KEY, JSON.stringify(obj)); } catch {}
}

function markSetCompleted(key) {
  const arr = loadCompleted();
  if (!arr.includes(key)) { arr.push(key); saveCompleted(arr); }
  updateStarsDisplay();
}

function updateStarsDisplay() {
  const el = document.getElementById('home-stars');
  if (el) el.textContent = '⭐ ' + loadCompleted().length;
  const wEl = document.getElementById('home-words');
  if (wEl) {
    let total = 0;
    const u = loadUnlockedWords();
    Object.values(u).forEach(n => total += n);
    wEl.textContent = '🔓 ' + total + ' новых слов';
  }
}

function isSetExtended(sectionKey, setKey) {
  const p = loadPerfect();
  return (p[sectionKey + ':' + setKey] || 0) >= 2;
}

function getUnlockedCount(sectionKey, setKey) {
  const u = loadUnlockedWords();
  return u[sectionKey + ':' + setKey] || 0;
}

function recordCorrectAnswer(sectionKey, setKey, word) {
  if (!sectionKey || !setKey || !word) return;
  const mastered = loadMastered();
  const key = `${sectionKey}:${setKey}:${word}`;
  const now = Date.now();
  if (!mastered[key]) mastered[key] = { count: 0, lastSeen: now };
  mastered[key].count += 1;
  mastered[key].lastSeen = now;
  saveMastered(mastered);
}

function isWordMastered(sectionKey, setKey, word) {
  const mastered = loadMastered();
  const key = `${sectionKey}:${setKey}:${word}`;
  return !!mastered[key] && mastered[key].count >= 2;
}

function resetWordFromMastered(sectionKey, setKey, word) {
  const mastered = loadMastered();
  delete mastered[`${sectionKey}:${setKey}:${word}`];
  saveMastered(mastered);
}

function markWordsMastered(sectionKey, setKey) {
  const p = loadPerfect();
  const passes = p[sectionKey + ':' + setKey] || 0;
  if (passes < 2) return false;
  return true; 
}

function unmasterWord(sectionKey, setKey, word) {
  resetWordFromMastered(sectionKey, setKey, word);
}

let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) {
    try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch {}
  }
  return _audioCtx;
}
function beep(freq, duration = 0.12, type = 'sine', vol = 0.15) {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type; osc.frequency.value = freq;
    gain.gain.value = vol;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime + duration);
  } catch {}
}
function playCorrect() { beep(880, 0.1); setTimeout(() => beep(1320, 0.15), 100); }
function playWrong()   { beep(300, 0.2, 'square', 0.1); }
function playTap()     { beep(660, 0.05, 'sine', 0.1); }
function playStar()    { beep(1046,0.1); setTimeout(()=>beep(1318,0.1),100); setTimeout(()=>beep(1568,0.25),200); }

let britishVoice = null;
let _speakToken = 0;
let _lastSpoken = '';
let _lastSpokenAt = 0;

function pickVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;
  const preferred = ['Google UK English Female','Google UK English Male','Daniel','Kate','Serena','Oliver'];
  for (const name of preferred) {
    const v = voices.find(v => v.name.includes(name));
    if (v) return v;
  }
  const gb = voices.find(v => v.lang === 'en-GB' || v.lang === 'en_GB');
  return gb || voices.find(v => v.lang.startsWith('en')) || voices[0];
}
if ('speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = () => { britishVoice = pickVoice(); };
  britishVoice = pickVoice();
  setTimeout(() => { britishVoice = pickVoice(); }, 300);
}

function speak(text, onEnd) {
  if (!('speechSynthesis' in window) || !text) { if (onEnd) onEnd(); return; }
  const now = Date.now();
  if (text === _lastSpoken && now - _lastSpokenAt < 700) {
    if (onEnd) setTimeout(onEnd, 300);
    return;
  }
  _lastSpoken = text;
  _lastSpokenAt = now;
  const token = ++_speakToken;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-GB'; u.rate = 0.8; u.pitch = 1.05;
    if (!britishVoice) britishVoice = pickVoice();
    if (britishVoice) u.voice = britishVoice;
    u.onend = () => { if (token === _speakToken && onEnd) onEnd(); };
    u.onerror = () => { if (token === _speakToken && onEnd) onEnd(); };
    speechSynthesis.speak(u);
  } catch { if (onEnd) onEnd(); }
}

function mascotReact(emoji) {
  const m = document.getElementById('mascot');
  if (!m) return;
  m.textContent = emoji || '🎉';
  m.style.transform = 'scale(1.5)';
  setTimeout(() => { m.textContent = '🦊'; m.style.transform = ''; }, 800);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + id);
  if (el) el.classList.add('active');
}
function showHome() {
  currentSection = null; currentSetKey = null;
  updateStarsDisplay(); showScreen('home');
}

function showSets(sectionKey) {
  currentSection = sectionKey;
  const section = DATA[sectionKey];
  if (!section) { showHome(); return; }

  document.getElementById('sets-title').textContent = section.title;
  const grid = document.getElementById('set-grid');
  grid.innerHTML = '';
  const completed = loadCompleted();

  Object.entries(section.sets).forEach(([key, set]) => {
    const fullKey = sectionKey + ':' + key;
    const isDone = completed.includes(fullKey);
    const unlocked = getUnlockedCount(sectionKey, key);
    const hasNew = unlocked > 0 && unlocked < ((set.bonus || []).length || 0) + 1;
    const card = document.createElement('div');
    card.className = 'set-card' + (isDone ? ' completed' : '');
    card.innerHTML = `
      ${hasNew ? '<div class="bonus-badge">+ новые</div>' : ''}
      <div class="set-icon">${set.icon}</div>
      <div class="set-title">${set.title}</div>
      <div class="set-ru">${set.ru}</div>
    `;
    card.addEventListener('click', () => { playTap(); openCards(sectionKey, key); });
    grid.appendChild(card);
  });

  // Убрали добавление Форм+Цвета

  if (sectionKey === 'numbers') {
    // Оставили только одну игру
    const numGames = [
      { id: 'there-is', icon: '🎤', title: 'Скажи', ru: 'There is/are', bg: '#FFEBEE', color: '#C62828' }
    ];
    numGames.forEach(g => {
      const card = document.createElement('div');
      card.className = 'set-card';
      card.style.background = g.bg;
      card.innerHTML = `
        <div class="set-icon">${g.icon}</div>
        <div class="set-title" style="color:${g.color};">${g.title}</div>
        <div class="set-ru">${g.ru}</div>
      `;
      card.addEventListener('click', () => { playTap(); startNumGame(g.id); });
      grid.appendChild(card);
    });
  }

  showScreen('sets');
}

function getCards(sectionKey, setKey) {
  const section = DATA[sectionKey];
  if (!section || !section.sets[setKey]) return [];
  
  const set = section.sets[setKey];
  let cards = [...set.cards];
  
  if (setKey === 'pronouns') {
    const mastered = loadMastered();
    const hasReturnedBase = set.cards.some(c => !mastered[`${sectionKey}:${setKey}:${c.word}`]);
    const perfectCount = loadPerfect()['words:pronouns'] || 0;
    
    if (perfectCount >= 2 && set.possessives && !hasReturnedBase) {
      cards = [...set.possessives];
    }
    if (perfectCount >= 4 && set.pairs && !hasReturnedBase) {
      cards = [...set.pairs];
    }
  }

  const unlockedCount = getUnlockedCount(sectionKey, setKey);
  if (unlockedCount > 0 && set.bonus) {
    cards = cards.concat(set.bonus.slice(0, unlockedCount));
  }
  
  // Ограничиваем до 10 карточек для отображения/игры
  return cards.filter(card => {
    const wordKey = card.word || card.ru;
    return !isWordMastered(sectionKey, setKey, wordKey);
  }).slice(0, 10); 
}

function openCards(sectionKey, setKey) {
  currentSection = sectionKey;
  currentSetKey = setKey;
  currentCardIndex = 0;
  currentCards = getCards(sectionKey, setKey);
  showScreen('cards');
  renderCard();
}

function renderCardVisual(card) {
  if (card.img) {
    return `<img src="${card.img}" style="width: 100%; height: 100%; max-height: 240px; object-fit: cover; border-radius: 20px; box-shadow: 0 8px 20px rgba(0,0,0,0.15);" alt="${card.word}">`;
  }
  if (card.emoji && !card.digit) {
    return `<div class="emoji-big">${card.emoji}</div>`;
  }
  if (card.color) {
    const isLight = ['#FDD835', '#FAFAFA'].includes(card.color);
    const border = isLight ? '#333' : '#FFF';
    return `<div class="color-circle anim-pulse" style="background:${card.color};border-color:${border};"></div>`;
  }
  if (card.shape) {
    return `<div class="anim-pulse" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">${shapeSVG(card.shape)}</div>`;
  }
 if (card.svg) return `<div class="anim-bounce" style="width:100%; height:100%; display:flex; align-items:center; justify-content:center;">${card.svg()}</div>`;

  if (card.digit) {
    const count = parseInt(card.digit, 10);
    const items = Array.from({ length: Math.min(count, 12) }, (_, i) =>
      `<span class="anim-pop" style="animation-delay:${i * 0.1}s;font-size:2.2rem;line-height:1.1;margin:0 2px;">${card.emoji}</span>`
    ).join('');

    return `<div style="display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;">
      <div style="font-size:4.5rem;font-weight:bold;color:#2E7BAE;line-height:1;text-shadow: 2px 2px 0 #FFF;">${card.digit}</div>
      <div style="display:flex;flex-wrap:wrap;justify-content:center;max-width:100%;padding:0 10px;">${items}</div>
    </div>`;
  }
  return '';
}

function renderCard() {
  const card = currentCards[currentCardIndex];
  if (!card) {
    document.getElementById('card-visual').innerHTML = '<div style="font-size:5rem;">🎉</div>';
    document.getElementById('card-word').textContent = 'Всё изучено!';
    document.getElementById('card-ru').textContent = 'Загляни в раздел «Изучено»';
    document.getElementById('card-progress').textContent = '';
    document.getElementById('card-prev').disabled = true;
    document.getElementById('card-next').disabled = true;
    return;
  }
  document.getElementById('card-prev').disabled = false;
  document.getElementById('card-next').disabled = false;
  document.getElementById('card-visual').innerHTML = renderCardVisual(card);
  document.getElementById('card-word').textContent = card.word;
  document.getElementById('card-ru').textContent = card.ru;
  document.getElementById('card-progress').textContent =
    `${currentCardIndex + 1} / ${currentCards.length}`;

  const prevBtn = document.getElementById('card-prev');
  const nextBtn = document.getElementById('card-next');
  prevBtn.disabled = currentCardIndex === 0;
  nextBtn.textContent = currentCardIndex === currentCards.length - 1 ? '✅' : '➡️';

  const el = document.getElementById('big-card');
  el.classList.remove('swipe-in');
  void el.offsetWidth;
  el.classList.add('swipe-in');

  setTimeout(() => speak(card.word), 250);
}

function nextCard() {
  if (!currentCards.length) return;
  if (currentCardIndex < currentCards.length - 1) {
    currentCardIndex++;
    renderCard();
    playTap();
  } else {
    if (currentSetKey === 'prepositions') startPrepGame();
    else if (currentSection === 'words' && currentSetKey === 'verbs') startActionGame();
    else startGame();
  }
}
function prevCard() {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    renderCard();
    playTap();
  }
}
function speakCurrent() {
  const card = currentCards[currentCardIndex];
  if (!card) return;
  const btn = document.getElementById('card-speak');
  btn.classList.add('speaking');
  speak(card.word, () => btn.classList.remove('speaking'));
}

let speechRecognition = null;
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-GB';
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;
  return recognition;
}

function listenForWord(targetPhrase, onSuccess, onFail, micBtnId) {
  if (!speechRecognition) speechRecognition = initSpeechRecognition();
  if (!speechRecognition) {
    if (onFail) onFail('unsupported');
    return;
  try { speechRecognition.abort(); } catch {}
  }
  const btn = document.getElementById(micBtnId || 'mic-btn');
  if (btn) btn.classList.add('speaking');

  let done = false;
  const finish = (ok, spoken) => {
    if (done) return;
    done = true;
    if (btn) btn.classList.remove('speaking');
    if (ok) onSuccess();
    else if (onFail) onFail(spoken);
  };

  const norm = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  const target = norm(targetPhrase);

  speechRecognition.onresult = (event) => {
    let best = '';
    let ok = false;
    for (let i = 0; i < event.results.length; i++) {
      const res = event.results[i];
      for (let j = 0; j < res.length; j++) {
        const txt = norm(res[j].transcript);
        if (!best) best = txt;
        if (txt === target || txt.includes(target)) { ok = true; best = txt; }
      }
    }
    finish(ok, best);
  };
  speechRecognition.onerror = () => finish(false, 'error');
  speechRecognition.onend = () => finish(false, '');

  try { speechRecognition.start(); } catch (e) { finish(false, 'error'); }
}

function makeDraggable(element, onDropCallback) {
  let startX, startY, initialX, initialY, isDragging = false;
  let originalParent = element.parentNode;
  let placeholder = document.createElement('div');
  placeholder.className = 'drag-placeholder';
  placeholder.style.display = 'none';

  element.style.touchAction = 'none';

  const onStart = (e) => {
    if (element.disabled) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    startX = clientX;
    startY = clientY;
    const rect = element.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;
    isDragging = true;

    element.style.position = 'fixed';
    element.style.left = initialX + 'px';
    element.style.top = initialY + 'px';
    element.style.width = rect.width + 'px';
    element.style.height = rect.height + 'px';
    element.style.zIndex = '1000';
    element.style.pointerEvents = 'none';
    
    originalParent = element.parentNode;
    if (originalParent) {
      originalParent.insertBefore(placeholder, element);
    }
    document.body.appendChild(element);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
  };

  const onMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const dx = clientX - startX;
    const dy = clientY - startY;
    
    element.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onEnd = (e) => {
    if (!isDragging) return;
    isDragging = false;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onEnd);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onEnd);

    element.style.pointerEvents = 'auto';
    element.style.position = '';
    element.style.left = '';
    element.style.top = '';
    element.style.width = '';
    element.style.height = '';
    element.style.zIndex = '';
    element.style.transform = '';

    if (placeholder.parentNode) {
      placeholder.parentNode.insertBefore(element, placeholder);
      placeholder.remove();
    } else if (originalParent && originalParent.parentNode) {
      originalParent.appendChild(element);
    } else {
      document.body.appendChild(element);
    }
    
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    
    const dropZones = document.querySelectorAll('.drop-zone');
    let dropped = false;

    dropZones.forEach(zone => {
      const rect = zone.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
        dropped = true;
        onDropCallback(element, zone);
      }
    });

    if (!dropped) {
      playWrong();
    }
  };

  element.addEventListener('mousedown', onStart);
  element.addEventListener('touchstart', onStart, { passive: false });
}

function showMastered() {
  const container = document.getElementById('mastered-container');
  if (!container) return;
  container.innerHTML = '';
  const mastered = loadMastered();
  const entries = Object.entries(mastered);

  if (!entries.length) {
    container.innerHTML = '<div style="text-align:center; padding:30px; color:#777; font-size:1.1rem;">Пока ничего не изучено.<br>Пройди игру идеально 2 раза — слова появятся здесь.</div>';
    showScreen('mastered');
    return;
  }

  const groups = {};
  entries.forEach(([k]) => {
    const [section, setKey, word] = k.split(':');
    const gk = section + ':' + setKey;
    if (!groups[gk]) groups[gk] = { section, setKey, words: [] };
    groups[gk].words.push(word);
  });

  Object.values(groups).forEach(g => {
    let titleIcon = '', titleText = '';
    if (g.section === 'grammar') {
      const theme = GRAMMAR_THEMES[g.setKey];
      if (!theme) return;
      titleIcon = theme.icon; titleText = theme.title;
    } else {
      const setData = DATA[g.section] && DATA[g.section].sets[g.setKey];
      if (!setData) return;
      titleIcon = setData.icon; titleText = setData.title;
    }

    const block = document.createElement('div');
    block.style.marginBottom = '24px';
    block.innerHTML = `<h3 style="color:#2E7BAE; margin-bottom:12px; text-align:center; font-size:1.3rem;">${titleIcon} ${titleText}</h3>`;

    const row = document.createElement('div');
    row.style.cssText = 'display:flex; flex-wrap:wrap; gap:10px; justify-content:center;';

    g.words.forEach(word => {
      const chip = document.createElement('div');
      chip.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 12px;background:#FFF;border-radius:16px;box-shadow:0 4px 12px rgba(0,0,0,0.08);';
      chip.innerHTML = `
        <span style="font-weight:bold;color:#2E7BAE;font-size:1.05rem;">${word}</span>
        <button style="border:none;background:#FFCDD2;color:#C62828;border-radius:10px;padding:4px 10px;cursor:pointer;font-weight:bold;font-size:1rem;" title="Вернуть в игру">↩</button>
      `;
      chip.querySelector('button').addEventListener('click', () => {
        playTap();
        unmasterWord(g.section, g.setKey, word);
        showMastered();
      });
      row.appendChild(chip);
    });
    block.appendChild(row);
    container.appendChild(block);
  });
  showScreen('mastered');
}