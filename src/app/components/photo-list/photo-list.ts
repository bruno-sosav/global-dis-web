import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Photo } from '../../models/photo';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './photo-list.html',
  styleUrls: ['./photo-list.css']
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  newPhoto: Photo = this.createEmptyPhoto();
  selectedPhoto: Photo | null = null;
  isEditing = false;
  loading = false;

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.loadPhotos();
  }

  // 1. Obtener y mostrar listado
  loadPhotos(): void {
    this.loading = true;
    this.photoService.getPhotos().subscribe({
      next: (data) => {
        this.photos = data.slice(0, 10);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading photos:', error);
        this.loading = false;
      }
    });
  }

  // 2. Agregar nuevo objeto (usando tfoot)
  addPhoto(): void {
    if (this.newPhoto.title && this.newPhoto.url && this.newPhoto.thumbnailUrl) {
      const photoToAdd = {
        ...this.newPhoto,
        id: this.generateNewId()
      };

      this.photoService.addPhoto(photoToAdd).subscribe({
        next: (photo) => {
          this.photos.unshift(photo);
          this.newPhoto = this.createEmptyPhoto();
          alert('Foto agregada exitosamente');
        },
        error: (error) => {
          console.error('Error adding photo:', error);
          photoToAdd.id = this.generateNewId();
          this.photos.unshift(photoToAdd);
          this.newPhoto = this.createEmptyPhoto();
          alert('Foto agregada (simulado)');
        }
      });
    }
  }

  // 3. Actualizar datos (con modal)
  editPhoto(photo: Photo): void {
    this.selectedPhoto = { ...photo };
    this.isEditing = true;
  }

  updatePhoto(): void {
    if (this.selectedPhoto) {
      this.photoService.updatePhoto(this.selectedPhoto).subscribe({
        next: (updatedPhoto) => {
          const index = this.photos.findIndex(p => p.id === updatedPhoto.id);
          if (index !== -1) {
            this.photos[index] = updatedPhoto;
          }
          this.closeModal();
          alert('Foto actualizada exitosamente');
        },
        error: (error) => {
          console.error('Error updating photo:', error);
          const index = this.photos.findIndex(p => p.id === this.selectedPhoto!.id);
          if (index !== -1) {
            this.photos[index] = { ...this.selectedPhoto! };
          }
          this.closeModal();
          alert('Foto actualizada (simulado)');
        }
      });
    }
  }

  // 4. Dar de baja objeto
  deletePhoto(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta foto?')) {
      this.photoService.deletePhoto(id).subscribe({
        next: () => {
          this.photos = this.photos.filter(photo => photo.id !== id);
          alert('Foto eliminada exitosamente');
        },
        error: (error) => {
          console.error('Error deleting photo:', error);
          this.photos = this.photos.filter(photo => photo.id !== id);
          alert('Foto eliminada (simulado)');
        }
      });
    }
  }

  closeModal(): void {
    this.isEditing = false;
    this.selectedPhoto = null;
  }

  private createEmptyPhoto(): Photo {
    return {
      albumId: 1,
      id: 0,
      title: '',
      url: '',
      thumbnailUrl: ''
    };
  }

  private generateNewId(): number {
    return Math.max(...this.photos.map(p => p.id), 0) + 1;
  }
}