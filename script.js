// Конфигурация проекта
const CONFIG = {
    signatureName: "Камалька 🌸", // Замените на своё имя
    finalLevelPassword: "Камалька", // Пароль для последнего уровня
    musicEnabled: true // Включить фоновую музыку
};

// Массив с 10 уровнями (первые 10 из оригинального списка)
const levels = [
    // Уровень 1
    {
        riddle: "Он бывает горький, сладкий,Чёрный, белый, с молокомИ с изюмом, и с цукатом,И с душистым миндалём.Что это?",
        answer: "шоколад",
        letter: "С меня для тебя мой любимый шоколад 🍫"
    },
    
    // Уровень 2
    {
        riddle: "Я в стаканчике, рожке,Вкусное и нежное.Сделано на молоке,Чаще — белоснежное.В морозилках проживаю,А на солнце сразу таю.Что я?",
        answer: "мороженое",
        letter: "Погуляем вместе по парку и поедим мороженое 💝"
    },
    
    // Уровень 3
    {
        riddle: "Маленькая сладость, покрытая сахаром, которая тает во рту и оставляет сладкий вкус.Что это?",
        answer: "дроже",
        letter: "Думала угащу драже? А вот и нет я угащу тебя какао приготовленним мной.☕"
    },
    
    // Уровень 4
    {
        riddle: "Место куда ходят многие,часто на свидания или с семьей любят и дети и взрослые что это?",
        answer: "кинотеатр",
        letter: "Вот мы и пойдем с тобой в кинотеатр выбирай фильм 🍿"
    },
    
    // Уровень 5
    {
        riddle: "Главный цвет во всем мире?",
        answer: "белый",
        letter: "Шучу да конечно РОЗОВЫЙ 💝 надо же подшутить над тобой 💝"
    },
    
    // Уровень 6
    {
        riddle: "Почитай мне стихотворение 💝",
        answer: "78923",
        letter: "С тебя для меня танец, станцуешь со мной ?💝"
    },
    
    // Уровень 7
    {
        riddle: "Приготовь мне гренки :) 💝",
        answer: "60765",
        letter: "Я приготовлю тебе гренки и мы посидим у меня смотря мультфильмы 💝"
    },
    
    // Уровень 8
    {
        riddle: "Обними меня при встрече 🫂",
        answer: "02094",
        letter: "Сможешь обнимать меня сколько хочешь и когда захочешь 🫂"
    },
    
    // Уровень 9
    {
        riddle: "Сделай 3 отжимания и 5 приседаний во время видео звонка так чтобы я видел тебя 👹",
        answer: "896543",
        letter: "Приготовлю для тебя тортик 🎂"
    },
    
    // Уровень 10 (Финальный)
    {
        riddle: "Поцелуй меня при встрече 💝",
        answer: "359355",
        letter: "Поздравляю ты прошла все уровни и получила одно желания я выполню одно твое желание 💝"
    }
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация элементов
    const splashScreen = document.querySelector('.splash-screen');
    const mainPage = document.querySelector('.main-page');
    const musicControl = document.querySelector('.music-control');
    const bgMusic = document.getElementById('bgMusic');
    
    // Загружаем прогресс
    const completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || [];
    
    // Создаем лепестки
    createPetals();
    
    // Настройка музыки
    if (CONFIG.musicEnabled) {
        bgMusic.volume = 0.3; // Установка комфортной громкости
        musicControl.style.display = 'flex';
        
        // Обработчик клика по контролу музыки
        musicControl.addEventListener('click', toggleMusic);
    } else {
        musicControl.style.display = 'none';
    }
    
    // Установка подписи
    document.getElementById('signature-name').textContent = CONFIG.signatureName;
    
    // Показ заставки
    setTimeout(() => {
        splashScreen.style.display = 'none';
        mainPage.style.display = 'block';
        generateLevelButtons(completedLevels);
        
        // Автовоспроизведение музыки (работает не во всех браузерах)
        if (CONFIG.musicEnabled) {
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    musicControl.textContent = '🎵';
                });
            }
        }
    }, 3000);
    
    // Закрытие модальных окон
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.modal-overlay').style.display = 'none';
            document.querySelector('.letter-overlay').style.display = 'none';
        });
    });
    
    // Обработчик для оверлея (закрытие по клику вне модалки)
    document.querySelectorAll('.modal-overlay, .letter-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    });
});

