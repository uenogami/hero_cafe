// 画面下部インジケーター
// 左メニュー（ダウンロード・SNS）
const leftMenuBtn = document.querySelector('.indicator-left');
const leftMenu = document.querySelector('.left-menu');
const leftMenuClose = document.querySelector('.menu-close-left');
const leftMenuOverlay = document.querySelector('.left-menu-overlay');

if (leftMenuBtn && leftMenu) {
    leftMenuBtn.addEventListener('click', () => {
        leftMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (leftMenuClose) {
    leftMenuClose.addEventListener('click', () => {
        leftMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (leftMenuOverlay) {
    leftMenuOverlay.addEventListener('click', () => {
        leftMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// 中央ボタン（トップに戻る）
const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 右メニュー（ナビゲーション）
const rightMenuBtn = document.querySelector('.indicator-right');
const rightMenu = document.querySelector('.right-menu');
const rightMenuClose = document.querySelector('.menu-close-right');
const rightMenuOverlay = document.querySelector('.right-menu-overlay');
const rightMenuNavLinks = document.querySelectorAll('.right-menu-nav a');

if (rightMenuBtn && rightMenu) {
    rightMenuBtn.addEventListener('click', () => {
        rightMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (rightMenuClose) {
    rightMenuClose.addEventListener('click', () => {
        rightMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (rightMenuOverlay) {
    rightMenuOverlay.addEventListener('click', () => {
        rightMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (rightMenuNavLinks.length > 0) {
    rightMenuNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            rightMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// スムーススクロール
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
