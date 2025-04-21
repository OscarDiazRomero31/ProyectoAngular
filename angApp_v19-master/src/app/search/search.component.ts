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
  busquedaGeneral: string = '';
  tipo: string = '';
  busquedaRealizada: boolean = false;
  abecedario: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {}

  async buscarCocktails() {
    this.busquedaRealizada = true;
    const termino = this.busquedaGeneral.trim();

    // ✅ Si no se escribió nada pero se seleccionó un tipo (alcohólico o no)
    if (!termino && this.tipo) {
      if (this.tipo === 'Alcoholic') {
        this.cocktailService.buscarCocktailsAlcoholicos().subscribe((data: any) => {
          this.cocktails = data?.drinks || [];
        });
      } else if (this.tipo === 'Non_Alcoholic') {
        this.cocktailService.buscarCocktailsNoAlcoholicos().subscribe((data: any) => {
          this.cocktails = data?.drinks || [];
        });
      }
      return;
    }

    // ❌ Si no hay ni término ni tipo, vaciamos
    if (!termino && !this.tipo) {
      this.cocktails = [];
      return;
    }

    // 🔍 Si hay término, buscar por nombre, ingrediente y letra
    const observables = [
      this.cocktailService.buscarCocktailPorNombre(termino),
      this.cocktailService.buscarCocktailPorIngrediente(termino),
      termino.length === 1 ? this.cocktailService.buscarCocktailPorLetra(termino) : null
    ].filter(Boolean);

    let resultados: any[] = [];

    try {
      const respuestas = await Promise.all(
        observables.map(obs =>
          obs!.toPromise().then((data: any) => data?.drinks || [])
        )
      );

      const combinados = respuestas.flat();
      const unicos = combinados.filter(
        (drink, index, self) =>
          index === self.findIndex(d => d.idDrink === drink.idDrink)
      );

      // 🧪 Filtrar por tipo si se seleccionó
      if (this.tipo) {
        const tipoFormateado = this.tipo === 'Non_Alcoholic' ? 'Non alcoholic' : 'Alcoholic';
        this.cocktails = unicos.filter(c => c.strAlcoholic === tipoFormateado);
      } else {
        this.cocktails = unicos;
      }
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      this.cocktails = [];
    }
  }

  buscarPorLetra(letra: string) {
    this.busquedaGeneral = letra; // opcional: mostrar la letra seleccionada en el input
    this.busquedaRealizada = true;
  
    this.cocktailService.buscarCocktailPorLetra(letra).subscribe((data: any) => {
      const lista = data?.drinks || [];
  
      if (this.tipo) {
        const tipoFormateado = this.tipo === 'Non_Alcoholic' ? 'Non alcoholic' : 'Alcoholic';
        this.cocktails = lista.filter((c: any) => c.strAlcoholic === tipoFormateado);
      } else {
        this.cocktails = lista;
      }
    });
  }
  

  agregarAFavoritos(cocktail: any) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.some((fav: any) => fav.idDrink === cocktail.idDrink)) {
      favorites.push(cocktail);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    this.cocktails = [...this.cocktails];
  }

  esFavorito(cocktail: any): boolean {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some((fav: any) => fav.idDrink === cocktail.idDrink);
  }
}