// Создание анимированных лепестки
function createPetals() {
    const petalsContainer = document.querySelector('.petals');
    const petalCount = 15;
    const petalIcons = ['🌸', '🌹', '🌼', '🌷','❤️','🍬'];
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.innerHTML = petalIcons[Math.floor(Math.random() * petalIcons.length)];
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${10 + Math.random() * 20}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        petalsContainer.appendChild(petal);
    }
}

// Управление музыкой
function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicControl = document.querySelector('.music-control');
    
    if (bgMusic.paused) {
        bgMusic.play();
        musicControl.textContent = '🔊';
    } else {
        bgMusic.pause();
        musicControl.textContent = '🎵';
    }
}

// Генерация кнопок уровней
function generateLevelButtons(completedLevels) {
    const grid = document.querySelector('.levels-grid');
    grid.innerHTML = '';
    
    levels.forEach((_, index) => {
        const btn = document.createElement('button');
        btn.className = 'level-btn';
        btn.textContent = index + 1;
        btn.id = `level-${index + 1}`;
        
        if (completedLevels.includes(index)) {
            markLevelAsCompleted(btn, index);
        } else {
            btn.addEventListener('click', () => openLevel(index));
        }
        
        grid.appendChild(btn);
    });
}

// Открытие уровня
function openLevel(levelIndex) {
    const level = levels[levelIndex];
    const modal = document.querySelector('.modal-overlay');
    
    document.getElementById('current-level').textContent = levelIndex + 1;
    document.querySelector('.modal-riddle').textContent = level.riddle;
    
    // Создание поля для ввода ответа
    const inputContainer = document.querySelector('.crossword-input');
    inputContainer.innerHTML = '';
    
    for (let i = 0; i < level.answer.length; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        input.dataset.index = i;
        input.addEventListener('input', moveToNextInput);
        inputContainer.appendChild(input);
    }
    
    modal.style.display = 'flex';
    document.querySelector('.crossword-input input').focus();
}

// Проверка ответа
document.querySelector('.submit-btn').addEventListener('click', checkAnswer);

function checkAnswer() {
    const levelIndex = parseInt(document.getElementById('current-level').textContent) - 1;
    const inputs = document.querySelectorAll('.crossword-input input');
    let userAnswer = '';
    
    inputs.forEach(input => {
        userAnswer += input.value.toLowerCase();
    });
    
    if (userAnswer === levels[levelIndex].answer) {
        // Сохраняем прогресс
        const completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || [];
        
        if (!completedLevels.includes(levelIndex)) {
            completedLevels.push(levelIndex);
            localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
        }
        
        showLetter(levelIndex);
        
        // Особый эффект для последнего уровня
        if (levelIndex === 9) { // 10-й уровень (индекс 9)
            startConfetti();
        }
    } else {
        alert('Попробуй ещё раз, любимый(ая)!');
        inputs[0].focus();
    }
}

// Показ письма
function showLetter(levelIndex) {
    const level = levels[levelIndex];
    const letterModal = document.querySelector('.letter-overlay');
    
    document.querySelector('.letter-text').innerHTML = level.letter;
    document.querySelector('.modal-overlay').style.display = 'none';
    letterModal.style.display = 'flex';
    
    // Обновляем кнопку уровня
    const btn = document.getElementById(`level-${levelIndex + 1}`);
    markLevelAsCompleted(btn, levelIndex);
    
    // Особые эффекты для последнего уровня
    if (levelIndex === 9) { // 10-й уровень
        const letterModalContent = document.querySelector('.letter-modal');
        letterModalContent.style.background = 'linear-gradient(135deg, #ff9a9e, #fad0c4)';
        letterModalContent.style.color = 'white';
    }
}

