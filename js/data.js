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
          { emoji: '🐰', word: 'rabbit', ru: 'кролик' },
          { emoji: '🐸', word: 'frog',   ru: 'лягушка' },
          { emoji: '🐷', word: 'pig',    ru: 'свинья' },
          { emoji: '🐮', word: 'cow',    ru: 'корова' },
          { emoji: '🐴', word: 'horse',  ru: 'лошадь' },
          { emoji: '🦁', word: 'lion',   ru: 'лев' }
        ],
        bonus: [
          { emoji: '🐘', word: 'elephant', ru: 'слон' },
          { emoji: '🐒', word: 'monkey',   ru: 'обезьяна' },
          { emoji: '🐻', word: 'bear',     ru: 'медведь' },
          { emoji: '🦒', word: 'giraffe',  ru: 'жираф' },
          { emoji: '🐧', word: 'penguin',  ru: 'пингвин' }
        ]
      },
      pronouns: {
        title: 'Местоимения', ru: 'Pronouns', icon: '👥',
        cards: [
          { img: 'images/i.jpg',   word: 'I',   ru: 'я' },
          { img: 'images/you.jpg', word: 'you', ru: 'ты' },
          { img: 'images/he.jpg',  word: 'he',  ru: 'он' },
          { img: 'images/she.jpg', word: 'she', ru: 'она' },
          { img: 'images/it.jpg',  word: 'it',  ru: 'оно' },
          { img: 'images/we.jpg',  word: 'we',  ru: 'мы' },
          { img: 'images/they.jpg', word: 'they', ru: 'они' }
        ],
        bonus: [],
        possessives: [
          { emoji: '👦', word: 'my',   ru: 'мой' },
          { emoji: '👉', word: 'your', ru: 'твой' },
          { emoji: '👨', word: 'his',  ru: 'его' },
          { emoji: '👩', word: 'her',  ru: 'её' },
          { emoji: '🐱', word: 'its',  ru: 'его/её (для животных)' },
          { emoji: '👫', word: 'our',  ru: 'наш' },
          { emoji: '👨‍👩‍👧‍👦', word: 'their',ru: 'их' }
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
          { svg: () => actionSceneSVG('cat', 'run'), word: 'run',   ru: 'бегать' },
          { svg: () => actionSceneSVG('elephant', 'walk'), word: 'walk',   ru: 'ходить' },
          { img: 'images/cat jumps.jpg', word: 'jump',  ru: 'прыгать' },
          { img: 'images/fish swims.jpg', word: 'swim',  ru: 'плавать' },
          { img: 'images/cat eats.jpg', word: 'eat',   ru: 'кушать' },
          { img: 'images/cat sleeps.jpg', word: 'sleep', ru: 'спать' },
          { img: 'images/cat reads.jpg', word: 'read',  ru: 'читать' },
          { img: 'images/children play.jpg', word: 'play',  ru: 'играть' },
          { img: 'images/cat sings.jpg', word: 'sing',  ru: 'петь' },
          { img: 'images/cat dances.jpg', word: 'dance', ru: 'танцевать' }
        ],
        bonus: [
          { emoji: '✍️', word: 'write',  ru: 'писать' },
          { emoji: '👂', word: 'listen', ru: 'слушать' },
          { emoji: '👀', word: 'look',   ru: 'смотреть' }
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
  present_simple: {
    title: 'Present Simple',
    ru: 'be и окончание -s',
    icon: '📝',
    color: '#1E88E5',
    theory: [
      {
        title: 'I → am',
        en: 'I <span class="hl-blue">am</span> happy. <br> <span class="hl-blue">Am</span> I happy?',
        ru: 'Я счастлив. Я счастлив?',
        note: 'Слово <b>I</b> всегда дружит с <b>am</b>.',
        speak: 'I am happy. Am I happy?'
      },
      {
        title: 'He / She / It → is',
        en: 'He <span class="hl-blue">is</span> my brother. <br> <span class="hl-blue">Is</span> he my brother?',
        ru: 'Он мой брат. Он мой брат?',
        note: 'Слова <b>he, she, it</b> всегда дружат с <b>is</b>.',
        speak: 'He is my brother. Is he my brother?'
      },
      {
        title: 'We / You / They → are',
        en: 'We <span class="hl-blue">are</span> friends. <br> <span class="hl-blue">Are</span> we friends?',
        ru: 'Мы друзья. Мы друзья?',
        note: 'Слова <b>we, you, they</b> всегда дружат с <b>are</b>.',
        speak: 'We are friends. Are we friends?'
      },
      {
        title: 'He / She / It → + s',
        en: 'He <span class="hl-green">plays</span> football.',
        ru: 'Он играет в футбол.',
        note: 'После <b>he, she, it</b> добавляем к глаголу <b>-s</b>.',
        speak: 'He plays football.'
      },
      {
        title: 'I / You / We / They → без окончания',
        en: 'I <span class="hl-green">play</span>. They <span class="hl-green">read</span>.',
        ru: 'Я играю. Они читают.',
        note: 'С <b>I, you, we, they</b> окончание <b>не добавляем</b>.',
        speak: 'I play. They read.'
      }
    ],
    questions: [
      { scene: 'boy', en: 'I ___ a student.', ru: 'Я студент.', options: ['am','is','are', 'be'], answer: 'am' },
      { scene: 'boy', en: '___ am happy.', ru: 'Я счастлив.', options: ['I','He','They', 'We'], answer: 'I' },
      { scene: 'boy', en: '___ you a student?', ru: 'Ты студент?', options: ['Am','Is','Are', 'Be'], answer: 'Are' },
      { scene: 'girl', en: 'You ___ kind.', ru: 'Ты добрый.', options: ['am','is','are', 'be'], answer: 'are' },
      { scene: 'boy', en: 'He ___ my brother.', ru: 'Он мой брат.', options: ['am','is','are', 'be'], answer: 'is' },
      { scene: 'boy', en: '___ he a student?', ru: 'Он студент?', options: ['Am','Is','Are', 'Be'], answer: 'Is' },
      { scene: 'girl', en: 'She ___ happy.', ru: 'Она счастлива.', options: ['am','is','are', 'be'], answer: 'is' },
      { scene: 'cat', en: '___ it a cat?', ru: 'Это кот?', options: ['Am','Is','Are', 'Be'], answer: 'Is' },
      { scene: 'family', en: 'We ___ a family.', ru: 'Мы семья.', options: ['am','is','are', 'be'], answer: 'are' },
      { scene: 'kids', en: 'They ___ kids.', ru: 'Они дети.', options: ['am','is','are', 'be'], answer: 'are' },
      { scene: 'kids', en: '___ they happy?', ru: 'Они счастливы?', options: ['Am','Is','Are', 'Be'], answer: 'Are' },
      { scene: 'ball',   en: 'He ___ football.',       ru: 'Он играет в футбол.',     options: ['play','plays', 'playing', 'played'],       answer: 'plays' },
      { scene: 'boy',    en: 'I ___ every day.',       ru: 'Я играю каждый день.',    options: ['play','plays', 'playing', 'played'],       answer: 'play' },
      { scene: 'school', en: 'She ___ to school.',     ru: 'Она ходит в школу.',      options: ['go','goes', 'going', 'went'],          answer: 'goes' },
      { scene: 'tv',     en: 'He ___ TV.',             ru: 'Он смотрит ТВ.',          options: ['watch','watches', 'watching', 'watched'],    answer: 'watches' },
      { scene: 'book',   en: 'She ___ a book.',        ru: 'Она читает книгу.',       options: ['read','reads', 'reading', 'readed'],       answer: 'reads' },
      { scene: 'cat',    en: 'It ___ milk.',           ru: 'Оно любит молоко.',       options: ['like','likes', 'liking', 'liked'],       answer: 'likes' },
    ]
  }
};