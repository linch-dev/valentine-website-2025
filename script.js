const config = window.VALENTINE_CONFIG;

function validateConfig() {
    if (!config.valentineName) config.valentineName = "My Love";
}

document.title = config.pageTitle;

window.addEventListener('DOMContentLoaded', () => {
    validateConfig();

    // Заполнение текстов
    document.getElementById('valentineTitle').textContent = `${config.valentineName}, пушистая кицунэ...`;
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;
    
    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;
    
    document.getElementById('question3Text').textContent = config.questions.third.text;
    document.getElementById('yesBtn3').textContent = config.questions.third.yesBtn;
    document.getElementById('noBtn3').textContent = config.questions.third.noBtn;

    createFloatingElements();
    setupMusicPlayer();
    if(typeof setInitialPosition === 'function') setInitialPosition();
});

function createFloatingElements() {
    const container = document.querySelector('.floating-elements');
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
        if(container) container.appendChild(div);
    });

    config.floatingEmojis.bears.forEach(bear => {
        const div = document.createElement('div');
        div.className = 'bear';
        div.innerHTML = bear;
        setRandomPosition(div);
        if(container) container.appendChild(div);
    });
}

function setRandomPosition(element) {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

function showNextQuestion(questionNumber) {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById(`question${questionNumber}`).classList.remove('hidden');
}

function moveButton(button) {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// Работа с ползунком любви
const loveMeter = document.getElementById('loveMeter');
const loveValue = document.getElementById('loveValue');
const extraLove = document.getElementById('extraLove');

function setInitialPosition() {
    if(loveMeter) {
        loveMeter.value = 100;
        loveValue.textContent = 100;
    }
}

if(loveMeter) {
    loveMeter.addEventListener('input', () => {
        const value = parseInt(loveMeter.value);
        loveValue.textContent = value;
        if (value > 100) {
            extraLove.classList.remove('hidden');
            extraLove.textContent = value >= 5000 ? config.loveMessages.extreme : (value > 1000 ? config.loveMessages.high : config.loveMessages.normal);
        } else {
            extraLove.classList.add('hidden');
        }
    });
}

function celebrate() {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    document.getElementById('celebration').classList.remove('hidden');
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
    createHeartExplosion();
}

function createHeartExplosion() {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️'; 
        document.querySelector('.floating-elements').appendChild(heart);
        setRandomPosition(heart);
    }
}

function setupMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    if (!config.music.enabled || !musicToggle) return;
    document.getElementById('musicSource').src = config.music.musicUrl;
    bgMusic.load();
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) { bgMusic.play(); musicToggle.textContent = config.music.stopText; }
        else { bgMusic.pause(); musicToggle.textContent = config.music.startText; }
    });
}
