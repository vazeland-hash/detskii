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
          { emoji: '🦁', word: 'lion',   ru: 'лев' },
          { emoji: '👩', word: 'mother', ru: 'мама' },
          { emoji: '👨', word: 'father', ru: 'папа' },
          { emoji: '👧', word: 'sister', ru: 'сестра' },
          { emoji: '👦', word: 'brother', ru: 'брат' },
          { emoji: '👵', word: 'grandmother', ru: 'бабушка' },
          { emoji: '👴', word: 'grandfather', ru: 'дедушка' },
          { emoji: '👶', word: 'baby', ru: 'малыш' },
          { emoji: '👨‍👩‍👧', word: 'family', ru: 'семья' },
          { emoji: '🍎', word: 'apple', ru: 'яблоко' },
          { emoji: '🍌', word: 'banana', ru: 'банан' },
          { emoji: '🥛', word: 'milk', ru: 'молоко' },
          { emoji: '🍞', word: 'bread', ru: 'хлеб' },
          { emoji: '🧀', word: 'cheese', ru: 'сыр' },
          { emoji: '🥕', word: 'carrot', ru: 'морковь' },
          { emoji: '🍗', word: 'chicken', ru: 'курица' },
          { emoji: '🍦', word: 'ice cream', ru: 'мороженое' }
        ],
        bonus: [
          { emoji: '🐘', word: 'elephant', ru: 'слон' },
          { emoji: '🐒', word: 'monkey',   ru: 'обезьяна' },
          { emoji: '🐻', word: 'bear',     ru: 'медведь' },
          { emoji: '🦒', word: 'giraffe',  ru: 'жираф' },
          { emoji: '🐧', word: 'penguin',  ru: 'пингвин' },
          { emoji: '🧑‍🦱', word: 'uncle', ru: 'дядя' },
          { emoji: '👩‍🦰', word: 'aunt', ru: 'тётя' },
          { emoji: '🧑‍🤝‍🧑', word: 'parents', ru: 'родители' },
          { emoji: '🍕', word: 'pizza', ru: 'пицца' },
          { emoji: '🍫', word: 'chocolate', ru: 'шоколад' },
          { emoji: '🥤', word: 'juice', ru: 'сок' }
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
          { emoji: '👫', word: 'we',  ru: 'мы' },
          { emoji: '👨‍👩‍👧‍👦', word: 'they', ru: 'они' }
        ],
        bonus: []
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
          { emoji: '🏃', word: 'run',   ru: 'бегать' },
          { emoji: '🤸', word: 'jump',  ru: 'прыгать' },
          { emoji: '🏊', word: 'swim',  ru: 'плавать' },
          { emoji: '🍽️', word: 'eat',   ru: 'кушать' },
          { emoji: '😴', word: 'sleep', ru: 'спать' },
          { emoji: '📖', word: 'read',  ru: 'читать' },
          { emoji: '⚽', word: 'play',  ru: 'играть' },
          { emoji: '🎤', word: 'sing',  ru: 'петь' },
          { emoji: '💃', word: 'dance', ru: 'танцевать' },
          { emoji: '🚶', word: 'walk',  ru: 'ходить' }
        ],
        bonus: [
          { emoji: '✍️', word: 'write',  ru: 'писать' },
          { emoji: '👂', word: 'listen', ru: 'слушать' },
          { emoji: '👀', word: 'look',   ru: 'смотреть' }
        ]
      }
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
const SIZE_DATA = {
  animals: [
    { emoji: '🐘', ru: 'слон' },
    { emoji: '🐕', ru: 'собака' },
    { emoji: '🐈', ru: 'кошка' },
    { emoji: '🐇', ru: 'кролик' },
    { emoji: '🐁', ru: 'мышь' }
  ]
};

/* ---------- 20 фраз для голосового ввода ---------- */
const VOICE_PHRASES = [
  'I am happy', 'He is a boy', 'She is a girl', 'It is a cat',
  'We are friends', 'They are kids', 'You are kind', 'I am a student',
  'The dog runs', 'The cat eats', 'He plays football', 'She reads a book',
  'I like apples', 'There is a ball', 'It is red', 'I can jump',
  'The bird sings', 'We go to school', 'They are happy', 'I have a dog'
];

