import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { filter, mergeMap } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notworth-ui';
  constructor(public auth: AuthService){
    
  }
  ngOnInit(){
    this.auth.error$.pipe(
      filter((e) => e.message === 'login_required'),
      mergeMap(() => this.auth.loginWithRedirect())
    ).subscribe();
    this.auth.error$.subscribe((error) => console.log(error));
  }
  }
