// 西江千户苗寨景点页面交互脚本
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
            document.querySelector('.hero-video').style.backgroundImage = 'url(../../images/xijiang-miao-village-hero.jpg)';
            document.querySelector('.hero-video').style.backgroundSize = 'cover';
        });
    }
    
    // 苗族歌舞播放功能
    function initMiaoMusicPlayer() {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;
        
        // 创建苗族歌舞播放器
        const musicPlayer = document.createElement('div');
        musicPlayer.className = 'music-player';
        musicPlayer.innerHTML = `
            <button class="music-toggle"><i class="fas fa-music"></i></button>
            <div class="music-info">
                <div class="music-title">苗族芦笙曲</div>
                <div class="music-artist">西江苗寨</div>
            </div>
        `;
        heroContent.appendChild(musicPlayer);
        
        const musicToggle = musicPlayer.querySelector('.music-toggle');
        
        // 音乐播放/暂停
        let musicPlaying = false;
        musicToggle.addEventListener('click', function() {
            musicPlaying = !musicPlaying;
            if (musicPlaying) {
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                playMiaoMusic();
            } else {
                musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                pauseMiaoMusic();
            }
        });
        
        // 播放苗族音乐的函数
        function playMiaoMusic() {
            // 这里可以添加实际播放苗族音乐的代码
            console.log('播放苗族芦笙曲');
        }
        
        // 暂停苗族音乐的函数
        function pauseMiaoMusic() {
            // 这里可以添加暂停播放苗族音乐的代码
            console.log('暂停苗族芦笙曲');
        }
    }
    
    // 吊脚楼闪烁效果
    function initStiltHouseEffect() {
        const heroVideo = document.querySelector('.hero-video');
        if (!heroVideo) return;
        
        // 创建吊脚楼灯光效果
        const houseLights = document.createElement('div');
        houseLights.className = 'house-lights';
        
        // 添加10个吊脚楼灯光
        for (let i = 0; i < 10; i++) {
            const light = document.createElement('div');
            light.className = 'house-light';
            // 随机位置和延迟
            light.style.left = Math.random() * 100 + '%';
            light.style.top = Math.random() * 100 + '%';
            light.style.animationDelay = Math.random() * 2 + 's';
            houseLights.appendChild(light);
        }
        
        heroVideo.appendChild(houseLights);
        
        // 控制灯光闪烁
        function toggleHouseLights() {
            const video = document.getElementById('heroVideo');
            if (video) {
                if (video.paused) {
                    houseLights.style.opacity = '0';
                } else {
                    houseLights.style.opacity = '1';
                }
            }
        }
        
        // 监听视频播放状态
        const video = document.getElementById('heroVideo');
        if (video) {
            video.addEventListener('play', toggleHouseLights);
            video.addEventListener('pause', toggleHouseLights);
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
    
    // 苗族文化体验卡片展开效果
    function initCultureCards() {
        const cultureCards = document.querySelectorAll('.culture-card');
        cultureCards.forEach(card => {
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
    
    // 苗族服饰试穿功能
    function initMiaoCostumeTryOn() {
        const cultureCards = document.querySelectorAll('.culture-card');
        const costumeCard = Array.from(cultureCards).find(card => 
            card.querySelector('h3').textContent === '苗族服饰体验');
        
        if (!costumeCard) return;
        
        // 创建试穿按钮
        const tryOnButton = document.createElement('button');
        tryOnButton.className = 'try-on-button';
        tryOnButton.innerHTML = '<i class="fas fa-tshirt"></i> 虚拟试穿';
        costumeCard.appendChild(tryOnButton);
        
        // 试穿按钮点击事件
        tryOnButton.addEventListener('click', function() {
            // 这里可以集成虚拟试穿功能
            alert('苗族服饰虚拟试穿功能即将推出，敬请期待！');
        });
    }
    
    // 苗族长桌宴动画效果
    function initLongTableBanquet() {
        const cultureSection = document.querySelector('.culture-section');
        if (!cultureSection) return;
        
        // 创建长桌宴动画元素
        const banquetAnimation = document.createElement('div');
        banquetAnimation.className = 'banquet-animation';
        banquetAnimation.innerHTML = `
            <div class="banquet-table">
                <div class="banquet-dishes">
                    <div class="dish"></div>
                    <div class="dish"></div>
                    <div class="dish"></div>
                    <div class="dish"></div>
                    <div class="dish"></div>
                </div>
                <div class="banquet-people">
                    <div class="person"></div>
                    <div class="person"></div>
                    <div class="person"></div>
                    <div class="person"></div>
                    <div class="person"></div>
                </div>
            </div>
        `;
        
        cultureSection.appendChild(banquetAnimation);
        
        // 添加CSS动画
        const style = document.createElement('style');
        style.textContent = `
            .banquet-animation {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 300px;
                height: 200px;
                z-index: 1000;
                display: none;
            }
            
            .banquet-table {
                width: 100%;
                height: 100%;
                background-color: rgba(139, 69, 19, 0.8);
                border-radius: 10px;
                position: relative;
                overflow: hidden;
            }
            
            .banquet-dishes, .banquet-people {
                position: absolute;
                width: 100%;
                display: flex;
                justify-content: space-around;
            }
            
            .banquet-dishes {
                top: 10px;
            }
            
            .banquet-people {
                bottom: 10px;
            }
            
            .dish, .person {
                width: 40px;
                height: 40px;
                background-color: #fff;
                border-radius: 50%;
                animation: float 3s ease-in-out infinite;
            }
            
            .person {
                background-color: #ff6b6b;
            }
            
            .dish:nth-child(2), .person:nth-child(2) {
                animation-delay: 0.5s;
            }
            
            .dish:nth-child(3), .person:nth-child(3) {
                animation-delay: 1s;
            }
            
            .dish:nth-child(4), .person:nth-child(4) {
                animation-delay: 1.5s;
            }
            
            .dish:nth-child(5), .person:nth-child(5) {
                animation-delay: 2s;
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
        
        // 创建触发按钮
        const triggerButton = document.createElement('button');
        triggerButton.className = 'banquet-trigger';
        triggerButton.innerHTML = '<i class="fas fa-utensils"></i> 长桌宴';
        
        const cultureCards = document.querySelectorAll('.culture-card');
        const banquetCard = Array.from(cultureCards).find(card => 
            card.querySelector('h3').textContent === '苗族长桌宴');
        
        if (banquetCard) {
            banquetCard.appendChild(triggerButton);
            
            // 点击按钮显示动画
            triggerButton.addEventListener('click', function() {
                banquetAnimation.style.display = 'block';
                setTimeout(() => {
                    banquetAnimation.style.display = 'none';
                }, 5000);
            });
        }
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
    
    // 苗族文化节庆日历
    function initMiaoFestivalCalendar() {
        const cultureSection = document.querySelector('.culture-section');
        if (!cultureSection) return;
        
        // 创建苗族节庆日历
        const festivalCalendar = document.createElement('div');
        festivalCalendar.className = 'festival-calendar';
        festivalCalendar.innerHTML = `
            <h3>苗族节庆日历</h3>
            <div class="festivals">
                <div class="festival">
                    <div class="festival-date">农历四月八</div>
                    <div class="festival-name">苗族牛王节</div>
                </div>
                <div class="festival">
                    <div class="festival-date">农历六月六</div>
                    <div class="festival-name">苗族歌节</div>
                </div>
                <div class="festival">
                    <div class="festival-date">农历九月九</div>
                    <div class="festival-name">苗年</div>
                </div>
            </div>
        `;
        
        // 添加CSS样式
        const style = document.createElement('style');
        style.textContent = `
            .festival-calendar {
                margin-top: 30px;
                padding: 20px;
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
            }
            
            .festival-calendar h3 {
                text-align: center;
                margin-bottom: 20px;
                color: #ff6b6b;
            }
            
            .festivals {
                display: flex;
                justify-content: space-around;
                flex-wrap: wrap;
            }
            
            .festival {
                text-align: center;
                padding: 10px;
                background-color: rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                margin-bottom: 10px;
                width: 30%;
                min-width: 150px;
            }
            
            .festival-date {
                font-weight: bold;
                color: #ffd93d;
                margin-bottom: 5px;
            }
            
            .festival-name {
                font-size: 14px;
            }
        `;
        document.head.appendChild(style);
        
        cultureSection.appendChild(festivalCalendar);
    }
    
    // 页面加载完成后初始化所有功能
    function init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        initVideoControl();
        initMiaoMusicPlayer();
        initStiltHouseEffect();
        initScrollEffects();
        initHighlightCards();
        initFoodCards();
        initCultureCards();
        initTransportCards();
        initMiaoCostumeTryOn();
        initLongTableBanquet();
        initAOS();
        initLazyLoading();
        initImageGallery();
        initHighlightSlider();
        initMiaoFestivalCalendar();
    }
    
    // 启动脚本
    init();
})();