import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // ✅ Aseguramos que map() esté importado

@Injectable({
  providedIn: 'root', // Esto hace que el servicio esté disponible en toda la aplicación
})
export class CocktailService {
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Obtener un cóctel aleatorio
  getRandomCocktail(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'random.php');
  }

  // Buscar cócteles por nombre
  searchCocktailByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}search.php?s=${name}`);
  }

  // Buscar cócteles por la primera letra
  searchCocktailByFirstLetter(letter: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}search.php?f=${letter}`);
  }

  // Buscar cócteles por ingrediente
  searchCocktailByIngredient(ingredient: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}filter.php?i=${ingredient}`);
  }

  // Obtener detalles completos de un cóctel por su ID
  getCocktailById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}lookup.php?i=${id}`);
  }

  // Obtener categorías de cócteles
  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}list.php?c=list`);
  }

  // Obtener los cristales de cócteles
  getGlasses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}list.php?g=list`);
  }

  // Obtener ingredientes de cócteles
  getIngredients(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}list.php?i=list`);
  }

  // Obtener cócteles alcohólicos o no alcohólicos
  getCocktailsByAlcoholicType(type: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}filter.php?a=${type}`);
  }
}
