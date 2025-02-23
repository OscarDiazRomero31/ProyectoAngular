import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  eliminarDeFavoritos(cocktail: any) {
    this.favorites = this.favorites.filter(fav => fav.idDrink !== cocktail.idDrink);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
