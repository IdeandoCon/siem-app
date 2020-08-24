import { Component, ViewChild } from '@angular/core';
import { UserService } from 'src/app/api/user.service';
import { Observable } from 'rxjs';
import { URL_TOKEN } from 'src/app/config/config'
import { URL_SERVIDOR } from 'src/app/config/config'
import {DataResultado, Resultado, OtrasJurisdicciones, JurisdiccionMunicipal  } from 'src/app/interfaces/resultados'


import { Chart } from 'chart.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page {
  @ViewChild('BarChartSemanal', {static: false}) BarChartSemanal;
  @ViewChild('BarChartMunicipales', {static: false}) BarChartMunicipales;
  @ViewChild('BarChartSemestral', {static: false}) BarChartSemestral;
  @ViewChild('BarChartAnual', {static: false}) BarChartAnual;
  @ViewChild('BarChartDiarioCategorias', {static: false}) BarChartDiarioCategorias;

  BarsDiario: any;
  BarsDiarioCat: any;
  BarSemanal: any;
  BarsSemestral: any;
  BarsAnual: any;
  BarsMunicipales:any;

  colorArray: any;

  apiDiario: any;
  apiDiarioCategoria: any;
  apiSemanal:any;
  apiSemestral: any;
  apiAnual: any;


  logos: any;

  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
  customDayShortNames = ['Domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  customPickerOptions: any;

  DataResultado : Resultado;
  apiLeyendaSemanal:any;
  apiDiaSemanal: any;
  apiIngresoMunicipalOtras:any;
  apiLeyendaMunicipalOtras:any;
  apiIngresoMunicipal:any;
  apiLeyendaMunicipal:any;


  constructor( private http: HttpClient, public userService: UserService) {
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


  ionViewDidEnter() {
    this.createBarChartSemanal();
    this.createBarChartSemestral();
    this.createOtrasJurisdicciones();
    this.createJurisdiccionMunicipal();
  }


  ionViewWillEnter() {
    this.getLogo();
    this.var_anual();
    
    this.var_semanal();
    this.var_semestral();
    this.var_ingreso_mensual();
    this.var_ingreso_capital();
    this.var_ingreso_otrasJurisdicciones();
    this.var_ingreso_jurisdiccionMunicipal();

  }

  getLogo() {
    this.userService.getLogos().subscribe(response => {
      this.logos = response;
    });
  }

    var_semanal() {
      const my_url = URL_SERVIDOR + '/recaudacion-semanal/2020/5';
      var token = URL_TOKEN;
      const headers = { 
        'content-type': 'application/json',
        'x-token': token
      }  
      this.http.get<DataResultado>(my_url , {headers: headers}).subscribe(data => {
        let importe = data['resultado'].map(data => data.importe);
        let leyenda = data['resultado'].map(data => data.leyenda);
        let dia = data['resultado'].map(data => data.dia)

        console.log(importe)

        var ImporteOrdenado = data.resultado.reduce((r, a) => {
          r[a.dia] = [...r[a.dia] || [], a];
          return r;
        }, {});
        console.log(ImporteOrdenado)      
        
        this.apiSemanal = importe;
        this.apiLeyendaSemanal = leyenda;
        this.apiDiaSemanal = dia;
        
        this.createBarChartSemanal();

      });
    }


    var_ingreso_mensual() {
      const my_url = URL_SERVIDOR + '/recaudacion-semanal/2020/5'; //consultar por que esta repetida
      var token = URL_TOKEN;
      const headers = { 
        'content-type': 'application/json',
        'x-token': token
      }  
      this.http.get(my_url , {headers: headers}).subscribe(data => {
        console.log('Ingreso Mensual', data);
        this.apiDiario = data;
        this.createBarChartSemanal();
      });
    }


    var_ingreso_capital() {
      const my_url = URL_SERVIDOR + '/ingreso-capital/2020/200101/200131'; 
      var token = URL_TOKEN;
      const headers = { 
        'content-type': 'application/json',
        'x-token': token
      }  
      this.http.get(my_url , {headers: headers}).subscribe(data => {
        console.log('Ingreso capital', data);
        this.apiDiario = data;
        this.createBarChartSemanal();
      });
    }








    var_ingreso_otrasJurisdicciones() {
      const my_url = URL_SERVIDOR + '/otras-jur/2020/20200101/20200131'; 
      var token = URL_TOKEN;
      const headers = { 
        'content-type': 'application/json',
        'x-token': token
      }  
      this.http.get<OtrasJurisdicciones>(my_url , {headers: headers}).subscribe(data => {
        let ingresoMunicipal = data['resultado'].map(data => data.importe);
        let leyendaMunicipal = data['resultado'].map(data => data.leyenda);

        console.log('Ingreso de Otras Jurisdiciones', data);

        this.apiDiario = data;
        this.apiIngresoMunicipalOtras = ingresoMunicipal;
        this.apiLeyendaMunicipalOtras = leyendaMunicipal;
        this.createOtrasJurisdicciones();

        console.log(this.apiIngresoMunicipalOtras)
      });
    }






    var_ingreso_jurisdiccionMunicipal() {
      const my_url = URL_SERVIDOR + '/jur-municipal/2020/20200101/20200110'; 
      var token = URL_TOKEN;
      const headers = { 
        'content-type': 'application/json',
        'x-token': token
      }  
      this.http.get<JurisdiccionMunicipal>(my_url , {headers: headers}).subscribe(data => {
        let ingresoJurisdiccionMunicipal = data['resultado'].map(data => data.importe);
        let leyendaJurisdiccionMunicipal = data['resultado'].map(data => data.leyenda)

        console.log('Ingreso de Jurisdicion Municipal', data);
        this.apiIngresoMunicipal = ingresoJurisdiccionMunicipal;
        this.apiLeyendaMunicipal = leyendaJurisdiccionMunicipal;
      });
    }

    

   

    var_semestral() {
      const my_url = 'https://vigorous-chandrasekhar-2ee519.netlify.app/apiSemestral.json';
      this.http.get(my_url).subscribe(data => {
        this.apiSemestral = data;
        this.createBarChartSemestral();
      });
    }

    var_anual() {
      const my_url = 'https://vigorous-chandrasekhar-2ee519.netlify.app/apiSemestral.json';
      this.http.get(my_url).subscribe(data => {
        this.apiDiarioCategoria = data;
      });
    }


  createBarChartSemanal() {
    const ctx = this.BarChartSemanal.nativeElement;
    ctx.height = 400;
    this.BarSemanal = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
      datasets: [
        {
          label: this.apiLeyendaSemanal,
          data: this.apiSemanal,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(253, 79, 48, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}

  createOtrasJurisdicciones() {
    const ctx = this.BarChartDiarioCategorias.nativeElement;
    ctx.height = 400;
    this.BarsDiarioCat = new Chart(ctx, {
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

  createJurisdiccionMunicipal() {
    const ctx = this.BarChartMunicipales.nativeElement;
    ctx.height = 400;
    this.BarsMunicipales = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels:this.apiLeyendaMunicipal,
      datasets: [
        {
          label: '# Miles de pesos',
          data: this.apiIngresoMunicipal,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(7, 35, 7, 0.2)',
            'rgba(38, 2, 43, 0.2)',
            'rgba(38, 2, 43, 0.2)'
          ],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#115912', '#62056e', '#22056e']
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
       }
  }); }



  createBarChartSemestral() {
    const ctx = this.BarChartSemestral.nativeElement;
    ctx.height = 400;
    this.BarsSemestral = new Chart(ctx, {
    type: 'line',
    data: {
      labels: this.apiSemestral && this.apiSemestral.labels ,
      datasets: [
        {
          label: 'Síntesis de Recaudación Histórico',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.apiSemestral && this.apiSemestral.values,
          spanGaps: false
        }
      ]
    }
  });



}



}
