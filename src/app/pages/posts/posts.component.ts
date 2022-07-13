import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Post } from 'src/app/models/post.interface';
import { UsersService } from 'src/app/services/users.service';
import { DialogCommentsComponent } from './dialog-comments/dialog-comments.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  //#region [Properties]
  public postsData: Post[] = [];
  //#endregion

  //#region [Getters]
  public get userIdSelected(): string {
    return this._usersService.userIdSelected.toString();
  }
  //#endregion

  constructor(
    private readonly _usersService: UsersService,
    private readonly _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._getPosts();
  }

  //#region [Prepare]
  private _getPosts(): void {
    this._usersService.getPostsByUser()
      .subscribe(res => {
        this.postsData = res;
      });
  }
  //#endregion

  //#region [Comments]
  public openDialogComments(postId: number): void {
    this._dialog.open(DialogCommentsComponent, {
      data: { postId },
      width: '600px'
    });
  }
  //#endregion

  //#region [Change userSelected]
  public onUserIdSelected(userId: number): void {
    this._usersService.userIdSelected = userId;
    this._getPosts();
  }
  //#endregion

}
