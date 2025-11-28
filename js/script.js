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

// スライド機能
function initSlides() {
    const slideContainers = document.querySelectorAll('.slide-container');
    
    slideContainers.forEach(container => {
        const slideItems = container.querySelectorAll('.slide-item');
        const slideDots = container.querySelectorAll('.slide-dot');
        let currentSlide = 0;
        
        // スライド表示関数
        function showSlide(container, index) {
            const items = container.querySelectorAll('.slide-item');
            const dots = container.querySelectorAll('.slide-dot');
            
            // すべてのスライドを非表示
            items.forEach(item => item.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // 選択されたスライドを表示
            if (items[index]) {
                items[index].classList.add('active');
                dots[index].classList.add('active');
                currentSlide = index;
            }
        }
        
        // 次のスライドに進む
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slideItems.length;
            showSlide(container, nextIndex);
        }
        
        // スライドアイテムをクリック/タッチで次のスライドに
        slideItems.forEach((item, index) => {
            // クリックイベント
            item.addEventListener('click', () => {
                nextSlide();
            });
            
            // タッチイベント（モバイル対応）
            let touchStartX = 0;
            let touchEndX = 0;
            
            item.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            item.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, { passive: true });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        // 左にスワイプ（次のスライド）
                        nextSlide();
                    } else {
                        // 右にスワイプ（前のスライド）
                        const prevIndex = (currentSlide - 1 + slideItems.length) % slideItems.length;
                        showSlide(container, prevIndex);
                    }
                } else {
                    // スワイプが少ない場合はタップとして扱う
                    nextSlide();
                }
            }
        });
        
        // インジケータードットをクリックでスライド切り替え
        slideDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(container, index);
            });
        });
    });
}

// ページ読み込み時にスライドを初期化
document.addEventListener('DOMContentLoaded', initSlides);

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
