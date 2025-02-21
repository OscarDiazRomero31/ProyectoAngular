import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../cocktail.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  cocktails: any[] = [];
  projectDescription: string = "Bienvenido a nuestro buscador de cócteles. Aquí puedes encontrar recetas, imágenes y todo lo que necesitas para disfrutar de deliciosos cócteles.";

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.getRandomCocktailImages();
  }

  getRandomCocktailImages(): void {
    this.cocktailService.getCocktailsByName("random").subscribe(data => {
      this.cocktails = data.drinks; // Ajusta según la respuesta de tu API
    });
  }
}
