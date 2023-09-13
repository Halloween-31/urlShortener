import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ShortUrlInfo } from '../shortUrl.component';

@Component({
  selector: 'short-Url-info',
  templateUrl: './shortUrlInfo.component.html',
  styleUrls: ['./shortUrlInfo.component.css']
})
export class ShortUrlInfoComponent implements OnInit {
  currentShortUrl: ShortUrlInfo = { id: 0, url: "", shortUrl: "", createdBy: "", createdTime: undefined };  
  constructor(private http: HttpClient,
    private activateRoute: ActivatedRoute,
    private router: Router)
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

  Delete() {
    const answer: boolean = confirm("Are you sure?");
    if (answer == true) {
      this.http.post<boolean>(`/ShortUrl`, this.currentShortUrl.id).subscribe(
        result => {
          if (result == true) {
            alert("This url deleted successfully!");
            this.router.navigate(['']);
          } else {
            alert("You can not delete this url");
          }
        },
        error => console.error(error)
      );
    }

  }
}
