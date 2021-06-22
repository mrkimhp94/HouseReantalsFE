import {Component, OnInit} from '@angular/core';
import {Chart, defaults, registerables} from 'chart.js';

@Component({
  selector: 'app-turnover-all-house',
  templateUrl: './turnover-all-house.component.html',
  styleUrls: ['./turnover-all-house.component.css']
})
export class TurnoverAllHouseComponent implements OnInit {
  private canvas: any;
  private ctx: any;
  private xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
  private yValues = [55, 49, 44, 24, 15];
  private barColors = ["red", "green","blue","orange","brown"];

  constructor() {
    Chart.register(...registerables);

  }

  ngOnInit() {
    this.drawChart()
  }

  drawChart() {
    this.canvas = document.getElementById('myChart2');
    this.ctx = this.canvas.getContext('2d');
    new Chart(this.canvas, {
      type: "bar",
      data: {
        labels: this.xValues,
        datasets: [{
          backgroundColor: this.barColors,
          data: this.yValues
        }]
      },
      options: {
        title: {
          display: true,
          text: "World Wine Production 2018"
        },
        tooltips:{
          callbacks: {
            label: tooltipItem => `${tooltipItem.yLabel}: ${tooltipItem.xLabel}`,
            title: () => null,
          }
        }
      }
    });
  }
}
