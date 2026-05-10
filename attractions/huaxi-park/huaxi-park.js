// 花溪公园页面交互功能
class HuaxiParkTourismApp {
    constructor() {
        this.init();
    }

    init() {
        this.initAOS();
        this.initSwiper();
        this.bindEvents();
        this.initVideoControl();
        this.initBackToTop();
    }

    // 初始化AOS动画库
    initAOS() {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // 初始化Swiper轮播图
    initSwiper() {
        const foodSwiper = new Swiper('.food-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40
                }
            }
        });
    }

    // 绑定事件监听器
    bindEvents() {
        // 景点亮点卡片悬停效果
        const highlightCards = document.querySelectorAll('.highlight-card');
        highlightCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleHighlightHover.bind(this));
            card.addEventListener('mouseleave', this.handleHighlightLeave.bind(this));
        });

        // 美食卡片悬停效果
        const foodCards = document.querySelectorAll('.food-card');
        foodCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleFoodHover.bind(this));
            card.addEventListener('mouseleave', this.handleFoodLeave.bind(this));
        });

        // 交通卡片悬停效果
        const transportCards = document.querySelectorAll('.transport-card');
        transportCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleTransportHover.bind(this));
            card.addEventListener('mouseleave', this.handleTransportLeave.bind(this));
        });

        // 相关景点卡片悬停效果
        const attractionLinks = document.querySelectorAll('.attraction-link');
        attractionLinks.forEach(link => {
            link.addEventListener('mouseenter', this.handleAttractionHover.bind(this));
            link.addEventListener('mouseleave', this.handleAttractionLeave.bind(this));
        });
    }

    // 视频控制
    initVideoControl() {
        const video = document.getElementById('mainVideo');
        const controlBtn = document.getElementById('videoControlBtn');
        const playIcon = controlBtn.querySelector('.play-icon');
        const pauseIcon = controlBtn.querySelector('.pause-icon');

        controlBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
            } else {
                video.pause();
                playIcon.style.display = 'inline';
                pauseIcon.style.display = 'none';
            }
        });

        // 视频播放结束时重置
        video.addEventListener('ended', () => {
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        });
    }

    // 回到顶部按钮
    initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 景点亮点卡片悬停效果
    handleHighlightHover(event) {
        const card = event.currentTarget;
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    }

    // 景点亮点卡片离开效果
    handleHighlightLeave(event) {
        const card = event.currentTarget;
        card.style.transform = '';
        card.style.boxShadow = '';
    }

    // 美食卡片悬停效果
    handleFoodHover(event) {
        const card = event.currentTarget;
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    }

    // 美食卡片离开效果
    handleFoodLeave(event) {
        const card = event.currentTarget;
        card.style.transform = '';
        card.style.boxShadow = '';
    }

    // 交通卡片悬停效果
    handleTransportHover(event) {
        const card = event.currentTarget;
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    }

    // 交通卡片离开效果
    handleTransportLeave(event) {
        const card = event.currentTarget;
        card.style.transform = '';
        card.style.boxShadow = '';
    }

    // 相关景点卡片悬停效果
    handleAttractionHover(event) {
        const link = event.currentTarget;
        link.style.transform = 'translateY(-10px)';
        link.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
    }

    // 相关景点卡片离开效果
    handleAttractionLeave(event) {
        const link = event.currentTarget;
        link.style.transform = '';
        link.style.boxShadow = '';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const app = new HuaxiParkTourismApp();
    
    // 控制台输出帮助信息
    console.log(`
    🏞️ 欢迎来到花溪公园！🏞️
    
    高原明珠，贵阳市后花园
    
    主要景点：
    - 花溪河：贯穿全园的灵魂水系
    - 百步桥：网红打卡点，水上奇景
    - 麟山：公园主峰，360°观景
    - 黄金大道：秋季绝美景观
    
    祝您游览愉快！
    `);
});