import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {ApiService} from "./api.service";
import {Observable, of, ReplaySubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user!: User;

  constructor(
      private api: ApiService
  ) { }

  public initUser(data: User) {
    this.user = data || {};
  }

  public get userInfo() {
     return this.user;
  }

  public login(options: object) {
    return this.api.post('https://user-assessment-api.vercel.app/api/login', options)
  }
}
