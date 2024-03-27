import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {HandleResponseService} from "../../services/handle-response.service";
import {catchError, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.scss']
})

export class AuthUserComponent {

  /**
   * Form to manage user fields
   */
  public authForm!: FormGroup;

  public isAuthEnabled = true;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _responseHandler: HandleResponseService,
    private _router: Router,
  ) {
    this.initAuthForm();
  }

  private getFieldControl(name: string) {
    return this.authForm.get(name);
  }

  private initAuthForm() {
    this.authForm = this._fb.group(
      {
        email: [null, [Validators.required, Validators.maxLength(255), Validators.minLength(3)]],
        password: [null, [Validators.required, Validators.minLength(6)]],
      }
    )
  }

  private applyFormErrors(loginError: boolean = false, passError: boolean = false) {
    console.log(this.authForm)
    if (this.authForm.invalid || loginError || passError) {
      this.authForm.setErrors({
        email: loginError || !!this.getFieldControl('email')?.errors || false,
        password: passError || !!this.getFieldControl('password')?.errors || false
      })
    }
  }

  public authUser() {
    this.applyFormErrors();
    if (!this.authForm.errors) {
      this.isAuthEnabled = false;
      this._userService.login(this.authForm.value).pipe(
        tap((response: User) => {
          this._userService.initUser(response);
          this._router.navigateByUrl('/home');
          this.isAuthEnabled = true;
        }),
        catchError((error) => {
          this.applyFormErrors(true, true);
          this.isAuthEnabled = true;
          return of(error);
        })
      ).subscribe();
    }
  }
}
