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
  cocktails: any[] = []; //Almacena busqueda de cocteles.
  busquedaGeneral: string = ''; //Texto que introduce el usuario.
  tipo: string = ''; //Coctel con o sin.
  busquedaRealizada: boolean = false; //Si se ha echo busqueda o no, mostrar algun mensaje.
  abecedario: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); //Buscar cocteles pr letra.

  constructor(private cocktailService: CocktailService) {} //Servicio que se utiliza para hacer la busqueda.

  ngOnInit(): void {}

  async buscarCocktails() { //Campo de busqueda general.
    this.busquedaRealizada = true; //Se ha echo la busqueda?
    const termino = this.busquedaGeneral.trim(); //Esto elimina los espacion para que no haya error en la busqueda.

    if (!termino && this.tipo) { //Si no, busca por el tipo.
      if (this.tipo === 'Alcoholic') {
        this.cocktailService.buscarCocktailsAlcoholicos().subscribe((data: any) => {
          this.cocktails = data?.drinks || []; //Si es alcoholico, llama al servicio y muestra el resultado.
        });
      } else if (this.tipo === 'Non_Alcoholic') {
        this.cocktailService.buscarCocktailsNoAlcoholicos().subscribe((data: any) => {
          this.cocktails = data?.drinks || []; //Si NO es alcoholico, lo mismo.
        });
      }
      return;
    }

    if (!termino && !this.tipo) {
      this.cocktails = [];
      return; //Si no hay ni termino ni tipo pues limpia la lista.
    }

    const observables = [ //Crea una lista.
      this.cocktailService.buscarCocktailPorNombre(termino), //Nombre.
      this.cocktailService.buscarCocktailPorIngrediente(termino), //Ingrediente.
      termino.length === 1 ? this.cocktailService.buscarCocktailPorLetra(termino) : null //Letra y filtra los null.
    ].filter(Boolean);

    let resultados: any[] = [];

    try {
      const respuestas = await Promise.all(
        observables.map(obs =>
          obs!.toPromise().then((data: any) => data?.drinks || [])
        )
      );

      const combinados = respuestas.flat(); //Une todos los resultados en una lista (Array.
      const unicos = combinados.filter(
        (drink, index, self) =>
          index === self.findIndex(d => d.idDrink === drink.idDrink)
      ); //Elimina duplicados.

      if (this.tipo) {
        const tipoFormateado = this.tipo === 'Non_Alcoholic' ? 'Non alcoholic' : 'Alcoholic';
        this.cocktails = unicos.filter(c => c.strAlcoholic === tipoFormateado);
      } else {
        this.cocktails = unicos;
      } //Filtra por tipo si es que esta seleccinado, sino muestra todo
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      this.cocktails = [];
    }
  } //Captura y muestra errores, y limpia la lista si algo falla.

  buscarPorLetra(letra: string) {
    this.busquedaGeneral = letra; 
    this.busquedaRealizada = true;
  /*Método para buscar directamente por una letra
  (por ejemplo, al hacer clic en una letra del
  abecedario).*/
  
    this.cocktailService.buscarCocktailPorLetra(letra).subscribe((data: any) => {
      const lista = data?.drinks || []; //Llama al servicio para buscar por letra.
  
      if (this.tipo) {
        const tipoFormateado = this.tipo === 'Non_Alcoholic' ? 'Non alcoholic' : 'Alcoholic';
        this.cocktails = lista.filter((c: any) => c.strAlcoholic === tipoFormateado);
      } else {
        this.cocktails = lista;
      }
    });
  } //iltra por tipo si está seleccionado, o muestra todos.
  
  agregarAFavoritos(cocktail: any) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.some((fav: any) => fav.idDrink === cocktail.idDrink)) {
      favorites.push(cocktail);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    this.cocktails = [...this.cocktails];
  } //Añade al localstorage el coctel y controla si ya esta en favoritos para el estilo del boton.

  esFavorito(cocktail: any): boolean {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some((fav: any) => fav.idDrink === cocktail.idDrink);
  } //Comprueba si ya esta en favoritos, para controlarlo.
}
