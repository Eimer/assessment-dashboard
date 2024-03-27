import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ApiService} from "../../services/api.service";
import {Observable, tap} from "rxjs";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    private _dashboardData$: Observable<any> = this._initData$();
    private _barData$: Observable<any> = this._initBarData$();
    private dashboardId!: number
    public user = this._userService.userInfo;
    public isBar = false;

    constructor(
        private _userService: UserService,
        private _apiService: ApiService,
    ) {
    }


    ngOnInit() {
    }

    private _initData$(): Observable<any> {
        return this._apiService.getDashboardData().pipe(
            tap( (response) => {
                console.log(response[0].id);
                this.dashboardId = response.id;
            })
        )
    }

    private _initBarData$(): Observable<any> {
        return this._apiService.getBarData(this.dashboardId).pipe(
            tap((e) => {
                this.isBar = true;
            })
        )
    }

    public toggleBar() {
        this.isBar = !this.isBar
    }

    get dashboardData$(): Observable<any> {
        return this._dashboardData$
    }

    get barData$(): Observable<any> {
        return this._barData$
    }

}
