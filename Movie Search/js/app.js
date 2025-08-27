// Movie Search App JavaScript
class MovieSearchApp {
    constructor() {
        this.apiKey = '3fd2be6f0c70a2a598f084ddfb75487c'; // TMDB API Key
        this.baseUrl = 'https://api.themoviedb.org/3';
        this.currentPage = 1;
        this.totalPages = 0;
        this.currentSearch = '';
        this.currentYear = '';
        this.currentGenre = '';
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadPopularMovies();
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const yearFilter = document.getElementById('yearFilter');
        const genreFilter = document.getElementById('genreFilter');
        const retryBtn = document.getElementById('retryBtn');

        // Search on button click
        searchBtn.addEventListener('click', () => this.handleSearch());

        // Search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        // Filter changes
        yearFilter.addEventListener('change', () => this.handleFilterChange());
        genreFilter.addEventListener('change', () => this.handleFilterChange());

        // Retry button
        retryBtn.addEventListener('click', () => this.handleRetry());

        // View toggle
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => this.handleViewToggle(btn));
        });

        // Modal close
        const modal = document.getElementById('movieModal');
        const closeModal = document.querySelector('.close-modal');
        
        closeModal.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    async handleSearch() {
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.trim();
        
        if (query) {
            this.currentSearch = query;
            this.currentPage = 1;
            await this.searchMovies(query);
        } else {
            this.currentSearch = '';
            this.loadPopularMovies();
        }
    }

    async handleFilterChange() {
        const yearFilter = document.getElementById('yearFilter');
        const genreFilter = document.getElementById('genreFilter');
        
        this.currentYear = yearFilter.value;
        this.currentGenre = genreFilter.value;
        this.currentPage = 1;

        if (this.currentSearch) {
            await this.searchMovies(this.currentSearch);
        } else {
            await this.loadPopularMovies();
        }
    }

    async handleRetry() {
        this.hideAllSections();
        if (this.currentSearch) {
            await this.searchMovies(this.currentSearch);
        } else {
            await this.loadPopularMovies();
        }
    }

    handleViewToggle(clickedBtn) {
        const viewBtns = document.querySelectorAll('.view-btn');
        const moviesGrid = document.getElementById('moviesGrid');
        
        viewBtns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');
        
        const view = clickedBtn.dataset.view;
        if (view === 'list') {
            moviesGrid.classList.add('list-view');
        } else {
            moviesGrid.classList.remove('list-view');
        }
    }

    async loadPopularMovies() {
        try {
            this.showLoading();
            const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&page=${this.currentPage}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Failed to fetch popular movies');
            }
            
            const data = await response.json();
            this.displayMovies(data.results, 'Popular Movies');
            this.totalPages = data.total_pages;
            
        } catch (error) {
            this.showError('Failed to load popular movies. Please try again.');
            console.error('Error loading popular movies:', error);
        }
    }

    async searchMovies(query) {
        try {
            this.showLoading();
            let url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}&page=${this.currentPage}`;
            
            // Add filters if selected
            if (this.currentYear) {
                url += `&year=${this.currentYear}`;
            }
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Failed to search movies');
            }
            
            const data = await response.json();
            
            if (data.results.length === 0) {
                this.showNoResults();
            } else {
                this.displayMovies(data.results, `Search Results for "${query}"`);
                this.totalPages = data.total_pages;
            }
            
        } catch (error) {
            this.showError('Failed to search movies. Please try again.');
            console.error('Error searching movies:', error);
        }
    }

    displayMovies(movies, title) {
        this.hideAllSections();
        
        const moviesGrid = document.getElementById('moviesGrid');
        const resultsCount = document.getElementById('resultsCount');
        
        resultsCount.textContent = `${title} (${movies.length} results)`;
        moviesGrid.innerHTML = '';
        
        movies.forEach((movie, index) => {
            const movieCard = this.createMovieCard(movie, index);
            moviesGrid.appendChild(movieCard);
        });
        
        document.getElementById('resultsSection').style.display = 'block';
    }

    createMovieCard(movie, index) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const posterPath = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image';
        
        const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
        const overview = movie.overview || 'No overview available.';
        
        card.innerHTML = `
            <div class="movie-poster">
                <img src="${posterPath}" alt="${movie.title}" loading="lazy">
                <div class="movie-rating">⭐ ${rating}</div>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-year">${releaseYear}</span>
                    <span class="movie-genre">${this.getGenreName(movie.genre_ids[0])}</span>
                </div>
                <p class="movie-overview">${overview}</p>
            </div>
        `;
        
        // Add click event to show movie details
        card.addEventListener('click', () => this.showMovieDetails(movie));
        
        return card;
    }

    async showMovieDetails(movie) {
        try {
            // Fetch detailed movie information
            const url = `${this.baseUrl}/movie/${movie.id}?api_key=${this.apiKey}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Failed to fetch movie details');
            }
            
            const movieDetails = await response.json();
            
            // Populate modal
            const modal = document.getElementById('movieModal');
            const posterPath = movieDetails.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                : 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image';
            
            document.getElementById('modalPoster').src = posterPath;
            document.getElementById('modalTitle').textContent = movieDetails.title;
            document.getElementById('modalYear').textContent = movieDetails.release_date ? movieDetails.release_date.split('-')[0] : 'N/A';
            document.getElementById('modalRating').textContent = `⭐ ${movieDetails.vote_average ? movieDetails.vote_average.toFixed(1) : 'N/A'}`;
            document.getElementById('modalRuntime').textContent = `${movieDetails.runtime || 'N/A'} min`;
            document.getElementById('modalOverview').textContent = movieDetails.overview || 'No overview available.';
            
            // Display genres
            const genresContainer = document.getElementById('modalGenres');
            genresContainer.innerHTML = '';
            if (movieDetails.genres && movieDetails.genres.length > 0) {
                movieDetails.genres.forEach(genre => {
                    const genreSpan = document.createElement('span');
                    genreSpan.textContent = genre.name;
                    genresContainer.appendChild(genreSpan);
                });
            }
            
            modal.style.display = 'block';
            
        } catch (error) {
            console.error('Error fetching movie details:', error);
            this.showError('Failed to load movie details. Please try again.');
        }
    }

    closeModal() {
        document.getElementById('movieModal').style.display = 'none';
    }

    getGenreName(genreId) {
        const genres = {
            28: 'Action',
            12: 'Adventure',
            16: 'Animation',
            35: 'Comedy',
            80: 'Crime',
            99: 'Documentary',
            18: 'Drama',
            10751: 'Family',
            14: 'Fantasy',
            36: 'History',
            27: 'Horror',
            10402: 'Music',
            9648: 'Mystery',
            10749: 'Romance',
            878: 'Sci-Fi',
            10770: 'TV Movie',
            53: 'Thriller',
            10752: 'War',
            37: 'Western'
        };
        return genres[genreId] || 'Unknown';
    }

    showLoading() {
        this.hideAllSections();
        document.getElementById('loadingSection').style.display = 'block';
    }

    showNoResults() {
        this.hideAllSections();
        document.getElementById('noResults').style.display = 'block';
    }

    showError(message) {
        this.hideAllSections();
        document.getElementById('errorMessage').textContent = message;
        document.getElementById('errorSection').style.display = 'block';
    }

    hideAllSections() {
        const sections = [
            'loadingSection',
            'resultsSection', 
            'noResults', 
            'errorSection'
        ];
        
        sections.forEach(sectionId => {
            document.getElementById(sectionId).style.display = 'none';
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MovieSearchApp();
});

// Add some sample data for demonstration (in case API is not available)
const sampleMovies = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        poster_path: null,
        release_date: "1994-09-22",
        vote_average: 9.3,
        overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        genre_ids: [18]
    },
    {
        id: 2,
        title: "The Godfather",
        poster_path: null,
        release_date: "1972-03-14",
        vote_average: 9.2,
        overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        genre_ids: [18, 80]
    },
    {
        id: 3,
        title: "Pulp Fiction",
        poster_path: null,
        release_date: "1994-10-14",
        vote_average: 8.9,
        overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        genre_ids: [53, 80]
    }
];

