import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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

  /**
   * Set errors if something wrong or set custom errors
   *
   * @param loginError
   * @param passError
   */
  private applyFormErrors(loginError: boolean = false, passError: boolean = false) {
    if (this.authForm.invalid || loginError || passError) {
      this.authForm.setErrors({
        email: loginError || !!this.getFieldControl('email')?.errors || false,
        password: passError || !!this.getFieldControl('password')?.errors || false
      })
    }
  }

  /**
   * Triggers when user try to log in
   */
  public authUser() {
    if (!this.authForm.errors || (!this.authForm.errors['email'] && !this.authForm.errors['password'])) {
      this.isAuthEnabled = false;
      this._userService.login(this.authForm.value).pipe(
        tap((response: User) => {
          this._userService.initUser(response);
          this.isAuthEnabled = true;
        }),
        tap( () => this._router.navigateByUrl('/home')),
        catchError((error) => {
          this.applyFormErrors(true, true);
          this.isAuthEnabled = true;
          return of(error);
        })
      ).subscribe();
    }
  }
}
