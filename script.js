// MAIN 
document.addEventListener('DOMContentLoaded', function () {
    console.log(' Portfolio loaded successfully!');

    initSidebar();
    initEmailButtons();
    initProgressBars();
    initTimeline();
    initContactForm();
    initPageTransitions();
    initScrollTop();
    document.body.classList.add('show');
});

//  PLACEHOLDER FOR EMAIL BUTTONS 
function initEmailButtons() {
    console.log('initEmailButtons placeholder');
    
}

//  RESPONSIVE SIDEBAR 
function initSidebar() {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');

    if (!hamburger || !sidebar) return;

    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    function toggleSidebar() {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    }

    hamburger.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    document.querySelectorAll('.links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        });
    });
}

//  PROGRESS BARS 
function initProgressBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.fill');

                fills.forEach((fill, index) => {
                    setTimeout(() => {
                        const width = fill.getAttribute('data-done') || '0';
                        fill.style.width = width + '%';
                        fill.classList.add('animate');
                    }, index * 200);
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });

    document.querySelectorAll('.skills-container').forEach(container => {
        observer.observe(container);
    });
}

//  TIMELINE ANIMATION 
function initTimeline() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.item, .dot').forEach((el, i) => {
                    setTimeout(() => el.classList.add('show'), i * 150);
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.four').forEach(section => {
        observer.observe(section);
    });
}

//  CONTACT FORM 
function initContactForm() {
    const submitBtn = document.getElementById('submitBtn');
    const contactForm = document.getElementById('contactForm');

    if (!submitBtn || !contactForm) return;

    submitBtn.addEventListener('click', () => {
        const name = document.getElementById('userName')?.value.trim();
        const email = document.getElementById('userEmail')?.value.trim();
        const message = document.getElementById('userMessage')?.value.trim();

        if (!name || !email || !message) {
            alert('Please fill in all fields! ');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            alert('Please enter a valid email! ');
            return;
        }

        // Animation
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... ';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            submitBtn.innerHTML = 'Success! ';
            submitBtn.style.backgroundColor = '#2ecc71';
            contactForm.reset();
        }, 1500);

        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.backgroundColor = '';
        }, 3000);
    });
}

//  PAGE TRANSITIONS 
function initPageTransitions() {
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                e.preventDefault();

                document.body.classList.remove('show');

                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });
}

//  SCROLL TO TOP 
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        scrollTopBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}