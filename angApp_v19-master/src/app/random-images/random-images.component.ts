import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../cocktail.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-random-images',
  imports: [CommonModule],
  templateUrl: './random-images.component.html',
  styleUrls: ['./random-images.component.css']
})
export class RandomImagesComponent implements OnInit {
  images: string[] = [];  // Array para almacenar las URLs de las imágenes

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.loadRandomImages();
  }

  // Función para obtener 4 imágenes aleatorias
  loadRandomImages() {
    this.images = [];  // Limpiar las imágenes antes de cargar nuevas

    // Realizar 4 solicitudes para obtener imágenes aleatorias
    for (let i = 0; i < 4; i++) {
      this.cocktailService.getRandomCocktails().subscribe((data: any) => {
        this.images.push(data.drinks[0].strDrinkThumb);  // Almacenar la imagen
      });
    }
  }

  // Función que se ejecuta cuando el botón 'Recargar' es presionado
  reloadImages() {
    this.loadRandomImages();  // Cargar nuevas imágenes aleatorias
  }
}
