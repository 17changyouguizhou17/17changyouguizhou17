// 页面加载完成后初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化AOS动画
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true
    });

    // 初始化滑块
    initFoodSlider();
    
    // 初始化交互功能
    initVideoControl();
    initFormationAnimation();
    initCaveSoundExperience();
    initScrollEffects();
    
    // 初始化回到顶部按钮
    initBackToTop();
});

// 视频控制功能
function initVideoControl() {
    const video = document.getElementById('mainVideo');
    const playBtn = document.getElementById('videoControlBtn');
    const playIcon = playBtn.querySelector('.play-icon');
    const pauseIcon = playBtn.querySelector('.pause-icon');

    // 初始状态设为静音播放
    video.muted = true;
    video.play().catch(e => console.log('自动播放失败:', e));

    // 播放/暂停按钮点击事件
    playBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline-block';
        } else {
            video.pause();
            playIcon.style.display = 'inline-block';
            pauseIcon.style.display = 'none';
        }
    });

    // 视频播放状态变化时更新按钮
    video.addEventListener('play', function() {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'inline-block';
    });

    video.addEventListener('pause', function() {
        playIcon.style.display = 'inline-block';
        pauseIcon.style.display = 'none';
    });

    // 点击视频区域切换播放状态
    video.addEventListener('click', function() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
}

