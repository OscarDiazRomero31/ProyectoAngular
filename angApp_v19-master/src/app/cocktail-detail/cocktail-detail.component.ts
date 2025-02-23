import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CocktailService } from '../cocktail.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cocktail-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocktail-detail.component.html',
  styleUrls: ['./cocktail-detail.component.css'],
})
export class CocktailDetailComponent implements OnInit {
  cocktail: any;

  constructor(
    private cocktailService: CocktailService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cocktailService.obtenerCocktailPorId(id).subscribe((data: any) => {
        this.cocktail = data.drinks[0];
      });
    }
  }

  getIngredients(): string[] {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      if (this.cocktail[`strIngredient${i}`]) {
        ingredients.push(this.cocktail[`strIngredient${i}`]);
      }
    }
    return ingredients;
  }
  
}
