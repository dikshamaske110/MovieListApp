import { Component, HostListener, OnInit } from '@angular/core';
import { MovieListService } from '../movie-list.service';

@Component({
  selector: 'app-movie', 
  templateUrl: './movie.component.html',  
  styleUrls: ['./movie.component.css']  
})
export class MovieComponent implements OnInit {
  
  movies: any[] = [];  //  movies list
  currentYear = 2012;  // Default year 
  page = 1;  // Tracks the current page 
  loading = false;  // Boolean to track loading state (to prevent multiple requests at once)

  
  genres: any[] = [];  // Array to store available genres fetched from the API
  selectedGenres: number[] = [];  // Array to hold user-selected genre IDs for filtering
  selectedSort = 'popularity.desc';  // Default sorting by popularity

  
  selectedMovie: any = null;  // Stores the movie selected to show in the modal

 
  constructor(private movieService: MovieListService) {}

  
  ngOnInit() {
    this.loadGenres();  // Load the genres list when the component initializes
    this.loadMovies();  // Load movies for the default year and sort option when the component initializes
  }

  // load genres from the API
  loadGenres() {
    this.movieService.getGenres().subscribe(data => {
      this.genres = data.genres;  // Store the fetched genres in the `genres` array
    });
  }

  //  handles changes in genre filter
  onGenreChange(genreId: number) {
    const index = this.selectedGenres.indexOf(genreId);  // Find if the genre is already selected
    if (index === -1) {
      this.selectedGenres.push(genreId);  // If not selected, add it to the array
    } else {
      this.selectedGenres.splice(index, 1);  // If already selected, remove it from the array
    }
    this.page = 1;  // Reset the page to 1 since filters are applied
    this.movies = [];  // Clear the current movie list
    this.loadMovies();  // Fetch the filtered movie list
  }

  // sorting changes
  onSortChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;  // Get the selected option from the dropdown
    this.selectedSort = selectElement.value;  // Update the sort option based on user selection
    this.page = 1;  // Reset to the first page when the sort changes
    this.movies = [];  // Clear the current movie list
    this.loadMovies();  // Fetch movies based on the new sorting option
  }

  // open the modal with detailed information about a selected movie
  openModal(movie: any) {
    this.selectedMovie = movie;  // Store the selected movie data in `selectedMovie` for the modal
  }
  
  //  close the modal when the user dismisses it
  closeModal() {
    this.selectedMovie = null;  // Clear the `selectedMovie` to close the modal
  }

  // fetch movies from the API based on the current filters (year, genres, sort)
  loadMovies() {
    if (this.loading) return;  // If already loading, prevent another request

    this.loading = true;  // Set loading to true to indicate a request is being made
    console.log(`Loading movies for year ${this.currentYear}, page ${this.page}`);

    // Call the API with the current filters: year, page number, selected genres, and sorting option
    this.movieService.getMovies(this.currentYear, this.page, this.selectedGenres, this.selectedSort).subscribe(data => {
      console.log(`Movies loaded for year ${this.currentYear}:`, data);

      if (data.results && data.results.length > 0) {
        // If movies are returned, append them to the existing movie list
        this.movies = [...this.movies, ...data.results];
        console.log(`Updated movie list:`, this.movies);
      } else {
        // If no more movies, log a message
        console.log(`No more movies to load for year ${this.currentYear}.`);
      }
      
      this.loading = false;  // Set loading to false after the request completes
    }, (error) => {
      this.loading = false;  // Handle any error in the API call and reset loading state
      console.error('Error fetching movies:', error);
    });
  }

  // detect when the user scrolls the page
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;  // Current vertical scroll position
    const scrollHeight = document.documentElement.scrollHeight;  // Total scrollable height of the page
    const clientHeight = window.innerHeight;  // Visible height of the viewport

    // Scroll Down: If the user reaches near the bottom of the page, load the next page of movies
    if (scrollTop + clientHeight >= scrollHeight - 50 && !this.loading) {
      if (this.currentYear < new Date().getFullYear() || this.page > 1) {
        this.page++;  // Increment the page number to load more movies
        this.loadMovies();  // Fetch more movies on scroll down
      }
    }

    // Scroll Up: If the user scrolls near the top of the page, load the previous page of movies
    if (scrollTop <= 50 && !this.loading && this.page > 1) {
      this.page--;  // Decrement the page number to load older movies
      this.loadMovies();  // Fetch movies from the previous page on scroll up
    }
  }
}
