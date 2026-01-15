// Mobile menu toggle with animation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission with validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Success message
        alert(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you soon at ${email}.`);
        contactForm.reset();
    });
}

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.service-card, .gallery-item, .blog-card').forEach(el => {
    observer.observe(el);
});

// Load blog posts on main page
function loadBlog() {
    const blogGrid = document.getElementById('mainBlogGrid');
    if (!blogGrid) return;

    const posts = BlogManager.getPosts();
    blogGrid.innerHTML = '';

    posts.forEach(post => {
        const blogCard = document.createElement('article');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-content">
                <span class="blog-date">${post.date}</span>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="#" class="read-more">Read More →</a>
            </div>
        `;
        blogGrid.appendChild(blogCard);
    });
}

// Load gallery images on page load
function loadGallery() {
    const galleryGrid = document.getElementById('mainGalleryGrid');
    if (!galleryGrid) return;

    const images = GalleryManager.getImages();
    galleryGrid.innerHTML = '';

    images.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.url}" alt="${image.alt}">
            <div class="gallery-overlay">
                <h4>${image.title}</h4>
                <p>${image.location}</p>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    });
}

// Load gallery and blog when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    loadBlog();
});

// Staff Panel button - redirect to login page
const staffPanelBtn = document.getElementById('staffPanelBtn');
if (staffPanelBtn) {
    staffPanelBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}

// Admin button with password protection
const adminBtn = document.getElementById('adminBtn');
if (adminBtn) {
    adminBtn.addEventListener('click', () => {
        const password = prompt('Enter admin password:');
        if (password === 'storm2026') {
            alert('Admin access granted!\n\nAdmin panel would load here.');
        } else if (password !== null) {
            alert('Incorrect password. Access denied.');
        }
    });
}

// Join a Chase button popup
const joinChaseBtn = document.getElementById('joinChaseBtn');
if (joinChaseBtn) {
    joinChaseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const userConfirm = confirm('Apply here to join a storm chase!\n\nClick OK to open the application form.');
        if (userConfirm) {
            window.open('https://forms.gle/SgEcVXZeyCjtZ8Wq7', '_blank');
        }
    });
}


// Public Calendar functionality
let publicCurrentCalendarDate = new Date();

function loadPublicCalendar() {
    const year = publicCurrentCalendarDate.getFullYear();
    const month = publicCurrentCalendarDate.getMonth();
    
    // Update month display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const monthElement = document.getElementById('publicCurrentMonth');
    if (monthElement) {
        monthElement.textContent = `${monthNames[month]} ${year}`;
    }
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // Get chases
    const chases = ChaseManager.getChases();
    
    // Create calendar days
    const calendarDays = document.getElementById('publicCalendarDays');
    if (!calendarDays) return;
    
    calendarDays.innerHTML = '';
    
    // Add previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const dayDiv = createPublicCalendarDay(day, true, null);
        calendarDays.appendChild(dayDiv);
    }
    
    // Add current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        const isToday = today.getDate() === day && 
                       today.getMonth() === month && 
                       today.getFullYear() === year;
        
        // Check if there's a chase on this day
        const chase = chases.find(c => {
            const chaseDate = parsePublicChaseDate(c.date);
            return chaseDate && 
                   chaseDate.getDate() === day && 
                   chaseDate.getMonth() === month && 
                   chaseDate.getFullYear() === year;
        });
        
        const dayDiv = createPublicCalendarDay(day, false, chase, isToday);
        calendarDays.appendChild(dayDiv);
    }
    
    // Add next month days
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayDiv = createPublicCalendarDay(day, true, null);
        calendarDays.appendChild(dayDiv);
    }
    
    // Load upcoming chases
    loadPublicUpcomingChases();
}

