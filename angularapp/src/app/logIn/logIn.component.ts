import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'logIn',
  templateUrl: './logIn.component.html',
  styleUrls: ['./logIn.component.css']
})
export class LogInComponent {
  user: User = new User("", "");
  NoUser: boolean = false;

  constructor(private http: HttpClient, private router: Router,
    private auth: AuthService) { }

  LogIn() {
    this.http.post<boolean>("/LogIn", this.user).subscribe(
      result => {
        if (result == true) {
          this.auth.login();
          this.router.navigate([''],
            {
              queryParams: {
                'user': this.user.Email
              }
            });
        }
        else {
          this.NoUser = true;          
        }
      },
      error => console.error(error)
    );
  }
}

class User {
  public Email: string;
  public Password: string;
  constructor(email: string, password: string) {
    this.Email = email;
    this.Password = password;
  }
}