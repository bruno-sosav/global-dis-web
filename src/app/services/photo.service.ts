import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photo } from '../models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/photos';

  constructor(private http: HttpClient) { }

  // 1. Obtener todos los objetos
  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(this.apiUrl);
  }

  // 2. Agregar nuevo objeto
  addPhoto(photo: Photo): Observable<Photo> {
    return this.http.post<Photo>(this.apiUrl, photo);
  }

  // 3. Actualizar objeto
  updatePhoto(photo: Photo): Observable<Photo> {
    return this.http.put<Photo>(`${this.apiUrl}/${photo.id}`, photo);
  }

  // 4. Eliminar objeto
  deletePhoto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}