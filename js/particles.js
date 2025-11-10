// Advanced Particle System

class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isActive = true;
        
        // Default options
        this.options = {
            particleCount: 50,
            particleSize: 4,
            particleSpeed: 1,
            particleLife: 3000,
            colors: ['#667eea', '#764ba2', '#f093fb'],
            shapes: ['circle', 'square', 'triangle'],
            interactive: true,
            gravity: 0.1,
            wind: 0.05,
            ...options
        };
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.bindEvents();
        this.createParticles();
        this.animate();
    }
    
    setupCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        
        this.container.appendChild(this.canvas);
        this.resize();
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        if (this.options.interactive) {
            this.container.addEventListener('mousemove', (e) => {
                const rect = this.container.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });
            
            this.container.addEventListener('mouseleave', () => {
                this.mouse.x = -1000;
                this.mouse.y = -1000;
            });
        }
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    
    createParticles() {
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push(new Particle(this.canvas.width, this.canvas.height, this.options));
        }
    }
    
    animate() {
        if (!this.isActive) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.update(this.mouse);
            particle.draw(this.ctx);
            
            // Remove dead particles and create new ones
            if (particle.isDead()) {
                this.particles[index] = new Particle(this.canvas.width, this.canvas.height, this.options);
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        this.isActive = false;
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

class Particle {
    constructor(canvasWidth, canvasHeight, options) {
        this.options = options;
        this.reset(canvasWidth, canvasHeight);
    }
    
    reset(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * this.options.particleSpeed;
        this.vy = (Math.random() - 0.5) * this.options.particleSpeed;
        this.size = Math.random() * this.options.particleSize + 1;
        this.life = this.options.particleLife;
        this.maxLife = this.options.particleLife;
        this.color = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
        this.shape = this.options.shapes[Math.floor(Math.random() * this.options.shapes.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    }
    
    update(mouse) {
        // Mouse interaction
        if (this.options.interactive) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                this.vx += (dx / distance) * force * 0.5;
                this.vy += (dy / distance) * force * 0.5;
            }
        }
        
        // Apply forces
        this.vy += this.options.gravity;
        this.vx += this.options.wind;
        
        // Update position
        this.x += this.vx;
        this.y += this.vy;
        
        // Update rotation
        this.rotation += this.rotationSpeed;
        
        // Update life
        this.life--;
        
        // Add some drag
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        // Wrap around screen
        if (this.x < 0) this.x = window.innerWidth;
        if (this.x > window.innerWidth) this.x = 0;
        if (this.y > window.innerHeight) this.y = 0;
    }
    
    draw(ctx) {
        const alpha = this.life / this.maxLife;
        
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Parse color and apply alpha
        const color = this.hexToRgba(this.color, alpha);
        ctx.fillStyle = color;
        
        switch (this.shape) {
            case 'circle':
                this.drawCircle(ctx);
                break;
            case 'square':
                this.drawSquare(ctx);
                break;
            case 'triangle':
                this.drawTriangle(ctx);
                break;
        }
        
        ctx.restore();
    }
    
    drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawSquare(ctx) {
        const halfSize = this.size / 2;
        ctx.fillRect(-halfSize, -halfSize, this.size, this.size);
    }
    
    drawTriangle(ctx) {
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(-this.size, this.size);
        ctx.lineTo(this.size, this.size);
        ctx.closePath();
        ctx.fill();
    }
    
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    isDead() {
        return this.life <= 0;
    }
}

// Specialized particle effects
class ParticleEffects {
    static createExplosion(x, y, container, options = {}) {
        const defaultOptions = {
            particleCount: 20,
            particleSize: 6,
            particleSpeed: 5,
            particleLife: 1000,
            colors: ['#ff6b6b', '#ffd93d', '#6bcf7f'],
            shapes: ['circle']
        };
        
        const explosionOptions = { ...defaultOptions, ...options };
        const system = new ParticleSystem(container, explosionOptions);
        
        // Override particle creation for explosion effect
        system.particles = [];
        for (let i = 0; i < explosionOptions.particleCount; i++) {
            const angle = (Math.PI * 2 * i) / explosionOptions.particleCount;
            const speed = Math.random() * explosionOptions.particleSpeed + 2;
            
            const particle = new Particle(container.offsetWidth, container.offsetHeight, explosionOptions);
            particle.x = x;
            particle.y = y;
            particle.vx = Math.cos(angle) * speed;
            particle.vy = Math.sin(angle) * speed;
            
            system.particles.push(particle);
        }
        
        // Auto-destroy after animation
        setTimeout(() => system.destroy(), explosionOptions.particleLife * 2);
        
        return system;
    }
    
    static createFireworks(container, options = {}) {
        const defaultOptions = {
            particleCount: 30,
            particleSize: 3,
            particleSpeed: 8,
            particleLife: 2000,
            colors: ['#ff0080', '#ff8c00', '#00ff80', '#0080ff', '#8000ff'],
            shapes: ['circle']
        };
        
        const fireworksOptions = { ...defaultOptions, ...options };
        
        setInterval(() => {
            const x = Math.random() * container.offsetWidth;
            const y = Math.random() * container.offsetHeight * 0.5;
            
            ParticleEffects.createExplosion(x, y, container, fireworksOptions);
        }, 2000);
    }
    
    static createTrail(element, options = {}) {
        const defaultOptions = {
            particleCount: 5,
            particleSize: 4,
            particleLife: 1000,
            colors: ['#667eea'],
            shapes: ['circle']
        };
        
        const trailOptions = { ...defaultOptions, ...options };
        let lastX = 0;
        let lastY = 0;
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Only create particles if mouse has moved significantly
            if (Math.abs(x - lastX) > 5 || Math.abs(y - lastY) > 5) {
                for (let i = 0; i < trailOptions.particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.style.cssText = `
                        position: absolute;
                        left: ${x}px;
                        top: ${y}px;
                        width: ${trailOptions.particleSize}px;
                        height: ${trailOptions.particleSize}px;
                        background: ${trailOptions.colors[0]};
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 1000;
                        animation: trailParticle ${trailOptions.particleLife}ms linear forwards;
                    `;
                    
                    element.appendChild(particle);
                    
                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    }, trailOptions.particleLife);
                }
                
                lastX = x;
                lastY = y;
            }
        });
        
        // Add CSS animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes trailParticle {
                0% { opacity: 1; transform: scale(1) translateY(0); }
                100% { opacity: 0; transform: scale(0) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Constellation effect
class ConstellationEffect {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            starCount: 100,
            connectionDistance: 150,
            lineOpacity: 0.3,
            starSize: 2,
            animationSpeed: 0.5,
            interactive: true,
            ...options
        };
        
        this.stars = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.createStars();
        this.bindEvents();
        this.animate();
    }
    
    setupCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        
        this.container.appendChild(this.canvas);
        this.resize();
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        if (this.options.interactive) {
            this.container.addEventListener('mousemove', (e) => {
                const rect = this.container.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });
        }
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    
    createStars() {
        this.stars = [];
        for (let i = 0; i < this.options.starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.options.animationSpeed,
                vy: (Math.random() - 0.5) * this.options.animationSpeed,
                size: Math.random() * this.options.starSize + 1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update star positions
        this.stars.forEach(star => {
            star.x += star.vx;
            star.y += star.vy;
            
            // Wrap around edges
            if (star.x < 0) star.x = this.canvas.width;
            if (star.x > this.canvas.width) star.x = 0;
            if (star.y < 0) star.y = this.canvas.height;
            if (star.y > this.canvas.height) star.y = 0;
        });
        
        // Draw connections
        this.drawConnections();
        
        // Draw stars
        this.drawStars();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        this.ctx.strokeStyle = `rgba(102, 126, 234, ${this.options.lineOpacity})`;
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.stars.length; i++) {
            for (let j = i + 1; j < this.stars.length; j++) {
                const dx = this.stars[i].x - this.stars[j].x;
                const dy = this.stars[i].y - this.stars[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.options.connectionDistance) {
                    const opacity = (1 - distance / this.options.connectionDistance) * this.options.lineOpacity;
                    this.ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.stars[i].x, this.stars[i].y);
                    this.ctx.lineTo(this.stars[j].x, this.stars[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Connect to mouse if interactive
        if (this.options.interactive && this.mouse.x > 0) {
            this.stars.forEach(star => {
                const dx = star.x - this.mouse.x;
                const dy = star.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.options.connectionDistance) {
                    const opacity = (1 - distance / this.options.connectionDistance) * this.options.lineOpacity;
                    this.ctx.strokeStyle = `rgba(240, 147, 251, ${opacity})`;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(star.x, star.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.stroke();
                }
            });
        }
    }
    
    drawStars() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        this.stars.forEach(star => {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
}

// Matrix rain effect
class MatrixRain {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            fontSize: 16,
            speed: 50,
            color: '#00ff00',
            ...options
        };
        
        this.drops = [];
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.createDrops();
        this.animate();
    }
    
    setupCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        
        this.container.appendChild(this.canvas);
        this.resize();
    }
    
    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.columns = Math.floor(this.canvas.width / this.options.fontSize);
        this.createDrops();
    }
    
    createDrops() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops.push(Math.floor(Math.random() * -100));
        }
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = this.options.color;
        this.ctx.font = `${this.options.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = String.fromCharCode(0x30A0 + Math.random() * 96);
            const x = i * this.options.fontSize;
            const y = this.drops[i] * this.options.fontSize;
            
            this.ctx.fillText(char, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        setTimeout(() => {
            requestAnimationFrame(() => this.animate());
        }, this.options.speed);
    }
}

// Initialize particle systems
document.addEventListener('DOMContentLoaded', () => {
    // Hero section particles
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        new ConstellationEffect(heroSection, {
            starCount: 80,
            connectionDistance: 120,
            lineOpacity: 0.2,
            animationSpeed: 0.3
        });
    }
    
    // Add particle trail to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        ParticleEffects.createTrail(btn, {
            particleCount: 3,
            particleSize: 3,
            colors: ['#667eea']
        });
    });
});

// Export classes
window.ParticleSystem = ParticleSystem;
window.ParticleEffects = ParticleEffects;
window.ConstellationEffect = ConstellationEffect;
window.MatrixRain = MatrixRain;