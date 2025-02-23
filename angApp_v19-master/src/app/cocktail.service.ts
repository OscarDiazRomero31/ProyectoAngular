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

  buscarCocktailsAlcoholicos(tipo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/filter.php?a=${tipo}`);
  }

  obtenerCocktailPorId(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lookup.php?i=${id}`);
  }
}
