import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/api/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  logos: any;
  constructor(public userService: UserService) { this.logos = [];}
  ionViewWillEnter() {
    // Used ionViewWillEnter as ngOnInit is not
    // called due to view persistence in Ionic
    this.getLogo();
  }

  getLogo() {
    // Get saved list of students
    this.userService.getLogos().subscribe(response => {
      this.logos = response;
      console.log(response);
    });
  }

}
