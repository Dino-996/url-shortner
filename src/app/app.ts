import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ShortnerApiRest } from './services/shortner-api-rest';
import { ContentCard } from './components/content-card/content-card';
import { ShortnedCard } from './components/shortned-card/shortned-card';
import { ShortUrl } from './services/shortner-api-rest';

@Component({
  selector: 'app-root',
  imports: [
    ContentCard,
    ShortnedCard
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {

  private shortnerServiceApiRest = inject(ShortnerApiRest);

  public readonly urlsCounter = signal<number>(0);
  public readonly clickCounter = signal<number>(0);

  public ngOnInit(): void {
    this.initCounter();
  }

  public initCounter(): void {
    this.shortnerServiceApiRest.getAllUrl().subscribe({
      next: (urls: ShortUrl[]) => {
        this.urlsCounter.set(urls.length);
        const counter = urls.reduce((increment, url) => increment + url.visitCount, 0);
        this.clickCounter.set(counter);
      },
      error: (error) => {
        console.error("Errore nel recupero degli URL:", error);
        // fallback
        this.urlsCounter.set(0);
        this.clickCounter.set(0);
      }
    });

  }
}
