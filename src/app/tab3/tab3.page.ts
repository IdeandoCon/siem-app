import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page implements OnInit {
  @ViewChild("barCanvas", {static: true}) barCanvas: ElementRef;
  @ViewChild("doughnutCanvas", {static: true}) doughnutCanvas: ElementRef;
  @ViewChild("lineCanvas", {static: true}) lineCanvas: ElementRef;

  private barChart: Chart;
  private doughnutChart: Chart;
  private lineChart: Chart;

  constructor() {}

  ngOnInit() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"],
        datasets: [
          {
            label: "# Miles de pesos",
            data: [65, 97, 84, 76, 110],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)"
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

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Combustible", "Farmacia", "Gasto Social", "Eventos"],
        datasets: [
          {
            label: "# Miles de pesos",
            data: [68, 20, 32, 45],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75,192,192,0.4)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#BFFFFF" ]
          }
        ]
      }
    });

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
        datasets: [
          {
            label: "Síntesis de Gastos Historico",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false
          }
        ]
      }
    });
  }
}
