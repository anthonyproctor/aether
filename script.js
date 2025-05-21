// Aether Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features when DOM is fully loaded
    initMobileMenu();
    initSmoothScrolling();
    initStickyNavigation();
    initParallaxEffect();
    initProductInteractions();
    initWaitlistForm();
    initScrollAnimations();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle active class on button for animation
            this.classList.toggle('active');
            
            // Toggle mobile menu visibility
            if (navLinks.style.display === 'flex') {
                // Close menu
                navLinks.style.opacity = '0';
                setTimeout(() => {
                    navLinks.style.display = 'none';
                }, 300);
            } else {
                // Open menu
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.backgroundColor = 'var(--aether-white)';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
                navLinks.style.opacity = '0';
                
                // Trigger reflow for animation
                navLinks.offsetHeight;
                navLinks.style.opacity = '1';
                navLinks.style.transition = 'opacity 0.3s ease';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = navLinks.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mobileMenuBtn.classList.remove('active');
                    navLinks.style.opacity = '0';
                    setTimeout(() => {
                        navLinks.style.display = 'none';
                    }, 300);
                }
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if it's just a "#" link
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset to account for fixed navigation
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Sticky Navigation with Appearance Change on Scroll
function initStickyNavigation() {
    const nav = document.querySelector('.main-nav');
    const heroSection = document.querySelector('.hero');
    
    if (nav && heroSection) {
        window.addEventListener('scroll', function() {
            // Change nav appearance when scrolled past hero section
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
                nav.style.padding = '10px 0';
                nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                nav.classList.remove('scrolled');
                nav.style.padding = '20px 0';
                nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }
        });
    }
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-type="parallax"]');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', function() {
            parallaxElements.forEach(element => {
                const scrollPosition = window.pageYOffset;
                // Move the background at a slower rate than the scroll speed
                element.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
            });
        });
    }
}

// Product Card Interactions
function initProductInteractions() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add hover effect for product images
        const productImage = card.querySelector('img');
        if (productImage) {
            card.addEventListener('mouseenter', function() {
                productImage.style.transform = 'scale(1.05) rotate(0deg)';
                productImage.style.transition = 'transform 0.5s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                productImage.style.transform = 'scale(1) rotate(-5deg)';
            });
        }
        
        // Add click event to show more product details
        card.addEventListener('click', function(e) {
            // Only trigger if not clicking on a link or button
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                this.classList.toggle('expanded');
                
                // If expanded, show more details
                if (this.classList.contains('expanded')) {
                    // Create and append more details if they don't exist
                    if (!this.querySelector('.product-details')) {
                        const productName = this.querySelector('h3').textContent;
                        const detailsDiv = document.createElement('div');
                        detailsDiv.className = 'product-details';
                        
                        // Different content based on product
                        if (productName === 'THRYV') {
                            detailsDiv.innerHTML = `
                                <h4>SCIENCE BEHIND THRYV</h4>
                                <p>Our Energy + Focus formula combines natural caffeine with L-theanine in a 2:1 ratio, 
                                scientifically shown to provide smooth energy without jitters or crashes.</p>
                                <p>Rhodiola rosea has been used for centuries as an adaptogen that helps the body 
                                resist physical and mental stress while improving cognitive function.</p>
                            `;
                        } else if (productName === 'CLYR') {
                            detailsDiv.innerHTML = `
                                <h4>SCIENCE BEHIND CLYR</h4>
                                <p>Lion's Mane mushroom contains compounds that stimulate the growth of brain cells and 
                                protect against memory loss, with studies showing improved cognitive function.</p>
                                <p>Magnesium is essential for over 300 biochemical reactions in the body and helps regulate 
                                neurotransmitters that calm the nervous system.</p>
                            `;
                        }
                        
                        // Add a close button
                        const closeButton = document.createElement('button');
                        closeButton.className = 'details-close';
                        closeButton.innerHTML = '×';
                        closeButton.addEventListener('click', function(e) {
                            e.stopPropagation(); // Prevent card click event
                            card.classList.remove('expanded');
                            detailsDiv.style.opacity = '0';
                            setTimeout(() => {
                                detailsDiv.remove();
                            }, 300);
                        });
                        
                        detailsDiv.appendChild(closeButton);
                        this.appendChild(detailsDiv);
                        
                        // Animate in
                        detailsDiv.style.opacity = '0';
                        setTimeout(() => {
                            detailsDiv.style.opacity = '1';
                            detailsDiv.style.transition = 'opacity 0.3s ease';
                        }, 10);
                    }
                } else {
                    // Remove details when collapsed
                    const detailsDiv = this.querySelector('.product-details');
                    if (detailsDiv) {
                        detailsDiv.style.opacity = '0';
                        setTimeout(() => {
                            detailsDiv.remove();
                        }, 300);
                    }
                }
            }
        });
    });
}

