// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    const body = document.body;

    if (navToggle && nav) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navToggle.classList.toggle('active');
            nav.classList.toggle('active');
            body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && !nav.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                nav.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        // Инициализация - показать все элементы
        portfolioItems.forEach(item => {
            item.style.display = 'block';
            item.style.opacity = '1';
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Testimonials Slider
    const slider = document.querySelector('.testimonials-slider');
    if (slider) {
        const track = slider.querySelector('.testimonials-track');
        const slides = track.querySelectorAll('.testimonial');
        const prevBtn = slider.querySelector('.slider-btn--prev');
        const nextBtn = slider.querySelector('.slider-btn--next');
        const dotsContainer = slider.querySelector('.slider-dots');
        
        let currentSlide = 0;
        const slideCount = slides.length;

        // Touch events variables
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        let startTranslate = 0;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.slider-dot');

        // Initialize first slide
        updateSlider();

        // Touch event handlers
        slider.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            currentX = startX;
            startTranslate = -currentSlide * 100;
            track.style.transition = 'none';
        }, { passive: true });

        slider.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            currentX = e.touches[0].clientX;
            const diff = (currentX - startX) / slider.offsetWidth * 100;
            let translate = startTranslate + diff;
            
            // Ограничиваем перемещение за пределы слайдера
            if (translate > 0) {
                translate = translate * 0.2;
            } else if (translate < -(slideCount - 1) * 100) {
                const overscroll = translate + (slideCount - 1) * 100;
                translate = -(slideCount - 1) * 100 + overscroll * 0.2;
            }
            
            track.style.transform = `translateX(${translate}%)`;
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const diff = (currentX - startX) / slider.offsetWidth * 100;
            track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            
            if (Math.abs(diff) > 20) {
                if (diff > 0 && currentSlide > 0) {
                    currentSlide--;
                } else if (diff < 0 && currentSlide < slideCount - 1) {
                    currentSlide++;
                }
            }
            
            updateSlider();
        });

        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                updateSlider();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlider();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });

        // Auto advance slides
        let slideInterval = setInterval(autoAdvance, 5000);

        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(autoAdvance, 5000);
        });

        slider.addEventListener('touchstart', () => {
            clearInterval(slideInterval);
        });

        slider.addEventListener('touchend', () => {
            slideInterval = setInterval(autoAdvance, 5000);
        });

        function autoAdvance() {
            currentSlide = (currentSlide + 1) % slideCount;
            updateSlider();
        }

        function updateSlider() {
            // Update track position
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update active states
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
    }
}); 