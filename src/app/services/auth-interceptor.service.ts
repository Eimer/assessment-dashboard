import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private _user: UserService
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = this._user.userInfo?.token ? req.clone({
      headers: req.headers.set(
        'X-Token',
        this._user.userInfo.token
      ),
    }) : req;
    return next.handle(authReq).pipe(
      tap(
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401)
              console.error('Unauthorized');
          }
        }
      )
    );
  }
}

