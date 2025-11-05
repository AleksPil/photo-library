import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Photo } from '@models';

const STORAGE_KEY = 'photo_library_favorites'

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private map: Map<string, Photo> = new Map<string, Photo>();
  private sub:BehaviorSubject<Photo[]> = new BehaviorSubject<Photo[]>([])

  favorites$: Observable<Photo[]> = this.sub.asObservable()

  constructor() {
    this.load();
  }

  load() {
    try {
      const raw: string | null = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const array: Photo[] = JSON.parse(raw);
        array.forEach((photo: Photo) => this.map.set(photo.id, photo));
        this.sub.next(Array.from(this.map.values()));
      }
    } catch (e) {
      console.error(e);
    }
  }

  persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.map.values())));
  }

  addPhoto(photo: any) {
    this.map.set(photo.id, photo);
    this.sub.next(Array.from(this.map.values()))
    this.persist();
  }

  removePhoto(id: string) {
    this.map.delete(id);
    this.sub.next(Array.from(this.map.values()))
    this.persist();
  }

  isFavorite(id: string) {
    return this.map.has(id);
  }
}
