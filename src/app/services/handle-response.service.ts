import {inject, Inject, Injectable, InjectionToken, Optional} from '@angular/core';
import {Router} from "@angular/router";
import {RESPONSE} from "@nguniversal/express-engine/tokens";

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum HttpStatusText {
  FORBIDDEN = 'Forbidden',
  NOT_FOUND = 'Not found',
  BAD_REQUEST = 'BAD_REQUEST',
  OK = 'OK'
}

@Injectable({
  providedIn: 'root'
})
export class HandleResponseService {

  constructor(
    @Optional() @Inject(RESPONSE) private _response: any,
    private _router: Router
  ) { }


  /**
   * Set response status
   * @param code
   * @param message
   */
  public setStatus(code: number, message: string): void {
    if (this._response) {
      this._response.statusCode = code;
      this._response.statusMessage = message;
    }
  }

  /**
   * Handle response status from CMS and set response status from Universal
   * @param status
   * @param redirectUrl
   */
  public handleResponseStatus(status: any, redirectUrl = '/') {
    if (status === HttpStatus.BAD_REQUEST) {
      this.setStatus(status, HttpStatusText.BAD_REQUEST);
      this._router.navigateByUrl('not-found', {
        replaceUrl: true
      }).then();
    }
    if (status === HttpStatus.NOT_FOUND) {
      this.setStatus(status, HttpStatusText.NOT_FOUND);
      this._router.navigateByUrl('not-found', {
        replaceUrl: true
      }).then();
    }
    if (status === HttpStatus.FORBIDDEN) {
      this.setStatus(status, HttpStatusText.FORBIDDEN);
      this._router.navigateByUrl('not-found', {
        replaceUrl: true
      }).then();
    }
  }
}
