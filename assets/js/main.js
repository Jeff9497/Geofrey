/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    // Active link
    navLink.forEach(n => n.classList.remove('active'));
    this.classList.add('active');

    // Remove menu mobile
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1000,  // Reduced from 2000 to 1000 for faster animations
    reset: false,    // Changed to false so elements don't animate again when scrolling back
    delay: 100       // Added a small delay for smoother appearance
});

/*SCROLL HOME*/
sr.reveal('.home__title',{});
sr.reveal('.button',{delay: 200});
sr.reveal('.home__img',{delay: 400});
sr.reveal('.home__social-icon',{ interval: 200});

/*SCROLL ABOUT*/
sr.reveal('.about__img',{});
sr.reveal('.about__subtitle',{delay: 400});
sr.reveal('.about__text',{delay: 400});

/*SCROLL SKILLS*/
sr.reveal('.skills__subtitle',{});
sr.reveal('.skills__text',{});
sr.reveal('.skills__data',{interval: 200});
sr.reveal('.skills__img',{delay: 600});

/*SCROLL WORK*/
sr.reveal('.work__img',{interval: 200});

/*SCROLL CONTACT*/
sr.reveal('.contact__input',{interval: 200});

/*===== BINARY ANIMATION =====*/
function generateBinary() {
    const binaryContainer = document.getElementById('binary-animation');
    if (!binaryContainer) return;

    binaryContainer.innerHTML = '';

    const containerWidth = binaryContainer.offsetWidth;
    const containerHeight = binaryContainer.offsetHeight;

    const charWidth = 10; // Approximate width of a character in pixels
    const charHeight = 16; // Approximate height of a character in pixels

    const columns = Math.floor(containerWidth / charWidth);
    const rows = Math.floor(containerHeight / charHeight);

    let html = '';

    for (let i = 0; i < rows * columns; i++) {
        const binary = Math.random() > 0.5 ? '1' : '0';
        const color = Math.random() > 0.8 ? 'var(--first-color)' : 'rgba(64, 112, 244, 0.6)';
        const size = Math.random() > 0.9 ? '1.2em' : '1em';
        const opacity = Math.random() * 0.5 + 0.5;

        html += `<span style="color: ${color}; font-size: ${size}; opacity: ${opacity}">${binary}</span>`;
    }

    binaryContainer.innerHTML = html;

    // Update binary periodically
    setTimeout(() => {
        const spans = binaryContainer.querySelectorAll('span');
        spans.forEach(span => {
            if (Math.random() > 0.7) {
                span.textContent = Math.random() > 0.5 ? '1' : '0';
            }
        });
    }, 500);
}

// Initialize binary animation
setInterval(generateBinary, 1000);
document.addEventListener('DOMContentLoaded', generateBinary);

/*===== THEME TOGGLE =====*/
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
let currentTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme on load
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.remove('bx-moon');
    themeIcon.classList.add('bx-sun');
}

themeToggle.addEventListener('click', () => {
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
        currentTheme = 'dark';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
        currentTheme = 'light';
    }
    localStorage.setItem('theme', currentTheme);
});

/*===== VISITOR COUNTER =====*/
document.addEventListener('DOMContentLoaded', function() {
    const visitCountElement = document.getElementById('visit-count');
    if (!visitCountElement) return;

    // Get current count or initialize to 0
    let viewCount = localStorage.getItem('pageViewCount') || 0;
    // Increment count
    viewCount = parseInt(viewCount) + 1;
    // Store updated count
    localStorage.setItem('pageViewCount', viewCount);
    // Display count
    visitCountElement.textContent = `You've visited ${viewCount} time${viewCount !== 1 ? 's' : ''}`;
});

/*===== CONTACT FORM =====*/
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const sendButton = document.getElementById('send-message');
    const formMessage = document.getElementById('form-message');

    if (!contactForm || !sendButton || !formMessage) return;

    sendButton.addEventListener('click', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill in all fields';
            formMessage.className = 'form-message error';
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.textContent = 'Please enter a valid email address';
            formMessage.className = 'form-message error';
            return;
        }

        // Simulate form submission
        sendButton.disabled = true;
        sendButton.value = 'Sending...';

        // In a real implementation, you would send the form data to a server here
        setTimeout(() => {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.className = 'form-message success';
            contactForm.reset();
            sendButton.disabled = false;
            sendButton.value = 'Send';

            // Clear success message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        }, 1500);
    });
});
