import { Routes } from '@angular/router';
import {
  PhotoList,
  PhotoDetail,
  Favorites } from './screen';


export const routes: Routes = [
  { path: '', redirectTo: 'photo', pathMatch: 'full' },
  { path: 'photo', component: PhotoList },
  { path: 'photos/:id', component: PhotoDetail },
  { path: 'favorites', component: Favorites },
  { path: '**', redirectTo: 'photo' }
];
