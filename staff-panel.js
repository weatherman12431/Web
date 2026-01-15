// Load blog posts in admin panel
function loadAdminBlog() {
    const blogList = document.getElementById('adminBlogList');
    if (!blogList) return;

    const posts = BlogManager.getPosts();
    blogList.innerHTML = '';

    posts.forEach(post => {
        const blogItem = document.createElement('div');
        blogItem.className = 'blog-admin-item';
        blogItem.innerHTML = `
            <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
            <h3>${post.title}</h3>
            <p class="blog-meta">Published: ${post.date} | Author: ${post.author}</p>
            <p style="color: #666; margin: 1rem 0;">${post.excerpt}</p>
            <div class="blog-actions">
                <button class="btn-small edit-blog-btn" data-id="${post.id}">Edit</button>
                <button class="btn-small btn-danger delete-blog-btn" data-id="${post.id}">Delete</button>
            </div>
        `;
        blogList.appendChild(blogItem);
    });

    // Add event listeners
    document.querySelectorAll('.edit-blog-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            editBlogPost(id);
        });
    });

    document.querySelectorAll('.delete-blog-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            deleteBlogPost(id);
        });
    });
}

// Add new blog post
document.getElementById('addBlogBtn')?.addEventListener('click', () => {
    const title = prompt('Enter blog post title:');
    if (!title) return;

    const excerpt = prompt('Enter excerpt (short description):');
    if (!excerpt) return;

    const image = prompt('Enter image URL:');
    if (!image) return;

    const content = prompt('Enter full content (optional):') || excerpt;

    BlogManager.addPost({
        title: title,
        excerpt: excerpt,
        image: image,
        content: content
    });

    loadAdminBlog();
    alert('Blog post created successfully!');
});

// Edit blog post
function editBlogPost(id) {
    const post = BlogManager.getPost(id);
    if (!post) return;

    const title = prompt('Enter new title:', post.title);
    if (title === null) return;

    const excerpt = prompt('Enter new excerpt:', post.excerpt);
    if (excerpt === null) return;

    const image = prompt('Enter new image URL:', post.image);
    if (image === null) return;

    BlogManager.updatePost(id, {
        title: title || post.title,
        excerpt: excerpt || post.excerpt,
        image: image || post.image
    });

    loadAdminBlog();
    alert('Blog post updated successfully!');
}

// Delete blog post
function deleteBlogPost(id) {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    BlogManager.deletePost(id);
    loadAdminBlog();
    alert('Blog post deleted successfully!');
}

// Search blog posts
document.getElementById('blogSearch')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const posts = BlogManager.getPosts();
    const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm)
    );

    const blogList = document.getElementById('adminBlogList');
    blogList.innerHTML = '';

    filtered.forEach(post => {
        const blogItem = document.createElement('div');
        blogItem.className = 'blog-admin-item';
        blogItem.innerHTML = `
            <img src="${post.image}" alt="${post.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
            <h3>${post.title}</h3>
            <p class="blog-meta">Published: ${post.date} | Author: ${post.author}</p>
            <p style="color: #666; margin: 1rem 0;">${post.excerpt}</p>
            <div class="blog-actions">
                <button class="btn-small edit-blog-btn" data-id="${post.id}">Edit</button>
                <button class="btn-small btn-danger delete-blog-btn" data-id="${post.id}">Delete</button>
            </div>
        `;
        blogList.appendChild(blogItem);
    });

    // Re-attach event listeners
    document.querySelectorAll('.edit-blog-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            editBlogPost(id);
        });
    });

    document.querySelectorAll('.delete-blog-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            deleteBlogPost(id);
        });
    });
});

// Load blog when switching to blog section
const blogNavBtn = document.querySelector('[data-section="blog"]');
if (blogNavBtn) {
    blogNavBtn.addEventListener('click', loadAdminBlog);
}

