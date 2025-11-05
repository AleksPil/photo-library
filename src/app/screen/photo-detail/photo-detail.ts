import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {PhotoService} from '../../services/photo';
import {FavoriteService} from '../../services/favorite';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-photo-detail',
  imports: [
    MatButton
  ],
  templateUrl: './photo-detail.html',
  styleUrl: './photo-detail.scss',
})
export class PhotoDetail implements OnInit, OnDestroy, AfterViewInit {
  photo:any;

  constructor(private photoService: PhotoService,
              private favoritesService: FavoriteService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  remove(id: string) {
    this.favoritesService.removePhoto(id);
  }

  ngOnDestroy() {

  }
}
