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
          { emoji: '🐧', word: 'penguin',  ru: 'пингвин' },
          { emoji: '🐯', word: 'tiger',    ru: 'тигр' },
          { emoji: '🦓', word: 'zebra',    ru: 'зебра' },
          { emoji: '🦊', word: 'fox',      ru: 'лиса' },
          { emoji: '🐺', word: 'wolf',     ru: 'волк' },
          { emoji: '🦌', word: 'deer',     ru: 'олень' }
        ]
      },
      pronouns: {
        title: 'Местоимения', ru: 'Pronouns', icon: '👥',
        cards: [
          { svg: () => pronounScene('I'),    word: 'I',    ru: 'я' },
          { svg: () => pronounScene('you'),  word: 'you',  ru: 'ты' },
          { svg: () => pronounScene('he'),   word: 'he',   ru: 'он' },
          { svg: () => pronounScene('she'),  word: 'she',  ru: 'она' },
          { svg: () => pronounScene('it'),   word: 'it',   ru: 'оно' },
          { svg: () => pronounScene('we'),   word: 'we',   ru: 'мы' },
          { svg: () => pronounScene('they'), word: 'they', ru: 'они' }
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
          { emoji: '👀', word: 'look',   ru: 'смотреть' },
          { emoji: '🎨', word: 'draw',   ru: 'рисовать' },
          { emoji: '🍳', word: 'cook',   ru: 'готовить' },
          { emoji: '🧹', word: 'clean',  ru: 'убирать' },
          { emoji: '🤝', word: 'help',   ru: 'помогать' }
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
          { color: '#6D4C41', word: 'brown',  ru: 'коричневый' },
          { color: '#212121', word: 'black',  ru: 'чёрный' },
          { color: '#FAFAFA', word: 'white',  ru: 'белый' }
        ],
        bonus: [
          { color: '#00BCD4', word: 'cyan',   ru: 'голубой' },
          { color: '#757575', word: 'grey',   ru: 'серый' },
          { color: '#FFD700', word: 'gold',   ru: 'золотой' },
          { color: '#C0C0C0', word: 'silver', ru: 'серебряный' },
          { color: '#7B1FA2', word: 'violet', ru: 'фиолетовый' },
          { color: '#40E0D0', word: 'turquoise', ru: 'бирюзовый' }
        ]
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
        bonus: [
          { shape: 'circle', word: 'oval', ru: 'овал' }
        ]
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
        bonus: [
          { digit: '11', emoji: '🍇', word: 'eleven',   ru: 'одиннадцать' },
          { digit: '12', emoji: '🍊', word: 'twelve',   ru: 'двенадцать' },
          { digit: '13', emoji: '🍉', word: 'thirteen', ru: 'тринадцать' },
          { digit: '14', emoji: '🍋', word: 'fourteen', ru: 'четырнадцать' },
          { digit: '15', emoji: '🍑', word: 'fifteen',  ru: 'пятнадцать' },
          { digit: '16', emoji: '🍒', word: 'sixteen',  ru: 'шестнадцать' },
          { digit: '17', emoji: '🥝', word: 'seventeen',ru: 'семнадцать' },
          { digit: '18', emoji: '🍍', word: 'eighteen', ru: 'восемнадцать' },
          { digit: '19', emoji: '🥥', word: 'nineteen', ru: 'девятнадцать' },
          { digit: '20', emoji: '🍎', word: 'twenty',   ru: 'двадцать' }
        ]
      }
    }
  }
};

