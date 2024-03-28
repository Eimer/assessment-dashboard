import {Injectable} from '@angular/core';
import {User} from "../interfaces/user";
import {ApiService} from "./api.service";
import {Observable, of, ReplaySubject, Subject} from "rxjs";
import {Router} from "@angular/router";

const domainUrl = 'https://user-assessment-api.vercel.app/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user!: User;
  public storage = window.localStorage

  constructor(
    private api: ApiService,
    private _router: Router
  ) {
  }

  /**
   * Init user data to object and set
   *
   * @param data
   */
  public initUser(data: User) {
    this._user = data || {};
    this._setLoginDataToCache()
  }

  /**
   * Get user data from cache if user already logged in
   */
  public get userInfo(): User {
    const user = this.storage.getItem('user') || '';
    return user.length ? JSON.parse(user) : this._user;
  }

  public login(options: object) {
    return this.api.post(`${domainUrl}api/login`, options);
  }

  /**
   * Set user data to cache when user is logging in
   */
  private _setLoginDataToCache() {
    this.storage.removeItem('user');
    this.storage.setItem('user', JSON.stringify(this.userInfo));
    document.cookie = `isAuth=true; max-age=3600`
  }

  /**
   * Check if user is already logged in
   */
  public get isLogin() {
    return document.cookie.split(';').includes('isAuth=true');
  }

  /**
   * Logout user and clear cache
   */
  public logout() {
    this.storage.removeItem('user');
    document.cookie = `isAuth=true; max-age=0`;
    this._router.navigateByUrl('/login');
  }
}
