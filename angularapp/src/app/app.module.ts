import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ShortUrlComponent } from "./shortUrl/shortUrl.component"
import { LogInComponent } from './logIn/logIn.component'
import { FormsModule } from '@angular/forms';
import { NewUrlComponent } from './shortUrl/newUrl/newUrl.component';
import { ShortUrlInfoComponent } from './shortUrl/shortUrlInfo/shortUrlInfo.component';
import { shortUrlGuard } from './shortUrl/shortUrl.guard';
import { AuthService } from './Services/auth.service';
import { shortUrlInfoGuard } from './shortUrl/shortUrlInfo/shortUrlInfo.guard';

const AppRoutes: Routes = [
  { path: '', component: ShortUrlComponent },  //canActivate: [shortUrlGuard]
  { path: 'logIn', component: LogInComponent },
  { path: ':id', component: ShortUrlInfoComponent, canActivate: [shortUrlInfoGuard] }
];

@NgModule({
  declarations: [
    AppComponent, ShortUrlComponent, LogInComponent, NewUrlComponent,
    ShortUrlInfoComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot(AppRoutes), FormsModule
  ],
  providers: [AuthService, shortUrlGuard, shortUrlInfoGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
