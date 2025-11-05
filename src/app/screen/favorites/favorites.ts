import { Component } from '@angular/core';
import { PhotoCard } from '../../component/photo-card/photo-card';
import { PhotoService } from '../../services/photo';
import { FavoriteService } from '../../services/favorite';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [
    PhotoCard,
    AsyncPipe
  ],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class Favorites {
  favorites$!: Observable<any>;

  constructor(private photoService: PhotoService,
              private favoritesService: FavoriteService,
              private router: Router) {
    this.favorites$ = this.favoritesService.favorites$;
  }

  open(p:any) {
    this.router.navigate(['/photos', p.id]);
  }

  removeFavorite(p: any) {
    this.favoritesService.removePhoto(p.id);
  }
}
