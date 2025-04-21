import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  buscarCocktailPorNombre(nombre: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search.php?s=${nombre}`);
  }

  buscarCocktailPorLetra(letra: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search.php?f=${letra}`);
  }

  buscarCocktailPorIngrediente(ingrediente: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/filter.php?i=${ingrediente}`);
  }

  buscarCocktailsAlcoholicos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/filter.php?a=Alcoholic`);
  }
  
  buscarCocktailsNoAlcoholicos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/filter.php?a=Non%20alcoholic`);
  }  

  obtenerCocktailPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lookup.php?i=${id}`);
  }

  getRandomCocktails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/random.php`);
  }

  buscarCocktailPorTipo(tipo: string) {
    return this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${tipo}`);
  }  
}
