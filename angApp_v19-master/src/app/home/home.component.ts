import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../cocktail.service';
import { CarrouselComponent } from '../carrousel/carrousel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CarrouselComponent],  // Importa CarrouselComponent
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cocktails: any[] = [];

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.getRandomCocktails();  // Llamamos al método para obtener cócteles aleatorios
  }

  getRandomCocktails() {
    this.cocktailService.getRandomCocktails().subscribe({
      next: (response) => {
        this.cocktails = response.drinks.slice(0, 5); // Solo mostramos 5 cócteles para el carrusel
      },
      error: (error) => {
        console.error('❌ Error al obtener cócteles:', error);
      },
    });
  }
}
