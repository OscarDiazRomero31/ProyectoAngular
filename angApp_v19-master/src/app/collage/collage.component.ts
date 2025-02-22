import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../cocktail.service'; // Importar el servicio
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collage',
  imports: [CommonModule],
  templateUrl: './collage.component.html',
  styleUrls: ['./collage.component.css']
})
export class CollageComponent implements OnInit {
  cocktails: any[] = [];  // Lista para almacenar los cócteles

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.getRandomCocktails();  // Llamamos al método para obtener cócteles aleatorios
  }

  // Método para obtener 2 cócteles aleatorios
  getRandomCocktails() {
    this.cocktailService.getRandomCocktail().subscribe({
      next: (response) => {
        this.cocktails = response.drinks.slice(0, 2);  // Obtener solo 2 cócteles
      },
      error: (error) => {
        console.error('Error al obtener cócteles:', error);
      }
    });
  }

  // Método para recargar las imágenes
  reloadImages() {
    this.getRandomCocktails();  // Vuelve a obtener los cócteles aleatorios
  }
}
