// Gallery data storage using localStorage
const GalleryManager = {
    // Initialize with default images
    defaultImages: [
        {
            id: 1,
            url: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=400&h=300&fit=crop',
            title: 'Tornado Intercept',
            location: 'Oklahoma, 2025',
            alt: 'Tornado'
        },
        {
            id: 2,
            url: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=400&h=300&fit=crop',
            title: 'Lightning Strike',
            location: 'Kansas, 2025',
            alt: 'Lightning'
        },
        {
            id: 3,
            url: 'https://images.unsplash.com/photo-1561553543-1d1c0b4e0c4d?w=400&h=300&fit=crop',
            title: 'Supercell Storm',
            location: 'Texas, 2024',
            alt: 'Supercell'
        },
        {
            id: 4,
            url: 'https://images.unsplash.com/photo-1601134467661-3d775b999c8b?w=400&h=300&fit=crop',
            title: 'Wall Cloud',
            location: 'Nebraska, 2024',
            alt: 'Storm Clouds'
        },
        {
            id: 5,
            url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&h=300&fit=crop',
            title: 'Hail Storm',
            location: 'Colorado, 2024',
            alt: 'Hail'
        },
        {
            id: 6,
            url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
            title: 'Storm Structure',
            location: 'Arkansas, 2023',
            alt: 'Storm Structure'
        }
    ],

    // Get all images
    getImages() {
        const stored = localStorage.getItem('galleryImages');
        if (!stored) {
            // Initialize with default images
            this.saveImages(this.defaultImages);
            return this.defaultImages;
        }
        return JSON.parse(stored);
    },

    // Save images to localStorage
    saveImages(images) {
        localStorage.setItem('galleryImages', JSON.stringify(images));
    },

    // Add new image
    addImage(imageData) {
        const images = this.getImages();
        const newImage = {
            id: Date.now(),
            url: imageData.url,
            title: imageData.title,
            location: imageData.location,
            alt: imageData.alt || imageData.title
        };
        images.push(newImage);
        this.saveImages(images);
        return newImage;
    },

    // Update image
    updateImage(id, imageData) {
        const images = this.getImages();
        const index = images.findIndex(img => img.id === id);
        if (index !== -1) {
            images[index] = { ...images[index], ...imageData };
            this.saveImages(images);
            return images[index];
        }
        return null;
    },

    // Delete image
    deleteImage(id) {
        const images = this.getImages();
        const filtered = images.filter(img => img.id !== id);
        this.saveImages(filtered);
        return filtered;
    },

    // Get single image
    getImage(id) {
        const images = this.getImages();
        return images.find(img => img.id === id);
    }
};
