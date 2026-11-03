/* ============================================================
   ДАННЫЕ
   ============================================================ */
const DATA = {
  words: {
    title: 'Учим слова',
    sets: {
      animals: {
        title: 'Слова', ru: 'Words', icon: '📖',
        cards: [
          { emoji: '🐶', word: 'dog',    ru: 'собака' },
          { emoji: '🐱', word: 'cat',    ru: 'кошка' },
          { emoji: '🐟', word: 'fish',   ru: 'рыба' },
          { emoji: '🐦', word: 'bird',   ru: 'птица' },
          { emoji: '🐰', word: 'rabbit', ru: 'кролик' }
        ],
        bonus: [
          { emoji: '🐘', word: 'elephant', ru: 'слон' },
          { emoji: '🐒', word: 'monkey',   ru: 'обезьяна' }
        ]
      },
       pronouns: {
        title: 'Местоимения', ru: 'Pronouns', icon: '👥',
        cards: [
          { img: 'images/i.jpg',   word: 'I',   ru: 'я' },      // Есть
          { img: 'images/you.jpg', word: 'you', ru: 'ты' },     // Есть
          { emoji: '👦', word: 'he',  ru: 'он' },               // Нет
          { emoji: '👧', word: 'she', ru: 'она' },              // Нет
          { emoji: '🐱', word: 'it',  ru: 'оно' },              // Нет
          { img: 'images/we.jpg',  word: 'we',  ru: 'мы' },     // Есть
          { emoji: '👥', word: 'they', ru: 'они' }              // Нет
        ],
        bonus: [],
        possessives: [
          { emoji: '👦', word: 'my',   ru: 'мой' }, { emoji: '👉', word: 'your', ru: 'твой' },
          { emoji: '👨', word: 'his',  ru: 'его' }, { emoji: '👩', word: 'her',  ru: 'её' },
          { emoji: '🐱', word: 'its',  ru: 'его/её' }, { emoji: '👫', word: 'our',  ru: 'наш' },
          { emoji: '👨‍👩‍👧‍👦', word: 'their',ru: 'их' }
        ],
        pairs: [
          { emoji: '❓', word: 'where', ru: 'где' }, { emoji: '👉', word: 'there', ru: 'там' },
          { emoji: '❓', word: 'what',  ru: 'что' }, { emoji: '👉', word: 'this',  ru: 'это' },
          { emoji: '❓', word: 'who',   ru: 'кто' }, { emoji: '👉', word: 'that',  ru: 'тот' }
        ]
      },
        verbs: {
        title: 'Глаголы', ru: 'Verbs', icon: '🏃',
        cards: [
          { img: 'images/catjumps.jpg',  word: 'jump',  ru: 'прыгать', emoji: '🐱' },
          { img: 'images/fishswims.jpg', word: 'swim',  ru: 'плавать', emoji: '🐟' },
          { img: 'images/cateats.jpg',   word: 'eat',   ru: 'кушать',  emoji: '🍽️' },
          { img: 'images/catsleeps.jpg', word: 'sleep', ru: 'спать',   emoji: '😴' },
          { img: 'images/catreads.jpg',  word: 'read',  ru: 'читать',  emoji: '📖' },
          { img: 'images/play.jpg',      word: 'play',  ru: 'играть',  emoji: '⚽' },
          { img: 'images/catsings.jpg',  word: 'sing',  ru: 'петь',    emoji: '🎤' },
          { img: 'images/catdances.jpg', word: 'dance', ru: 'танцевать', emoji: '💃' },
          { canvasAnim: 'run',   word: 'run',   ru: 'бегать' }, // Картинки нет, будет анимация
          { canvasAnim: 'walk',  word: 'walk',  ru: 'ходить' }  // Картинки нет, будет анимация
        ],
        bonus: [
          { emoji: '✍️', word: 'write',  ru: 'писать' },
          { emoji: '👂', word: 'listen', ru: 'слушать' },
          { emoji: '👀', word: 'look',   ru: 'смотреть' }
        ]
      },
      prepositions: {
        title: 'Предлоги', ru: 'Prepositions', icon: '📦',
        cards: [
          { svg: () => prepositionCardScene('in'),          word: 'in',          ru: 'в' },
          { svg: () => prepositionCardScene('on'),          word: 'on',          ru: 'на' },
          { svg: () => prepositionCardScene('under'),       word: 'under',       ru: 'под' },
          { svg: () => prepositionCardScene('next to'),     word: 'next to',     ru: 'рядом с' },
          { svg: () => prepositionCardScene('behind'),      word: 'behind',      ru: 'за' },
          { svg: () => prepositionCardScene('in front of'), word: 'in front of', ru: 'перед' },
          { svg: () => pictureSceneDynamic('above'),        word: 'above',       ru: 'над' },
          { svg: () => thermometerScene('below'),           word: 'below',       ru: 'под (ниже)' }
        ],
        bonus: []
      },

    }
  },
  colors: {
    title: 'Цвета и формы',
    sets: {
      colors: {
        title: 'Цвета', ru: 'Colors', icon: '🌈',
        cards: [
          { color: '#E53935', word: 'red',    ru: 'красный' },
          { color: '#1E88E5', word: 'blue',   ru: 'синий' },
          { color: '#FDD835', word: 'yellow', ru: 'жёлтый' },
          { color: '#43A047', word: 'green',  ru: 'зелёный' },
          { color: '#FB8C00', word: 'orange', ru: 'оранжевый' },
          { color: '#8E24AA', word: 'purple', ru: 'фиолетовый' },
          { color: '#EC407A', word: 'pink',   ru: 'розовый' },
          { color: '#6D4C41', word: 'brown',  ru: 'коричневый' }
        ],
        bonus: []
      },
      shapes: {
        title: 'Формы', ru: 'Shapes', icon: '🔷',
        cards: [
          { shape: 'circle',    word: 'circle',    ru: 'круг' },
          { shape: 'square',    word: 'square',    ru: 'квадрат' },
          { shape: 'triangle',  word: 'triangle',  ru: 'треугольник' },
          { shape: 'rectangle', word: 'rectangle', ru: 'прямоугольник' },
          { shape: 'star',      word: 'star',      ru: 'звезда' },
          { shape: 'heart',     word: 'heart',     ru: 'сердце' }
        ],
        bonus: []
      }
    }
  },
  numbers: {
    title: 'Учим числа',
    sets: {
      numbers: {
        title: 'Числа 1–10', ru: 'Numbers', icon: '🔢',
        cards: [
          { digit: '1',  emoji: '🍎', word: 'one',   ru: 'один' },
          { digit: '2',  emoji: '🍌', word: 'two',   ru: 'два' },
          { digit: '3',  emoji: '⭐', word: 'three', ru: 'три' },
          { digit: '4',  emoji: '🐱', word: 'four',  ru: 'четыре' },
          { digit: '5',  emoji: '🌸', word: 'five',  ru: 'пять' },
          { digit: '6',  emoji: '🍓', word: 'six',   ru: 'шесть' },
          { digit: '7',  emoji: '🐝', word: 'seven', ru: 'семь' },
          { digit: '8',  emoji: '🍪', word: 'eight', ru: 'восемь' },
          { digit: '9',  emoji: '🐟', word: 'nine',  ru: 'девять' },
          { digit: '10', emoji: '🌟', word: 'ten',   ru: 'десять' }
        ],
        bonus: []
      }
    }
  }
};

