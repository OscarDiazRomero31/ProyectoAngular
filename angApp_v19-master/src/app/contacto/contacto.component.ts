import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contactoForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactoForm = this.fb.group({
      //FormBuilder para construir el formulario.
      //HttpClient para enviar datos.
      nombre: [ //Campo nombre.
        '',
        [
          Validators.required, //Requerido.
          Validators.minLength(3), //Minimo 3 Caracteres
          Validators.pattern('^[A-ZÁÉÍÓÚÑ][a-záéíóúñA-ZÁÉÍÓÚÑ ]*$')
        ] //Debe comenzar con mayusculas y permite tildes y espacios.
      ],
      correo: ['', [Validators.required, Validators.email]], //requerido y debe tener email vaildo.
      mensaje: ['', [Validators.required, Validators.minLength(10)]] //campo requerido y minimo 10 caracteres.
    });
  }

  onSubmit() {
    if (this.contactoForm.valid) {
      const formData = this.contactoForm.value;
      this.http.post('https://formspree.io/f/xnnjyzeq', formData).subscribe({
        next: (response) => {
          console.log('Formulario enviado correctamente', response);
          this.contactoForm.reset();
        },
        error: (error) => {
          console.error('Error al enviar el formulario', error);
        }
      });
    } else {
      this.contactoForm.markAllAsTouched();
    }
  }
}
