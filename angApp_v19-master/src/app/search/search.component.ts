import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../cocktail.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  cocktails: any[] = [];
  query: string = '';
  ingrediente: string = '';
  letter: string = '';

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {}

  // Función de búsqueda
  buscarCocktails() {
    // Búsqueda por nombre
    if (this.query) {
      this.cocktailService.buscarCocktailPorNombre(this.query).subscribe((data: any) => {
        this.cocktails = data.drinks || [];
      });
    } 
    // Búsqueda por ingrediente
    else if (this.ingrediente) {
      this.cocktailService.buscarCocktailPorIngrediente(this.ingrediente).subscribe((data: any) => {
        this.cocktails = data.drinks || [];
      });
    }
    // Búsqueda por letra
    else if (this.letter) {
      this.cocktailService.buscarCocktailPorLetra(this.letter).subscribe((data: any) => {
        this.cocktails = data.drinks || [];
      });
    }
    else {
      this.cocktails = [];
    }
  }

  agregarAFavoritos(cocktail: any) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.some((fav: any) => fav.idDrink === cocktail.idDrink)) {
      favorites.push(cocktail);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }
}