const FEED_DATA = {
  fruits: [
    { emoji: '🥕', word: 'carrot',  ru: 'морковь' },
    { emoji: '🍎', word: 'apple',   ru: 'яблоко' },
    { emoji: '🍌', word: 'banana',  ru: 'банан' },
    { emoji: '🍐', word: 'pear',    ru: 'груша' }
  ]
};

const PREP_GAME_DATA = {
  preps: [
    { key: 'in',          ru: 'в' },
    { key: 'on',          ru: 'на' },
    { key: 'under',       ru: 'под' },
    { key: 'next to',     ru: 'рядом с' },
    { key: 'behind',      ru: 'за' },
    { key: 'in front of', ru: 'перед' },
    { key: 'above',       ru: 'над' },      
    { key: 'below',       ru: 'под (ниже)' }
  ],
  items: [
    { emoji: '🐱', word: 'cat',   ru: 'кот' },
    { emoji: '⚽', word: 'ball',  ru: 'мяч' },
    { emoji: '📖', word: 'book',  ru: 'книга' },
    { emoji: '🧸', word: 'teddy', ru: 'мишка' }
  ]
};

const SHAPE_COLOR_DATA = {
  colors: ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'pink'],
  colorHex: {
    red: '#E53935', blue: '#1E88E5', yellow: '#FDD835',
    green: '#43A047', orange: '#FB8C00', purple: '#8E24AA', pink: '#EC407A'
  },
  colorRu: {
    red: 'красный', blue: 'синий', yellow: 'жёлтый', green: 'зелёный',
    orange: 'оранжевый', purple: 'фиолетовый', pink: 'розовый'
  },
  shapes: ['circle', 'square', 'triangle', 'rectangle', 'star', 'heart'],
  shapeRu: {
    circle: 'круг', square: 'квадрат', triangle: 'треугольник',
    rectangle: 'прямоугольник', star: 'звезда', heart: 'сердце'
  }
};