// Waitlist Form Validation and Submission
function initWaitlistForm() {
    const waitlistForm = document.getElementById('waitlist');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Simple email validation
            if (!isValidEmail(email)) {
                showFormMessage(waitlistForm, 'Please enter a valid email address.', 'error');
                emailInput.focus();
                return;
            }
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Success response
                showFormMessage(waitlistForm, 'Thanks for joining the waitlist! We\'ll be in touch soon.', 'success');
                emailInput.value = '';
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Store in localStorage to remember this user joined
                localStorage.setItem('aether_waitlist_joined', 'true');
                localStorage.setItem('aether_waitlist_email', email);
            }, 1500);
        });
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to show form messages
function showFormMessage(form, message, type) {
    // Remove any existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Insert after form
    form.parentNode.insertBefore(messageElement, form.nextSibling);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }, 5000);
    }
}

// Scroll-triggered Animations using Intersection Observer
function initScrollAnimations() {
    // Elements to animate
    const animateElements = document.querySelectorAll('.product-card, .feature, .ingredient-card, .testimonial-card');
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element is visible
                entry.target.classList.add('animate-in');
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.2, // 20% of element must be visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element comes into view
    });
    
    // Observe each element
    animateElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Start observing
        observer.observe(element);
    });
    
    // Add CSS for the animation
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .product-details {
                margin-top: 20px;
                padding: 20px;
                background-color: var(--aether-light-gray);
                border-radius: 8px;
                position: relative;
                transition: opacity 0.3s ease;
            }
            
            .product-details h4 {
                margin-bottom: 15px;
                font-size: 1.2rem;
            }
            
            .details-close {
                position: absolute;
                top: 10px;
                right: 10px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: var(--aether-black);
                color: var(--aether-white);
                border: none;
                font-size: 20px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .form-message {
                margin-top: 15px;
                padding: 10px 15px;
                border-radius: 4px;
                transition: opacity 0.3s ease;
            }
            
            .form-message.success {
                background-color: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            
            .form-message.error {
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            
            /* Mobile menu button animation */
            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        </style>
    `);
}

// Check if user has previously joined waitlist
function checkWaitlistStatus() {
    if (localStorage.getItem('aether_waitlist_joined') === 'true') {
        const waitlistForm = document.getElementById('waitlist');
        if (waitlistForm) {
            const email = localStorage.getItem('aether_waitlist_email');
            showFormMessage(waitlistForm, `Welcome back! You've already joined our waitlist with ${email}`, 'success');
        }
    }
}

// Add a simple counter animation for statistics
function initCounterAnimation() {
    // This could be used if the site adds statistics in the future
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element comes into view
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
}

// Add a "back to top" button that appears when scrolling down
function initBackToTopButton() {
    // Create the button element
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    document.body.appendChild(backToTopBtn);
    
    // Add styles
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: var(--aether-black);
                color: var(--aether-white);
                border: none;
                font-size: 24px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s, visibility 0.3s;
                z-index: 999;
            }
            
            .back-to-top:hover {
                background-color: var(--aether-gray);
            }
            
            .back-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
        </style>
    `);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize additional features
initBackToTopButton();
checkWaitlistStatus();