// Load gallery images in admin panel
function loadAdminGallery() {
    const galleryGrid = document.getElementById('adminGalleryGrid');
    if (!galleryGrid) return;

    const images = GalleryManager.getImages();
    galleryGrid.innerHTML = '';

    images.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-admin-item';
        galleryItem.innerHTML = `
            <img src="${image.url}" alt="${image.alt}">
            <div class="gallery-admin-info">
                <h4>${image.title}</h4>
                <p>${image.location}</p>
            </div>
            <div class="gallery-admin-actions">
                <button class="btn-small edit-image-btn" data-id="${image.id}">Edit</button>
                <button class="btn-small btn-danger delete-image-btn" data-id="${image.id}">Delete</button>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    });

    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-image-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            editImage(id);
        });
    });

    document.querySelectorAll('.delete-image-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            deleteImage(id);
        });
    });
}

// Add new image
document.getElementById('addImageBtn')?.addEventListener('click', () => {
    const url = prompt('Enter image URL:');
    if (!url) return;

    const title = prompt('Enter image title:');
    if (!title) return;

    const location = prompt('Enter location (e.g., "Oklahoma, 2025"):');
    if (!location) return;

    GalleryManager.addImage({
        url: url,
        title: title,
        location: location,
        alt: title
    });

    loadAdminGallery();
    alert('Image added successfully!');
});

// Upload image from computer
document.getElementById('uploadImageBtn')?.addEventListener('click', () => {
    document.getElementById('imageFileInput').click();
});

// Handle file selection
document.getElementById('imageFileInput')?.addEventListener('change', (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file, index) => {
        if (!file.type.startsWith('image/')) {
            alert(`${file.name} is not an image file.`);
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageUrl = event.target.result;
            
            // Prompt for title and location for each image
            setTimeout(() => {
                const title = prompt(`Enter title for ${file.name}:`, file.name.replace(/\.[^/.]+$/, ''));
                if (!title) return;

                const location = prompt(`Enter location for "${title}":`, 'Location, Year');
                if (!location) return;

                GalleryManager.addImage({
                    url: imageUrl,
                    title: title,
                    location: location,
                    alt: title
                });

                loadAdminGallery();
                
                // Show success message after last image
                if (index === files.length - 1) {
                    alert(`${files.length} image(s) uploaded successfully!`);
                }
            }, index * 100); // Slight delay between prompts
        };

        reader.readAsDataURL(file);
    });

    // Reset file input
    e.target.value = '';
});

// Edit image
function editImage(id) {
    const image = GalleryManager.getImage(id);
    if (!image) return;

    const url = prompt('Enter new image URL:', image.url);
    if (url === null) return;

    const title = prompt('Enter new title:', image.title);
    if (title === null) return;

    const location = prompt('Enter new location:', image.location);
    if (location === null) return;

    GalleryManager.updateImage(id, {
        url: url || image.url,
        title: title || image.title,
        location: location || image.location,
        alt: title || image.title
    });

    loadAdminGallery();
    alert('Image updated successfully!');
}

// Delete image
function deleteImage(id) {
    if (!confirm('Are you sure you want to delete this image?')) return;

    GalleryManager.deleteImage(id);
    loadAdminGallery();
    alert('Image deleted successfully!');
}

// Search functionality
document.getElementById('gallerySearch')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const images = GalleryManager.getImages();
    const filtered = images.filter(img => 
        img.title.toLowerCase().includes(searchTerm) ||
        img.location.toLowerCase().includes(searchTerm)
    );

    const galleryGrid = document.getElementById('adminGalleryGrid');
    galleryGrid.innerHTML = '';

    filtered.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-admin-item';
        galleryItem.innerHTML = `
            <img src="${image.url}" alt="${image.alt}">
            <div class="gallery-admin-info">
                <h4>${image.title}</h4>
                <p>${image.location}</p>
            </div>
            <div class="gallery-admin-actions">
                <button class="btn-small edit-image-btn" data-id="${image.id}">Edit</button>
                <button class="btn-small btn-danger delete-image-btn" data-id="${image.id}">Delete</button>
            </div>
        `;
        galleryGrid.appendChild(galleryItem);
    });

    // Re-attach event listeners
    document.querySelectorAll('.edit-image-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            editImage(id);
        });
    });

    document.querySelectorAll('.delete-image-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            deleteImage(id);
        });
    });
});

// Load gallery when switching to gallery section
const galleryNavBtn = document.querySelector('[data-section="gallery"]');
if (galleryNavBtn) {
    galleryNavBtn.addEventListener('click', loadAdminGallery);
}

// Load gallery on page load if on gallery section
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('adminGalleryGrid')) {
        loadAdminGallery();
    }
    if (document.getElementById('adminBlogList')) {
        loadAdminBlog();
    }
    if (document.getElementById('backgroundPreview')) {
        loadBackgroundSettings();
    }
    if (document.getElementById('chasesTableBody')) {
        loadChases();
    }
});

// Background Settings Manager
function loadBackgroundSettings() {
    const currentBg = localStorage.getItem('loginBackground') || 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=1920&h=1080&fit=crop';
    document.getElementById('currentBackground').src = currentBg;
    
    // Highlight active preset
    document.querySelectorAll('.preset-bg').forEach(preset => {
        if (preset.getAttribute('data-url') === currentBg) {
            preset.classList.add('active');
        }
    });
}

// Upload background from computer
document.getElementById('uploadBackgroundBtn')?.addEventListener('click', () => {
    document.getElementById('backgroundFileInput').click();
});

document.getElementById('backgroundFileInput')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
        const imageUrl = event.target.result;
        localStorage.setItem('loginBackground', imageUrl);
        document.getElementById('currentBackground').src = imageUrl;
        
        // Remove active class from presets
        document.querySelectorAll('.preset-bg').forEach(p => p.classList.remove('active'));
        
        alert('✓ Background updated successfully!');
    };
    reader.readAsDataURL(file);
    e.target.value = '';
});

// Use URL for background
document.getElementById('useUrlBtn')?.addEventListener('click', () => {
    const url = prompt('Enter image URL:');
    if (!url) return;
    
    // Test if URL is valid
    const img = new Image();
    img.onload = () => {
        localStorage.setItem('loginBackground', url);
        document.getElementById('currentBackground').src = url;
        document.querySelectorAll('.preset-bg').forEach(p => p.classList.remove('active'));
        alert('✓ Background updated successfully!');
    };
    img.onerror = () => {
        alert('✗ Invalid image URL. Please try again.');
    };
    img.src = url;
});

// Reset to default background
document.getElementById('resetBackgroundBtn')?.addEventListener('click', () => {
    if (!confirm('Reset to default background?')) return;
    
    const defaultBg = 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=1920&h=1080&fit=crop';
    localStorage.setItem('loginBackground', defaultBg);
    document.getElementById('currentBackground').src = defaultBg;
    
    document.querySelectorAll('.preset-bg').forEach(preset => {
        preset.classList.remove('active');
        if (preset.getAttribute('data-url') === defaultBg) {
            preset.classList.add('active');
        }
    });
    
    alert('✓ Background reset to default!');
});

// Preset background selection
document.querySelectorAll('.preset-bg').forEach(preset => {
    preset.addEventListener('click', () => {
        const url = preset.getAttribute('data-url');
        localStorage.setItem('loginBackground', url);
        document.getElementById('currentBackground').src = url;
        
        document.querySelectorAll('.preset-bg').forEach(p => p.classList.remove('active'));
        preset.classList.add('active');
        
        alert('✓ Background updated successfully!');
    });
});

// Navigation between sections
const navButtons = document.querySelectorAll('.nav-btn');
const contentSections = document.querySelectorAll('.content-section');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetSection = button.getAttribute('data-section');
        
        // Remove active class from all buttons and sections
        navButtons.forEach(btn => btn.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked button and corresponding section
        button.classList.add('active');
        document.getElementById(targetSection).classList.add('active');
    });
});

// Logout button
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
});

// Placeholder functions for buttons (you can expand these later)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-small') && 
        !e.target.classList.contains('edit-image-btn') && 
        !e.target.classList.contains('delete-image-btn')) {
        const action = e.target.textContent.trim();
        alert(`${action} functionality would be implemented here.`);
    }
});


// Calendar functionality
let currentCalendarDate = new Date();

function loadCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    // Update month display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // Get chases
    const chases = ChaseManager.getChases();
    
    // Create calendar days
    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';
    
    // Add previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const dayDiv = createCalendarDay(day, true, null);
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
            const chaseDate = parseChaseDate(c.date);
            return chaseDate && 
                   chaseDate.getDate() === day && 
                   chaseDate.getMonth() === month && 
                   chaseDate.getFullYear() === year;
        });
        
        const dayDiv = createCalendarDay(day, false, chase, isToday);
        calendarDays.appendChild(dayDiv);
    }
    
    // Add next month days
    const totalCells = calendarDays.children.length;
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayDiv = createCalendarDay(day, true, null);
        calendarDays.appendChild(dayDiv);
    }
    
    // Load upcoming chases
    loadUpcomingChases();
}

function createCalendarDay(day, isOtherMonth, chase, isToday = false) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    
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
        <div class="calendar-day-number">${day}</div>
        ${chase ? `<div class="calendar-day-event">${chase.location}</div>` : ''}
    `;
    
    if (chase) {
        dayDiv.addEventListener('click', () => {
            alert(`🌪️ Storm Chase Details\n\nDate: ${chase.date}\nLocation: ${chase.location}\nStatus: ${chase.status}\nParticipants: ${chase.participants}`);
        });
    }
    
    return dayDiv;
}