const ACTION_DATA = {
  tasks: [
    { animal: 'cat',      action: 'run',   phrase: 'The cat runs',      ru: 'Кот бежит' },
    { animal: 'dog',      action: 'jump',  phrase: 'The dog jumps',     ru: 'Собака прыгает' },
    { animal: 'elephant', action: 'walk',  phrase: 'The elephant walks',ru: 'Слон идёт' },
    { animal: 'cat',      action: 'dance', phrase: 'The cat dances',    ru: 'Кот танцует' },
    { animal: 'fish',     action: 'swim',  phrase: 'The fish swims',    ru: 'Рыба плывёт' },
    { animal: 'bird',     action: 'sing',  phrase: 'The bird sings',    ru: 'Птица поёт' },
    { animal: 'cat',      action: 'eat',   phrase: 'The cat eats',      ru: 'Кот ест' },
    { animal: 'dog',      action: 'sleep', phrase: 'The dog sleeps',    ru: 'Собака спит' },
    { animal: 'cat',      action: 'read',  phrase: 'The cat reads',     ru: 'Кот читает' },
    { animal: 'cat',      action: 'play',  phrase: 'The cat plays',     ru: 'Кот играет' }
  ]
};

const NUMBER_WORDS = ['one','two','three','four','five','six','seven','eight','nine','ten'];

const VOICE_PHRASES = [
  'I am happy', 'He is a boy', 'She is a girl', 'It is a cat',
  'We are friends', 'They are kids', 'You are kind', 'I am a student',
  'The dog runs', 'The cat eats', 'He plays football', 'She reads a book',
  'I like apples', 'There is a ball', 'It is red', 'I can jump',
  'The bird sings', 'We go to school', 'They are happy', 'I have a dog'
];

