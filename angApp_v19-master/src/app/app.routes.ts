import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { ContactoComponent } from './contacto/contacto.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'favoritos', component: FavoritosComponent},
    {path: 'buscador', component: BuscadorComponent},
    {path: 'contacto', component: ContactoComponent},
  ];
  