function parseChaseDate(dateStr) {
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

function loadUpcomingChases() {
    const upcomingDiv = document.getElementById('upcomingChases');
    if (!upcomingDiv) return;
    
    const chases = ChaseManager.getChases();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Filter and sort upcoming chases
    const upcoming = chases
        .map(chase => ({
            ...chase,
            parsedDate: parseChaseDate(chase.date)
        }))
        .filter(chase => chase.parsedDate && chase.parsedDate >= today)
        .sort((a, b) => a.parsedDate - b.parsedDate)
        .slice(0, 5); // Show next 5 chases
    
    if (upcoming.length === 0) {
        upcomingDiv.innerHTML = '<p style="color: #666;">No upcoming chases scheduled.</p>';
        return;
    }
    
    upcomingDiv.innerHTML = '';
    upcoming.forEach(chase => {
        const chaseDiv = document.createElement('div');
        chaseDiv.className = `upcoming-chase-item ${chase.status === 'Active' ? 'active' : ''}`;
        chaseDiv.innerHTML = `
            <div class="upcoming-chase-date">📅 ${chase.date}</div>
            <div class="upcoming-chase-location">📍 ${chase.location}</div>
            <div class="upcoming-chase-participants">👥 ${chase.participants} participants | Status: ${chase.status}</div>
        `;
        upcomingDiv.appendChild(chaseDiv);
    });
}

// Calendar navigation
document.getElementById('prevMonth')?.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    loadCalendar();
});

