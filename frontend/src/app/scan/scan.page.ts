import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendConnection } from '../backend_connect.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage {
// export class ScanPage implements OnInit {
  user = null;
  users: any = [];

  constructor(private authService: AuthService,
              public backendConnection: BackendConnection,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.users = this.backendConnection.getUser(this.route.snapshot.params['_id']);
  }

  // ionViewWillEnter() {
  //   this.user = this.authService.getUser();
  // }

  logout() {
    this.authService.logout();
  }

  editUser(user: any) {
    this.backendConnection.editUser(user).subscribe((response:any) => {
      this.users = this.backendConnection.getUsers(
        this.route.snapshot.params['_id']);
    });
  }
}
