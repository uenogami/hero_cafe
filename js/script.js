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


// スライド機能
function initSlides() {
    const slideContainers = document.querySelectorAll('.slide-container');
    
    slideContainers.forEach(container => {
        const slideWrapper = container.querySelector('.slide-wrapper');
        const slideItems = container.querySelectorAll('.slide-item:not(.cloned)');
        const slideDots = container.querySelectorAll('.slide-dot');
        let currentSlide = 0;
        let isTransitioning = false;
        
        // クローンスライドを作成
        function createClones() {
            if (slideItems.length === 0) return;
            
            // 最後のスライドを最初にクローン
            const firstClone = slideItems[slideItems.length - 1].cloneNode(true);
            firstClone.classList.add('cloned');
            slideWrapper.insertBefore(firstClone, slideItems[0]);
            
            // 最初のスライドを最後にクローン
            const lastClone = slideItems[0].cloneNode(true);
            lastClone.classList.add('cloned');
            slideWrapper.appendChild(lastClone);
            
            // 初期位置を設定（実際の最初のスライド）
            moveToSlide(1, false);
        }
        
        // スライドを移動
        function moveToSlide(index, animate = true) {
            if (isTransitioning) return;
            
            const allItems = slideWrapper.querySelectorAll('.slide-item');
            const totalSlides = slideItems.length;
            
            if (!animate) {
                slideWrapper.style.transition = 'none';
            } else {
                slideWrapper.style.transition = 'transform 0.3s ease';
            }
            
            const translateX = -index * 100;
            slideWrapper.style.transform = `translateX(${translateX}%)`;
            
            // ドットの更新
            slideDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === (index - 1 + totalSlides) % totalSlides);
            });
            
            currentSlide = index;
            
            if (animate) {
                isTransitioning = true;
                setTimeout(() => {
                    isTransitioning = false;
                    
                    // 端に到達したら、クローンスライドから実際のスライドに移動
                    if (index === 0) {
                        // 最初のクローンスライドにいる場合、最後の実際のスライドに移動
                        moveToSlide(totalSlides, false);
                    } else if (index === totalSlides + 1) {
                        // 最後のクローンスライドにいる場合、最初の実際のスライドに移動
                        moveToSlide(1, false);
                    }
                }, 300);
            }
        }
        
        // 次のスライドに進む
        function nextSlide() {
            if (isTransitioning) return;
            const nextIndex = currentSlide + 1;
            moveToSlide(nextIndex);
        }
        
        // 前のスライドに戻る
        function prevSlide() {
            if (isTransitioning) return;
            const prevIndex = currentSlide - 1;
            moveToSlide(prevIndex);
        }
        
        // 特定のスライドに移動（ドットクリック用）
        function goToSlide(index) {
            if (isTransitioning) return;
            moveToSlide(index + 1); // +1は最初のクローンスライドの分
        }
        
        // クローンスライドを作成
        createClones();
        
        // スライドボタンのイベントリスナー
        const prevBtn = container.querySelector('.slide-btn-prev');
        const nextBtn = container.querySelector('.slide-btn-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // スライドアイテムのスワイプ操作
        const allSlideItems = slideWrapper.querySelectorAll('.slide-item');
        allSlideItems.forEach((item) => {
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
                
                if (Math.abs(diff) > SWIPE_THRESHOLD) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
            }
        });
        
        // インジケータードットをクリックでスライド切り替え
        slideDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
    });
}

// ページ読み込み時にスライドを初期化
document.addEventListener('DOMContentLoaded', initSlides);

// ========== 2. ストーリー紹介アイテムのアニメーション ==========
const activityItems = document.querySelectorAll('.activity-item');
if (activityItems.length > 0) {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    activityItems.forEach(item => {
        observer.observe(item);
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
