const config = window.VALENTINE_CONFIG;

function validateConfig() {
    if (!config.valentineName) config.valentineName = "My Love";
}

document.title = config.pageTitle;

window.addEventListener('DOMContentLoaded', () => {
    validateConfig();

    // Заполнение текстов из конфига
    const titleEl = document.getElementById('valentineTitle');
    if (titleEl) titleEl.textContent = `${config.valentineName}, пушистая кицунэ...`;

    const elementsToFill = {
        'question1Text': config.questions.first.text,
        'yesBtn1': config.questions.first.yesBtn,
        'noBtn1': config.questions.first.noBtn,
        'secretAnswerBtn': config.questions.first.secretAnswer,
        'question2Text': config.questions.second.text,
        'startText': config.questions.second.startText,
        'nextBtn': config.questions.second.nextBtn,
        'question3Text': config.questions.third.text,
        'yesBtn3': config.questions.third.yesBtn,
        'noBtn3': config.questions.third.noBtn
    };

    for (const [id, text] of Object.entries(elementsToFill)) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    createFloatingElements();
    setupMusicPlayer();
    setInitialPosition();
});

function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;

    const skzPhotos = [
        'https://i.pinimg.com/736x/3f/b8/f1/3fb8f17dcd23531f2a3145e84d86e141.jpg',
        'https://i.pinimg.com/736x/15/ef/07/15ef0766a5687b1d4603373ef5b5f96e.jpg',
        'https://i.pinimg.com/736x/76/85/98/7685989a734bd4decf54915ef80a1c50.jpg'
    ];

    skzPhotos.forEach(photoUrl => {
        const div = document.createElement('div');
        div.className = 'heart';
        div.innerHTML = `<img src="${photoUrl}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%; border: 2px solid white;">`;
        setRandomPosition(div);
        container.appendChild(div);
    });

    if (config.floatingEmojis && config.floatingEmojis.bears) {
        config.floatingEmojis.bears.forEach(bear => {
            const div = document.createElement('div');
            div.className = 'bear';
            div.innerHTML = bear;
            setRandomPosition(div);
            container.appendChild(div);
        });
    }
}

function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const nextQ = document.getElementById(`question${questionNumber}`);
    if (nextQ) nextQ.classList.remove('hidden');
}

function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// --- Блок Шкалы Любви (Love Meter) ---
const loveMeter = document.getElementById('loveMeter');
const loveValue = document.getElementById('loveValue');
const extraLove = document.getElementById('extraLove');

function setInitialPosition() {
    if (loveMeter && loveValue) {
        loveMeter.value = 100;
        loveValue.textContent = 100;
        loveMeter.style.width = '100%';
    }
}

if (loveMeter) {
    loveMeter.addEventListener('input', () => {
        const value = parseInt(loveMeter.value);
        if (loveValue) loveValue.textContent = value;
        
        if (value > 100) {
            if (extraLove) {
                extraLove.classList.remove('hidden');
                
                // Твоя логика сообщений
                if (value >= 5000) {
                    extraLove.classList.add('super-love');
                    extraLove.textContent = config.loveMessages.extreme;
                } else if (value > 1000) {
                    extraLove.classList.remove('super-love');
                    extraLove.textContent = config.loveMessages.high;
                } else {
                    extraLove.classList.remove('super-love');
                    extraLove.textContent = config.loveMessages.normal;
                }
            }

            // ТВОЯ ОРИГИНАЛЬНАЯ ЛОГИКА РАСШИРЕНИЯ ПОЛОСКИ
            const overflowPercentage = (value - 100) / 9900;
            const extraWidth = overflowPercentage * window.innerWidth * 0.8;
            loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
            loveMeter.style.transition = 'width 0.3s';
            
        } else {
            // Возвращаем всё в норму, если значение <= 100
            if (extraLove) {
                extraLove.classList.add('hidden');
                extraLove.classList.remove('super-love');
            }
            loveMeter.style.width = '100%';
        }
    });
}

// Запуск инициализации
window.addEventListener('DOMContentLoaded', setInitialPosition);
window.addEventListener('load', setInitialPosition);

function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    
    const celebration = document.getElementById('celebration');
    if (celebration) celebration.classList.remove('hidden');
    
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    
    const emojiContainer = document.getElementById('celebrationEmojis');
    if (emojiContainer) {
        const links = config.celebration.emojis.split(',').map(link => link.trim());
        
        emojiContainer.innerHTML = '';
        // Исправлено: photosWrapper пишется слитно
        const photosWrapper = document.createElement('div'); 
        photosWrapper.style.cssText = 'display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-top: 20px;';
        
        links.forEach(url => {
            if (url.length > 5) {
                const img = document.createElement('img');
                img.src = url;
                img.style.cssText = 'width: 100px; height: 100px; object-fit: cover; border-radius: 15px; border: 3px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.2); transition: transform 0.3s;';
                
                img.onmouseover = () => img.style.transform = 'scale(1.1)';
                img.onmouseout = () => img.style.transform = 'scale(1.0)';
                
                photosWrapper.appendChild(img);
            }
        });
        
        emojiContainer.appendChild(photosWrapper);
    }
    
    createHeartExplosion();
}

function createHeartExplosion() {
    const container = document.querySelector('.floating-elements');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        container.appendChild(heart);
        setRandomPosition(heart);
    }
}

function setupMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicSource = document.getElementById('musicSource');

    if (!config.music.enabled || !musicToggle || !bgMusic) return;

    // 1. Устанавливаем источник и громкость
    if (musicSource) musicSource.src = config.music.musicUrl;
    bgMusic.volume = config.music.volume || 0.5;
    bgMusic.load();

    const updateButtonText = () => {
        musicToggle.textContent = bgMusic.paused ? config.music.startText : config.music.stopText;
    };

    // 2. Пытаемся запустить автоплей сразу
    if (config.music.autoplay) {
        const startPlay = () => {
            bgMusic.play().then(() => {
                updateButtonText();
                // Если заиграло, убираем слушатели, чтобы не перезапускать музыку при каждом клике
                document.removeEventListener('click', startPlay);
                document.removeEventListener('touchstart', startPlay);
            }).catch(error => {
                console.log("Ждем первого взаимодействия для запуска звука...");
            });
        };

        // Пытаемся запустить немедленно
        startPlay();

        // Если не вышло (заблокировал браузер), запускаем при первом же клике по экрану
        document.addEventListener('click', startPlay);
        document.addEventListener('touchstart', startPlay);
    }

    updateButtonText();

    // 3. Логика кнопки
    musicToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Чтобы не срабатывал слушатель на весь документ
        if (bgMusic.paused) {
            bgMusic.play().then(updateButtonText);
        } else {
            bgMusic.pause();
            updateButtonText();
        }
    });

    bgMusic.onplay = updateButtonText;
    bgMusic.onpause = updateButtonText;
}
