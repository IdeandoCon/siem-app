import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserService } from "../../api/user.service";
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string;
  password: string;
  municipalidad: any;


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

  constructor(public userService: UserService, public router: Router, private navCtrl: NavController) {


  }


  async login() {
    const usuario = { email: this.email, password: this.password, role: 'INTENDENTE_ROLE' };
    await this.userService.login(usuario).subscribe(data => {
      this.userService.setToken(data.token);
      this.userService.setMunicipalidad(data.municipalidad);
      console.log(data.municipalidad);
      this.router.navigateByUrl('/tabs');
    })
  }


  onClick() {
    this.navCtrl.navigateForward( '/login' );

  }
}
