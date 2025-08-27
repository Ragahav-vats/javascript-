// Nature Gallery App
class NatureGallery {
    constructor() {
        this.currentCategory = null;
        this.images = {
            nature: [
                {
                    url: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg',
                    // title: 'Mountain Landscape',
                    // description: 'Breathtaking mountain peaks at sunset'
                },
                {
                    url: 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg',
                    // title: 'Forest Canopy',
                    // description: 'Sunlight filtering through green leaves'
                },
                {
                    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
                    // title: 'Alpine Meadow',
                    // description: 'Colorful wildflowers in mountain meadow'
                },
                {
                    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
                    // title: 'Desert Sunset',
                    // description: 'Golden hour in the desert landscape'
                },
                {
                    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
                    // title: 'Coastal Cliffs',
                    // description: 'Dramatic ocean waves crashing on cliffs'
                },
                {
                    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
                    // title: 'Tropical Paradise',
                    // description: 'Palm trees and crystal clear waters'
                }
            ],
            forests: [
                {
                    url: 'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg',
                    // title: 'Misty Forest',
                    // description: 'Enchanted forest shrouded in morning mist'
                },
                {
                    url: 'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg',
                    // title: 'Ancient Trees',
                    // description: 'Majestic old-growth forest canopy'
                },
                {
                    url: 'https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg',
                    // title: 'Forest Path',
                    // description: 'Peaceful walking trail through the woods'
                },
                {
                    url: 'https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg',
                    // title: 'Autumn Colors',
                    // description: 'Vibrant fall foliage in the forest'
                },
                {
                    url: 'https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg',
                    // title: 'Forest Stream',
                    // description: 'Crystal clear water flowing through the woods'
                },
                {
                    url: 'https://images.pexels.com/photos/167698/pexels-photo-167698.jpeg',
                    // title: 'Mossy Forest Floor',
                    // description: 'Lush green moss covering the forest ground'
                }
            ],
            lights: [
                {
                    url: 'https://images.pexels.com/photos/567985/pexels-photo-567985.jpeg',
                    // title: 'Misty Forest',
                    // description: 'Enchanted forest shrouded in morning mist'
                },
                {
                    url: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg',
                    // title: 'Ancient Trees',
                    // description: 'Majestic old-growth forest canopy'
                },
                {
                    url: 'https://images.pexels.com/photos/567985/pexels-photo-567985.jpeg',
                    // title: 'Forest Path',
                    // description: 'Peaceful walking trail through the woods'
                },
                {
                    url: 'https://images.pexels.com/photos/754262/pexels-photo-754262.jpeg',
                    // title: 'Autumn Colors',
                    // description: 'Vibrant fall foliage in the forest'
                },
                {
                    url: 'https://images.pexels.com/photos/431722/pexels-photo-431722.jpeg',
                    // title: 'Forest Stream',
                    // description: 'Crystal clear water flowing through the woods'
                },
                {
                    url: 'https://images.pexels.com/photos/754262/pexels-photo-754262.jpeg',
                    // title: 'Mossy Forest Floor',
                    // description: 'Lush green moss covering the forest ground'
                }
            ],
            books: [
                {
                    url: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg',
                    // title: 'Vintage Library',
                    // description: 'Classic books in an old library setting'
                },
                {
                    url: 'https://images.pexels.com/photos/5530604/pexels-photo-5530604.jpeg',
                    // title: 'Open Book',
                    // description: 'Pages of knowledge waiting to be discovered'
                },
                {
                    url: 'https://images.pexels.com/photos/4132936/pexels-photo-4132936.png',
                    // title: 'Book Collection',
                    // description: 'Colorful spines of various books'
                },
                {
                    url: 'https://images.pexels.com/photos/4058794/pexels-photo-4058794.jpeg',
                    // title: 'Reading Corner',
                    // description: 'Cozy reading nook with natural light'
                },
                {
                    url: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
                    // title: 'Ancient Manuscripts',
                    // description: 'Historical documents and old texts'
                },
                {
                    url: 'https://images.pexels.com/photos/4865603/pexels-photo-4865603.jpeg',
                    // title: 'Modern Bookstore',
                    // description: 'Contemporary bookshop with warm lighting'
                }
            ],
            waterfalls: [
                {
                    url: 'https://images.pexels.com/photos/1875480/pexels-photo-1875480.jpeg',
                    // title: 'Vintage Library',
                    // description: 'Classic books in an old library setting'
                },
                {
                    url: 'https://images.pexels.com/photos/62627/niagara-cases-water-waterfall-62627.jpeg',
                    // title: 'Open Book',
                    // description: 'Pages of knowledge waiting to be discovered'
                },
                {
                    url: 'https://images.pexels.com/photos/1598073/pexels-photo-1598073.jpeg',
                    // title: 'Book Collection',
                    // description: 'Colorful spines of various books'
                },
                {
                    url: 'https://images.pexels.com/photos/949194/pexels-photo-949194.jpeg',
                    // title: 'Reading Corner',
                    // description: 'Cozy reading nook with natural light'
                },
                {
                    url: 'https://images.pexels.com/photos/327394/pexels-photo-327394.jpeg',
                    // title: 'Ancient Manuscripts',
                    // description: 'Historical documents and old texts'
                },
                {
                    url: 'https://images.pexels.com/photos/1080421/pexels-photo-1080421.jpeg',
                    // title: 'Modern Bookstore',
                    // description: 'Contemporary bookshop with warm lighting'
                }
            ],
            rivers: [
                {
                    url: 'https://images.pexels.com/photos/1179225/pexels-photo-1179225.jpeg',
                    // title: 'Mountain Stream',
                    // description: 'Clear water flowing over smooth rocks'
                },
                {
                    url: 'https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg',
                    // title: 'River Bend',
                    // description: 'Peaceful river meandering through the landscape'
                },
                {
                    url: 'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg',
                //     title: 'Waterfall',
                //     description: 'Majestic waterfall cascading down cliffs'
                 },
                {
                    url: 'https://images.pexels.com/photos/1766838/pexels-photo-1766838.jpeg',
                    // title: 'River Rapids',
                    // description: 'White water rushing through rocky terrain'
                },
                {
                    url: 'https://images.pexels.com/photos/2178175/pexels-photo-2178175.jpeg',
                    // title: 'Reflections',
                    // description: 'Perfect mirror-like reflections on calm water'
                },
                {
                    url: 'https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg',
                    // title: 'River Valley',
                    // description: 'Wide river flowing through a scenic valley'
                }
            ]
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.showWelcomeMessage();
    }

    bindEvents() {
        // Menu item clicks
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.showCategory(category);
            });
        });

        // Back button
        const backBtn = document.getElementById('back-btn');
        backBtn.addEventListener('click', () => {
            this.showWelcomeMessage();
        });

        // Add hover effects for menu items
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', this.addHoverEffect.bind(this));
            item.addEventListener('mouseleave', this.removeHoverEffect.bind(this));
        });
    }

    addHoverEffect(e) {
        const item = e.currentTarget;
        item.style.transform = 'translateY(-10px) scale(1.02)';
    }

    removeHoverEffect(e) {
        const item = e.currentTarget;
        item.style.transform = 'translateY(0) scale(1)';
    }

    showCategory(category) {
        this.currentCategory = category;
        const gallery = document.getElementById('gallery');
        const galleryTitle = document.getElementById('gallery-title');
        const backBtn = document.getElementById('back-btn');

        // Update UI
        galleryTitle.textContent = this.getCategoryTitle(category);
        backBtn.style.display = 'flex';

        // Show loading
        this.showLoading();

        // Simulate loading delay for better UX
        setTimeout(() => {
            this.displayImages(category);
        }, 500);
    }

    getCategoryTitle(category) {
        const titles = {
            nature: 'Nature Landscapes',
            forests: 'Mystical Forests',
            books: 'Knowledge & Wisdom',
            rivers: 'Flowing Waters',
            waterfalls: 'Flowing Waterfalls',
            light: 'Glowing Lights'
        };
        return titles[category] || category;
    }

    showLoading() {
        const gallery = document.getElementById('gallery');
        gallery.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner"></i>
                <p>Loading beautiful images...</p>
            </div>
        `;
    }

    displayImages(category) {
        const gallery = document.getElementById('gallery');
        const images = this.images[category] || [];

        if (images.length === 0) {
            gallery.innerHTML = `
                <div class="welcome-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>No images available for this category</p>
                </div>
            `;
            return;
        }

        const imagesHTML = images.map(image => `
            <div class="gallery-item" onclick="gallery.showImageModal('${image.url}', '${image.title}', '${image.description}')">
                <img src="${image.url}" alt="${image.title}" loading="lazy">
                <div class="gallery-item-info">
                    <h4>${image.title}</h4>
                    <p>${image.description}</p>
                </div>
            </div>
        `).join('');

        gallery.innerHTML = imagesHTML;

        // Add fade-in animation to gallery items
        const galleryItems = gallery.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    showWelcomeMessage() {
        this.currentCategory = null;
        const gallery = document.getElementById('gallery');
        const galleryTitle = document.getElementById('gallery-title');
        const backBtn = document.getElementById('back-btn');

        galleryTitle.textContent = 'Select a category to explore';
        backBtn.style.display = 'none';

        gallery.innerHTML = `
            <div class="welcome-message">
                <i class="fas fa-hand-pointer"></i>
                <p>Click on any category above to view beautiful images</p>
            </div>
        `;
    }

    showImageModal(imageUrl, title, description) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            border-radius: 15px;
            max-width: 90%;
            max-height: 90%;
            overflow: hidden;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;

        modalContent.innerHTML = `
            <div style="position: relative;">
                <img src="${imageUrl}" alt="${title}" style="width: 100%; height: 100%; max-height:70vh;  object-fit: cover;">
                <button class="close-modal" style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: rgba(0,0,0,0.7);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    cursor: pointer;
                    font-size: 1.2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">&times;</button>
            </div>
            // <div style="padding: 20px;">
            //     <h3 style="margin: 0 0 10px 0; color: #1f2937;">${title}</h3>
            //     <p style="margin: 0; color: #6b7280;">${description}</p>
            // </div>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);

        // Close modal functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', closeModal);

        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }
}

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gallery = new NatureGallery();
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add parallax effect to header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
});