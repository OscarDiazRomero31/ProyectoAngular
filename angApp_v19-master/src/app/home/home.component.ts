import { Component } from '@angular/core';
import { CocktailService } from '../cocktail.service';
import { RandomImagesComponent } from '../random-images/random-images.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RandomImagesComponent],  
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

}
