import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
import { SearchComponent } from './search/search.component';
import { CocktailDetailComponent } from './cocktail-detail/cocktail-detail.component';
import { FavoritesComponent } from './favorites/favorites.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'favorites', component: FavoritesComponent},
    {path: 'search', component: SearchComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'cocktail/:id', component: CocktailDetailComponent },

  ];
  
