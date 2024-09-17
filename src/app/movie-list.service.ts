import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {
  private apiKey = '7c8fc23a413953340f145f7e39707775';  // TMDb API Key
  private apiUrl = 'https://api.themoviedb.org/3/discover/movie';
  private genreUrl = 'https://api.themoviedb.org/3/genre/movie/list';  

  constructor(private http: HttpClient) {}

  getMovies(year: number, page: number, genres: number[], sortBy: string = 'popularity.desc'): Observable<any> {
    const genreFilter = genres.length ? `&with_genres=${genres.join(',')}` : '';
    const url = `${this.apiUrl}?api_key=${this.apiKey}&language=en-US&sort_by=${sortBy}&primary_release_year=${year}&page=${page}${genreFilter}`;
    return this.http.get<any>(url);
  }

  getGenres(): Observable<any> {
    return this.http.get<any>(`${this.genreUrl}?api_key=${this.apiKey}`);
  }
}
