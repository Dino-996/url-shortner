import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ShortUrl {
  originalUrl: string;
  shortId: string;
  createdAt: string;
  visitCount: number;
}

@Injectable({
  providedIn: 'root'
})

export class ShortnerApiRest {

  private http = inject(HttpClient);

  readonly baseUrl = 'https://as.up.railway.app';

  public createShortUrl(originalUrl: string): Observable<ShortUrl> {
    return this.http.post<ShortUrl>(`${this.baseUrl}/api/shorten`, { originalUrl });
  }

  public getShortUrls(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.baseUrl}/api/length`);
  }

  public getShortUrlById(shortId: string): Observable<ShortUrl> {
    return this.http.get<ShortUrl>(`${this.baseUrl}/api/${shortId}`);
  }

  public getStatsById(shortId: string): Observable<{ originaUrl: string, visitCount: number }> {
    return this.http.get<{ originaUrl: string, visitCount: number }>(`${this.baseUrl}/api/stats/${shortId}`);
  }

  public getAllUrl(): Observable<ShortUrl[]> {
    return this.http.get<ShortUrl[]>(`${this.baseUrl}/api/urls`);
  }

}