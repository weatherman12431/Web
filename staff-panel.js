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
