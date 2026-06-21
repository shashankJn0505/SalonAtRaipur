document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. SYSTEM INITIALIZATIONS
    // ==========================================================================
    AOS.init({
        duration: 1000,
        once: true,
        easing: 'ease-out-cubic'
    });

    // ==========================================================================
    // 2. LUXURY TRANSITIONAL CUSTOM CURSOR
    // ==========================================================================
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    
    if (window.innerWidth > 425) {
        document.addEventListener('mousemove', (e) => {
            // Precise instant tracking for core internal dot
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            
            // Smooth trailing interpolation for structural outer ring
            cursorCircle.animate({
                left: `${e.clientX}px`,
                top: `${e.clientY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add class mapping when hovering components requiring dynamic response
        const interactiveTargets = document.querySelectorAll('a, button, .service-card, .gallery-item, .real-slider');
        interactiveTargets.forEach(target => {
            target.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            target.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }

    // ==========================================================================
    // 3. STICKY GLASSMORPH NAVBAR ENGINE & ACTIVE MONITORING
    // ==========================================================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        trackActiveSections();
    });

    // Mobile Responsive Flyout Layer Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active');
        navMenu.classList.toggle('active');
    });

    // Automatically dismiss responsive overlay panel when executing anchor hop jumps
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('is-active');
            navMenu.classList.remove('active');
        });
    });

    function trackActiveSections() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // ==========================================================================
    // 4. CROSSFADING AUTOMATED SLIDER ENGINE
    // ==========================================================================
    const slides = document.querySelectorAll('.hero-slider .slide');
    let activeSlideIndex = 0;
    
    function transitionHeroSlides() {
        slides[activeSlideIndex].classList.remove('active');
        activeSlideIndex = (activeSlideIndex + 1) % slides.length;
        slides[activeSlideIndex].classList.add('active');
    }
    setInterval(transitionHeroSlides, 5000);

    // ==========================================================================
    // 5. ANIMATED NUMERICAL COUNTERS
    // ==========================================================================
    const counterElements = document.querySelectorAll('.counter');
    const counterObserverOptions = { threshold: 0.5, rootMargin: "0px" };
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const finalTargetValue = parseInt(targetElement.getAttribute('data-target'), 10);
                animateCounterValue(targetElement, finalTargetValue);
                observer.unobserve(targetElement);
            }
        });
    }, counterObserverOptions);

    counterElements.forEach(counter => counterObserver.observe(counter));

    function animateCounterValue(element, targetValue) {
        let currentCount = 0;
        const animationDuration = 2000; // 2 seconds
        const framesPerSecond = 60;
        const totalSteps = (animationDuration / 1000) * framesPerSecond;
        const valueIncrement = targetValue / totalSteps;

        const counterTimer = setInterval(() => {
            currentCount += valueIncrement;
            if (currentCount >= targetValue) {
                element.textContent = targetValue;
                clearInterval(counterTimer);
            } else {
                element.textContent = Math.floor(currentCount);
            }
        }, 1000 / framesPerSecond);
    }

    // ==========================================================================
    // 6. INTERACTIVE BEFORE & AFTER SLIDER ENGINE
    // ==========================================================================
    const comparisonSliderRange = document.querySelector('.real-slider');
    if (comparisonSliderRange) {
        comparisonSliderRange.addEventListener('input', (e) => {
            const currentSliderValue = e.target.value;
            const imageWrapper = document.querySelector('.image-after-wrapper');
            const dragHandle = document.querySelector('.slider-handle');
            
            imageWrapper.style.width = `${currentSliderValue}%`;
            dragHandle.style.left = `${currentSliderValue}%`;
        });
    }

    // ==========================================================================
    // 7. LUXURY MASONRY GALLERY PORFOLIO ENGINE
    // ==========================================================================
    const galleryFilterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            galleryFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const activeFilterClass = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (activeFilterClass === 'all' || item.classList.contains(activeFilterClass)) {
                    item.style.display = 'block';
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => { item.style.display = 'none'; }, 400);
                }
            });
        });
    });

    // Lightbox Module Logic
    const lightboxModal = document.getElementById('lightbox');
    const lightboxTargetImage = document.getElementById('lightbox-img');
    const lightboxCloseIcon = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetImageSrc = item.querySelector('img').getAttribute('src');
            lightboxTargetImage.setAttribute('src', targetImageSrc);
            lightboxModal.style.display = 'flex';
        });
    });

    lightboxCloseIcon.addEventListener('click', () => { lightboxModal.style.display = 'none'; });
    lightboxModal.addEventListener('click', (e) => { if(e.target === lightboxModal) lightboxModal.style.display = 'none'; });

    // ==========================================================================
    // 8. TESTIMONIAL COROUSEL CORE ENGINE
    // ==========================================================================
    const testimonialSliderTrack = document.querySelector('.testimonial-slider');
    const testimonialCardsList = document.querySelectorAll('.testimonial-card');
    const dotsNavigationWrapper = document.querySelector('.slider-dots');
    let currentTestimonialIndex = 0;

    if (testimonialCardsList.length > 0) {
        // Automatically inject slide navigation tracker dots dynamically
        testimonialCardsList.forEach((_, dynamicIdx) => {
            const dotElement = document.createElement('div');
            dotElement.classList.add('dot');
            if (dynamicIdx === 0) dotElement.classList.add('active');
            dotElement.addEventListener('click', () => navigateToTestimonial(dynamicIdx));
            dotsNavigationWrapper.appendChild(dotElement);
        });

        function navigateToTestimonial(indexTarget) {
            testimonialSliderTrack.style.transform = `translateX(-${indexTarget * 100}%)`;
            document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
            dotsNavigationWrapper.children[indexTarget].classList.add('active');
            currentTestimonialIndex = indexTarget;
        }

        setInterval(() => {
            currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialCardsList.length;
            navigateToTestimonial(currentTestimonialIndex);
        }, 6000);
    }

    // ==========================================================================
    // 9. MODAL RESERVATION SCHEDULER SUBSYSTEM
    // ==========================================================================
    const bookingModalContainer = document.getElementById('booking-modal');
    const modalCloseTrigger = document.querySelector('.modal-close');
    const modalLaunchTriggers = document.querySelectorAll('.open-modal-btn');

    modalLaunchTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            bookingModalContainer.classList.add('open');
        });
    });

    modalCloseTrigger.addEventListener('click', () => bookingModalContainer.classList.remove('open'));
    bookingModalContainer.addEventListener('click', (e) => { if(e.target === bookingModalContainer) bookingModalContainer.classList.remove('open'); });

    // Processing Framework Form Interceptors
    const modalBookingForm = document.getElementById('modal-booking-form');
    modalBookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for reserving a session. Our luxury concierge group will verify your appointment timeframe shortly.');
        bookingModalContainer.classList.remove('open');
        modalBookingForm.reset();
    });

    // WhatsApp Automated Message Compiler Hook
    const whatsappBookingBtn = document.getElementById('whatsapp-booking-btn');
    whatsappBookingBtn.addEventListener('click', () => {
        const clientName = encodeURIComponent(document.getElementById('book-name').value || "Guest");
        const selectedService = encodeURIComponent(document.getElementById('book-service').value || "Unspecified Treatment Suite");
        const targetedDate = encodeURIComponent(document.getElementById('book-date').value || "TBD");
        const targetedTime = encodeURIComponent(document.getElementById('book-time').value || "TBD");
        
        if(!document.getElementById('book-name').value || !document.getElementById('book-phone').value) {
            alert("Please complete required Name and Phone attributes prior to choosing WhatsApp routing.");
            return;
        }

        const generatedMessageText = `Hello Luxe Glow Concierge, I would like to request an executive appointment.%0A%0A*Name:* ${clientName}%0A*Service:* ${selectedService}%0A*Date:* ${targetedDate}%0A*Time:* ${targetedTime}`;
        const whatsappGatewayURL = `https://wa.me/919876543210?text=${generatedMessageText}`;
        window.open(whatsappGatewayURL, '_blank');
    });

    const directContactForm = document.getElementById('direct-contact-form');
    directContactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Your message has been securely submitted directly to our global administration core.');
        directContactForm.reset();
    });
});