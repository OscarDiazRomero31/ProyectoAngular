import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private apiUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1/';

  constructor(private http: HttpClient) {}

  // Método para obtener cócteles aleatorios
  getRandomCocktails(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}random.php`);
  }
}
