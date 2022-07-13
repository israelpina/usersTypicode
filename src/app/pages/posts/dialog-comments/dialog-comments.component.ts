import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

interface DialogData {
  postId: number;
}

@Component({
  selector: 'app-dialog-comments',
  templateUrl: './dialog-comments.component.html',
  styleUrls: ['./dialog-comments.component.scss']
})
export class DialogCommentsComponent implements OnInit {

  //#region [Properties]
  private _postId: number;
  public commentsData: Comment[] = [];
  //#endregion

  constructor(
    @Inject(MAT_DIALOG_DATA) _data: DialogData,
    private readonly _usersService: UsersService
  ) {
    this._postId = _data.postId;
  }

  ngOnInit(): void {
    this._getCommentsData();
  }

  private _getCommentsData(): void {
    this._usersService.getPostComments(this._postId)
      .subscribe(res => {
        this.commentsData = res;
      });
  }

}
