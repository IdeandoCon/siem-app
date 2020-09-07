import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/api/user.service';
import { URL_TOKEN } from 'src/app/config/config'
import { URL_SERVIDOR } from 'src/app/config/config'
import {DataResultado, Resultado, OtrasJurisdicciones, JurisdiccionMunicipal  } from 'src/app/interfaces/resultados'
import { Chart } from 'chart.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnDestroy {
  @ViewChild('BarsChartOtrasJurisdicciones', {static: false}) BarsChartOtrasJurisdicciones;
  BarsOtrasJurisdicciones: any;

  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['Domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  customPickerOptions: any;
  logos: any;


  apiIngresoMunicipalOtras:any;
  apiLeyendaMunicipalOtras:any;

  ngOnDestroy(){
    this.getLogo();
    this.createOtrasJurisdicciones();
    this.var_ingreso_otrasJurisdicciones(event);
  }

  constructor(public alertController: AlertController,public userService: UserService,private http: HttpClient ) {
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

  async doRefresh(event) {
    this.getLogo();
    this.getLogo();
    this.createOtrasJurisdicciones();
    this.var_ingreso_otrasJurisdicciones(event);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Éxitos',
      subHeader: '',
      message: 'Los datos se recargaron con éxito.',
      buttons: ['OK']
    });
    await alert.present();
  
  }

  ionViewWillEnter() {
    this.getLogo();
    this.createOtrasJurisdicciones();
    this.var_ingreso_otrasJurisdicciones(event);
  }

  
  var_ingreso_otrasJurisdicciones(event) {
    const my_url = URL_SERVIDOR + '/otras-jur/2020/20200101/20200131'; 
    var token = URL_TOKEN;
    const headers = { 
      'content-type': 'application/json',
      'x-token': token
    }  
    this.http.get<OtrasJurisdicciones>(my_url , {headers: headers}).subscribe(data => {
      let ingresoMunicipal = data['resultado'].map(data => data.importe);
      let leyendaMunicipal = data['resultado'].map(data => data.leyenda);
      this.apiIngresoMunicipalOtras = ingresoMunicipal;
      this.apiLeyendaMunicipalOtras = leyendaMunicipal;
      this.createOtrasJurisdicciones();
      event.target.complete();
    });
  }


  createOtrasJurisdicciones() {
    const ctx = this.BarsChartOtrasJurisdicciones.nativeElement;
    ctx.height = 400;
    this.BarsOtrasJurisdicciones = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels:this.apiLeyendaMunicipalOtras,
      datasets: [
        {
          label: '# Miles de pesos',
          data: this.apiIngresoMunicipalOtras,
          backgroundColor: [
            'rgba(255, 99, 132, 0.3)',
            'rgba(54, 162, 235, 0.3)',
            'rgba(253, 79, 48, 0.3)',
            'rgba(7, 35, 7, 0.3)',
            'rgba(38, 2, 43, 0.3)'
          ],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#fd4f30', '#115912', '#62056e']
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
       }
  }); }



  getLogo() {
    // Get saved list of students
    this.userService.getLogos().subscribe(response => {
      this.logos = response;
      console.log(response);
    });
  }

}
