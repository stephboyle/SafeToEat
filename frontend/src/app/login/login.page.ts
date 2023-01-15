import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router'; 
import { userInfo } from 'os';
import { Router } from 'express';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials = {
    // username: users.username,
    // password: users.password
    username: ['', Validators.required],
    password: ['', Validators.required]
  };
  username: any;
  password: any;

  constructor(public authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private alertCtrl: AlertController,
              private formBuilder: FormBuilder,
              private loadingController: LoadingController) { }

  ngOnInit() {
  }

  // login() {
  //   const user = {
  //     username: this.username,
  //     password: this.password
  //   }

  //   this.authService.authenticateLogin(user).subscribe(
  //     (data) => {
  //       this.authService.storeUserData(data.body['token'], data.body['user'])
  //       console.log('You have successfully logged in');
  //       this.route.navigate(['/']);
  //     },
  //     (error) => {
  //       this.errorMessage = error.error['message'];
  //       document.getElementById("errorMessage").style.display = 'block';
  //       this.route.navigate(['/login']);
  //     });
  // }

  // login() {
  //   this.auth.login(this.credentials).subscribe(async (res: any) => {
  //     if (res) {
  //       this.router.navigateByUrl('/scan');
  //     } else {
  //       const alert = await this.alertCtrl.create({
  //         header: 'Login Failed',
  //         message: 'Wrong Credentials.',
  //         buttons: ['OK']
  //       });
  //       await alert.present();
  //     }
  //   })
  // }

  // async login() {
  //   const loading = await this.loadingController.create();
  //   await loading.present();

  //   this.authService.signIn(this.credentials.getRawValue()).then(async (data) => {
  //     await loading.dismiss();

  //     if(data.error) {
  //       this.showAlert('Login failed', data.error.message);
  //     }
  //   });
  // }
}
