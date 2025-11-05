import { Component, OnInit } from '@angular/core';
import { PhotoService, FavoriteService } from '@services';
import { MatButton } from '@angular/material/button';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-photo-detail',
  imports: [
    MatButton,
    AsyncPipe
  ],
  templateUrl: './photo-detail.html',
  styleUrl: './photo-detail.scss',
})
export class PhotoDetail implements OnInit {
  photo$!: Observable<any>;

  constructor(private photoService: PhotoService,
              private favoritesService: FavoriteService,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.photo$ = this.route.params.pipe(switchMap((p: Params) => this.photoService.getPhotoById(p['id'])))
  }

  remove(id: string) {
    this.favoritesService.removePhoto(id);
    this.router.navigate(['/favorites']);
  }
}
