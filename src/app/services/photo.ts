import { Injectable } from '@angular/core';
import { Photo } from '@models';
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
        url: `https://picsum.photos/seed/${seed}/600/800`,
        download_url: `https://picsum.photos/seed/${seed}/600/800`,
        seed
      }
    });
    const ms: number = 200 + Math.floor(Math.random() * 100)
    return of(photos).pipe(delay(ms));
  }

  getPhotoById(id: string): any {
    const parts: string[] = id.split('-');
    const seed: number = parts[2] ? Number(parts[2]) : Math.floor(Math.random() * 1000000);
    const photo = {
      id,
      author: `Autor ${seed % 100}`,
      url: `https://picsum.photos/seed/${seed}/1200/800`,
      download_url: `https://picsum.photos/seed/${seed}/1200/800`,
    };
    return of(photo).pipe(delay(200 + Math.floor(Math.random() * 100)));
  }
}
