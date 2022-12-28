/* ---------- Imports ---------- */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  /* ---------- Headers Options ---------- */
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bear ' + localStorage.getItem('Token'),
    }),
    params: new HttpParams().append('count', 255),
  };

  constructor(private http: HttpClient) {}

  /**
   * Lods countries
   * @returns
   */
  loadCountries() {
    return this.http.get(
      environment.urlAddress + 'countries',
      this.httpOptions
    );
  }
}
