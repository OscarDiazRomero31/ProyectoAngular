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
  images: string[] = [];  

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.loadRandomImages();
  }

  
  loadRandomImages() {
    this.images = []; 

    
    for (let i = 0; i < 4; i++) {
      this.cocktailService.getRandomCocktails().subscribe((data: any) => {
        this.images.push(data.drinks[0].strDrinkThumb);  
      });
    }
  }

  reloadImages() {
    this.loadRandomImages();  
  }
}
