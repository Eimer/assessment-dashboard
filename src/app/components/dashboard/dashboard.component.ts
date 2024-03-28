import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {ApiService} from "../../services/api.service";
import {filter, Observable, tap} from "rxjs";
import {Bar, Dashboard} from "../../interfaces/dashboard";
import Chart from 'chart.js/auto';
import {Users} from "../../interfaces/users";

export enum usersFields {
  NAME = 'name',
  LAST_NAME = 'last name',
  DATE_OF_BIRTH = 'date of birth',
  ROLE = 'role',
  POSITION = 'position'
}

export enum userRoles {
  USER = 'User',
  ADMIN = 'Admin'
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{

  private _dashboardData$: Observable<Dashboard[]> = this._initData$();
  private _barData$!: Observable<Bar>;
  private _usersInfo!: Observable<Users[]>;
  public user = this._userService.userInfo;
  public isBar = false;
  public chart!: Chart;
  public isAdminSection = false;

  constructor(
    private _userService: UserService,
    private _apiService: ApiService,
  ) {
  }

  private _initData$(): Observable<Dashboard[]> {
    return this._apiService.getDashboardData().pipe(
      filter(response => !!response)
    )
  }

  private _initBarData$(dashboardId: number): Observable<Bar> {
    return this._apiService.getBarData(dashboardId).pipe(
      filter(response => !!response),
      tap(response => this.createBarChart(response))
    )
  }

  /**
   * Toggle bar state and get data for chart
   *
   * @param dashboardId
   */
  public toggleBar(dashboardId: number = 0) {
    this.isBar = !this.isBar
    if (this.isBar) {
      this._barData$ = this._initBarData$(dashboardId);
    }
  }

  private createBarChart(data: Bar) {
    const config: any = {
      type: data.type,
      data: {
        labels: Object.keys(data.data),
        datasets: [
          {
            label: "Info",
            data: Object.values(data.data),
            backgroundColor: 'lightblue'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    }
    setTimeout(() => {
      this.chart = new Chart('BarChart', config);
    }, 0)

  }

  private _getUsers(): Observable<Users[]> {
    return this._apiService.getUsers().pipe(
      filter(response => !!response && response.length)
    )
  }

  /**
   * Toggle admin section to display data for Admin
   *
   * @param dashboardId
   */
  public toggleSection(status: boolean = false) {
    this.isAdminSection = status;
    if (this.isAdminSection) {
      this._usersInfo = this._getUsers();
    }
  }

  get dashboardData$(): Observable<Dashboard[]> {
    return this._dashboardData$
  }

  get barData$(): Observable<Bar> {
    return this._barData$
  }

  get usersInfo(): Observable<Users[]> {
    return this._usersInfo;
  }

  protected readonly usersFields = usersFields;
  protected readonly userRoles = userRoles;
}
