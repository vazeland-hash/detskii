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
          // Животные
          { emoji: '🐘', word: 'elephant', ru: 'слон' },
          { emoji: '🐒', word: 'monkey',   ru: 'обезьяна' },
          { emoji: '🦁', word: 'lion',     ru: 'лев' },
          { emoji: '🐸', word: 'frog',     ru: 'жаба' },
          // Части тела
          { emoji: '👁️', word: 'eye',   ru: 'глаз' },
          { emoji: '👂', word: 'ear',   ru: 'ухо' },
          { emoji: '👃', word: 'nose',  ru: 'нос' },
          { emoji: '👄', word: 'mouth', ru: 'рот' },
          { emoji: '🦷', word: 'tooth', ru: 'зуб' },
          { emoji: '🖐️', word: 'hand',  ru: 'рука' },
          { emoji: '🦵', word: 'leg',   ru: 'нога' },
          { emoji: '👣', word: 'foot',  ru: 'ступня' }
        ]
      },
      pronouns: {
        title: 'Местоимения', ru: 'Pronouns', icon: '👥',
        cards: [
          { img: 'images/i.jpg',   word: 'I',   ru: 'я' },
          { img: 'images/you.jpg', word: 'you', ru: 'ты' },
          { emoji: '👦', word: 'he',  ru: 'он' },
          { emoji: '👧', word: 'she', ru: 'она' },
          { emoji: '🐱', word: 'it',  ru: 'оно' },
          { img: 'images/we.jpg',  word: 'we',  ru: 'мы' },
          { emoji: '👥', word: 'they', ru: 'они' }
        ],
        bonus: [],
        possessives: [
          { word: 'my',   ru: 'мой',   textOnly: true },
          { word: 'your', ru: 'твой',  textOnly: true },
          { word: 'his',  ru: 'его',   textOnly: true },
          { word: 'her',  ru: 'её',    textOnly: true },
          { word: 'its',  ru: 'его/её', textOnly: true },
          { word: 'our',  ru: 'наш',   textOnly: true },
          { word: 'their',ru: 'их',    textOnly: true }
        ],
        pairs: [
          { emoji: '❓', word: 'where', ru: 'где' },
          { emoji: '👉', word: 'there', ru: 'там' },
          { emoji: '❓', word: 'what',  ru: 'что' },
          { emoji: '👉', word: 'this',  ru: 'это' },
          { emoji: '❓', word: 'who',   ru: 'кто' },
          { emoji: '👉', word: 'that',  ru: 'тот' }
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
      verbs: {
        title: 'Глаголы', ru: 'Verbs', icon: '🏃',
        cards: [
          { img: 'images/catjumps.jpg', word: 'jump', ru: 'прыгать', emoji: '🐱' },
          { img: 'images/fishswims.jpg', word: 'swim', ru: 'плавать', emoji: '🐟' },
          { img: 'images/cateats.jpg',   word: 'eat',   ru: 'кушать',  emoji: '🍽️' },
          { img: 'images/catsleeps.jpg', word: 'sleep', ru: 'спать',   emoji: '😴' },
          { img: 'images/catreads.jpg',  word: 'read',  ru: 'читать',  emoji: '📖' },
          { img: 'images/play.jpg',      word: 'play',  ru: 'играть',  emoji: '⚽' },
          { img: 'images/catsings.jpg',  word: 'sing',  ru: 'петь',    emoji: '🎤' },
          { img: 'images/catdances.jpg', word: 'dance', ru: 'танцевать', emoji: '💃' },
          { canvasAnim: 'run',   word: 'run',   ru: 'бегать', emoji: '🏃' },
          { canvasAnim: 'walk',  word: 'walk',  ru: 'ходить', emoji: '🚶' }
        ],
        bonus: [
          { emoji: '✍️', word: 'write',  ru: 'писать' },
          { emoji: '👂', word: 'listen', ru: 'слушать' },
          { emoji: '👀', word: 'look',   ru: 'смотреть' },
          { img: 'images/climb.jpg', word: 'climb',  ru: 'лазить' },
          { img: 'images/fly.jpg',  word: 'fly',  ru: 'летать' },
          { img: 'images/dive.jpg', word: 'dive', ru: 'нырять' }
        ]
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
      numbers_1_10: {
        title: 'Числа 1–10', ru: '1-10', icon: '🔢',
        hasSpeakGame: true,
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
        ], bonus: []
      },
      numbers_11_20: {
        title: 'Числа 11–20', ru: '11-20', icon: '🔟',
        hasSpeakGame: true,
        cards: [
          { digit: '11', emoji: '🍎', word: 'eleven',   ru: 'одиннадцать' },
          { digit: '12', emoji: '🍌', word: 'twelve',   ru: 'двенадцать' },
          { digit: '13', emoji: '⭐', word: 'thirteen', ru: 'тринадцать' },
          { digit: '14', emoji: '🐱', word: 'fourteen', ru: 'четырнадцать' },
          { digit: '15', emoji: '🌸', word: 'fifteen',  ru: 'пятнадцать' },
          { digit: '16', emoji: '🍓', word: 'sixteen',  ru: 'шестнадцать' },
          { digit: '17', emoji: '🐝', word: 'seventeen',ru: 'семнадцать' },
          { digit: '18', emoji: '🍪', word: 'eighteen', ru: 'восемнадцать' },
          { digit: '19', emoji: '🐟', word: 'nineteen', ru: 'девятнадцать' },
          { digit: '20', emoji: '🌟', word: 'twenty',   ru: 'двадцать' }
        ], bonus: []
      },
      numbers_big: {
        title: 'Большие числа', ru: 'до 100', icon: '💯',
        hasSpeakGame: true,
        cards: [
          { digit: '30', emoji: '🎈', word: 'thirty',   ru: 'тридцать' },
          { digit: '40', emoji: '🎁', word: 'forty',    ru: 'сорок' },
          { digit: '50', emoji: '🏀', word: 'fifty',    ru: 'пятьдесят' },
          { digit: '60', emoji: '🍩', word: 'sixty',    ru: 'шестьдесят' },
          { digit: '70', emoji: '🚗', word: 'seventy',  ru: 'семьдесят' },
          { digit: '80', emoji: '🦋', word: 'eighty',   ru: 'восемьдесят' },
          { digit: '90', emoji: '🍉', word: 'ninety',   ru: 'девяносто' },
          { digit: '100', emoji: '💯', word: 'one hundred', ru: 'сто' }
        ], bonus: []
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
  present_simple: {
    title: 'Present Simple', ru: 'Настоящее время', icon: '📝', color: '#1E88E5',
    subtopics: {
      affirmative: { title: 'Утверждение', icon: '✅', ru: '+' },
      questions:   { title: 'Вопросы',    icon: '❓', ru: '?' },
      ending_s:    { title: 'Окончание -s', icon: '🔤', ru: '-s' }
    },
    theory: {
      affirmative: [
        { title: 'I → am', en: 'I <span class="hl-blue">am</span> happy.', ru: 'Я счастлив.', note: 'Слово <b>I</b> всегда дружит с <b>am</b>. <br><b>Маркеры:</b> <i>always, usually, every day</i>.', speak: 'I am happy.' },
        { title: 'He / She / It → is', en: 'He <span class="hl-blue">is</span> my brother.', ru: 'Он мой брат.', note: 'Слова <b>he, she, it</b> всегда дружат с <b>is</b>. <br><b>Маркеры:</b> <i>always, usually, every day</i>.', speak: 'He is my brother.' },
        { title: 'We / You / They → are', en: 'We <span class="hl-blue">are</span> friends.', ru: 'Мы друзья.', note: 'Слова <b>we, you, they</b> всегда дружат с <b>are</b>. <br><b>Маркеры:</b> <i>always, usually, every day</i>.', speak: 'We are friends.' },
        { title: 'He / She / It → + s', en: 'He <span class="hl-green">plays</span> football.', ru: 'Он играет в футбол.', note: 'После <b>he, she, it</b> добавляем к глаголу <b>-s</b>. <br><b>Маркеры:</b> <i>always, usually, every day</i>.', speak: 'He plays football.' },
        { title: 'I / You / We / They → без окончания', en: 'I <span class="hl-green">play</span>. They <span class="hl-green">read</span>.', ru: 'Я играю. Они читают.', note: 'С <b>I, you, we, they</b> окончание <b>не добавляем</b>. <br><b>Маркеры:</b> <i>always, usually, every day</i>.', speak: 'I play. They read.' }
      ],
      questions: [
        { title: 'Am / Is / Are в начале', en: '<span class="hl-orange">Am</span> I happy? <br> <span class="hl-orange">Is</span> he my brother? <br> <span class="hl-orange">Are</span> we friends?', ru: 'Я счастлив? Он мой брат? Мы друзья?', note: 'В вопросах <b>am/is/are</b> ставим в начало. <br><b>Маркеры:</b> <i>always, usually, every day</i>.', speak: 'Am I happy? Is he my brother? Are we friends?' },
        { title: 'Do / Does', en: '<span class="hl-orange">Do</span> you like apples? <br> <span class="hl-orange">Does</span> he play football?', ru: 'Ты любишь яблоки? Он играет в футбол?', note: 'Для вопросов: <b>do</b> (I/you/we/they) и <b>does</b> (he/she/it). <br><b>Маркеры:</b> <i>always, usually, every day</i>.', speak: 'Do you like apples? Does he play football?' }
      ],
      ending_s: [
        { title: 'He / She / It → + s', en: 'He <span class="hl-green">plays</span>. She <span class="hl-green">reads</span>.', ru: 'Он играет. Она читает.', note: 'После <b>he, she, it</b> добавляем <b>-s</b>. <br><b>Маркеры:</b> <i>always, usually, every day</i>.', speak: 'He plays. She reads.' },
        { title: 'Can (уметь) — без s', en: 'He <span class="hl-green">can</span> swim.', ru: 'Он умеет плавать.', note: '<b>Can</b> не меняется. <br><b>Маркеры:</b> <i>always, usually, every day</i>.', speak: 'He can swim.' }
      ]
    },
    questions: {
      affirmative: [
        { scene: 'boy', en: 'I ___ a student.', ru: 'Я студент.', options: ['am','is','are', 'be'], answer: 'am' },
        { scene: 'boy', en: 'He ___ my brother.', ru: 'Он мой брат.', options: ['am','is','are', 'be'], answer: 'is' },
        { scene: 'girl', en: 'She ___ happy.', ru: 'Она счастлива.', options: ['am','is','are', 'be'], answer: 'is' },
        { scene: 'kids', en: 'They ___ happy.', ru: 'Они счастливы.', options: ['am','is','are', 'be'], answer: 'are' },
        { scene: 'ball', en: 'He ___ football.', ru: 'Он играет в футбол.', options: ['play','plays', 'playing', 'played'], answer: 'plays' }
      ],
      questions: [
        { scene: 'boy', en: '___ you a student?', ru: 'Ты студент?', options: ['Am','Is','Are', 'Be'], answer: 'Are' },
        { scene: 'boy', en: '___ you like apples?', ru: 'Ты любишь яблоки?', options: ['Do','Does','Is', 'Are'], answer: 'Do' },
        { scene: 'boy', en: '___ he play football?', ru: 'Он играет в футбол?', options: ['Do','Does','Is', 'Are'], answer: 'Does' },
        { scene: 'girl', en: '___ she read books?', ru: 'Она читает книги?', options: ['Do','Does','Is', 'Are'], answer: 'Does' },
        { scene: 'kids', en: '___ they play together?', ru: 'Они играют вместе?', options: ['Do','Does','Is', 'Are'], answer: 'Do' }
      ],
      ending_s: [
        { scene: 'cat', en: 'It ___ milk.', ru: 'Оно любит молоко.', options: ['like','likes', 'liking', 'liked'], answer: 'likes' },
        { scene: 'boy', en: 'He ___ football.', ru: 'Он играет в футбол.', options: ['play','plays', 'playing', 'played'], answer: 'plays' },
        { scene: 'boy', en: 'I ___ swim.', ru: 'Я умею плавать.', options: ['can','cans', 'am', 'do'], answer: 'can' },
        { scene: 'boy', en: '___ you jump?', ru: 'Ты умеешь прыгать?', options: ['Can','Do', 'Are', 'Is'], answer: 'Can' },
        { scene: 'girl', en: 'She ___ to school.', ru: 'Она ходит в школу.', options: ['go','goes', 'going', 'went'], answer: 'goes' }
      ]
    }
  },
  past_simple: {
    title: 'Past Simple', ru: 'Прошедшее время', icon: '⏪', color: '#8E24AA',
    subtopics: {
      affirmative: { title: 'Утверждение', icon: '✅', ru: '+' },
      questions:   { title: 'Вопросы',    icon: '❓', ru: '?' }
    },
    theory: {
      affirmative: [
        { title: 'be → was / were', en: 'I <span class="hl-purple">was</span> happy. <br> He <span class="hl-purple">was</span> happy. <br> She <span class="hl-purple">was</span> happy. <br> They <span class="hl-purple">were</span> happy.', ru: 'Я был счастлив. Он был счастлив. Она была счастлива. Они были счастливы.', note: 'I/he/she/it → <b>was</b>. You/we/they → <b>were</b>. <br><b>Маркеры:</b> <i>yesterday, last week, ago</i>.', speak: 'I was happy. He was happy. She was happy. They were happy.' },
        { title: 'Обычные глаголы + ed', en: 'I <span class="hl-purple">played</span>. <br> He <span class="hl-purple">played</span>. <br> She <span class="hl-purple">played</span>.', ru: 'Я играл. Он играл. Она играла.', note: 'Добавляем <b>-ed</b>. <br><b>Маркеры:</b> <i>yesterday, last week, ago</i>.', speak: 'I played. He played. She played.' }
      ],
      questions: [
        { title: 'Was / Were в начале', en: '<span class="hl-purple">Was</span> he happy? <br> <span class="hl-purple">Was</span> she happy? <br> <span class="hl-purple">Were</span> they happy?', ru: 'Он был счастлив? Она была счастлива? Они были счастливы?', note: 'Ставим <b>was/were</b> в начало. <br><b>Маркеры:</b> <i>yesterday, last week, ago</i>.', speak: 'Was he happy? Was she happy? Were they happy?' },
        { title: 'Did', en: '<span class="hl-purple">Did</span> he play? <br> <span class="hl-purple">Did</span> she play? <br> <span class="hl-purple">Did</span> they play?', ru: 'Он играл? Она играла? Они играли?', note: 'Используем <b>did</b> в начале, глагол без окончания. <br><b>Маркеры:</b> <i>yesterday, last week, ago</i>.', speak: 'Did he play? Did she play? Did they play?' }
      ]
    },
    questions: {
      affirmative: [
        { scene: 'boy', en: 'I ___ happy yesterday.', ru: 'Я был счастлив вчера.', options: ['am','is','was', 'were'], answer: 'was' },
        { scene: 'girl', en: 'She ___ happy yesterday.', ru: 'Она была счастлива вчера.', options: ['am','is','was', 'were'], answer: 'was' },
        { scene: 'kids', en: 'They ___ happy yesterday.', ru: 'Они были счастливы вчера.', options: ['am','is','was', 'were'], answer: 'were' },
        { scene: 'boy', en: 'He ___ football yesterday.', ru: 'Он играл в футбол вчера.', options: ['play','plays','played', 'playing'], answer: 'played' },
        { scene: 'boy', en: 'I ___ to school yesterday.', ru: 'Я ходил в школу вчера.', options: ['go','goes','went', 'going'], answer: 'went' }
      ],
      questions: [
        { scene: 'boy', en: '___ he play football?', ru: 'Он играл в футбол?', options: ['Do','Does','Did', 'Was'], answer: 'Did' },
        { scene: 'boy', en: '___ she happy yesterday?', ru: 'Она была счастлива вчера?', options: ['Was','Were','Did', 'Is'], answer: 'Was' },
        { scene: 'kids', en: '___ they play together?', ru: 'Они играли вместе?', options: ['Do','Does','Did', 'Was'], answer: 'Did' },
        { scene: 'girl', en: '___ she read a book?', ru: 'Она читала книгу?', options: ['Do','Does','Did', 'Was'], answer: 'Did' },
        { scene: 'boy', en: '___ he at home yesterday?', ru: 'Он был дома вчера?', options: ['Was','Were','Did', 'Is'], answer: 'Was' }
      ]
    }
  },
  future_simple: {
    title: 'Future Simple', ru: 'Будущее время', icon: '⏩', color: '#43A047',
    subtopics: {
      affirmative: { title: 'Утверждение', icon: '✅', ru: '+' },
      questions:   { title: 'Вопросы',    icon: '❓', ru: '?' }
    },
    theory: {
      affirmative: [
        { title: 'will + глагол', en: 'I <span class="hl-green">will play</span>. <br> He <span class="hl-green">will play</span>. <br> She <span class="hl-green">will play</span>.', ru: 'Я буду играть. Он будет играть. Она будет играть.', note: '<b>Will</b> не меняется. <br><b>Маркеры:</b> <i>tomorrow, next week, soon</i>.', speak: 'I will play. He will play. She will play.' },
        { title: 'be → will be', en: 'I <span class="hl-green">will be</span> happy. <br> He <span class="hl-green">will be</span> happy. <br> She <span class="hl-green">will be</span> happy.', ru: 'Я буду счастлив. Он будет счастлив. Она будет счастлива.', note: 'Используем <b>will be</b>. <br><b>Маркеры:</b> <i>tomorrow, next week, soon</i>.', speak: 'I will be happy. He will be happy. She will be happy.' }
      ],
      questions: [
        { title: 'Will в начале', en: '<span class="hl-green">Will</span> you play? <br> <span class="hl-green">Will</span> he play? <br> <span class="hl-green">Will</span> she play?', ru: 'Ты будешь играть? Он будет играть? Она будет играть?', note: 'Ставим <b>will</b> в начало. <br><b>Маркеры:</b> <i>tomorrow, next week, soon</i>.', speak: 'Will you play? Will he play? Will she play?' }
      ]
    },
    questions: {
      affirmative: [
        { scene: 'boy', en: 'I ___ play football tomorrow.', ru: 'Я буду играть завтра.', options: ['will','am','is', 'do'], answer: 'will' },
        { scene: 'girl', en: 'She ___ be happy.', ru: 'Она будет счастлива.', options: ['will','is','was', 'am'], answer: 'will' },
        { scene: 'kids', en: 'They ___ come tomorrow.', ru: 'Они придут завтра.', options: ['will','are','were', 'do'], answer: 'will' },
        { scene: 'boy', en: 'He ___ read this book.', ru: 'Он прочитает эту книгу.', options: ['will','is','was', 'do'], answer: 'will' },
        { scene: 'girl', en: 'I ___ be a doctor.', ru: 'Я буду врачом.', options: ['will','am','is', 'do'], answer: 'will' }
      ],
      questions: [
        { scene: 'boy', en: '___ you play football tomorrow?', ru: 'Ты будешь играть завтра?', options: ['Do','Does','Will', 'Are'], answer: 'Will' },
        { scene: 'girl', en: '___ she come tomorrow?', ru: 'Она придет завтра?', options: ['Do','Does','Will', 'Is'], answer: 'Will' },
        { scene: 'kids', en: '___ they be happy?', ru: 'Они будут счастливы?', options: ['Do','Will','Are', 'Is'], answer: 'Will' },
        { scene: 'boy', en: '___ he read a book?', ru: 'Он прочитает книгу?', options: ['Do','Does','Will', 'Is'], answer: 'Will' },
        { scene: 'girl', en: '___ I be a doctor?', ru: 'Я буду врачом?', options: ['Am','Will','Do', 'Is'], answer: 'Will' }
      ]
    }
  },
  plural: {
    title: 'Множественное число',
    ru: 'Plurals',
    icon: '🧩',
    color: '#E65100',
    theory: [
      { title: 'Обычно + s', en: 'cat → cat<span class="hl-orange">s</span>', ru: 'кот → коты', note: 'Самое частое правило: добавляем <b>-s</b>.', speak: 'cats' },
      { title: 'После -s, -sh, -ch, -x → + es', en: 'bus → bus<span class="hl-orange">es</span>', ru: 'автобус → автобусы', note: 'Если слово кончается на <b>-s, -sh, -ch, -x</b>, добавляем <b>-es</b>.', speak: 'buses' },
      { title: 'Слова-исключения', en: 'man → <span class="hl-orange">men</span>, child → <span class="hl-orange">children</span>', ru: 'мужчина → мужчины, ребёнок → дети', note: 'Их нужно запомнить!', speak: 'men, children' }
    ],
    questions: [
      { scene: 'catTwo',   en: 'One cat, two ___',    ru: 'Один кот, два ...',        options: ['cats','cates','cat','caties'],        answer: 'cats' },
      { scene: 'bus',      en: 'One bus, two ___',    ru: 'Один автобус, два ...',    options: ['buses','buss','bus','buses'],          answer: 'buses' },
      { scene: 'man',      en: 'One man, two ___',    ru: 'Один мужчина, два ...',    options: ['mans','men','man','mens'],             answer: 'men' },
      { scene: 'kidsMany', en: 'One child, two ___',  ru: 'Один ребёнок, два ...',    options: ['childs','children','child','childes'], answer: 'children' },
      { scene: 'box',      en: 'One box, two ___',    ru: 'Одна коробка, две ...',    options: ['boxes','boxs','box','boxies'],         answer: 'boxes' }
    ]
  },

  articles: {
    title: 'Артикли',
    ru: 'Articles a / the',
    icon: '🔤',
    color: '#1E88E5',
    theory: [
      { title: 'a / an — «один из многих»', en: 'I met <span class="hl-blue">a</span> cat.', ru: 'Я встретил (какого-то) кота.', note: 'Когда предмет упоминается <b>впервые</b>. <br>Перед гласной → <b>an</b>: an apple, an egg.', speak: 'I met a cat.' },
      { title: 'the — «тот самый»', en: 'I met <span class="hl-blue">the</span> cat.', ru: 'Я встретил того самого кота.', note: 'Когда предмет <b>уже известен</b> или единственный в мире: the sun, the moon.', speak: 'I met the cat.' },
      { title: 'Без артикля (-)', en: 'I met <span class="hl-blue">cats</span>.', ru: 'Я встретил котов.', note: 'С <b>множественным числом</b> во общем смысле артикль не нужен.', speak: 'I met cats.' }
    ],
    questions: [
      { scene: 'cat_bench',   en: 'I met ___ cat.',  ru: 'Я встретил кота.',                  options: ['a','the','-'], answer: 'a'   },
      { scene: 'cat_glasses', en: 'I met ___ cat.',  ru: 'Я встретил того самого кота.',      options: ['a','the','-'], answer: 'the' },
      { scene: 'cats_many',   en: 'I met ___ cats.', ru: 'Я встретил котов.',                 options: ['a','the','-'], answer: '-'   }
    ]
  }
};