import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/DataStructures/User';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit, OnChanges {

  @Input() mode: 'add' | 'edit' | 'hide' = 'hide';
  @Input() editIndex: number;
  @Output() modeEmit: EventEmitter<string> = new EventEmitter();

  public User: User = new User();

  isSubmitted: boolean = false;
  userForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private uservice: UsersService
  ) {
    this.initForm();
  }

  initForm(){
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

  ngOnChanges(changes: SimpleChanges) {
    if(changes['mode']){
      console.log(changes['mode']);
      this.mode = changes['mode'].currentValue;
      if(changes['mode'].currentValue == 'edit'){
        this.User = this.uservice.getUserByIndex(this.editIndex);
        this.initForm();
      }
    }
  }

  cancel(){
    this.userForm.reset();
    this.mode = 'hide';
    this.modeEmit.emit(this.mode);
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.User.name = this.UF.name.value;
    this.User.email = this.UF.email.value;
    this.User.isContacted = this.UF.isContacted.value;

    if(this.mode == 'add'){
      this.uservice.addUser(Object.assign({},this.User));
    }
    else if(this.mode == 'edit'){
      this.uservice.editUser(Object.assign({},this.User), this.editIndex);
    }
    

    this.userForm.reset();
    this.isSubmitted = false;
    this.mode = 'hide';
    this.modeEmit.emit(this.mode);
  }

}
