// 赤水丹霞景点页面交互脚本
(function() {
    // 视频控制功能
    function initVideoControl() {
        const video = document.getElementById('heroVideo');
        const controlBtn = document.getElementById('videoControl');
        
        if (!video || !controlBtn) return;
        
        // 视频控制按钮点击事件
        controlBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                controlBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                controlBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        // 视频播放状态变化事件
        video.addEventListener('play', function() {
            controlBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });
        
        video.addEventListener('pause', function() {
            controlBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
        
        // 处理视频无法自动播放的情况
        video.addEventListener('error', function() {
            // 如果视频加载失败，隐藏视频并显示静态图片
            video.style.display = 'none';
            controlBtn.style.display = 'none';
            document.querySelector('.hero-video').style.backgroundImage = 'url(../../images/chishui-danxia-hero.jpg)';
            document.querySelector('.hero-video').style.backgroundSize = 'cover';
        });
    }
    
    // 滚动时导航栏样式变化
    function initScrollEffects() {
        const nav = document.querySelector('.attraction-nav');
        if (!nav) return;
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }
    
    // 景点亮点卡片悬停效果
    function initHighlightCards() {
        const cards = document.querySelectorAll('.highlight-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
            });
        });
    }
    
    // 美食卡片翻转效果
    function initFoodCards() {
        const foodCards = document.querySelectorAll('.food-card');
        foodCards.forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('flipped');
            });
        });
    }
    
    // 交通信息卡片展开/收起效果
    function initTransportCards() {
        const transportCards = document.querySelectorAll('.transport-card');
        transportCards.forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('expanded');
            });
        });
    }
    
    // 初始化AOS动画库
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-quad',
                once: true
            });
        }
    }
    
    // 初始化图片懒加载
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // 对不支持IntersectionObserver的浏览器使用备用方案
            images.forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            });
        }
    }
    
    // 图片画廊功能
    function initImageGallery() {
        const galleryItems = document.querySelectorAll('.highlight-image img');
        const overlay = document.createElement('div');
        overlay.className = 'image-gallery-overlay';
        overlay.innerHTML = `
            <div class="gallery-container">
                <img src="" alt="放大图片">
                <button class="gallery-close"><i class="fas fa-times"></i></button>
                <button class="gallery-prev"><i class="fas fa-chevron-left"></i></button>
                <button class="gallery-next"><i class="fas fa-chevron-right"></i></button>
            </div>
        `;
        document.body.appendChild(overlay);
        
        const galleryImg = overlay.querySelector('img');
        const closeBtn = overlay.querySelector('.gallery-close');
        const prevBtn = overlay.querySelector('.gallery-prev');
        const nextBtn = overlay.querySelector('.gallery-next');
        
        let currentIndex = 0;
        
        // 点击图片显示画廊
        galleryItems.forEach((img, index) => {
            img.addEventListener('click', function() {
                currentIndex = index;
                overlay.classList.add('active');
                galleryImg.src = this.src;
                galleryImg.alt = this.alt;
            });
        });
        
        // 关闭画廊
        function closeGallery() {
            overlay.classList.remove('active');
        }
        
        // 上一张图片
        function showPrev() {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            galleryImg.src = galleryItems[currentIndex].src;
            galleryImg.alt = galleryItems[currentIndex].alt;
        }
        
        // 下一张图片
        function showNext() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            galleryImg.src = galleryItems[currentIndex].src;
            galleryImg.alt = galleryItems[currentIndex].alt;
        }
        
        // 绑定事件
        closeBtn.addEventListener('click', closeGallery);
        prevBtn.addEventListener('click', showPrev);
        nextBtn.addEventListener('click', showNext);
        
        // 点击背景关闭画廊
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeGallery();
            }
        });
        
        // 键盘导航
        document.addEventListener('keydown', function(e) {
            if (overlay.classList.contains('active')) {
                if (e.key === 'Escape') closeGallery();
                if (e.key === 'ArrowLeft') showPrev();
                if (e.key === 'ArrowRight') showNext();
            }
        });
    }
    
    // 景点亮点图片轮播
    function initHighlightSlider() {
        const highlightGrid = document.querySelector('.highlights-grid');
        if (!highlightGrid) return;
        
        let isSwiperInitialized = false;
        
        // 监听窗口大小变化
        function handleResize() {
            const width = window.innerWidth;
            
            // 在中等屏幕尺寸下启用Swiper
            if (width <= 992 && !isSwiperInitialized) {
                highlightGrid.classList.add('swiper-container');
                highlightGrid.innerHTML = `
                    <div class="swiper-wrapper">
                        ${Array.from(document.querySelectorAll('.highlight-card')).map(card => `
                            <div class="swiper-slide">${card.outerHTML}</div>
                        `).join('')}
                    </div>
                    <div class="swiper-pagination"></div>
                `;
                
                // 初始化Swiper
                if (typeof Swiper !== 'undefined') {
                    new Swiper('.highlights-grid.swiper-container', {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        }
                    });
                    isSwiperInitialized = true;
                }
            } else if (width > 992 && isSwiperInitialized) {
                // 在大屏幕上恢复原始布局
                const slides = document.querySelectorAll('.swiper-slide');
                slides.forEach(slide => {
                    highlightGrid.appendChild(slide.firstElementChild);
                });
                highlightGrid.classList.remove('swiper-container');
                highlightGrid.innerHTML = highlightGrid.innerHTML.replace(/<div class="swiper-wrapper">[\s\S]*?<\/div>/, '').replace(/<div class="swiper-pagination"><\/div>/, '');
                isSwiperInitialized = false;
            }
        }
        
        // 初始检查
        handleResize();
        
        // 监听窗口大小变化
        window.addEventListener('resize', handleResize);
    }
    
    // 页面加载完成后初始化所有功能
    function init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        initVideoControl();
        initScrollEffects();
        initHighlightCards();
        initFoodCards();
        initTransportCards();
        initAOS();
        initLazyLoading();
        initImageGallery();
        initHighlightSlider();
    }
    
    // 启动脚本
    init();
})();