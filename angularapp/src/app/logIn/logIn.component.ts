import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
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

  constructor(private http: HttpClient, private router: Router) { }

  LogIn() {
    this.http.post<boolean>("/LogIn", this.user).subscribe(
      result => {
        if (result == true) {         
          this.router.navigate(['']);
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