// Пометка уровня как пройденного
function markLevelAsCompleted(btn, levelIndex) {
    btn.classList.add('completed');
    btn.style.background = 'var(--primary-color)';
    btn.style.color = 'white';
    btn.onclick = () => showLetter(levelIndex);
}

// Автопереход между инпутами
function moveToNextInput(e) {
    const inputs = document.querySelectorAll('.crossword-input input');
    const currentIndex = parseInt(e.target.dataset.index);
    
    if (e.target.value && currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
    }
}

// Эффект конфетти
function startConfetti() {
    const confettiSettings = { 
        target: 'confetti-canvas',
        max: 150,
        size: 1.5,
        animate: true,
        props: ['🌸', '💖','🍬', '🌹', '🌼', '🌷','❤️' , '✨'],
        colors: [[255, 186, 193], [255, 255, 255], [255, 222, 235]],
        clock: 25,
        rotate: true
    };
    
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
    
    // Остановка через 10 секунд
    setTimeout(() => confetti.clear(), 10000);
}

function resetProgress() {
  const modal = document.createElement('div');
  modal.className = 'confirm-modal-overlay';
  modal.innerHTML = `
    <div class="confirm-modal">
      <h3>Сбросить все воспоминания?</h3>
      <p>Все пройденные уровни будут сброшены, и вам нужно будет начать путешествие заново.</p>
      <div class="confirm-buttons">
        <button class="confirm-btn confirm-yes">Да, начать сначала</button>
        <button class="confirm-btn confirm-no">Нет, продолжить</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // Стили для модального окна
  const style = document.createElement('style');
  style.textContent = `
    .confirm-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 223, 235, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000;
      backdrop-filter: blur(3px);
    }
    .confirm-modal {
      background: white;
      padding: 30px;
      border-radius: 20px;
      max-width: 400px;
      width: 90%;
      text-align: center;
      box-shadow: 0 10px 30px rgba(212, 106, 142, 0.2);
      border: 1px solid var(--secondary-color);
    }
    .confirm-modal h3 {
      color: var(--primary-color);
      margin-bottom: 15px;
      font-family: 'Playfair Display', serif;
    }
    .confirm-modal p {
      margin-bottom: 25px;
      color: var(--text-color);
      line-height: 1.5;
    }
    .confirm-buttons {
      display: flex;
      justify-content: center;
      gap: 15px;
      flex-wrap: wrap;
    }
    .confirm-btn {
      padding: 12px 25px;
      border: none;
      border-radius: 30px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
      font-family: 'Playfair Display', serif;
    }
    .confirm-yes {
      background: var(--primary-color);
      color: white;
    }
    .confirm-yes:hover {
      background: #c55a7e;
      transform: translateY(-2px);
    }
    .confirm-no {
      background: white;
      color: var(--primary-color);
      border: 1px solid var(--secondary-color);
    }
    .confirm-no:hover {
      background: #fff9fb;
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(style);

  document.querySelector('.confirm-yes').addEventListener('click', () => {
    localStorage.removeItem('completedLevels');
    
    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.innerHTML = '<span class="reset-icon">✓</span> <span class="reset-text">Воспоминания обновлены</span>';
    resetBtn.classList.add('reset-success');
    resetBtn.disabled = true;
    
    // Добавляем лепестки для эффекта
    for (let i = 0; i < 5; i++) {
      createPetalAnimation(resetBtn);
    }
    
    setTimeout(() => {
      location.reload();
    }, 1500);
  });

  document.querySelector('.confirm-no').addEventListener('click', () => {
    document.body.removeChild(modal);
    document.head.removeChild(style);
  });
}

// Функция для анимации лепестков
function createPetalAnimation(element) {
  const petal = document.createElement('div');
  petal.innerHTML = '🌸';
  petal.style.position = 'absolute';
  petal.style.fontSize = '20px';
  petal.style.animation = `fallPetal ${Math.random() * 2 + 1}s linear forwards`;
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.top = '0';
  petal.style.zIndex = '100';
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fallPetal {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  element.appendChild(petal);
  
  setTimeout(() => {
    petal.remove();
    document.head.removeChild(style);
  }, 1000);
}