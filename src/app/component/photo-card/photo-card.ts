import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard, MatCardActions, MatCardImage } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Photo } from '@models';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-photo-card',
  imports: [
    MatCard,
    MatCardActions,
    MatCardImage,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    NgStyle
  ],
  templateUrl: './photo-card.html',
  styleUrl: './photo-card.scss',
})
export class PhotoCard {
  @Input() photo!: Photo;
  @Input() isFav: boolean = false;
  @Output() click: EventEmitter<Photo> = new EventEmitter<Photo>();
  @Output() toggleEvent: EventEmitter<Photo> = new EventEmitter<Photo>();
  toggle(ec: Event): void {
    ec.stopPropagation();
    this.toggleEvent.emit(this.photo)
  }
}
