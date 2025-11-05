import { Routes } from '@angular/router';
import { PhotoList } from './screen/photo-list/photo-list';
import { PhotoDetail } from './screen/photo-detail/photo-detail';
import { Favorites } from './screen/favorites/favorites';

export const routes: Routes = [
  { path: '', redirectTo: 'photos', pathMatch: 'full' },
  { path: 'photo', component: PhotoList },
  { path: 'photo/:id', component: PhotoDetail },
  { path: 'favorites', component: Favorites },
  { path: '**', redirectTo: 'photos' }
];