function createPublicCalendarDay(day, isOtherMonth, chase, isToday = false) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'public-calendar-day';
    
    if (isOtherMonth) {
        dayDiv.classList.add('other-month');
    }
    
    if (isToday) {
        dayDiv.classList.add('today');
    }
    
    if (chase) {
        if (chase.status === 'Active') {
            dayDiv.classList.add('has-active-chase');
        } else {
            dayDiv.classList.add('has-chase');
        }
    }
    
    dayDiv.innerHTML = `
        <div class="public-calendar-day-number">${day}</div>
        ${chase ? `<div class="public-calendar-day-event">${chase.location}</div>` : ''}
    `;
    
    if (chase) {
        dayDiv.addEventListener('click', () => {
            const timeInfo = chase.time ? `\nTime: ${chase.time}` : '';
            const titleInfo = chase.title ? `${chase.title}\n\n` : '';
            alert(`🌪️ Storm Chase Details\n\n${titleInfo}Date: ${chase.date}${timeInfo}\nLocation: ${chase.location}\nStatus: ${chase.status}\nParticipants: ${chase.participants}\n\nInterested? Click "Join a Chase" to apply!`);
        });
    }
    
    return dayDiv;
}

function parsePublicChaseDate(dateStr) {
    // Parse dates like "May 15, 2026"
    try {
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
            return date;
        }
    } catch (e) {
        return null;
    }
    return null;
}

function loadPublicUpcomingChases() {
    const upcomingDiv = document.getElementById('publicUpcomingChases');
    if (!upcomingDiv) return;
    
    const chases = ChaseManager.getChases();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Update stats
    const totalChasesEl = document.getElementById('totalChases');
    const activeChasesEl = document.getElementById('activeChases');
    const totalParticipantsEl = document.getElementById('totalParticipants');
    
    if (totalChasesEl) {
        const activeCount = chases.filter(c => c.status === 'Active').length;
        const totalParticipants = chases.reduce((sum, c) => sum + (c.participants || 0), 0);
        
        animateValue(totalChasesEl, 0, chases.length, 1000);
        animateValue(activeChasesEl, 0, activeCount, 1000);
        animateValue(totalParticipantsEl, 0, totalParticipants, 1000);
    }
    
    // Filter and sort upcoming chases
    const upcoming = chases
        .map(chase => ({
            ...chase,
            parsedDate: parsePublicChaseDate(chase.date)
        }))
        .filter(chase => chase.parsedDate && chase.parsedDate >= today)
        .sort((a, b) => a.parsedDate - b.parsedDate)
        .slice(0, 5); // Show next 5 chases
    
    if (upcoming.length === 0) {
        upcomingDiv.innerHTML = '<p style="color: #666; text-align: center; padding: 2rem;">No upcoming chases scheduled at this time. Check back soon!</p>';
        return;
    }
    
    upcomingDiv.innerHTML = '';
    upcoming.forEach(chase => {
        const chaseDiv = document.createElement('div');
        chaseDiv.className = `public-upcoming-chase-item ${chase.status === 'Active' ? 'active' : ''}`;
        const timeInfo = chase.time ? `<div class="public-upcoming-chase-time">🕐 ${chase.time}</div>` : '';
        const titleInfo = chase.title ? `<div style="font-size: 1.15rem; font-weight: 600; color: #333; margin-bottom: 0.5rem;">${chase.title}</div>` : '';
        chaseDiv.innerHTML = `
            ${titleInfo}
            <div class="public-upcoming-chase-date">📅 ${chase.date}</div>
            <div class="public-upcoming-chase-location">📍 ${chase.location}</div>
            <div class="public-upcoming-chase-participants">👥 ${chase.participants} participants | Status: ${chase.status}</div>
            ${timeInfo}
        `;
        upcomingDiv.appendChild(chaseDiv);
    });
}

// Animate number counting
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Calendar navigation
document.getElementById('publicPrevMonth')?.addEventListener('click', () => {
    publicCurrentCalendarDate.setMonth(publicCurrentCalendarDate.getMonth() - 1);
    loadPublicCalendar();
});

document.getElementById('publicNextMonth')?.addEventListener('click', () => {
    publicCurrentCalendarDate.setMonth(publicCurrentCalendarDate.getMonth() + 1);
    loadPublicCalendar();
});

// Load gallery and blog when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    loadBlog();
});


// Join from calendar button
document.getElementById('joinFromCalendar')?.addEventListener('click', (e) => {
    e.preventDefault();
    const userConfirm = confirm('Ready to join a storm chase?\n\nClick OK to open the application form and reserve your spot!');
    if (userConfirm) {
        window.open('https://forms.gle/SgEcVXZeyCjtZ8Wq7', '_blank');
    }
});