document.getElementById('nextMonth')?.addEventListener('click', () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    loadCalendar();
});

// Load calendar when switching to calendar section
const calendarNavBtn = document.querySelector('[data-section="calendar"]');
if (calendarNavBtn) {
    calendarNavBtn.addEventListener('click', loadCalendar);
}


// Calendar Event Modal
const calendarEventModal = document.getElementById('calendarEventModal');
const addCalendarEventBtn = document.getElementById('addCalendarEventBtn');
const closeCalendarModal = document.getElementById('closeCalendarModal');
const cancelCalendarEvent = document.getElementById('cancelCalendarEvent');
const calendarEventForm = document.getElementById('calendarEventForm');

// Open modal
addCalendarEventBtn?.addEventListener('click', () => {
    calendarEventModal.classList.add('show');
    
    // Set default values to current date
    const now = new Date();
    document.getElementById('eventMonth').value = now.getMonth();
    document.getElementById('eventDay').value = now.getDate();
    document.getElementById('eventYear').value = now.getFullYear();
    document.getElementById('eventTime').value = '09:00';
});

// Close modal
closeCalendarModal?.addEventListener('click', () => {
    calendarEventModal.classList.remove('show');
});

cancelCalendarEvent?.addEventListener('click', () => {
    calendarEventModal.classList.remove('show');
});

// Close modal when clicking outside
calendarEventModal?.addEventListener('click', (e) => {
    if (e.target === calendarEventModal) {
        calendarEventModal.classList.remove('show');
    }
});

// Handle form submission
calendarEventForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('eventTitle').value;
    const month = parseInt(document.getElementById('eventMonth').value);
    const day = parseInt(document.getElementById('eventDay').value);
    const year = parseInt(document.getElementById('eventYear').value);
    const time = document.getElementById('eventTime').value;
    const location = document.getElementById('eventLocation').value;
    const status = document.getElementById('eventStatus').value;
    const participants = parseInt(document.getElementById('eventParticipants').value) || 0;
    
    // Validate date
    const eventDate = new Date(year, month, day);
    if (eventDate.getMonth() !== month) {
        alert('❌ Invalid date! Please check the day for the selected month.');
        return;
    }
    
    // Format date string
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const dateString = `${monthNames[month]} ${day}, ${year}`;
    
    // Add chase with time
    const newChase = ChaseManager.addChase({
        date: dateString,
        location: location,
        status: status,
        participants: participants,
        time: time,
        title: title
    });
    
    // Close modal and reset form
    calendarEventModal.classList.remove('show');
    calendarEventForm.reset();
    
    // Reload calendar and chases
    loadCalendar();
    loadChases();
    
    alert(`✓ Calendar event added successfully!\n\n${title}\n${dateString} at ${time}\n${location}`);
});


