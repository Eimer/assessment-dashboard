import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {HandleResponseService} from "../../services/handle-response.service";
import {tap} from "rxjs";


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

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _responseHandler: HandleResponseService,
  ) {
    this.initAuthForm();
  }

  private getFieldControl(name: string) {
    return this.authForm.get(name);
  }

  private initAuthForm() {
    this.authForm = this._fb.group(
      {
        email: [null, [Validators.required, Validators.maxLength(255)]],
        password: [null, [Validators.required, Validators.maxLength(12)]],
      }
    )
  }

  private applyFormErrors() {
    if (this.authForm.invalid) {
      this.authForm.setErrors({
        login: !!this.getFieldControl('login')?.errors || false,
        password: !!this.getFieldControl('password')?.errors || false
      })
    }

  }

  public authUser() {
    this.applyFormErrors();
    if (!this.authForm.errors) {
      this._apiService.login(this.authForm.value).pipe(
        tap((response: any) => {
          this._responseHandler.handleResponseStatus(response.status)
        }),
      ).
      subscribe( (e: any) => {
        console.log(e);
      })
    }
  }
}
