// Advanced Animation Controller

class AnimationController {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupTextAnimations();
    }

    // Intersection Observer for scroll-triggered animations
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, options);

        // Observe elements with animation classes
        document.querySelectorAll([
            '.animate-on-scroll',
            '.fade-in-up',
            '.fade-in-left',
            '.fade-in-right',
            '.scale-in',
            '.slide-in'
        ].join(', ')).forEach(el => {
            observer.observe(el);
        });

        this.observers.set('intersection', observer);
    }

    // Trigger specific animation based on element classes
    triggerAnimation(element) {
        const classes = element.classList;
        
        if (classes.contains('fade-in-up')) {
            this.fadeInUp(element);
        } else if (classes.contains('fade-in-left')) {
            this.fadeInLeft(element);
        } else if (classes.contains('fade-in-right')) {
            this.fadeInRight(element);
        } else if (classes.contains('scale-in')) {
            this.scaleIn(element);
        } else if (classes.contains('slide-in')) {
            this.slideIn(element);
        }
        
        element.classList.add('animated');
    }

    // Animation methods
    fadeInUp(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    fadeInLeft(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        element.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    fadeInRight(element, duration = 800) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    scaleIn(element, duration = 600) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    slideIn(element, duration = 800) {
        const direction = element.dataset.direction || 'up';
        let transform = '';
        
        switch(direction) {
            case 'up':
                transform = 'translateY(50px)';
                break;
            case 'down':
                transform = 'translateY(-50px)';
                break;
            case 'left':
                transform = 'translateX(50px)';
                break;
            case 'right':
                transform = 'translateX(-50px)';
                break;
        }
        
        element.style.opacity = '0';
        element.style.transform = transform;
        element.style.transition = `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0)';
        });
    }

    // Scroll-based animations
    setupScrollAnimations() {
        let ticking = false;
        
        const updateScrollAnimations = () => {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Parallax elements
            document.querySelectorAll('.parallax').forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            // Floating elements
            document.querySelectorAll('.float-on-scroll').forEach(element => {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top;
                const elementVisible = elementTop < windowHeight;
                
                if (elementVisible) {
                    const scrollPercent = (windowHeight - elementTop) / windowHeight;
                    const floatAmount = Math.sin(scrollPercent * Math.PI) * 20;
                    element.style.transform = `translateY(${floatAmount}px)`;
                }
            });
            
            ticking = false;
        };
        
        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }

    // Hover animations
    setupHoverAnimations() {
        // Magnetic buttons
        document.querySelectorAll('.btn-magnetic').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });

        // Tilt effect
        document.querySelectorAll('.tilt-effect').forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });

        // Glow effect
        document.querySelectorAll('.glow-on-hover').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('glowing');
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove('glowing');
            });
        });
    }

    // Text animations
    setupTextAnimations() {
        // Split text animation
        document.querySelectorAll('.split-text').forEach(element => {
            this.splitTextAnimation(element);
        });

        // Typewriter effect
        document.querySelectorAll('.typewriter').forEach(element => {
            this.typewriterEffect(element);
        });
    }

    splitTextAnimation(element) {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\\u00A0' : char;
            span.style.animationDelay = `${index * 0.1}s`;
            span.classList.add('char-animation');
            element.appendChild(span);
        });
    }

    typewriterEffect(element, speed = 100) {
        const text = element.textContent;
        element.textContent = '';
        
        let index = 0;
        const type = () => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }

    // Stagger animations
    staggerAnimation(elements, animation, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                animation(element);
            }, index * delay);
        });
    }

    // Chain animations
    chainAnimations(element, animations) {
        let index = 0;
        
        const runNext = () => {
            if (index < animations.length) {
                const animation = animations[index];
                animation.func(element, animation.duration);
                
                setTimeout(() => {
                    index++;
                    runNext();
                }, animation.duration || 500);
            }
        };
        
        runNext();
    }

    // Timeline animations
    createTimeline() {
        return new AnimationTimeline();
    }
}

// Animation Timeline Class
class AnimationTimeline {
    constructor() {
        this.animations = [];
        this.currentTime = 0;
    }

    add(element, properties, duration, delay = 0) {
        this.animations.push({
            element,
            properties,
            duration,
            delay,
            startTime: this.currentTime + delay
        });
        
        this.currentTime = Math.max(this.currentTime, this.currentTime + delay + duration);
        return this;
    }

    play() {
        this.animations.forEach(anim => {
            setTimeout(() => {
                Object.entries(anim.properties).forEach(([prop, value]) => {
                    anim.element.style.transition = `${prop} ${anim.duration}ms ease`;
                    anim.element.style[prop] = value;
                });
            }, anim.startTime);
        });
        
        return this;
    }

    reverse() {
        // Implementation for reverse playback
        return this;
    }

    pause() {
        // Implementation for pause functionality
        return this;
    }

    reset() {
        this.animations = [];
        this.currentTime = 0;
        return this;
    }
}

// Performance monitor for animations
class AnimationPerformanceMonitor {
    constructor() {
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 60;
        this.isMonitoring = false;
    }

    start() {
        this.isMonitoring = true;
        this.monitor();
    }

    stop() {
        this.isMonitoring = false;
    }

    monitor() {
        if (!this.isMonitoring) return;
        
        const currentTime = performance.now();
        this.frameCount++;
        
        if (currentTime - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            // Adjust animation quality based on FPS
            if (this.fps < 30) {
                document.body.classList.add('low-performance');
            } else {
                document.body.classList.remove('low-performance');
            }
        }
        
        requestAnimationFrame(() => this.monitor());
    }
}

// Gesture animations for mobile
class GestureAnimations {
    constructor() {
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.init();
    }

    init() {
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
    }

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        if (!this.touchStartX || !this.touchStartY) return;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        
        const deltaX = this.touchStartX - touchX;
        const deltaY = this.touchStartY - touchY;
        
        // Swipe detection and animations
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 50) {
                this.triggerSwipeAnimation('left');
            } else if (deltaX < -50) {
                this.triggerSwipeAnimation('right');
            }
        } else {
            if (deltaY > 50) {
                this.triggerSwipeAnimation('up');
            } else if (deltaY < -50) {
                this.triggerSwipeAnimation('down');
            }
        }
    }

    handleTouchEnd() {
        this.touchStartX = 0;
        this.touchStartY = 0;
    }

    triggerSwipeAnimation(direction) {
        document.body.classList.add(`swipe-${direction}`);
        
        setTimeout(() => {
            document.body.classList.remove(`swipe-${direction}`);
        }, 300);
    }
}

// Initialize animation system
const animationController = new AnimationController();
const performanceMonitor = new AnimationPerformanceMonitor();
const gestureAnimations = new GestureAnimations();

// Export for use in other files
window.AnimationController = AnimationController;
window.animationController = animationController;
window.performanceMonitor = performanceMonitor;

// Start performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    performanceMonitor.start();
}