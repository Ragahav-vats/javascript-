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
