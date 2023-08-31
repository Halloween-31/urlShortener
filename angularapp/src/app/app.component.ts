import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public ShortUrlsInfo?: ShortUrlInfo[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ShortUrlInfo[]>("/ShortUrl").subscribe(
      result => {
        this.ShortUrlsInfo = result;        
      },
      error => {
        console.error(error);
      });
  }
}

interface ShortUrlInfo {
  url: string;
  shortUrl: string;
  //великі букви не підходять (Url), бо об'єкт приходить маленькими,
  //тоді треба присвоювати через конструктор і робити клас
}
