import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    public userService: UserService
  ) {
  }

  public get isLogoutEnable() {
    return this.userService.isLogin
  }
}
