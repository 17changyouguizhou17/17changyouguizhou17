// 荔波小七孔景点页面交互脚本
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
            document.querySelector('.hero-video').style.backgroundImage = 'url(../../images/libo-xiaqikong-hero.jpg)';
            document.querySelector('.hero-video').style.backgroundSize = 'cover';
        });
    }
    
    // 水波动画效果
    function initWaterEffect() {
        const heroVideo = document.querySelector('.hero-video');
        if (!heroVideo) return;
        
        // 创建水波粒子效果
        const waterParticles = document.createElement('div');
        waterParticles.className = 'water-particles';
        
        // 添加30个水波粒子
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'water-particle';
            // 随机位置和大小
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = Math.random() * 3 + 2 + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            waterParticles.appendChild(particle);
        }
        
        heroVideo.appendChild(waterParticles);
        
        // 控制水波粒子的开启和关闭
        function toggleWaterParticles() {
            const video = document.getElementById('heroVideo');
            if (video) {
                if (video.paused) {
                    waterParticles.style.opacity = '0';
                } else {
                    waterParticles.style.opacity = '1';
                }
            }
        }
        
        // 监听视频播放状态
        const video = document.getElementById('heroVideo');
        if (video) {
            video.addEventListener('play', toggleWaterParticles);
            video.addEventListener('pause', toggleWaterParticles);
        }
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
    
    // 生态体验卡片展开效果
    function initEcoCards() {
        const ecoCards = document.querySelectorAll('.eco-card');
        ecoCards.forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('expanded');
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
    
    // 水上森林虚拟体验
    function initForestExperience() {
        const ecoCards = document.querySelectorAll('.eco-card');
        const forestCard = Array.from(ecoCards).find(card => 
            card.querySelector('h3').textContent === '水上森林漫步');
        
        if (!forestCard) return;
        
        // 创建体验按钮
        const experienceButton = document.createElement('button');
        experienceButton.className = 'experience-button';
        experienceButton.innerHTML = '<i class="fas fa-water"></i> 虚拟体验';
        forestCard.appendChild(experienceButton);
        
        // 体验按钮点击事件
        experienceButton.addEventListener('click', function() {
            // 这里可以集成虚拟体验功能
            alert('水上森林虚拟体验功能即将推出，敬请期待！');
        });
    }
    
    // 水质检测互动
    function initWaterQualityCheck() {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;
        
        // 创建水质检测器
        const waterQualityDetector = document.createElement('div');
        waterQualityDetector.className = 'water-quality-detector';
        waterQualityDetector.innerHTML = `
            <button class="quality-check-btn"><i class="fas fa-flask"></i> 水质检测</button>
            <div class="quality-result"></div>
        `;
        heroContent.appendChild(waterQualityDetector);
        
        const qualityCheckBtn = waterQualityDetector.querySelector('.quality-check-btn');
        const qualityResult = waterQualityDetector.querySelector('.quality-result');
        
        // 水质检测按钮点击事件
        qualityCheckBtn.addEventListener('click', function() {
            // 模拟水质检测过程
            qualityResult.innerHTML = '<div class="quality-loading"><i class="fas fa-spinner fa-spin"></i> 检测中...</div>';
            
            setTimeout(() => {
                // 随机生成检测结果
                const qualityLevel = Math.floor(Math.random() * 4) + 1;
                let qualityText = '';
                let qualityColor = '';
                
                switch(qualityLevel) {
                    case 1:
                        qualityText = '优秀 - 清洁无污染';
                        qualityColor = '#2ecc71';
                        break;
                    case 2:
                        qualityText = '良好 - 水质清澈';
                        qualityColor = '#3498db';
                        break;
                    case 3:
                        qualityText = '一般 - 水质可饮用';
                        qualityColor = '#f39c12';
                        break;
                    case 4:
                        qualityText = '需处理 - 不建议直接饮用';
                        qualityColor = '#e74c3c';
                        break;
                }
                
                qualityResult.innerHTML = `
                    <div class="quality-display" style="border-left: 5px solid ${qualityColor}">
                        <div class="quality-title">水质检测结果</div>
                        <div class="quality-level">${qualityText}</div>
                        <div class="quality-indicators">
                            <div class="indicator">
                                <span>酸碱度：</span>
                                <span>${(Math.random() * 2 + 6).toFixed(1)}</span>
                            </div>
                            <div class="indicator">
                                <span>溶解氧：</span>
                                <span>${(Math.random() * 5 + 5).toFixed(1)} mg/L</span>
                            </div>
                            <div class="indicator">
                                <span>浊度：</span>
                                <span>${(Math.random() * 5).toFixed(1)} NTU</span>
                            </div>
                        </div>
                    </div>
                `;
            }, 2000);
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
                <div class="gallery-caption"></div>
            </div>
        `;
        document.body.appendChild(overlay);
        
        const galleryImg = overlay.querySelector('img');
        const closeBtn = overlay.querySelector('.gallery-close');
        const prevBtn = overlay.querySelector('.gallery-prev');
        const nextBtn = overlay.querySelector('.gallery-next');
        const caption = overlay.querySelector('.gallery-caption');
        
        let currentIndex = 0;
        
        // 点击图片显示画廊
        galleryItems.forEach((img, index) => {
            img.addEventListener('click', function() {
                currentIndex = index;
                overlay.classList.add('active');
                galleryImg.src = this.src;
                galleryImg.alt = this.alt;
                caption.textContent = this.alt;
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
            caption.textContent = galleryItems[currentIndex].alt;
        }
        
        // 下一张图片
        function showNext() {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            galleryImg.src = galleryItems[currentIndex].src;
            galleryImg.alt = galleryItems[currentIndex].alt;
            caption.textContent = galleryItems[currentIndex].alt;
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
    
    // 小七孔古桥历史动画
    function initBridgeHistory() {
        const descriptionSection = document.querySelector('.description-section');
        if (!descriptionSection) return;
        
        // 创建历史展示元素
        const historyDisplay = document.createElement('div');
        historyDisplay.className = 'bridge-history';
        historyDisplay.innerHTML = `
            <h3>小七孔古桥历史</h3>
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-year">1827年</div>
                    <div class="timeline-content">清道光年间，小七孔古桥建成</div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-year">1990年代</div>
                    <div class="timeline-content">荔波开始开发小七孔景区</div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-year">2000年代</div>
                    <div class="timeline-content">小七孔景区被评为国家级风景名胜区</div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-year">2015年</div>
                    <div class="timeline-content">小七孔景区被评为国家5A级景区</div>
                </div>
            </div>
        `;
        
        descriptionSection.appendChild(historyDisplay);
        
        // 添加CSS样式
        const style = document.createElement('style');
        style.textContent = `
            .bridge-history {
                margin-top: 30px;
                padding: 20px;
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
            }
            
            .bridge-history h3 {
                text-align: center;
                margin-bottom: 20px;
                color: #ff6b6b;
            }
            
            .timeline {
                position: relative;
                padding-left: 30px;
            }
            
            .timeline::before {
                content: '';
                position: absolute;
                left: 10px;
                top: 0;
                bottom: 0;
                width: 2px;
                background-color: #ff6b6b;
            }
            
            .timeline-item {
                position: relative;
                margin-bottom: 20px;
                padding-left: 20px;
            }
            
            .timeline-item::before {
                content: '';
                position: absolute;
                left: -24px;
                top: 5px;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: #ff6b6b;
            }
            
            .timeline-year {
                font-weight: bold;
                color: #ffd93d;
                margin-bottom: 5px;
            }
            
            .timeline-content {
                font-size: 14px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 瀑布流水声效果
    function initWaterfallSound() {
        const heroVideo = document.querySelector('.hero-video');
        if (!heroVideo) return;
        
        // 创建瀑布声音控制器
        const soundController = document.createElement('div');
        soundController.className = 'sound-controller';
        soundController.innerHTML = `
            <button class="sound-toggle"><i class="fas fa-volume-up"></i></button>
            <input type="range" class="sound-volume" min="0" max="100" value="50">
        `;
        heroVideo.appendChild(soundController);
        
        const soundToggle = soundController.querySelector('.sound-toggle');
        const soundVolume = soundController.querySelector('.sound-volume');
        
        // 声音开关
        let soundEnabled = false;
        soundToggle.addEventListener('click', function() {
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                soundToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                // 这里可以添加播放瀑布声音的代码
                playWaterfallSound();
            } else {
                soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                // 这里可以添加停止播放声音的代码
                stopWaterfallSound();
            }
        });
        
        // 音量控制
        soundVolume.addEventListener('input', function() {
            // 这里可以添加调整音量的代码
            setWaterfallVolume(this.value / 100);
        });
        
        // 播放瀑布声音的函数
        function playWaterfallSound() {
            // 这里可以添加实际播放瀑布声音的代码
            console.log('播放瀑布流水声');
        }
        
        // 停止播放瀑布声音的函数
        function stopWaterfallSound() {
            // 这里可以添加停止播放瀑布声音的代码
            console.log('停止播放瀑布流水声');
        }
        
        // 设置瀑布声音音量的函数
        function setWaterfallVolume(volume) {
            // 这里可以添加设置瀑布声音音量的代码
            console.log('设置瀑布流水声音量:', volume);
        }
    }
    
    // 页面加载完成后初始化所有功能
    function init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        initVideoControl();
        initWaterEffect();
        initScrollEffects();
        initHighlightCards();
        initFoodCards();
        initEcoCards();
        initTransportCards();
        initForestExperience();
        initWaterQualityCheck();
        initAOS();
        initLazyLoading();
        initImageGallery();
        initHighlightSlider();
        initBridgeHistory();
        initWaterfallSound();
    }
    
    // 启动脚本
    init();
})();