const GRAMMAR_THEMES = {
  be: {
    title: 'Глагол be',
    ru: 'am / is / are',
    icon: '🐝',
    color: '#1E88E5',
    theory: [
      {
        title: 'I → am',
        en: 'I <span class="hl-blue">am</span> happy.',
        ru: 'Я счастлив.',
        note: 'Слово <b>I</b> всегда дружит с <b>am</b>.',
        speak: 'I am happy.'
      },
      {
        title: 'He / She / It → is',
        en: 'He <span class="hl-blue">is</span> my brother. She <span class="hl-blue">is</span> a student. It <span class="hl-blue">is</span> a cat.',
        ru: 'Он мой брат. Она студентка. Это кот.',
        note: 'Слова <b>he, she, it</b> всегда дружат с <b>is</b>.',
        speak: 'He is my brother. She is a student. It is a cat.'
      },
      {
        title: 'We / You / They → are',
        en: 'We <span class="hl-blue">are</span> friends. You <span class="hl-blue">are</span> kind. They <span class="hl-blue">are</span> kids.',
        ru: 'Мы друзья. Ты добрый. Они дети.',
        note: 'Слова <b>we, you, they</b> всегда дружат с <b>are</b>.',
        speak: 'We are friends. You are kind. They are kids.'
      }
    ],
    questions: [
      { scene: 'boy', en: 'I ___ a student.', ru: 'Я студент.', options: ['am','is','are'], answer: 'am' },
      { scene: 'boy', en: '___ am happy.', ru: 'Я счастлив.', options: ['I','He','They'], answer: 'I' },
      { scene: 'girl', en: 'You ___ kind.', ru: 'Ты добрый.', options: ['am','is','are'], answer: 'are' },
      { scene: 'boy', en: '___ are my friend.', ru: 'Ты мой друг.', options: ['You','He','It'], answer: 'You' },
      { scene: 'boy', en: 'He ___ my brother.', ru: 'Он мой брат.', options: ['am','is','are'], answer: 'is' },
      { scene: 'boy', en: '___ is a student.', ru: 'Он студент.', options: ['She','He','It'], answer: 'He' },
      { scene: 'girl', en: 'She ___ happy.', ru: 'Она счастлива.', options: ['am','is','are'], answer: 'is' },
      { scene: 'girl', en: '___ is my sister.', ru: 'Она моя сестра.', options: ['He','She','It'], answer: 'She' },
      { scene: 'cat', en: 'It ___ a cat.', ru: 'Это кот.', options: ['am','is','are'], answer: 'is' },
      { scene: 'dog', en: '___ is a dog.', ru: 'Это собака.', options: ['He','She','It'], answer: 'It' },
      { scene: 'family', en: 'We ___ a family.', ru: 'Мы семья.', options: ['am','is','are'], answer: 'are' },
      { scene: 'kids', en: '___ are friends.', ru: 'Мы друзья.', options: ['We','They','I'], answer: 'We' },
      { scene: 'kids', en: 'They ___ kids.', ru: 'Они дети.', options: ['am','is','are'], answer: 'are' },
      { scene: 'kids', en: '___ are happy.', ru: 'Они счастливы.', options: ['We','He','They'], answer: 'They' }
    ]
  },
  suffix: {
    title: 'Окончание -s / -es',
    ru: 'he / she / it + глагол',
    icon: '✏️',
    color: '#2E7D32',
    theory: [
      {
        title: 'He / She / It → + s',
        en: 'He <span class="hl-green">plays</span> football. She <span class="hl-green">reads</span> a book.',
        ru: 'Он играет в футбол. Она читает книгу.',
        note: 'После <b>he, she, it</b> добавляем к глаголу <b>-s</b>.',
        speak: 'He plays football. She reads a book.'
      },
      {
        title: 'После -s, -sh, -ch, -x, -o → + es',
        en: 'She <span class="hl-green">goes</span> to school. He <span class="hl-green">watches</span> TV.',
        ru: 'Она ходит в школу. Он смотрит ТВ.',
        note: 'Если глагол кончается на <b>-s, -sh, -ch, -x, -o</b>, добавляем <b>-es</b>.',
        speak: 'She goes to school. He watches TV.'
      },
      {
        title: 'I / You / We / They → без окончания',
        en: 'I <span class="hl-green">play</span>. You <span class="hl-green">go</span>. They <span class="hl-green">read</span>.',
        ru: 'Я играю. Ты идёшь. Они читают.',
        note: 'С <b>I, you, we, they</b> окончание <b>не добавляем</b>.',
        speak: 'I play. You go. They read.'
      }
    ],
    questions: [
      { scene: 'ball',   en: 'He ___ football.',       ru: 'Он играет в футбол.',     options: ['play','plays'],       answer: 'plays' },
      { scene: 'boy',    en: 'I ___ every day.',       ru: 'Я играю каждый день.',    options: ['play','plays'],       answer: 'play' },
      { scene: 'school', en: 'She ___ to school.',     ru: 'Она ходит в школу.',      options: ['go','goes'],          answer: 'goes' },
      { scene: 'tv',     en: 'He ___ TV.',             ru: 'Он смотрит ТВ.',          options: ['watch','watches'],    answer: 'watches' },
      { scene: 'kids',   en: 'They ___ football.',     ru: 'Они играют в футбол.',    options: ['play','plays'],       answer: 'play' },
      { scene: 'book',   en: 'She ___ a book.',        ru: 'Она читает книгу.',       options: ['read','reads'],       answer: 'reads' },
      { scene: 'cat',    en: 'It ___ milk.',           ru: 'Оно любит молоко.',       options: ['like','likes'],       answer: 'likes' },
      { scene: 'boy',    en: 'You ___ well.',          ru: 'Ты хорошо поёшь.',        options: ['sing','sings'],       answer: 'sing' },
      { scene: 'boy',    en: 'He ___ fast.',           ru: 'Он бегает быстро.',       options: ['run','runs'],         answer: 'runs' },
      { scene: 'girl',   en: 'She ___ a picture.',     ru: 'Она рисует картину.',     options: ['draw','draws'],       answer: 'draws' }
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
      { scene: 'catTwo',    en: 'One cat, two ___',      ru: 'Один кот, два ...',       options: ['cats','cates'],          answer: 'cats' },
      { scene: 'bus',       en: 'One bus, two ___',      ru: 'Один автобус, два ...',   options: ['buses','buss'],          answer: 'buses' },
      { scene: 'box',       en: 'One box, two ___',      ru: 'Одна коробка, две ...',   options: ['boxes','boxs'],          answer: 'boxes' },
      { scene: 'baby',      en: 'One baby, two ___',     ru: 'Один малыш, два ...',     options: ['babys','babies'],        answer: 'babies' },
      { scene: 'man',       en: 'One man, two ___',      ru: 'Один мужчина, два ...',   options: ['mans','men'],            answer: 'men' },
      { scene: 'woman',     en: 'One woman, two ___',    ru: 'Одна женщина, две ...',   options: ['womans','women'],        answer: 'women' },
      { scene: 'kidsMany',  en: 'One child, two ___',    ru: 'Один ребёнок, два ...',   options: ['childs','children'],     answer: 'children' },
      { scene: 'mouse',     en: 'One mouse, two ___',    ru: 'Одна мышь, две ...',      options: ['mouses','mice'],         answer: 'mice' },
      { scene: 'feet',      en: 'One foot, two ___',     ru: 'Одна нога, две ...',      options: ['foots','feet'],          answer: 'feet' },
      { scene: 'fish',      en: 'One fish, two ___',     ru: 'Одна рыба, две ...',      options: ['fish','fishes'],         answer: 'fish' }
    ]
  }
};