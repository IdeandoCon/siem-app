import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from "../../api/user.service";
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { URL_TOKEN } from 'src/app/config/config'
import { URL_SERVIDOR } from 'src/app/config/config'
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Login } from 'src/app/interfaces/resultados';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string;
  password: string;
  municipalidad: string;


  slideOpts = {
    effect: 'fade',
    allowSlidePrev: true,
    allowSlideNext: true,
    direction: 'horizontal',
    autoplay: true,
    speed: 1000
    
   };

  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/slides/isologo.svg',
      titulo: ' S I E M ',
      desc: 'Información Ejecutiva Municipal'
    },
    {
      img: '/assets/slides/isologo.svg',
      titulo: 'Coparticipación',
      desc: 'Ingresos municipales por Coparticipación'
    },
    {
      img: '/assets/slides/isologo.svg',
      titulo: 'Recaudación',
      desc: 'Recaudación diaria, semanal, mensual, registro histórico'
    },
    {
      img: '/assets/slides/isologo.svg',
      titulo: 'Gastos',
      desc: 'Gastos diarios por categoría, gastos semanales e historico de gastos'
    },
    {
      img: '/assets/slides/ideando_isologo.png',
      titulo: 'Ideando Consultoria',
      desc: '¡ Juntos Concretamos IDEAS !'
    }
  ];

  constructor(public userService: UserService,private cookies: CookieService, public router: Router, private navCtrl: NavController, private http: HttpClient) {


  }


  async login1() {
    const usuario = { email: this.email, password: this.password, role: 'INTENDENTE_ROLE' };
    await this.userService.login(usuario).subscribe(data => {
      let municipalidad = this.userService.setMunicipalidad(data.id);
      this.userService.setToken(data.token);
      console.log(municipalidad)
      this.router.navigateByUrl('/tabs');
    })
  }


  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  //Metodos de Login y obtencion de datos de Ale.
  // Esto es preocupante
  login(token: string, municipalidad:string) {
    const usuario = { email: this.email, password: this.password, role: 'INTENDENTE_ROLE' };
    this.http.post<Login>('http://localhost:3000/login', usuario).subscribe(data => {
      this.cookies.get("token");
      this.setToken(data.token)
      let Municipal = data.usuario.municipalidad;
      this.municipalidad = Municipal;
      this.router.navigateByUrl('/tabs');
    });
  }


  onClick() {
    this.navCtrl.navigateForward( '/login' );

  }
}