// User Approval Management
function loadUserApprovals() {
    const users = JSON.parse(localStorage.getItem('staffUsers') || '{}');
    const pendingList = document.getElementById('pendingUsersList');
    const approvedList = document.getElementById('approvedUsersList');
    
    if (!pendingList || !approvedList) return;
    
    let pendingCount = 0;
    let approvedCount = 0;
    let rejectedCount = 0;
    
    pendingList.innerHTML = '';
    approvedList.innerHTML = '';
    
    const userEntries = Object.entries(users);
    
    if (userEntries.length === 0) {
        pendingList.innerHTML = '<div class="no-users-message">No pending user approvals</div>';
        approvedList.innerHTML = '<div class="no-users-message">No approved users yet</div>';
        return;
    }
    
    let hasPending = false;
    let hasApproved = false;
    
    userEntries.forEach(([username, userData]) => {
        const status = userData.status || 'approved';
        
        if (status === 'pending') {
            pendingCount++;
            hasPending = true;
            const card = createUserCard(username, userData, 'pending');
            pendingList.appendChild(card);
        } else if (status === 'approved') {
            approvedCount++;
            hasApproved = true;
            const card = createUserCard(username, userData, 'approved');
            approvedList.appendChild(card);
        } else if (status === 'rejected') {
            rejectedCount++;
        }
    });
    
    if (!hasPending) {
        pendingList.innerHTML = '<div class="no-users-message">✓ No pending approvals</div>';
    }
    
    if (!hasApproved) {
        approvedList.innerHTML = '<div class="no-users-message">No approved users yet</div>';
    }
    
    // Update stats
    document.getElementById('pendingCount').textContent = pendingCount;
    document.getElementById('approvedCount').textContent = approvedCount;
    document.getElementById('rejectedCount').textContent = rejectedCount;
}

