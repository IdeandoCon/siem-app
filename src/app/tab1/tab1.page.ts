import { Component } from '@angular/core';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['Domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  customPickerOptions: any;
  logos: any;

  constructor(public userService: UserService) {
    this.customPickerOptions = {
      buttons: [{
        text: 'Save',
        handler: () => console.log('Clicked Save!')
      }, {
        text: 'Log',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      }]
    };
  }

  ionViewWillEnter() {
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
