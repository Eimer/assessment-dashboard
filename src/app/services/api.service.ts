import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const domainUrl = 'https://user-assessment-api.vercel.app/';
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

  public getDashboardData(options?: object) {
    return this.get(`${domainUrl}api/userassessments`, options)
  }

  public getBarData(id :number) {
    return this.get(`${domainUrl}api/userassessments/graph/?${id}`)
  }
}
