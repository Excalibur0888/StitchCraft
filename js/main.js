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
}); 