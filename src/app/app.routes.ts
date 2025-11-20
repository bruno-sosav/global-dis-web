import { Routes } from '@angular/router';
import { PhotoListComponent } from './components/photo-list/photo-list';

export const routes: Routes = [
  { path: '', component: PhotoListComponent },
  { path: '**', redirectTo: '' }
];