function createUserCard(username, userData, status) {
    const card = document.createElement('div');
    card.className = `user-approval-card ${status}`;
    card.setAttribute('data-username', username);
    
    const createdDate = new Date(userData.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const roleNames = {
        'staff': 'Staff Member',
        'chaser': 'Storm Chaser',
        'photographer': 'Photographer',
        'meteorologist': 'Meteorologist',
        'videographer': 'Videographer'
    };
    
    const roleName = roleNames[userData.role] || userData.role;
    
    card.innerHTML = `
        <div class="user-approval-header">
            <div class="user-approval-name">👤 ${username}</div>
            <div class="user-approval-status ${status}">${status === 'pending' ? '⏳ Pending' : '✓ Approved'}</div>
        </div>
        <div class="user-approval-info">
            <div class="user-info-item">
                <span class="user-info-label">Email</span>
                <span class="user-info-value">📧 ${userData.email}</span>
            </div>
            <div class="user-info-item">
                <span class="user-info-label">Role</span>
                <span class="user-info-value">👔 ${roleName}</span>
            </div>
            <div class="user-info-item">
                <span class="user-info-label">Registration Code</span>
                <span class="user-info-value">🔑 ${userData.registrationCode || 'N/A'}</span>
            </div>
            <div class="user-info-item">
                <span class="user-info-label">Registered</span>
                <span class="user-info-value">📅 ${createdDate}</span>
            </div>
        </div>
        ${status === 'pending' ? `
            <div class="user-approval-actions">
                <button class="btn-approve" data-username="${username}" data-action="approve">✓ Approve</button>
                <button class="btn-reject" data-username="${username}" data-action="reject">✗ Reject</button>
            </div>
        ` : `
            <div class="user-approval-actions">
                <button class="btn-reject" data-username="${username}" data-action="revoke">🚫 Revoke Access</button>
            </div>
        `}
    `;
    
    return card;
}

function approveUser(username) {
    if (!confirm(`Approve user "${username}"?\n\nThey will be able to login immediately.`)) return;
    
    const users = JSON.parse(localStorage.getItem('staffUsers') || '{}');
    if (users[username]) {
        users[username].status = 'approved';
        users[username].approvedAt = new Date().toISOString();
        localStorage.setItem('staffUsers', JSON.stringify(users));
        
        // Animate card removal
        const card = document.querySelector(`[data-username="${username}"]`);
        if (card) {
            card.style.animation = 'fadeOut 0.3s';
            setTimeout(() => {
                loadUserApprovals();
                alert(`✓ User "${username}" has been approved!`);
            }, 300);
        }
    }
}

function rejectUser(username) {
    if (!confirm(`Reject user "${username}"?\n\nThey will NOT be able to login and their account will be deleted.`)) return;
    
    const users = JSON.parse(localStorage.getItem('staffUsers') || '{}');
    if (users[username]) {
        delete users[username];
        localStorage.setItem('staffUsers', JSON.stringify(users));
        
        // Animate card removal
        const card = document.querySelector(`[data-username="${username}"]`);
        if (card) {
            card.style.animation = 'fadeOut 0.3s';
            setTimeout(() => {
                loadUserApprovals();
                alert(`✗ User "${username}" has been rejected and removed.`);
            }, 300);
        }
    }
}

function revokeUser(username) {
    if (!confirm(`Revoke access for user "${username}"?\n\nThey will no longer be able to login.`)) return;
    
    const users = JSON.parse(localStorage.getItem('staffUsers') || '{}');
    if (users[username]) {
        users[username].status = 'pending';
        users[username].revokedAt = new Date().toISOString();
        localStorage.setItem('staffUsers', JSON.stringify(users));
        
        // Animate card removal
        const card = document.querySelector(`[data-username="${username}"]`);
        if (card) {
            card.style.animation = 'fadeOut 0.3s';
            setTimeout(() => {
                loadUserApprovals();
                alert(`🚫 Access revoked for user "${username}".`);
            }, 300);
        }
    }
}

// Load user approvals when switching to users section
const usersNavBtn = document.querySelector('[data-section="users"]');
if (usersNavBtn) {
    usersNavBtn.addEventListener('click', loadUserApprovals);
}

// Event delegation for approval buttons
document.addEventListener('click', (e) => {
    const target = e.target;
    
    // Check if clicked element is an approval button
    if (target.classList.contains('btn-approve') || target.classList.contains('btn-reject')) {
        const username = target.getAttribute('data-username');
        const action = target.getAttribute('data-action');
        
        if (!username || !action) return;
        
        if (action === 'approve') {
            approveUser(username);
        } else if (action === 'reject') {
            rejectUser(username);
        } else if (action === 'revoke') {
            revokeUser(username);
        }
    }
});


// Booking Management
function loadBookings() {
    const tbody = document.getElementById('bookingsTableBody');
    if (!tbody) return;

    const bookings = BookingManager.getBookings();
    tbody.innerHTML = '';

    if (bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: #999;">No bookings yet</td></tr>';
        return;
    }

    bookings.forEach(booking => {
        const row = document.createElement('tr');
        const statusClass = booking.status === 'confirmed' ? 'badge-confirmed' : 
                           booking.status === 'pending' ? 'badge-pending' : 'badge-scheduled';
        
        const statusText = booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
        
        row.innerHTML = `
            <td>${booking.name}</td>
            <td>${booking.email}</td>
            <td>${booking.chaseDate}</td>
            <td><span class="badge ${statusClass}">${statusText}</span></td>
            <td>
                ${booking.status === 'pending' ? `
                    <button class="btn-small" data-booking-id="${booking.id}" data-booking-action="approve">Approve</button>
                    <button class="btn-small btn-danger" data-booking-id="${booking.id}" data-booking-action="decline">Decline</button>
                ` : booking.status === 'confirmed' ? `
                    <button class="btn-small" data-booking-id="${booking.id}" data-booking-action="view">View</button>
                    <button class="btn-small btn-danger" data-booking-id="${booking.id}" data-booking-action="cancel">Cancel</button>
                ` : `
                    <button class="btn-small" data-booking-id="${booking.id}" data-booking-action="view">View</button>
                    <button class="btn-small btn-danger" data-booking-id="${booking.id}" data-booking-action="delete">Delete</button>
                `}
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Event delegation for booking buttons
document.addEventListener('click', (e) => {
    const target = e.target;
    
    if (target.hasAttribute('data-booking-id')) {
        const bookingId = parseInt(target.getAttribute('data-booking-id'));
        const action = target.getAttribute('data-booking-action');
        
        if (!bookingId || !action) return;
        
        const booking = BookingManager.getBooking(bookingId);
        if (!booking) return;
        
        if (action === 'approve') {
            if (confirm(`Approve booking for ${booking.name}?\n\nChase Date: ${booking.chaseDate}\nEmail: ${booking.email}`)) {
                BookingManager.approveBooking(bookingId);
                loadBookings();
                alert(`✓ Booking approved for ${booking.name}!`);
            }
        } else if (action === 'decline') {
            if (confirm(`Decline booking for ${booking.name}?\n\nThis will permanently delete the booking.`)) {
                const row = target.closest('tr');
                row.style.animation = 'fadeOut 0.3s';
                setTimeout(() => {
                    BookingManager.declineBooking(bookingId);
                    loadBookings();
                    alert(`✗ Booking declined and removed for ${booking.name}.`);
                }, 300);
            }
        } else if (action === 'cancel') {
            if (confirm(`Cancel booking for ${booking.name}?\n\nChase Date: ${booking.chaseDate}`)) {
                BookingManager.cancelBooking(bookingId);
                loadBookings();
                alert(`🚫 Booking cancelled for ${booking.name}.`);
            }
        } else if (action === 'delete') {
            if (confirm(`Delete booking for ${booking.name}?`)) {
                const row = target.closest('tr');
                row.style.animation = 'fadeOut 0.3s';
                setTimeout(() => {
                    BookingManager.deleteBooking(bookingId);
                    loadBookings();
                    alert(`✗ Booking deleted for ${booking.name}.`);
                }, 300);
            }
        } else if (action === 'view') {
            alert(`📋 Booking Details\n\nName: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone || 'N/A'}\nChase Date: ${booking.chaseDate}\nParticipants: ${booking.participants}\nStatus: ${booking.status}\nBooked: ${new Date(booking.createdAt).toLocaleDateString()}`);
        }
    }
});

// Search bookings
document.getElementById('bookingSearch')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const bookings = BookingManager.getBookings();
    const filtered = bookings.filter(booking => 
        booking.name.toLowerCase().includes(searchTerm) ||
        booking.email.toLowerCase().includes(searchTerm) ||
        booking.chaseDate.toLowerCase().includes(searchTerm) ||
        booking.status.toLowerCase().includes(searchTerm)
    );

    const tbody = document.getElementById('bookingsTableBody');
    tbody.innerHTML = '';

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: #999;">No bookings found</td></tr>';
        return;
    }

    filtered.forEach(booking => {
        const row = document.createElement('tr');
        const statusClass = booking.status === 'confirmed' ? 'badge-confirmed' : 
                           booking.status === 'pending' ? 'badge-pending' : 'badge-scheduled';
        
        const statusText = booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
        
        row.innerHTML = `
            <td>${booking.name}</td>
            <td>${booking.email}</td>
            <td>${booking.chaseDate}</td>
            <td><span class="badge ${statusClass}">${statusText}</span></td>
            <td>
                ${booking.status === 'pending' ? `
                    <button class="btn-small" data-booking-id="${booking.id}" data-booking-action="approve">Approve</button>
                    <button class="btn-small btn-danger" data-booking-id="${booking.id}" data-booking-action="decline">Decline</button>
                ` : booking.status === 'confirmed' ? `
                    <button class="btn-small" data-booking-id="${booking.id}" data-booking-action="view">View</button>
                    <button class="btn-small btn-danger" data-booking-id="${booking.id}" data-booking-action="cancel">Cancel</button>
                ` : `
                    <button class="btn-small" data-booking-id="${booking.id}" data-booking-action="view">View</button>
                    <button class="btn-small btn-danger" data-booking-id="${booking.id}" data-booking-action="delete">Delete</button>
                `}
            </td>
        `;
        tbody.appendChild(row);
    });
});

// Load bookings when switching to bookings section
const bookingsNavBtn = document.querySelector('[data-section="bookings"]');
if (bookingsNavBtn) {
    bookingsNavBtn.addEventListener('click', loadBookings);
}
