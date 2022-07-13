import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.interface';
import { Album } from '../models/album.interface';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //#region [Properties]
  private readonly _API = environment.API_URL;
  public userIdSelected: number = 0;
  //#endregion

  constructor(private readonly _http: HttpClient) { }

  //#region [Endpoints]
  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this._API}users`);
  }

  getAlbumsByUser(): Observable<Album[]> {
    if (this.userIdSelected && this.userIdSelected > 0) {
      return this._http.get<Album[]>(`${this._API}users/${this.userIdSelected}/albums`);
    } else {
      return of([]);
    }
  }

  getPostsByUser(): Observable<Post[]> {
    if (this.userIdSelected && this.userIdSelected > 0) {
      return this._http.get<Post[]>(`${this._API}users/${this.userIdSelected}/posts`);
    } else {
      return of([]);
    }
  }

  getPostComments(postId: number): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${this._API}posts/${postId}/comments`);
  }
  //#endregion

}
