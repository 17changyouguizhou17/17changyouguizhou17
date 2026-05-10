// 韭菜坪景点页面交互逻辑

// 初始化AOS动画
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// 视频播放控制
const video = document.getElementById('heroVideo');
const videoControlBtn = document.getElementById('videoControl');

videoControlBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        videoControlBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        video.pause();
        videoControlBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// 图片加载优化
const images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    
    // 设置占位图片或加载效果
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease-in-out';
});

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', () => {
    console.log('韭菜坪景点页面加载完成');
    
    // 添加页面进入动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 响应式布局调整
window.addEventListener('resize', () => {
    // 根据窗口大小调整元素
    console.log('窗口大小变化，调整布局');
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 鼠标悬停效果
const relatedCards = document.querySelectorAll('.related-card');

relatedCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// 点击交互效果
const transportCards = document.querySelectorAll('.transport-card');

transportCards.forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
    });
});