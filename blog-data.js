// Blog data storage using localStorage
const BlogManager = {
    // Initialize with default blog posts
    defaultPosts: [
        {
            id: 1,
            title: 'Epic Tornado Outbreak in Tornado Alley',
            excerpt: 'Our team intercepted multiple tornadoes during yesterday\'s historic outbreak. Here\'s what we witnessed and the science behind it...',
            date: 'January 10, 2026',
            image: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=400&h=250&fit=crop',
            content: 'Full blog post content would go here...',
            author: 'Razorback Team'
        },
        {
            id: 2,
            title: 'Safety Tips for Storm Chasing',
            excerpt: 'Storm chasing can be dangerous. Learn the essential safety protocols every chaser should follow to stay safe in severe weather...',
            date: 'January 8, 2026',
            image: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=400&h=250&fit=crop',
            content: 'Full blog post content would go here...',
            author: 'Razorback Team'
        },
        {
            id: 3,
            title: 'Understanding Supercell Thunderstorms',
            excerpt: 'Dive deep into the anatomy of supercell storms and learn what makes these rotating thunderstorms so fascinating and powerful...',
            date: 'January 5, 2026',
            image: 'https://images.unsplash.com/photo-1561553543-1d1c0b4e0c4d?w=400&h=250&fit=crop',
            content: 'Full blog post content would go here...',
            author: 'Razorback Team'
        }
    ],

    // Get all blog posts
    getPosts() {
        const stored = localStorage.getItem('blogPosts');
        if (!stored) {
            // Initialize with default posts
            this.savePosts(this.defaultPosts);
            return this.defaultPosts;
        }
        return JSON.parse(stored);
    },

    // Save posts to localStorage
    savePosts(posts) {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    },

    // Add new post
    addPost(postData) {
        const posts = this.getPosts();
        const newPost = {
            id: Date.now(),
            title: postData.title,
            excerpt: postData.excerpt,
            date: postData.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            image: postData.image,
            content: postData.content || '',
            author: postData.author || 'Razorback Team'
        };
        posts.unshift(newPost); // Add to beginning
        this.savePosts(posts);
        return newPost;
    },

    // Update post
    updatePost(id, postData) {
        const posts = this.getPosts();
        const index = posts.findIndex(post => post.id === id);
        if (index !== -1) {
            posts[index] = { ...posts[index], ...postData };
            this.savePosts(posts);
            return posts[index];
        }
        return null;
    },

    // Delete post
    deletePost(id) {
        const posts = this.getPosts();
        const filtered = posts.filter(post => post.id !== id);
        this.savePosts(filtered);
        return filtered;
    },

    // Get single post
    getPost(id) {
        const posts = this.getPosts();
        return posts.find(post => post.id === id);
    }
};
