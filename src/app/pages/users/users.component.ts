import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersListComponent implements OnInit {

  //#region [Properties]
  public usersData: User[] = [];
  public filterValue: string = '';
  //#endregion

  //#region [Table properties]
  public columns = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: User) => `${element.name}`,
    },
    {
      columnDef: 'username',
      header: 'Username',
      cell: (element: User) => `${element.username}`,
    },
    {
      columnDef: 'phone',
      header: 'Phone',
      cell: (element: User) => `${element.phone}`,
    },
  ];
  public displayedColumns = this.columns.map(c => c.columnDef);
  //#endregion

  constructor(private readonly _usersService: UsersService) { }

  ngOnInit(): void {
    this._getUsersData();
  }

  //#region [Prepare]
  private _getUsersData(): void {
    this._usersService.getUsers()
      .subscribe(res => {
        this.usersData = res;
      });
  }
  //#endregion

  //#region [User selection]
  public isUserSelected(id: number): boolean {
    return this._usersService.userIdSelected === id;
  }

  public onSelectUser(id: number): void {
    this._usersService.userIdSelected = id;
  }
  //#endregion

  //#region [Filter]
  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
  }
  //#endregion
}
