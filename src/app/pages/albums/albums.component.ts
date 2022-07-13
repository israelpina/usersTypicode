import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/models/album.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  //#region [Properties]
  public albumsData: Album[] = [];
  //#endregion

  //#region [Getters]
  public get userIdSelected(): string {
    return this._usersService.userIdSelected.toString();
  }
  //#endregion

  constructor(private readonly _usersService: UsersService) { }

  ngOnInit(): void {
    this._getAlbums();
  }

  //#region [Prepare]
  private _getAlbums(): void {
    this._usersService.getAlbumsByUser()
      .subscribe(res => {
        this.albumsData = res;
      });
  }
  //#endregion

  //#region [Change userSelected]
  public onUserIdSelected(userId: number): void {
    this._usersService.userIdSelected = userId;
    this._getAlbums();
  }
  //#endregion

}
