import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendConnection } from 'src/app/backend_connect.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  users: any = [];
  // reviewForm: any;
  reviewForm = this.formBuilder.nonNullable.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email_address: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    allergy: ['', Validators.required],
});

  constructor(public backendConnection: BackendConnection,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public http:HttpClient) { }

  ngOnInit() {

    // this.reviewForm = this.formBuilder.nonNullable.group({
    //     first_name: ['', Validators.required],
    //     last_name: ['', Validators.required],
    //     email_address: ['', Validators.required],
    //     username: ['', Validators.required],
    //     password: ['', Validators.required, Validators.minLength(6)],
    //     allergy: ['', Validators.required],
    // });
  }

  createAccount() {
    console.log(this.reviewForm.value)
    this.backendConnection.addUser(this.reviewForm.value)
        .subscribe((response: any) => {
        this.reviewForm.reset();
        this.users = this.backendConnection.getUser(
            this.route.snapshot.params['_id']);
        }); 
    }

}
