import { Injectable } from '@angular/core';
import { User } from 'src/app/DataStructures/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private Users: User[] = [];

  constructor() { 
    this.Users = [
      {
        name: 'Jawad',
        email: 'jawad@ghl.com',
        isContacted: false
      },
      {
        name: 'Nick',
        email: 'nick@ghl.com',
        isContacted: false
      }
    ];
  }

  getUsers(): User[] {
    return this.Users;
  }

  addUser(user: User): void {
    this.Users.push(user);
  }

}
