let currentLang = 'en';

// Video URLs - UPDATE THESE WITH YOUR ACTUAL VIDEO PATHS
const videoUrls = {
    en: 'videos/iris-pitch-english.mp4',  // Path to English video
    ar: 'videos/iris-pitch-arabic.mp4'     // Path to Arabic video
};

// Initialize video source
function updateVideoSource() {
    const videoSource = document.getElementById('videoSource');
    const pitchVideo = document.getElementById('pitchVideo');
    videoSource.src = videoUrls[currentLang];
    pitchVideo.load(); // Reload video with new source
}

// Play video function
function playVideo() {
    const videoContainer = document.getElementById('videoContainer');
    const playButton = videoContainer.querySelector('.play-button');
    const pitchVideo = document.getElementById('pitchVideo');
    
    // Update video source if not set
    if (!document.getElementById('videoSource').src || 
        document.getElementById('videoSource').src === '') {
        updateVideoSource();
    }
    
    playButton.style.display = 'none';
    pitchVideo.style.display = 'block';
    pitchVideo.play();
}

// Smooth scroll on navigation
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Show section function
function showSection(sectionId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    targetSection.classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close mobile menu if open
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Language toggle function
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    const body = document.body;
    const langBtn = document.getElementById('langBtn');
    
    if (currentLang === 'ar') {
        body.classList.add('rtl');
        body.setAttribute('dir', 'rtl');
        langBtn.textContent = 'English';
    } else {
        body.classList.remove('rtl');
        body.setAttribute('dir', 'ltr');
        langBtn.textContent = 'العربية';
    }
    
    // Update video source when language changes
    updateVideoSource();
    
    // Reset video display if it was playing
    const pitchVideo = document.getElementById('pitchVideo');
    const playButton = document.querySelector('.play-button');
    if (pitchVideo.style.display === 'block') {
        pitchVideo.pause();
        pitchVideo.style.display = 'none';
        playButton.style.display = 'flex';
    }
    
    // Update all text elements
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLang}`);
        if (text) {
            element.innerHTML = text;
        }
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .use-case-card, .about-section').forEach(el => {
    observer.observe(el);
});

// Initialize video source on page load
window.addEventListener('DOMContentLoaded', () => {
    updateVideoSource();
});

// Gallery Image Change Function
function changeImage(galleryId, thumbIndex, imagePath) {
    const mainImg = document.getElementById(`gallery-img-${galleryId}`);
    const placeholder = document.querySelector(`#gallery-main-${galleryId} .gallery-placeholder`);
    const thumbnails = document.querySelectorAll(`#gallery-thumbs-${galleryId} .thumbnail`);
    
    // Remove active class from all thumbnails
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Add active class to clicked thumbnail
    thumbnails[thumbIndex].classList.add('active');
    
    // Update main image
    if (imagePath && imagePath !== '') {
        mainImg.src = imagePath;
        mainImg.style.display = 'block';
        placeholder.style.display = 'none';
        
        // Handle image load error
        mainImg.onerror = function() {
            this.style.display = 'none';
            placeholder.style.display = 'block';
        };
    } else {
        mainImg.style.display = 'none';
        placeholder.style.display = 'block';
    }
}
