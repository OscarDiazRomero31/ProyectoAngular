import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';  // URL base de la API

  constructor(private http: HttpClient) {}

  // Obtener un cóctel aleatorio
  getRandomCocktail(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}random.php`);
  }

  // Buscar cócteles por nombre
  searchCocktailByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}search.php?s=${name}`);
  }
}
