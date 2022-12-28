/* ---------- Imports ---------- */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * Check log in
   * @param UserName
   * @param Password
   * @returns
   */
  login(credentials: any) {
    return this.http.post(
      environment.urlAddress + 'account/login',
      credentials
    );
  }
}
