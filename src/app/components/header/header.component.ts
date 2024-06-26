import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private _userService: UserService
  ) {
  }

  public logout() {
    this._userService.logout();
  }
}
