import { Component, OnInit } from '@angular/core';
import { faArrowRightFromBracket, faList, faUser, faAward, faClipboardCheck, faChartColumn } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-frame',
  templateUrl: './admin-frame.component.html',
  styleUrls: ['./admin-frame.component.css']
})
export class AdminFrameComponent implements OnInit {
  myUserJson: string = '';

  faLogOut = faArrowRightFromBracket;
  faUser = faUser;
  faList = faList;
  faAward = faAward;
  faClipboardCheck = faClipboardCheck;
  faChartColumn = faChartColumn;
    
  constructor(private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logOut();
  }

  myUser() {
    this.userService.myUser().subscribe((user: User) => {
      this.myUserJson = JSON.stringify(user);
    });
  }

}
