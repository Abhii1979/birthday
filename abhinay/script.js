/* ----------------------------------------------------
   PROJECT KAVYA ❤️ - JAVASCRIPT
   Elegant • Romantic • Cinematic • Minimal
   ---------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    /* ====================================================
       1. SMOOTH SCROLL (Lenis) & GSAP INTEGRATION
       ==================================================== */
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis scroll updates to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });


    /* ====================================================
       2. MOUSE GLOW ORB & CARD TILT EFFECT
       ==================================================== */
    const glow = document.getElementById('cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        // Position custom glow orb
        gsap.to(glow, {
            left: e.clientX,
            top: e.clientY,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    // 3D Card Hover Tilt + Dynamic Spotlight
    const wordCards = document.querySelectorAll('.word-card');
    wordCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position inside elements
            const y = e.clientY - rect.top;  // y position inside elements
            
            // Set mouse coordinates as CSS custom properties
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Calculate 3D tilt angles (center is 0deg)
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = -(y - centerY) / 8; // Max tilt 8 deg
            const rotateY = (x - centerX) / 8;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Apply customized glow colored shadow based on card attribute
            const glowColor = card.getAttribute('data-glow-color') || 'rgba(179, 136, 255, 0.4)';
            card.style.boxShadow = `0 15px 35px rgba(0,0,0,0.5), 0 0 25px ${glowColor}66`;
            
            // Slight shift to icon
            const icon = card.querySelector('.svg-icon');
            if (icon) {
                icon.style.transform = `translateZ(20px) scale(1.1)`;
                icon.style.fill = '#ffffff';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset to default styling smoothly
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
            
            const icon = card.querySelector('.svg-icon');
            if (icon) {
                icon.style.transform = 'translateZ(0) scale(1)';
                icon.style.fill = 'var(--violet)';
            }
        });
    });


    /* ====================================================
       3. INTRO ANIMATIONS & BACKGROUND STARS CANVAS
       ==================================================== */
    const introCanvas = document.getElementById('intro-canvas');
    const ctxI = introCanvas.getContext('2d');
    
    let stars = [];
    
    function resizeIntroCanvas() {
        introCanvas.width = window.innerWidth;
        introCanvas.height = window.innerHeight;
    }
    resizeIntroCanvas();
    window.addEventListener('resize', resizeIntroCanvas);

    // Star Object Creator
    function Star() {
        this.x = Math.random() * introCanvas.width;
        this.y = Math.random() * introCanvas.height;
        this.size = Math.random() * 1.5;
        this.alpha = Math.random();
        this.speed = Math.random() * 0.02 + 0.005;
    }

    Star.prototype.draw = function() {
        ctxI.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctxI.beginPath();
        ctxI.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctxI.fill();
    };

    Star.prototype.update = function() {
        this.alpha += this.speed;
        if (this.alpha > 1 || this.alpha < 0) {
            this.speed = -this.speed;
        }
    };

    // Populate stars
    for (let i = 0; i < 80; i++) {
        stars.push(new Star());
    }

    function animateStars() {
        if (!introCanvas) return;
        ctxI.clearRect(0, 0, introCanvas.width, introCanvas.height);
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animateStars);
    }
    animateStars();

    // Setup Typed.js
    const typed = new Typed('#typed-intro', {
        strings: [
            'Kavya Maaa...',
            'Someone made something^1000<br>just for you...'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        showCursor: false,
        onComplete: () => {
            // Fade-in Begin button
            const beginBtn = document.getElementById('begin-btn');
            beginBtn.style.display = 'block';
            gsap.to(beginBtn, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.5,
                ease: 'power3.out'
            });
        }
    });

    // Begin Button Click - Transition to main site
    const beginBtn = document.getElementById('begin-btn');
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const audio = document.getElementById('bg-audio');
    const musicPlayer = document.getElementById('music-player');

    beginBtn.addEventListener('click', () => {
        // Start background music
        audio.play().then(() => {
            musicPlayer.classList.add('playing');
            musicPlayer.querySelector('.music-text').textContent = 'Music On';
        }).catch(err => {
            console.log("Audio autoplay prevented. User will need to interact manual if required.", err);
        });

        // Intro screen transition
        gsap.to(introScreen, {
            opacity: 0,
            duration: 1.5,
            ease: 'power2.inOut',
            onComplete: () => {
                introScreen.style.visibility = 'hidden';
                // Stop the starry loops inside intro
                window.removeEventListener('resize', resizeIntroCanvas);
            }
        });

        // Reveal main container
        mainContent.style.opacity = '1';
        
        // Refresh GSAP ScrollTrigger positions now that layout is visible
        setTimeout(() => {
            ScrollTrigger.refresh();
            // Launch an initial clean greeting confetti burst
            confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFE5EC', '#F8D9FF', '#B388FF']
            });
        }, 100);
    });


    /* ====================================================
       4. AUDIO CONTROLLER CODE
       ==================================================== */
    musicPlayer.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            musicPlayer.classList.add('playing');
            musicPlayer.querySelector('.music-text').textContent = 'Music On';
        } else {
            audio.pause();
            musicPlayer.classList.remove('playing');
            musicPlayer.querySelector('.music-text').textContent = 'Music Off';
        }
    });


    /* ====================================================
       5. FALLING PETALS CANVAS ENGINE
       ==================================================== */
    const particlesCanvas = document.getElementById('particles-canvas');
    const ctxP = particlesCanvas.getContext('2d');
    
    let petals = [];

    function resizeParticlesCanvas() {
        particlesCanvas.width = window.innerWidth;
        particlesCanvas.height = window.innerHeight;
    }
    resizeParticlesCanvas();
    window.addEventListener('resize', resizeParticlesCanvas);

    function Petal() {
        this.x = Math.random() * particlesCanvas.width;
        this.y = Math.random() * -20 - 10;
        this.size = Math.random() * 8 + 6;
        this.speedX = Math.random() * 1.5 - 0.5;
        this.speedY = Math.random() * 1.2 + 0.8;
        this.opacity = Math.random() * 0.5 + 0.4;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;
        this.wobble = Math.random() * 10;
        this.wobbleSpeed = Math.random() * 0.03 + 0.01;
    }

    Petal.prototype.draw = function() {
        ctxP.save();
        ctxP.translate(this.x + Math.sin(this.wobble) * 15, this.y);
        ctxP.rotate(this.rotation * Math.PI / 180);
        
        // Draw elegant petal curved shape
        ctxP.fillStyle = `rgba(255, 229, 236, ${this.opacity})`;
        ctxP.beginPath();
        // A cherry blossom / rose petal drawing
        ctxP.moveTo(0, 0);
        ctxP.bezierCurveTo(this.size / 2, -this.size / 2, this.size, 0, 0, this.size * 1.5);
        ctxP.bezierCurveTo(-this.size, 0, -this.size / 2, -this.size / 2, 0, 0);
        ctxP.fill();
        
        ctxP.restore();
    };

    Petal.prototype.update = function() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        this.wobble += this.wobbleSpeed;

        // Reset if bottom of screen reached
        if (this.y > particlesCanvas.height + 20) {
            this.y = -20;
            this.x = Math.random() * particlesCanvas.width;
            this.speedY = Math.random() * 1.2 + 0.8;
            this.opacity = Math.random() * 0.5 + 0.4;
        }
    };

    // Instantiate petals
    const maxPetals = 45;
    for (let i = 0; i < maxPetals; i++) {
        // Stagger initial coordinates
        const p = new Petal();
        p.y = Math.random() * particlesCanvas.height;
        petals.push(p);
    }

    function animatePetals() {
        ctxP.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });
        requestAnimationFrame(animatePetals);
    }
    animatePetals();


    /* ====================================================
       6. GSAP SCROLL-PINNING Story (Memories Section)
       ==================================================== */
    const memoriesSection = document.getElementById('memories-section');
    
    // Explicit timeline to crossfade pages
    const pinTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: memoriesSection,
            start: 'top top',
            end: '+=200%',
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    });

    // Slide 1 stays on. Fades out, slide 2 fades in
    pinTimeline.to('#slide-1', {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: 'power1.inOut'
    })
    .to('#slide-2', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power1.inOut'
    }, '<') // Run concurrently
    
    // Slide 2 fades out, slide 3 fades in
    .to('#slide-2', {
        opacity: 0,
        y: -30,
        duration: 1,
        ease: 'power1.inOut',
        delay: 0.5 // Short pause on slide 2
    })
    .to('#slide-3', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power1.inOut'
    }, '<');


    /* ====================================================
       7. POLAROID GALLERY LIGHTBOX POPUP
       ==================================================== */
    const polaroids = document.querySelectorAll('.polaroid-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    // Scatter Polaroids rotated slightly in layout
    polaroids.forEach((card, index) => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const caption = card.querySelector('.polaroid-caption');
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption.textContent;
            
            lightbox.classList.add('show');
            lenis.stop(); // Stop page scrolling when viewing photo
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('show');
        lenis.start(); // Resume scrolling
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxClose) {
            closeLightbox();
        }
    });


    /* ====================================================
       8. INTERACTIVE 3D ENVELOPE CODE
       ==================================================== */
    const envelopeWrapper = document.querySelector('.envelope-wrapper');
    
    envelopeWrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const isCurrentlyOpen = envelopeWrapper.classList.contains('open');
        
        if (!isCurrentlyOpen) {
            envelopeWrapper.classList.add('open');
            // Celebrate opening the letter
            setTimeout(() => {
                confetti({
                    particleCount: 60,
                    spread: 80,
                    origin: { y: 0.5 },
                    colors: ['#FFE5EC', '#EBD5FF', '#6C63FF']
                });
            }, 600);
        } else {
            // If already open, click can close it
            // Unless the click was inside the letter content
            if (!e.target.closest('.letter-paper')) {
                envelopeWrapper.classList.remove('open');
            }
        }
    });


    /* ====================================================
       9. FINAL SECTION SCROLL TRIGGERS & CONTINUOUS DECORATION
       ==================================================== */
    
    // Animate final texts when section scrolls into view
    gsap.to('#final-hbd', {
        scrollTrigger: {
            trigger: '#final-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out'
    });

    gsap.to('#final-name', {
        scrollTrigger: {
            trigger: '#final-section',
            start: 'top 65%',
            toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.3,
        ease: 'power3.out',
        onComplete: () => {
            // Trigger beautiful continuous celebratory bursts!
            triggerFinalCelebration();
        }
    });

    // Confetti Fireworks Engine
    let celebrationInterval;
    function triggerFinalCelebration() {
        // Run full confetti fireworks
        const duration = 4 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        clearInterval(celebrationInterval);
        celebrationInterval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(celebrationInterval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // double side fireworks
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }


    /* ====================================================
       10. SECRET POPUP GAME: TAP CAKE 7 TIMES
       ==================================================== */
    const cakeTrigger = document.getElementById('cake-trigger');
    const secretPopup = document.getElementById('secret-popup');
    const secretClose = document.getElementById('secret-close');
    
    let cakeTapCount = 0;

    cakeTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        cakeTapCount++;
        
        // Add a micro-wobble to show tap response
        gsap.fromTo(cakeTrigger, {
            scale: 1.2,
            rotate: 15
        }, {
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: 'elastic.out(1, 0.3)'
        });

        // Float tiny hearts from cake on tap
        spawnFloatingHeart(e.clientX, e.clientY);

        if (cakeTapCount >= 7) {
            cakeTapCount = 0;
            // Open Secret modal
            secretPopup.style.display = 'flex';
            setTimeout(() => {
                secretPopup.classList.add('show');
            }, 10);
            
            // Pop nice sparkles
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { x: 0.5, y: 0.5 },
                colors: ['#FFE5EC', '#B388FF']
            });
            lenis.stop(); // Stop scroll
        }
    });

    function closeSecretPopup() {
        secretPopup.classList.remove('show');
        setTimeout(() => {
            secretPopup.style.display = 'none';
        }, 400);
        lenis.start(); // Start scroll
    }

    secretClose.addEventListener('click', closeSecretPopup);
    secretPopup.addEventListener('click', (e) => {
        if (e.target === secretPopup || e.target === secretClose) {
            closeSecretPopup();
        }
    });

    // Helper to spawn hearts on cake click
    function spawnFloatingHeart(clientX, clientY) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = `${clientX - 10}px`;
        heart.style.top = `${clientY - 20}px`;
        heart.style.fontSize = `${Math.random() * 1.2 + 0.8}rem`;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '999';
        heart.style.transition = 'all 1s cubic-bezier(0.1, 0.8, 0.3, 1)';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.style.transform = `translate(${Math.random() * 60 - 30}px, -100px) rotate(${Math.random() * 40 - 20}deg)`;
            heart.style.opacity = '0';
        }, 50);

        setTimeout(() => {
            heart.remove();
        }, 1050);
    }

});
