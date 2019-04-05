import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/DataStructures/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  public User: User = new User();

  userForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: [this.User.name,[
        Validators.required,
        Validators.minLength(3)
      ]],
      email: [this.User.email,[
        Validators.required,
        Validators.email
      ]],
      isContacted: [this.User.isContacted,[

      ]]
    });
  }

  // convenience getter for easy access to form fields
  get UF() { return this.userForm.controls; }

  ngOnInit() {
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }
    alert('submited');
  }

}
