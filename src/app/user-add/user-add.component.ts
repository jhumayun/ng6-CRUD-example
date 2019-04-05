import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/DataStructures/User';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  public User: User = new User();

  isSubmitted: boolean = false;
  userForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private uservice: UsersService
  ) {
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
    this.isSubmitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.User.name = this.UF.name.value;
    this.User.email = this.UF.email.value;
    this.User.isContacted = this.UF.isContacted.value;
    this.uservice.addUser(this.User);

    this.userForm.reset();
    this.isSubmitted = false;
  }

}
