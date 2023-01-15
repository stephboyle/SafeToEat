// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }

import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
// import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: any=[];
  // public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  constructor(private storage: Storage, private http: HttpClient, private plt: Platform, private router: Router) {
    // this.loadStoredToken();
  }

  // loadStoredToken() {
  //   let platformObs = from(this.plt.ready());

  //   this.user = platformObs.pipe(
  //     switchMap(() => {
  //       return from(this.storage.get(TOKEN_KEY));
  //     }),
  //     map(token => {
  //       if (token) {
  //         let decoded = helper.decodeToken(token);
  //         this.userData.next(decoded);
  //         return true;
  //       } else {
  //         return null;
  //       }
  //     })
  //   );
  // }

  login(credentials: {username: string, password: string }) {
    // Normally make a POST request to your APi with your login credentials
    if (credentials.username != this.user.username || credentials.password != this.user.password) {
      return of(null);
    }

    // return this.http.get('https://randomuser.me/api/').pipe(
    //   take(1),
    //   map(res => {
    //     return TOKEN_KEY;
    //   }),
    //   switchMap(token => {
    //     let decoded = helper.decodeToken(token);
    //     this.userData.next(decoded);

    //     let storageObs = from(this.storage.set(TOKEN_KEY, token));
    //     return storageObs;
    //   })
    // );
  }

  getUser() {
    return this.userData.getValue();
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userData.next(null);
    });
  }

}