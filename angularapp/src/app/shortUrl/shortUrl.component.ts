import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'short-Url',
  templateUrl: './shortUrl.component.html',
  styleUrls: ['./shortUrl.component.css']
})
export class ShortUrlComponent implements OnInit {
  public ShortUrlsInfo?: ShortUrlInfo[];
  public UserEmail: boolean;
  public show: boolean;

  constructor(private http: HttpClient,
    private activateRoute: ActivatedRoute,
    private authService: AuthService)
  {
    this.show = false;
    //this.UserEmail = activateRoute.snapshot.queryParams['user'];    
  }

  async ngOnInit() {
    this.http.get<ShortUrlInfo[]>("/ShortUrl").subscribe(
      result => {
        this.ShortUrlsInfo = result;        
      },
      error => {
        console.error(error);
      });
    this.UserEmail = await this.authService.checkIsLoggedIn();
  }

  onSend(newUrl: any) {
    const body: ShortUrlInfo = {
      url: newUrl, shortUrl: "",
      id: undefined,
      createdBy: '',
      createdTime: undefined
    };
    this.http.put<ShortUrlInfo>("/ShortUrl", body).subscribe(
      result => {
        if (result != null) {
          this.ShortUrlsInfo.push(result);
          this.show = false;
        }
        else {
          alert("This url already exists!");
        }
      },
      error => console.error(error)
    );
  }

  Show() {
    this.show = !this.show;
  }
}

export interface ShortUrlInfo {
  id: number;
  url: string;
  shortUrl: string;
  createdBy: string;
  createdTime: Date;
}