const GRAMMAR_THEMES = {
  present_simple_affirmative: {
    title: 'Present Simple: +',
    ru: 'Утверждение',
    icon: '✅',
    color: '#1E88E5',
    theory: [
      { title: 'I → am', en: 'I <span class="hl-blue">am</span> happy.', ru: 'Я счастлив.', note: 'Слово <b>I</b> всегда дружит с <b>am</b>.', speak: 'I am happy.' },
      { title: 'He / She / It → is', en: 'He <span class="hl-blue">is</span> my brother.', ru: 'Он мой брат.', note: 'Слова <b>he, she, it</b> всегда дружат с <b>is</b>.', speak: 'He is my brother.' },
      { title: 'We / You / They → are', en: 'We <span class="hl-blue">are</span> friends.', ru: 'Мы друзья.', note: 'Слова <b>we, you, they</b> всегда дружат с <b>are</b>.', speak: 'We are friends.' },
      { title: 'He / She / It → + s', en: 'He <span class="hl-green">plays</span> football.', ru: 'Он играет в футбол.', note: 'После <b>he, she, it</b> добавляем к глаголу <b>-s</b>.', speak: 'He plays football.' },
      { title: 'I / You / We / They → без окончания', en: 'I <span class="hl-green">play</span>. They <span class="hl-green">read</span>.', ru: 'Я играю. Они читают.', note: 'С <b>I, you, we, they</b> окончание <b>не добавляем</b>.', speak: 'I play. They read.' }
    ],
    questions: [
      { scene: 'boy', en: 'I ___ a student.', ru: 'Я студент.', options: ['am','is','are', 'be'], answer: 'am' },
      { scene: 'boy', en: 'He ___ my brother.', ru: 'Он мой брат.', options: ['am','is','are', 'be'], answer: 'is' },
      { scene: 'girl', en: 'She ___ happy.', ru: 'Она счастлива.', options: ['am','is','are', 'be'], answer: 'is' },
      { scene: 'kids', en: 'They ___ happy.', ru: 'Они счастливы.', options: ['am','is','are', 'be'], answer: 'are' },
      { scene: 'ball', en: 'He ___ football.', ru: 'Он играет в футбол.', options: ['play','plays', 'playing', 'played'], answer: 'plays' }
    ]
  },
  present_simple_questions: {
    title: 'Present Simple: ?',
    ru: 'Вопросы',
    icon: '❓',
    color: '#E65100',
    theory: [
      { title: 'Am / Is / Are в начале', en: '<span class="hl-orange">Am</span> I happy? <br> <span class="hl-orange">Is</span> he my brother? <br> <span class="hl-orange">Are</span> we friends?', ru: 'Я счастлив? Он мой брат? Мы друзья?', note: 'В вопросах <b>am/is/are</b> ставим в начало.', speak: 'Am I happy? Is he my brother? Are we friends?' },
      { title: 'Do / Does', en: '<span class="hl-orange">Do</span> you like apples? <br> <span class="hl-orange">Does</span> he play football?', ru: 'Ты любишь яблоки? Он играет в футбол?', note: 'Для вопросов используем <b>do</b> (I/you/we/they) и <b>does</b> (he/she/it).', speak: 'Do you like apples? Does he play football?' }
    ],
    questions: [
      { scene: 'boy', en: '___ you a student?', ru: 'Ты студент?', options: ['Am','Is','Are', 'Be'], answer: 'Are' },
      { scene: 'boy', en: '___ you like apples?', ru: 'Ты любишь яблоки?', options: ['Do','Does','Is', 'Are'], answer: 'Do' },
      { scene: 'boy', en: '___ he play football?', ru: 'Он играет в футбол?', options: ['Do','Does','Is', 'Are'], answer: 'Does' }
    ]
  },
  present_simple_ending_s: {
    title: 'Present Simple: -s',
    ru: 'Окончание -s',
    icon: '🔤',
    color: '#43A047',
    theory: [
      { title: 'He / She / It → + s', en: 'He <span class="hl-green">plays</span>. She <span class="hl-green">reads</span>.', ru: 'Он играет. Она читает.', note: 'После <b>he, she, it</b> добавляем <b>-s</b> к глаголу.', speak: 'He plays. She reads.' },
      { title: 'Can (уметь) — без s', en: 'He <span class="hl-green">can</span> swim.', ru: 'Он умеет плавать.', note: '<b>Can</b> не меняется. Окончание <b>-s</b> не добавляем.', speak: 'He can swim.' }
    ],
    questions: [
      { scene: 'cat', en: 'It ___ milk.', ru: 'Оно любит молоко.', options: ['like','likes', 'liking', 'liked'], answer: 'likes' },
      { scene: 'boy', en: 'He ___ football.', ru: 'Он играет в футбол.', options: ['play','plays', 'playing', 'played'], answer: 'plays' },
      { scene: 'boy', en: 'I ___ swim.', ru: 'Я умею плавать.', options: ['can','cans', 'am', 'do'], answer: 'can' },
      { scene: 'boy', en: '___ you jump?', ru: 'Ты умеешь прыгать?', options: ['Can','Do', 'Are', 'Is'], answer: 'Can' }
    ]
  },
  plural: {
    title: 'Множественное число',
    ru: 'Plurals',
    icon: '🧩',
    color: '#E65100',
    theory: [
      {
        title: 'Обычно + s',
        en: 'cat → cat<span class="hl-orange">s</span>, dog → dog<span class="hl-orange">s</span>.',
        ru: 'кот → коты, собака → собаки.',
        note: 'Самое частое правило: добавляем <b>-s</b>.',
        speak: 'cats, dogs'
      },
      {
        title: 'После -s, -sh, -ch, -x → + es',
        en: 'bus → bus<span class="hl-orange">es</span>, box → box<span class="hl-orange">es</span>.',
        ru: 'автобус → автобусы, коробка → коробки.',
        note: 'Если слово кончается на <b>-s, -sh, -ch, -x</b>, добавляем <b>-es</b>.',
        speak: 'buses, boxes'
      },
      {
        title: 'Слова-исключения',
        en: 'man → <span class="hl-orange">men</span>, woman → <span class="hl-orange">women</span>, child → <span class="hl-orange">children</span>, mouse → <span class="hl-orange">mice</span>.',
        ru: 'мужчина → мужчины, женщина → женщины, ребёнок → дети, мышь → мыши.',
        note: 'Эти слова меняются по-особому — их нужно запомнить!',
        speak: 'men, women, children, mice'
      }
    ],
    questions: [
      { scene: 'catTwo',    en: 'One cat, two ___',      ru: 'Один кот, два ...',       options: ['cats','cates', 'cat', 'caties'], answer: 'cats' },
      { scene: 'bus',       en: 'One bus, two ___',      ru: 'Один автобус, два ...',   options: ['buses','buss', 'bus', 'buses'], answer: 'buses' },
      { scene: 'box',       en: 'One box, two ___',      ru: 'Одна коробка, две ...',   options: ['boxes','boxs', 'box', 'boxies'], answer: 'boxes' },
      { scene: 'man',       en: 'One man, two ___',      ru: 'Один мужчина, два ...',   options: ['mans','men', 'man', 'mens'], answer: 'men' },
      { scene: 'woman',     en: 'One woman, two ___',    ru: 'Одна женщина, две ...',   options: ['womans','women', 'woman', 'womens'], answer: 'women' },
      { scene: 'kidsMany',  en: 'One child, two ___',    ru: 'Один ребёнок, два ...',   options: ['childs','children', 'child', 'childes'], answer: 'children' }
    ]
  },
  past_simple: {
    title: 'Past Simple',
    ru: 'Прошедшее время',
    icon: '⏪',
    color: '#8E24AA',
    theory: [
      {
        title: 'be → was / were',
        en: 'I <span class="hl-purple">was</span> happy. <br> They <span class="hl-purple">were</span> happy.',
        ru: 'Я был счастлив. Они были счастливы.',
        note: 'I/he/she/it → <b>was</b>. You/we/they → <b>were</b>.',
        speak: 'I was happy. They were happy.'
      },
      {
        title: 'Вопросы с was/were',
        en: '<span class="hl-purple">Was</span> he happy? <br> <span class="hl-purple">Were</span> they happy?',
        ru: 'Он был счастлив? Они были счастливы?',
        note: 'Ставим <b>was/were</b> в начало.',
        speak: 'Was he happy? Were they happy?'
      },
      {
        title: 'Обычные глаголы + ed',
        en: 'I <span class="hl-purple">played</span>. He <span class="hl-purple">played</span>.',
        ru: 'Я играл. Он играл.',
        note: 'Добавляем <b>-ed</b> к глаголу.',
        speak: 'I played. He played.'
      },
      {
        title: 'Вопросы с did',
        en: '<span class="hl-purple">Did</span> you play? <br> <span class="hl-purple">Did</span> he play?',
        ru: 'Ты играл? Он играл?',
        note: 'Используем <b>did</b> в начале, глагол без окончания.',
        speak: 'Did you play? Did he play?'
      }
    ],
    questions: [
      { scene: 'boy', en: 'I ___ happy yesterday.', ru: 'Я был счастлив вчера.', options: ['am','is','was', 'were'], answer: 'was' },
      { scene: 'kids', en: 'They ___ happy yesterday.', ru: 'Они были счастливы вчера.', options: ['am','is','was', 'were'], answer: 'were' },
      { scene: 'boy', en: '___ he play football?', ru: 'Он играл в футбол?', options: ['Do','Does','Did', 'Was'], answer: 'Did' },
      { scene: 'boy', en: 'I ___ football yesterday.', ru: 'Я играл в футбол вчера.', options: ['play','plays','played', 'playing'], answer: 'played' }
    ]
  },
  future_simple: {
    title: 'Future Simple',
    ru: 'Будущее время',
    icon: '⏩',
    color: '#43A047',
    theory: [
      {
        title: 'will + глагол',
        en: 'I <span class="hl-green">will play</span>. He <span class="hl-green">will play</span>.',
        ru: 'Я буду играть. Он будет играть.',
        note: '<b>Will</b> не меняется, глагол без окончания.',
        speak: 'I will play. He will play.'
      },
      {
        title: 'Вопросы с will',
        en: '<span class="hl-green">Will</span> you play? <br> <span class="hl-green">Will</span> he play?',
        ru: 'Ты будешь играть? Он будет играть?',
        note: 'Ставим <b>will</b> в начало.',
        speak: 'Will you play? Will he play?'
      },
      {
        title: 'be → will be',
        en: 'I <span class="hl-green">will be</span> happy. <br> They <span class="hl-green">will be</span> happy.',
        ru: 'Я буду счастлив. Они будут счастливы.',
        note: 'Для будущего используем <b>will be</b>.',
        speak: 'I will be happy. They will be happy.'
      }
    ],
    questions: [
      { scene: 'boy', en: 'I ___ play football tomorrow.', ru: 'Я буду играть в футбол завтра.', options: ['will','am','is', 'do'], answer: 'will' },
      { scene: 'boy', en: '___ you play football tomorrow?', ru: 'Ты будешь играть в футбол завтра?', options: ['Do','Does','Will', 'Are'], answer: 'Will' },
      { scene: 'girl', en: 'She ___ be happy.', ru: 'Она будет счастлива.', options: ['will','is','was', 'am'], answer: 'will' }
    ]
  }
};