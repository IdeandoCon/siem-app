import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/slides/arranque_siem_01.svg',
      titulo: 'Coparticipación',
      desc: 'Ingresos municipales por Coparticipación'
    },
    {
      img: '/assets/slides/arranque_siem_02.svg',
      titulo: 'Recaudación',
      desc: 'Recaudación diaria, semanal, mensual, registro histórico'
    },
    {
      img: '/assets/slides/arranque_siem_03.svg',
      titulo: 'Gastos',
      desc: 'Gastos diarios por categoría, gastos semanales e historico de gastos'
    },
    {
      img: '/assets/slides/siem.svg',
      titulo: ' . ',
      desc: 'Sistema de Información Ejecutiva Municipal'
    }
  ];

  constructor( private navCtrl: NavController) { }

  ngOnInit() {
  }

  onClick() {
    this.navCtrl.navigateForward( '/login' );

  }

}