const FEED_DATA = {
  fruits: [
    { emoji: '🥕', word: 'carrot',  ru: 'морковь' },
    { emoji: '🥔', word: 'potato',  ru: 'картошка' },
    { emoji: '🥬', word: 'cabbage', ru: 'капуста' },
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
  targetPositions: {
    'in':          { left: '50%',  top: '73%', z: 6 },
    'on':          { left: '50%',  top: '35%', z: 6 },
    'under':       { left: '50%',  top: '95%', z: 1 },
    'next to':     { left: '78%',  top: '75%', z: 6 },
    'behind':      { left: '50%',  top: '55%', z: 2 },
    'in front of': { left: '50%',  top: '88%', z: 6 },
    'above':       { left: '50%',  top: '18%', z: 6 },  
    'below':       { left: '50%',  top: '95%', z: 1 }  
  },
  items: [
    { emoji: '🐱', word: 'cat',   ru: 'кот' },
    { emoji: '⚽', word: 'ball',  ru: 'мяч' }
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
    { animal: 'cat', action: 'read', phrase: 'The cat reads', ru: 'Кот читает' },
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
      },
      {
        title: 'Отрицание: not',
        en: 'I <span class="hl-blue">am not</span> sad. He <span class="hl-blue">is not</span> here. They <span class="hl-blue">are not</span> at home.',
        ru: 'Я не грустный. Его здесь нет. Их нет дома.',
        note: 'Чтобы сказать «не», добавляем <b>not</b> после am/is/are.',
        speak: 'I am not sad. He is not here. They are not at home.'
      },
      {
        title: 'Вопрос',
        en: '<span class="hl-blue">Are</span> you happy? <span class="hl-blue">Is</span> she a student? <span class="hl-blue">Am</span> I late?',
        ru: 'Ты счастлив? Она студентка? Я опоздал?',
        note: 'В вопросе <b>am/is/are</b> ставим в начало предложения.',
        speak: 'Are you happy? Is she a student? Am I late?'
      }
    ],
    questions: [
      { scene: 'boy',    en: 'I ___ a student.',        ru: 'Я студент.',             options: ['am','is','are'],       answer: 'am' },
      { scene: 'boy',    en: 'He ___ my friend.',       ru: 'Он мой друг.',           options: ['am','is','are'],       answer: 'is' },
      { scene: 'cat',    en: 'It ___ a cat.',           ru: 'Это кот.',               options: ['am','is','are'],       answer: 'is' },
      { scene: 'kids',   en: 'They ___ kids.',          ru: 'Они дети.',              options: ['am','is','are'],       answer: 'are' },
      { scene: 'girl',   en: 'She ___ happy.',          ru: 'Она счастлива.',         options: ['am','is','are'],       answer: 'is' },
      { scene: 'family', en: 'We ___ a family.',        ru: 'Мы семья.',              options: ['am','is','are'],       answer: 'are' },
      { scene: 'boy',    en: 'You ___ kind.',           ru: 'Ты добрый.',             options: ['am','is','are'],       answer: 'are' },
      { scene: 'boy',    en: 'I ___ not sad.',          ru: 'Я не грустный.',         options: ['am','is','are'],       answer: 'am' },
      { scene: 'girl',   en: '___ you happy?',          ru: 'Ты счастлив?',           options: ['Am','Is','Are'],       answer: 'Are' },
      { scene: 'dog',    en: '___ it a dog?',           ru: 'Это собака?',            options: ['Am','Is','Are'],       answer: 'Is' }
    ]
  },
  suffix: {
    title: 'Окончание -s / -es',
    ru: 'he / she / it + глагол',
    icon: '✏️',
    color: '#2E7D32',
    theory: [
      {
        title: 'Инфинитив — словарная форма',
        en: '<span class="hl-green">play</span> — играть, <span class="hl-green">go</span> — идти, <span class="hl-green">watch</span> — смотреть.',
        ru: 'Это глагол без окончаний, его словарная форма.',
        note: 'Инфинитив — это «голый» глагол: <b>play, go, watch</b>.',
        speak: 'play, go, watch'
      },
      {
        title: 'He / She / It → + s',
        en: 'He <span class="hl-green">plays</span> football. She <span class="hl-green">reads</span> a book.',
        ru: 'Он играет в футбол. Она читает книгу.',
        note: 'После <b>he, she, it</b> добавляем к глаголу <b>-s</b>.',
        speak: 'He plays football. She reads a book.'
      },
      {
        title: 'После -s, -sh, -ch, -x, -o → + es',
        en: 'She <span class="hl-green">goes</span> to school. He <span class="hl-green">watches</span> TV. She <span class="hl-green">does</span> her homework.',
        ru: 'Она ходит в школу. Он смотрит ТВ. Она делает уроки.',
        note: 'Если глагол кончается на <b>-s, -sh, -ch, -x, -o</b>, добавляем <b>-es</b>.',
        speak: 'She goes to school. He watches TV. She does her homework.'
      },
      {
        title: 'I / You / We / They → без окончания',
        en: 'I <span class="hl-green">play</span>. You <span class="hl-green">go</span>. We <span class="hl-green">watch</span>. They <span class="hl-green">read</span>.',
        ru: 'Я играю. Ты идёшь. Мы смотрим. Они читают.',
        note: 'С <b>I, you, we, they</b> окончание <b>не добавляем</b>.',
        speak: 'I play. You go. We watch. They read.'
      }
    ],
    questions: [
      { scene: 'ball',   en: 'He ___ football.',       ru: 'Он играет в футбол.',     options: ['play','plays','playes'],       answer: 'plays' },
      { scene: 'school', en: 'She ___ to school.',     ru: 'Она ходит в школу.',      options: ['go','gos','goes'],             answer: 'goes' },
      { scene: 'tv',     en: 'He ___ TV.',             ru: 'Он смотрит ТВ.',          options: ['watch','watchs','watches'],    answer: 'watches' },
      { scene: 'boy',    en: 'I ___ every day.',       ru: 'Я играю каждый день.',    options: ['play','plays'],                answer: 'play' },
      { scene: 'kids',   en: 'They ___ football.',     ru: 'Они играют в футбол.',    options: ['play','plays'],                answer: 'play' },
      { scene: 'book',   en: 'She ___ her homework.',  ru: 'Она делает уроки.',       options: ['do','dos','does'],             answer: 'does' },
      { scene: 'boy',    en: 'He ___ fast.',           ru: 'Он бегает быстро.',       options: ['run','runs','runes'],          answer: 'runs' },
      { scene: 'book',   en: 'She ___ a book.',        ru: 'Она читает книгу.',       options: ['read','reads'],                answer: 'reads' },
      { scene: 'cat',    en: 'It ___ milk.',           ru: 'Оно любит молоко.',       options: ['like','likes'],                answer: 'likes' },
      { scene: 'boy',    en: 'You ___ well.',          ru: 'Ты хорошо поёшь.',        options: ['sing','sings'],                answer: 'sing' }
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
        en: 'cat → cat<span class="hl-orange">s</span>, dog → dog<span class="hl-orange">s</span>, book → book<span class="hl-orange">s</span>.',
        ru: 'кот → коты, собака → собаки, книга → книги.',
        note: 'Самое частое правило: добавляем <b>-s</b>.',
        speak: 'cats, dogs, books'
      },
      {
        title: 'После -s, -sh, -ch, -x → + es',
        en: 'bus → bus<span class="hl-orange">es</span>, box → box<span class="hl-orange">es</span>, watch → watch<span class="hl-orange">es</span>.',
        ru: 'автобус → автобусы, коробка → коробки, часы → часы.',
        note: 'Если слово кончается на <b>-s, -sh, -ch, -x</b>, добавляем <b>-es</b>.',
        speak: 'buses, boxes, watches'
      },
      {
        title: 'Согласная + y → ies',
        en: 'baby → bab<span class="hl-orange">ies</span>, city → cit<span class="hl-orange">ies</span>.',
        ru: 'малыш → малыши, город → города.',
        note: 'Если перед <b>y</b> стоит согласная, меняем <b>y</b> на <b>ies</b>.',
        speak: 'babies, cities'
      },
      {
        title: 'Слова-исключения',
        en: 'man → <span class="hl-orange">men</span>, woman → <span class="hl-orange">women</span>, child → <span class="hl-orange">children</span>, mouse → <span class="hl-orange">mice</span>, foot → <span class="hl-orange">feet</span>, tooth → <span class="hl-orange">teeth</span>, fish → <span class="hl-orange">fish</span>, sheep → <span class="hl-orange">sheep</span>.',
        ru: 'мужчина → мужчины, женщина → женщины, ребёнок → дети, мышь → мыши, нога → ноги, зуб → зубы, рыба → рыбы, овца → овцы.',
        note: 'Эти слова меняются по-особому — их нужно запомнить!',
        speak: 'men, women, children, mice, feet, teeth, fish, sheep'
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
  },
  past: {
    title: 'Past Simple',
    ru: 'прошедшее время',
    icon: '⏳',
    color: '#E65100',
    theory: [
      {
        title: 'Прошедшее: действие уже было',
        en: 'I <span class="hl-orange">played</span> yesterday.',
        ru: 'Я играл вчера.',
        note: 'Маркеры: <b>yesterday</b> (вчера), <b>last week</b> (на прошлой неделе), <b>ago</b> (назад).',
        speak: 'I played yesterday.'
      },
      {
        title: 'Правильные глаголы → + ed',
        en: 'She <span class="hl-orange">watched</span> TV. He <span class="hl-orange">played</span> football. We <span class="hl-orange">walked</span> to school.',
        ru: 'Она смотрела ТВ. Он играл в футбол. Мы шли в школу.',
        note: 'К правильному глаголу добавляем <b>-ed</b>.',
        speak: 'She watched TV. He played football. We walked to school.'
      },
      {
        title: 'Неправильные глаголы — меняются',
        en: 'go → <span class="hl-orange">went</span>, see → <span class="hl-orange">saw</span>, eat → <span class="hl-orange">ate</span>, have → <span class="hl-orange">had</span>, do → <span class="hl-orange">did</span>, say → <span class="hl-orange">said</span>, come → <span class="hl-orange">came</span>, make → <span class="hl-orange">made</span>, take → <span class="hl-orange">took</span>, get → <span class="hl-orange">got</span>, give → <span class="hl-orange">gave</span>, know → <span class="hl-orange">knew</span>, think → <span class="hl-orange">thought</span>, tell → <span class="hl-orange">told</span>, find → <span class="hl-orange">found</span>.',
        ru: 'идти, видеть, есть, иметь, делать, говорить, приходить, делать, брать, получать, давать, знать, думать, рассказывать, находить.',
        note: 'Эти 15 глаголов — самые частые. Их нужно запомнить!',
        speak: 'go went, see saw, eat ate, have had, do did, say said, come came, make made, take took, get got, give gave, know knew, think thought, tell told, find found'
      },
      {
        title: 'Отрицание и вопрос — с did',
        en: 'I <span class="hl-orange">did not</span> play. <span class="hl-orange">Did</span> you play?',
        ru: 'Я не играл. Ты играл?',
        note: 'В отрицании и вопросе используем <b>did</b>, а глагол остаётся в инфинитиве.',
        speak: 'I did not play. Did you play?'
      }
    ],
    questions: [
      { scene: 'ball',    en: 'Yesterday I ___ football.', ru: 'Вчера я играл в футбол.', options: ['play','played','will play'], answer: 'played' },
      { scene: 'tv',      en: 'She ___ TV yesterday.',     ru: 'Она смотрела ТВ вчера.', options: ['watch','watched','watches'], answer: 'watched' },
      { scene: 'school',  en: 'He ___ to school.',         ru: 'Он пошёл в школу.',      options: ['go','goed','went'],         answer: 'went' },
      { scene: 'cat',     en: 'I ___ a cat.',              ru: 'Я увидел кота.',         options: ['see','seed','saw'],         answer: 'saw' },
      { scene: 'apple',   en: 'She ___ an apple.',         ru: 'Она съела яблоко.',      options: ['eat','eated','ate'],        answer: 'ate' },
      { scene: 'book',    en: 'We ___ homework.',          ru: 'Мы сделали уроки.',      options: ['do','did','does'],          answer: 'did' },
      { scene: 'hello',   en: 'He ___ hello.',             ru: 'Он сказал привет.',      options: ['say','sayed','said'],       answer: 'said' },
      { scene: 'home',    en: 'They ___ home.',            ru: 'Они пришли домой.',      options: ['come','comed','came'],      answer: 'came' },
      { scene: 'ball',    en: 'I ___ play yesterday.',     ru: 'Я не играл вчера.',      options: ['did not','not','don\'t'],   answer: 'did not' },
      { scene: 'boy',     en: '___ you play?',             ru: 'Ты играл?',              options: ['Do','Did','Will'],          answer: 'Did' }
    ]
  },
  future: {
    title: 'Future: will',
    ru: 'будущее время',
    icon: '🚀',
    color: '#6A1B9A',
    theory: [
      {
        title: 'Будущее: ещё не случилось',
        en: 'I <span class="hl-purple">will</span> play tomorrow.',
        ru: 'Я буду играть завтра.',
        note: 'Маркеры: <b>tomorrow</b> (завтра), <b>next week</b> (на следующей неделе).',
        speak: 'I will play tomorrow.'
      },
      {
        title: 'will + инфинитив (без окончаний!)',
        en: 'She <span class="hl-purple">will</span> go to school. He <span class="hl-purple">will</span> play.',
        ru: 'Она пойдёт в школу. Он будет играть.',
        note: 'После <b>will</b> глагол стоит в словарной форме — без <b>-s</b> и <b>-ed</b>.',
        speak: 'She will go to school. He will play.'
      },
      {
        title: 'will одинаков для всех',
        en: 'I will. He will. She will. It will. We will. You will. They <span class="hl-purple">will</span> be happy.',
        ru: 'Я буду. Он будет. Она будет. Оно будет. Мы будем. Ты будешь. Они будут счастливы.',
        note: '<b>will</b> не меняется: он один для всех местоимений.',
        speak: 'I will. He will. She will. It will. We will. You will. They will be happy.'
      },
      {
        title: 'Отрицание: will not (won\'t)',
        en: 'I <span class="hl-purple">will not</span> cry. He <span class="hl-purple">won\'t</span> go.',
        ru: 'Я не буду плакать. Он не пойдёт.',
        note: 'Короткая форма <b>will not</b> — это <b>won\'t</b>.',
        speak: 'I will not cry. He won\'t go.'
      },
      {
        title: 'Вопрос: Will ...?',
        en: '<span class="hl-purple">Will</span> you play? <span class="hl-purple">Will</span> she come?',
        ru: 'Ты будешь играть? Она придёт?',
        note: 'В вопросе <b>will</b> ставим в начало.',
        speak: 'Will you play? Will she come?'
      }
    ],
    questions: [
      { scene: 'sun',     en: 'Tomorrow I ___ play.',          ru: 'Завтра я буду играть.',      options: ['will','am','did'],        answer: 'will' },
      { scene: 'school',  en: 'She ___ go to school tomorrow.',ru: 'Она пойдёт в школу завтра.', options: ['will','wills','is'],     answer: 'will' },
      { scene: 'kids',    en: 'They ___ be happy.',            ru: 'Они будут счастливы.',       options: ['will','are','were'],      answer: 'will' },
      { scene: 'boy',     en: 'He ___ run tomorrow.',          ru: 'Он будет бегать завтра.',    options: ['will','wills'],           answer: 'will' },
      { scene: 'girl',    en: 'I ___ not cry.',                ru: 'Я не буду плакать.',         options: ['will','am','did'],        answer: 'will' },
      { scene: 'boy',     en: '___ you play tomorrow?',        ru: 'Ты будешь играть завтра?',   options: ['Do','Did','Will'],        answer: 'Will' },
      { scene: 'book',    en: 'We ___ read a book.',           ru: 'Мы будем читать книгу.',     options: ['will','are','were'],      answer: 'will' },
      { scene: 'cat',     en: 'It ___ be happy.',              ru: 'Оно будет счастливо.',       options: ['will','is','was'],        answer: 'will' },
      { scene: 'boy',     en: 'You ___ sing.',                 ru: 'Ты будешь петь.',            options: ['will','are'],             answer: 'will' },
      { scene: 'home',    en: 'He ___ come tomorrow.',         ru: 'Он придёт завтра.',          options: ['will','comes','came'],    answer: 'will' }
    ]
  }
};
