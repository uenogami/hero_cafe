// 定数定義
const SWIPE_THRESHOLD = 50;

// メニュー制御関数
function initMenu(menuSelector, openBtnSelector, closeBtnSelector, overlaySelector, navLinksSelector) {
    const menu = document.querySelector(menuSelector);
    const openBtn = document.querySelector(openBtnSelector);
    const closeBtn = document.querySelector(closeBtnSelector);
    const overlay = document.querySelector(overlaySelector);
    const navLinks = navLinksSelector ? document.querySelectorAll(navLinksSelector) : null;

    const openMenu = () => {
        if (menu) {
            menu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeMenu = () => {
        if (menu) {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (openBtn && menu) {
        openBtn.addEventListener('click', openMenu);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    if (navLinks && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
}

// 画面下部インジケーター
// 左メニュー（ダウンロード・SNS）
initMenu(
    '.left-menu',
    '.indicator-left',
    '.menu-close-left',
    '.left-menu-overlay',
    null
);

// 右メニュー（ナビゲーション）
initMenu(
    '.right-menu',
    '.indicator-right',
    '.menu-close-right',
    '.right-menu-overlay',
    '.right-menu-nav a'
);

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

// ヘッダーロゴの表示/非表示制御
const logo = document.querySelector('.logo');
const SCROLL_THRESHOLD = 100; // ロゴを非表示にするスクロール量

if (logo) {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > SCROLL_THRESHOLD) {
            logo.classList.add('hidden');
        } else {
            logo.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
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
        
        // 前のスライドに戻る
        function prevSlide() {
            const prevIndex = (currentSlide - 1 + slideItems.length) % slideItems.length;
            showSlide(container, prevIndex);
        }
        
        // スライドボタンのイベントリスナー
        const prevBtn = container.querySelector('.slide-btn-prev');
        const nextBtn = container.querySelector('.slide-btn-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // スライドアイテムのスワイプ操作のみ
        slideItems.forEach((item, index) => {
            // タッチイベント（スワイプのみ）
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
                const diff = touchStartX - touchEndX;
                
                // スワイプのみを検出（タップは無視）
                if (Math.abs(diff) > SWIPE_THRESHOLD) {
                    if (diff > 0) {
                        // 左にスワイプ（次のスライド）
                        nextSlide();
                    } else {
                        // 右にスワイプ（前のスライド）
                        prevSlide();
                    }
                }
                // タップは何もしない
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
