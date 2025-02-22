import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrousel',
  imports: [CommonModule],  // Importa CommonModule
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent {
  @Input() cocktails: any[] = []; // Recibimos las imágenes de cócteles desde el componente padre
}
