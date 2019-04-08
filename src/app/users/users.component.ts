import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  mode: 'add' | 'edit' | 'hide' = 'hide';
  editIndex: number;

  constructor(public users: UsersService) { }

  ngOnInit() {
  }

  showAddForm(){
    this.mode = 'add';
  }

  modeChanged($event){
    this.mode = $event;
  }

  edit(i: string){
    this.mode = 'edit';
    this.editIndex = parseInt(i);
  }

}
