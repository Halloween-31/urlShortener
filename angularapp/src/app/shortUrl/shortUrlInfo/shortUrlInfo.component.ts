import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ShortUrlComponent, ShortUrlInfo } from '../shortUrl.component';

@Component({
  selector: 'short-Url-info',
  templateUrl: './shortUrlInfo.component.html',
  styleUrls: ['./shortUrlInfo.component.css']
})
export class ShortUrlInfoComponent implements OnInit {
  currentShortUrl: ShortUrlInfo = { id: 0, url: "", shortUrl: "", createdBy: "", createdTime: undefined };  
  constructor(private http: HttpClient,
    private activateRoute: ActivatedRoute)
  {
    this.currentShortUrl.id = activateRoute.snapshot.params['id'];    
  }

  ngOnInit(): void {
    this.http.get<ShortUrlInfo>(`/ShortUrl/${this.currentShortUrl.id}`).subscribe(
      result => {
        this.currentShortUrl = result;
      },
      error => console.error(error)
    );
  }
}