// Fallback function to display sample data if API fails
function displaySampleMovies() {
    const app = new MovieSearchApp();
    app.displayMovies(sampleMovies, 'Sample Movies (API Unavailable)');
}

// Nature Gallery App
// This class manages the nature gallery with different image categories
// Each category (nature, forests, books, rivers) has its own set of images
// When a menu item is clicked, the corresponding category images are displayed
class NatureGallery {
    constructor() {
        this.currentCategory = null;
        // Image database organized by category
        // Each category contains an array of image objects with url, title, and description
        this.images = {
            nature: [
                {
                    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
                    title: 'Majestic Peaks',
                    description: 'Towering mountains reaching for the sky'
                },
                {
                    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
                    title: 'Golden Desert',
                    description: 'Endless sand dunes bathed in warm sunlight'
                },
                {
                    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
                    title: 'Ocean Majesty',
                    description: 'Powerful waves sculpting ancient coastal rocks'
                },
                {
                    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
                    title: 'Island Dreams',
                    description: 'Pristine beaches with swaying palm trees'
                },
                {
                    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
                    title: 'Wildflower Valley',
                    description: 'A carpet of colorful blooms in alpine meadows'
                },
                {
                    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
                    title: 'Fiery Earth',
                    description: 'Raw power of volcanic landscapes and lava flows'
                }
            ],
            forests: [
                {
                    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
                    title: 'Enchanted Woods',
                    description: 'Mystical forest veiled in ethereal morning fog'
                },
                {
                    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
                    title: 'Guardian Giants',
                    description: 'Centuries-old trees standing as nature\'s sentinels'
                },
                {
                    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
                    title: 'Whispering Trails',
                    description: 'Serene pathways winding through ancient woodland'
                },
                {
                    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
                    title: 'Autumn Symphony',
                    description: 'A riot of golden and crimson leaves dancing in the breeze'
                },
                {
                    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
                    title: 'Crystal Waters',
                    description: 'Pure mountain streams meandering through dense forest'
                },
                {
                    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
                    title: 'Emerald Carpet',
                    description: 'Velvety moss creating nature\'s softest floor'
                }
            ],
            books: [
                {
                    url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
                    title: 'Timeless Wisdom',
                    description: 'Ancient leather-bound volumes holding centuries of knowledge'
                },
                {
                    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
                    title: 'Pages of Discovery',
                    description: 'Open books revealing worlds of imagination and truth'
                },
                {
                    url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
                    title: 'Literary Treasures',
                    description: 'A rainbow of book spines containing endless stories'
                },
                {
                    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
                    title: 'Sanctuary of Words',
                    description: 'Peaceful reading spaces where minds find refuge'
                },
                {
                    url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
                    title: 'Sacred Scrolls',
                    description: 'Precious manuscripts preserving human history and culture'
                },
                {
                    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
                    title: 'Knowledge Haven',
                    description: 'Modern temples of learning with warm, inviting atmospheres'
                }
            ],
            rivers: [
                {
                    url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&h=400&fit=crop',
                    title: 'Alpine Springs',
                    description: 'Pure mountain waters dancing over polished stones'
                },
                {
                    url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&h=400&fit=crop',
                    title: 'Serpentine Flow',
                    description: 'Graceful rivers carving their path through valleys'
                },
                {
                    url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&h=400&fit=crop',
                    title: 'Thundering Falls',
                    description: 'Mighty waterfalls plunging into misty depths below'
                },
                {
                    url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&h=400&fit=crop',
                    title: 'Raging Rapids',
                    description: 'Wild whitewater churning through rugged canyon walls'
                },
                {
                    url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&h=400&fit=crop',
                    title: 'Mirror Waters',
                    description: 'Still pools reflecting the sky like perfect mirrors'
                },
                {
                    url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&h=400&fit=crop',
                    title: 'Valley Serenade',
                    description: 'Broad rivers singing their eternal song through landscapes'
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
        // Set the current category and display corresponding images
        this.currentCategory = category;
        const gallery = document.getElementById('gallery');
        const galleryTitle = document.getElementById('gallery-title');
        const backBtn = document.getElementById('back-btn');

        // Log category change for debugging
        console.log(`Switching to category: ${category}`);
        console.log(`Available images for ${category}:`, this.images[category]?.length || 0);

        // Update UI with category-specific title
        galleryTitle.textContent = this.getCategoryTitle(category);
        backBtn.style.display = 'flex';

        // Show loading animation
        this.showLoading();

        // Simulate loading delay for better UX, then display category-specific images
        setTimeout(() => {
            this.displayImages(category);
        }, 500);
    }

    getCategoryTitle(category) {
        const titles = {
            nature: 'Nature Landscapes',
            forests: 'Mystical Forests',
            books: 'Knowledge & Wisdom',
            rivers: 'Flowing Waters'
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
        // Display images for the selected category
        // This method retrieves images from the category-specific image database
        const gallery = document.getElementById('gallery');
        const images = this.images[category] || []; // Get images for the specific category

        if (images.length === 0) {
            gallery.innerHTML = `
                <div class="welcome-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>No images available for this category</p>
                </div>
            `;
            return;
        }

        // Create HTML for each image in the category
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
                <img src="${imageUrl}" alt="${title}" style="width: 100%; height: auto; max-height: 70vh; object-fit: cover;">
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
            <div style="padding: 20px;">
                <h3 style="margin: 0 0 10px 0; color: #1f2937;">${title}</h3>
                <p style="margin: 0; color: #6b7280;">${description}</p>
            </div>
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
