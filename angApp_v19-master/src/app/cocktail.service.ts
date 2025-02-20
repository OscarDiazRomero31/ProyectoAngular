import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1'; // URL base de la API
  
  constructor(private http: HttpClient) { }

  // Metodos de la API

  // Método para obtener los cócteles por nombre
  getCocktailsByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search.php?s=${name}`);
  }

  // Método para obtener los cócteles por letra inicial
  getCocktailsByLetter(letter: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search.php?f=${letter}`);
  }

  // Método para obtener un cóctel por ID
  getCocktailById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/lookup.php?i=${id}`);
  }
}
