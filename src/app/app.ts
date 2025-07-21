import { Component, inject, OnInit, signal } from '@angular/core';
import { Overlay } from './components/overlay/overlay';
import { ShortnerApiRest } from './services/shortner-api-rest';
import { ContentCard } from './components/content-card/content-card';

@Component({
  selector: 'app-root',
  imports: [
    Overlay,
    ContentCard
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {

  private shortnerServiceApiRest = inject(ShortnerApiRest);

  public readonly urlsCount = signal<number>(0);
  public readonly clickCount = signal<number>(0); // bisogna creare un api ad-hoc per il click count

  public ngOnInit(): void {
    this.getShortUrls();
  }

  public getShortUrls(): void {
    this.shortnerServiceApiRest.getShortUrls().subscribe(({ total }) => {
      this.urlsCount.set(total);
    });
  }

}
