import { Injectable } from '@angular/core';
import { Photo } from '../models/Photo';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {

  getPhotos(page: number = 1 ,limit: number = 20): Observable<Photo[]> {
    const photos: Photo[] = Array.from({length: limit}).map((_:unknown, idx: number) => {
      const seed: number = Math.floor(Math.random() * 1000000);
      const id: string = `${page}-${idx}-${seed}`;
      return {
        id,
        author: `Autor ${seed % 100}`,
        width: 600,
        height: 600,
        url: `https://picsum.photos/seed/${seed}/200/300`,
        download_url: `https://picsum.photos/seed/${seed}/200/300`,
        seed
      }
    });
    const ms: number = 200 + Math.floor(Math.random() * 100)
    console.log('photos', photos)
    return of(photos).pipe(delay(ms));
  }

  getPhotoById(id: number): any {

  }
}
