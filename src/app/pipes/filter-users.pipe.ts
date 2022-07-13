import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.interface';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: User[], filterValue: string): User[] {
    let result: User[] = [];

    if (!filterValue || filterValue?.length < 1) {
      return users;
    }

    users.forEach(user => {
      if (user.name.toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) > -1) {
        result = [...result, user];
      }
      else if (user.username.toLocaleLowerCase().indexOf(filterValue.toLocaleLowerCase()) > -1) {
        result = [...result, user];
      }
    });

    return result;
  }

}
