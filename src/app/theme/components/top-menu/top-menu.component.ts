import { Component, OnInit } from '@angular/core';
import {AppSettingService} from "../../../services/app-setting.service";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  constructor(public appSettings: AppSettingService,
              public authService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    //console.log(this.authService.isUser());
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/sign-in'])
  }
}
