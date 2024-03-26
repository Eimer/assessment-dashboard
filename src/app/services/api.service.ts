import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  /**
   * GET request base implementation
   *
   * @param url
   * @param queryParams
   * @param options
   */
  get(url: string, options: object = {}): Observable<any> {
    const opts = {
      ...options,
    };

    return this.http.get(url, opts);
  }

  post(url: string, options: object = {}): Observable<any> {
    const opts = {
      ...options,
    };

    return this.http.post(url, opts);
  }

  login(options: object) {
    return this.post('https://user-assessment-api.vercel.app/api/login', options)
  }

}
