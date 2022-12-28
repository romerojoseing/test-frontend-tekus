/* ---------- Imports ---------- */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  /* ---------- Headers Options ---------- */
  httpOptions = {
    headers: new HttpHeaders({
      "Authorization": "Bear " + localStorage.getItem("Token")
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Lods subscribers
   * @returns
   */
  loadSubs(){
    return this.http.get(environment.urlAddress + 'subscribers', this.httpOptions);
  }

  /**
   * Lods subscribers
   * @param Id
   * @returns
   */
  loadSub(Id: number){
    return this.http.get(environment.urlAddress + 'subscribers/' + Id, this.httpOptions);
  }

  /**
   * Create subscriber
   * @param subscriber
   * @returns
   */
  createSub(subscriber: any){
    return this.http.post(environment.urlAddress + 'subscribers', subscriber, this.httpOptions);
  }

  /**
   * Update subscriber
   * @param subscriber
   * @returns
   */
  updateSub(subscriber: any){
    return this.http.put(environment.urlAddress + 'subscribers/' + subscriber.Id, subscriber, this.httpOptions);
  }

  /**
   * Delete subscribers
   * @param Id
   * @returns
   */
  deleteSub(Id: number){
    return this.http.delete(environment.urlAddress + 'subscribers/' + Id, this.httpOptions);
  }
}
