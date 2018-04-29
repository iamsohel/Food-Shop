import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminAuthGuard implements CanActivate{

  constructor(private auth : AuthService, private router : Router, private userService : UserService) { }

  canActivate() : Observable<boolean>{
     return this.auth.appUser$
    .map(AppUser => AppUser.isAdmin);
  }

}
