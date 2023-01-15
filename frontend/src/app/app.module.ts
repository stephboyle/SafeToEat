import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BackendConnection } from './backend_connect.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page';
import { RegistrationPage } from './registration/registration.page';
import { ScanPage } from './scan/scan.page';
import { AuthService } from './services/auth.service';
// import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent,
                // ScanPage,
                // RegistrationPage,
                // LoginPage,
                // HomePage,
                // AuthService]
  ],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule, 
            HttpClientModule, 
            ReactiveFormsModule,
            // IonicStorageModule.forRoot()
            ],
  providers: [BackendConnection, 
              { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
