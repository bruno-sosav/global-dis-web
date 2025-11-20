import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhotoListComponent } from './components/photo-list/photo-list'; // ← Agregar esta importación

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PhotoListComponent], // ← Agregar PhotoListComponent aquí
  template: `
    <div class="container mt-4">
      <h1 class="text-center mb-4">Sistema de Gestión de Fotos</h1>
      <app-photo-list></app-photo-list> <!-- ← Agregar el componente aquí -->
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
    }
  `]
})
export class App {
  title = 'recuperatorio-desarrollo-web';
}