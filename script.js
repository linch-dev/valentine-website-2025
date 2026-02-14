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
        'https://i.pinimg.com/originals/de/81/25/de8125866b8b08709e9921e537651086.png',
        'https://i.pinimg.com/originals/6d/4e/6a/6d4e6a00508b5f3a5f97b6671048039d.png',
        'https://i.pinimg.com/originals/5c/7e/63/5c7e634e004683058867a91673855598.png'
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

const loveMeter = document.getElementById('loveMeter');
const loveValue = document.getElementById('loveValue');
const extraLove = document.getElementById('extraLove');

function setInitialPosition() {
    if (loveMeter && loveValue) {
        loveMeter.value = 100;
        loveValue.textContent = 100;
    }
}

if (loveMeter) {
    loveMeter.addEventListener('input', () => {
        const value = parseInt(loveMeter.value);
        if (loveValue) loveValue.textContent = value;
        if (value > 100 && extraLove) {
            extraLove.classList.remove('hidden');
            extraLove.textContent = value >= 5000 ? config.loveMessages.extreme : (value > 1000 ? config.loveMessages.high : config.loveMessages.normal);
        } else if (extraLove) {
            extraLove.classList.add('hidden');
        }
    });
}

function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebSection = document.getElementById('celebration');
    if (celebSection) {
        celebSection.classList.remove('hidden');
        document.getElementById('celebrationTitle').textContent = config.celebration.title;
        document.getElementById('celebrationMessage').textContent = config.celebration.message;
        document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
        createHeartExplosion();
    }
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
    if (musicSource) musicSource.src = config.music.musicUrl;
    bgMusic.load();
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.textContent = config.music.stopText;
        } else {
            bgMusic.pause();
            musicToggle.textContent = config.music.startText;
        }
    });
}
