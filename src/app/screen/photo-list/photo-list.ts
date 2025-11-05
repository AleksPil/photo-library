import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PhotoService, FavoriteService } from '@services';
import { Photo } from '@models';
import { PhotoCard } from '../../component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-photo-list',
  imports: [
    PhotoCard,
    MatProgressSpinnerModule
  ],
  templateUrl: './photo-list.html',
  styleUrl: './photo-list.scss',
})
export class PhotoList implements OnInit, OnDestroy, AfterViewInit {
  photos: Photo[] = [];
  loading: boolean = false;
  page: number = 1;
  limit: number = 20;
  private obs?: IntersectionObserver;
  @ViewChild('anchor') anchor!: ElementRef<HTMLElement>;
  favSub?: Subscription;
  favIds: Set<string> = new Set<string>();


  constructor(private photoService: PhotoService,
              private favoritesService: FavoriteService) {
  }

  ngOnInit() {
    this.favSub = this.favoritesService.favorites$.subscribe((arr: Photo[]) =>{
      this.favIds = new Set(arr.map((item: Photo) => item.id));
    })
    this.load();
  }

  ngAfterViewInit() {
    this.setupObserver();
  }

  load(): void {
    if (this.loading) return
    this.loading = true;
    this.photoService.getPhotos(this.page, this.limit).subscribe((photos: Photo[]) => {
      this.photos = [...this.photos, ...photos];
      this.page++;
      this.loading = false;
    }, () => this.loading = false);
  }

  setupObserver() {
    if (this.obs) this.obs.disconnect();
    this.obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.loading) {
          this.load();
        }
      })
    }, {root: null, rootMargin: '200px', threshold: 0.1});
    if (this.anchor) {
      this.obs.observe(this.anchor.nativeElement);
    }
  }

  onCardClick(photo: Photo): void {
    if (!this.favoritesService.isFavorite(photo.id)) {
      this.favoritesService.addPhoto(photo);
    } else {
      this.favoritesService.removePhoto(photo.id);
    }
  }

  onToggle(photo: Photo): void {
    if (!this.favoritesService.isFavorite(photo.id)) {
      this.favoritesService.addPhoto(photo);
    } else {
      this.favoritesService.removePhoto(photo.id);
    }
  }

  trackById(i: number, p: Photo): string {
    return p.id
  }

  ngOnDestroy() {
    this.favSub?.unsubscribe();
    this.obs?.disconnect();
  }
}
