const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const volumeSlider = document.getElementById('volumeSlider');
const albumArt = document.getElementById('albumArt');

let isPlaying = false;

audio.volume = 0.5;

audio.addEventListener('loadedmetadata', () => {
    totalTime.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = progress + '%';
    currentTime.textContent = formatTime(audio.currentTime);
});

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = '▶';
        albumArt.classList.remove('playing');
    } else {
        audio.play();
        playBtn.textContent = '⏸';
        albumArt.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
});

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

audio.addEventListener('ended', () => {
    isPlaying = false;
    playBtn.textContent = '▶';
    albumArt.classList.remove('playing');
    progressFill.style.width = '0%';
    audio.currentTime = 0;
});

audio.addEventListener('error', (e) => {
    console.log('Ошибка загрузки аудио:', e);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const scrollElements = document.querySelectorAll('.profile-section, .social-icons, .music-player');
    
    scrollElements.forEach(element => {
        element.addEventListener('click', function() {
            this.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    document.body.style.backgroundPosition = `center ${rate}px`;
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.profile-section, .social-icons, .music-player').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

const avatarClick = document.getElementById('avatarClick');
const videoModal = document.getElementById('videoModal');
const closeVideo = document.getElementById('closeVideo');
const ricrollVideo = document.getElementById('ricrollVideo');

avatarClick.addEventListener('click', () => {
    videoModal.classList.add('show');
    ricrollVideo.play();
});

closeVideo.addEventListener('click', () => {
    videoModal.classList.remove('show');
    ricrollVideo.pause();
    ricrollVideo.currentTime = 0;
});

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('show');
        ricrollVideo.pause();
        ricrollVideo.currentTime = 0;
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('show')) {
        videoModal.classList.remove('show');
        ricrollVideo.pause();
        ricrollVideo.currentTime = 0;
    }
});