// 美食滑块
function initFoodSlider() {
    const foodSwiper = new Swiper('.food-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });
}

// 溶洞形成动画
function initFormationAnimation() {
    const canvas = document.getElementById('formationCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startFormationBtn');
    const resetBtn = document.getElementById('resetFormationBtn');
    
    let animationId = null;
    let isAnimating = false;
    
    // 绘制初始洞顶
    function drawCeiling() {
        ctx.fillStyle = '#8d8d8d';
        ctx.fillRect(0, 0, canvas.width, 50);
        
        // 添加一些不规则性
        for (let i = 0; i < 5; i++) {
            const x = i * (canvas.width / 5);
            const height = 30 + Math.random() * 40;
            ctx.fillRect(x, 30, canvas.width / 6, height);
        }
    }
    
    // 绘制地面
    function drawGround() {
        ctx.fillStyle = '#7a7a7a';
        ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
        
        // 添加一些不规则性
        for (let i = 0; i < 5; i++) {
            const x = i * (canvas.width / 5);
            const height = 20 + Math.random() * 20;
            ctx.fillRect(x, canvas.height - 20 - height, canvas.width / 6, height);
        }
    }
    
    // 绘制水滴
    function drawDrop(x, y) {
        ctx.fillStyle = '#4da6ff';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // 绘制钟乳石
    function drawStalactite(x, topY, bottomY) {
        const width = 8 + Math.random() * 12;
        const height = bottomY - topY;
        
        // 绘制主体
        ctx.fillStyle = '#d9d9d9';
        ctx.fillRect(x - width/2, topY, width, height);
        
        // 添加渐变效果
        const gradient = ctx.createLinearGradient(x - width/2, topY, x + width/2, bottomY);
        gradient.addColorStop(0, '#bfbfbf');
        gradient.addColorStop(0.5, '#e6e6e6');
        gradient.addColorStop(1, '#cccccc');
        ctx.fillStyle = gradient;
        ctx.fillRect(x - width/2, topY, width, height);
    }
    
    // 绘制石笋
    function drawStalagmite(x, topY, bottomY) {
        const width = 10 + Math.random() * 15;
        const height = bottomY - topY;
        
        // 绘制主体
        ctx.fillStyle = '#d9d9d9';
        ctx.fillRect(x - width/2, topY, width, height);
        
        // 添加渐变效果
        const gradient = ctx.createLinearGradient(x - width/2, topY, x + width/2, bottomY);
        gradient.addColorStop(0, '#bfbfbf');
        gradient.addColorStop(0.5, '#e6e6e6');
        gradient.addColorStop(1, '#cccccc');
        ctx.fillStyle = gradient;
        ctx.fillRect(x - width/2, topY, width, height);
    }
    
    // 绘制石柱
    function drawColumn(x, topY, bottomY) {
        const width = 15 + Math.random() * 20;
        const height = bottomY - topY;
        
        // 绘制主体
        ctx.fillStyle = '#d9d9d9';
        ctx.fillRect(x - width/2, topY, width, height);
        
        // 添加纹理
        ctx.fillStyle = '#b3b3b3';
        for (let i = 0; i < height; i += 8) {
            ctx.fillRect(x - width/2, topY + i, width, 2);
        }
        
        // 添加渐变效果
        const gradient = ctx.createLinearGradient(x - width/2, topY, x + width/2, bottomY);
        gradient.addColorStop(0, '#bfbfbf');
        gradient.addColorStop(0.5, '#e6e6e6');
        gradient.addColorStop(1, '#cccccc');
        ctx.fillStyle = gradient;
        ctx.fillRect(x - width/2, topY, width, height);
    }
    
    // 初始化场景
    function initScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCeiling();
        drawGround();
    }
    
    // 动画变量
    const stalactites = [];
    const stalagmites = [];
    const drops = [];
    let animationFrame = 0;
    
    // 开始形成动画
    function startFormation() {
        if (isAnimating) return;
        
        isAnimating = true;
        animationFrame = 0;
        
        // 初始化场景
        initScene();
        
        // 清空之前的结构
        stalactites.length = 0;
        stalagmites.length = 0;
        drops.length = 0;
        
        // 创建一些初始钟乳石和石笋
        for (let i = 0; i < 3; i++) {
            const x = (i + 1) * (canvas.width / 4);
            stalactites.push({
                x: x,
                topY: 50,
                bottomY: 80,
                growthRate: 0.5 + Math.random() * 0.5
            });
            
            stalagmites.push({
                x: x + (Math.random() * 40 - 20),
                topY: canvas.height - 80,
                bottomY: canvas.height - 30,
                growthRate: 0.5 + Math.random() * 0.5
            });
        }
        
        // 启动动画循环
        animate();
    }
    
    // 重置动画
    function resetFormation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        isAnimating = false;
        initScene();
    }
    
    // 动画循环
    function animate() {
        animationFrame++;
        
        // 每隔一定帧数生成新的水滴
        if (animationFrame % 20 === 0) {
            const x = Math.random() * canvas.width;
            drops.push({
                x: x,
                y: 60,
                speed: 1 + Math.random() * 1.5
            });
        }
        
        // 更新和绘制水滴
        for (let i = drops.length - 1; i >= 0; i--) {
            const drop = drops[i];
            drop.y += drop.speed;
            
            // 绘制水滴
            drawDrop(drop.x, drop.y);
            
            // 检查是否到达钟乳石
            let hitStalactite = false;
            for (const stalactite of stalactites) {
                if (drop.x > stalactite.x - 10 && drop.x < stalactite.x + 10 &&
                    drop.y > stalactite.bottomY && drop.y < stalactite.bottomY + 10) {
                    hitStalactite = true;
                    stalactite.bottomY += stalactite.growthRate;
                    
                    // 如果钟乳石足够长，检查是否与石笋连接
                    for (const stalagmite of stalagmites) {
                        if (Math.abs(stalactite.x - stalagmite.x) < 15 &&
                            stalactite.bottomY >= stalagmite.topY) {
                            // 形成石柱
                            stalactites.push({
                                x: stalactite.x,
                                topY: stalactite.topY,
                                bottomY: stalactite.bottomY,
                                isColumn: true,
                                width: 15 + Math.random() * 10
                            });
                            
                            // 移除原来的钟乳石和石笋
                            const stalactiteIndex = stalactites.indexOf(stalactite);
                            if (stalactiteIndex !== -1) {
                                stalactites.splice(stalactiteIndex, 1);
                            }
                            
                            const stalagmiteIndex = stalagmites.indexOf(stalagmite);
                            if (stalagmiteIndex !== -1) {
                                stalagmites.splice(stalagmiteIndex, 1);
                            }
                        }
                    }
                    
                    break;
                }
            }
            
            // 检查是否到达石笋
            if (!hitStalactite) {
                for (const stalagmite of stalagmites) {
                    if (drop.x > stalagmite.x - 10 && drop.x < stalagmite.x + 10 &&
                        drop.y > stalagmite.topY - 10 && drop.y < stalagmite.topY) {
                        hitStalactite = true;
                        stalagmite.topY -= stalagmite.growthRate;
                        break;
                    }
                }
            }
            
            // 如果水滴没有击中任何结构，移除它
            if (hitStalactite || drop.y > canvas.height - 30) {
                drops.splice(i, 1);
            }
        }
        
        // 绘制钟乳石
        for (const stalactite of stalactites) {
            if (stalactite.isColumn) {
                drawColumn(stalactite.x, stalactite.topY, stalactite.bottomY);
            } else {
                drawStalactite(stalactite.x, stalactite.topY, stalactite.bottomY);
            }
        }
        
        // 绘制石笋
        for (const stalagmite of stalagmites) {
            drawStalagmite(stalagmite.x, stalagmite.topY, stalagmite.bottomY);
        }
        
        // 继续动画
        if (isAnimating) {
            animationId = requestAnimationFrame(animate);
        }
    }
    
    // 绑定事件
    startBtn.addEventListener('click', startFormation);
    resetBtn.addEventListener('click', resetFormation);
    
    // 初始化场景
    initScene();
}

// 洞穴音效体验
function initCaveSoundExperience() {
    const soundBtn = document.getElementById('caveSoundBtn');
    let isPlaying = false;
    let audioContext = null;
    let gainNode = null;
    
    // 创建音频上下文和增益节点
    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            gainNode = audioContext.createGain();
            gainNode.connect(audioContext.destination);
            gainNode.gain.value = 0.5; // 设置音量
        }
    }
    
    // 生成水滴声
    function createWaterDropSound(frequency, duration, delay) {
        setTimeout(() => {
            if (!audioContext) return;
            
            const oscillator = audioContext.createOscillator();
            const waterDropGain = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            
            // 创建水滴声包络
            waterDropGain.gain.setValueAtTime(0, audioContext.currentTime);
            waterDropGain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
            waterDropGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.connect(waterDropGain);
            waterDropGain.connect(gainNode);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        }, delay);
    }
    
    // 生成回声效果
    function createEcho(delay, duration) {
        setTimeout(() => {
            if (!audioContext) return;
            
            const oscillator = audioContext.createOscillator();
            const echoGain = audioContext.createGain();
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            
            echoGain.gain.setValueAtTime(0, audioContext.currentTime);
            echoGain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
            echoGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.connect(echoGain);
            echoGain.connect(gainNode);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        }, delay);
    }
    
    // 播放洞穴音效
    function playCaveSounds() {
        initAudio();
        
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        // 随机生成水滴声
        for (let i = 0; i < 10; i++) {
            const delay = Math.random() * 2000; // 0-2秒随机延迟
            const frequency = 500 + Math.random() * 800; // 500-1300Hz随机频率
            const duration = 0.2 + Math.random() * 0.3; // 0.2-0.5秒随机持续时间
            createWaterDropSound(frequency, duration, delay);
        }
        
        // 添加一些回声效果
        for (let i = 0; i < 3; i++) {
            const delay = 500 + Math.random() * 2000; // 0.5-2.5秒随机延迟
            const duration = 1 + Math.random() * 2; // 1-3秒随机持续时间
            createEcho(delay, duration);
        }
    }
    
    // 停止音效
    function stopSounds() {
        if (audioContext && audioContext.state === 'running') {
            audioContext.suspend();
        }
    }
    
    // 按钮点击事件
    soundBtn.addEventListener('click', function() {
        if (!isPlaying) {
            playCaveSounds();
            soundBtn.innerHTML = '<i class="sound-icon">🔊</i><span>正在播放洞穴音效</span>';
            isPlaying = true;
            
            // 5秒后自动停止
            setTimeout(() => {
                stopSounds();
                soundBtn.innerHTML = '<i class="sound-icon">🔊</i><span>播放洞穴音效</span>';
                isPlaying = false;
            }, 5000);
        } else {
            stopSounds();
            soundBtn.innerHTML = '<i class="sound-icon">🔊</i><span>播放洞穴音效</span>';
            isPlaying = false;
        }
    });
}

// 滚动效果
function initScrollEffects() {
    // 添加滚动时的视差效果
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const videoHeader = document.querySelector('.video-header');
        const mainVideo = document.getElementById('mainVideo');
        
        // 视差效果：视频区域滚动时产生视差
        if (videoHeader && mainVideo) {
            const speed = scrollTop * 0.5;
            mainVideo.style.transform = `translateY(${speed}px)`;
        }
    });
}

// 回到顶部按钮
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}