import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren} from '@angular/core';


import {Chart, registerables} from 'chart.js';
import {StatisticsService} from '../../service/statistics/statistics.service';
import {HouseService} from '../../service/house/house.service';

// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.css']
})
export class MonthsComponent implements OnInit {
  currentYear = new Date(Date.now()).getFullYear();
  public canvas: any;
  public ctx: any;
  public labels: any = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  public dataCases: any = {
    chart1: [],
    chart2: []
  };

  constructor(private statisticService: StatisticsService,
              private houseService: HouseService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.statisticService.getTurnOverPerEachMonth(this.houseService.currentHouse, this.currentYear).subscribe(
      result => {
        this.dataCases.chart1 = result;
        this.statisticService.getTurnOverPerEachMonth(this.houseService.currentHouse, this.currentYear - 1).subscribe(
          result2 => {
            this.dataCases.chart2 = result2;
            this.createLineChart(this.labels, this.dataCases, 'myChart');
          }
        );
      }
    );


  }

  private createLineChart(labels, dataCases, chartId) {
    this.canvas = document.getElementById(chartId);
    this.ctx = this.canvas.getContext('2d');

    // @ts-ignore
    let chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '2021',
          data: dataCases.chart1,
          backgroundColor: '#ffbb33',
          borderColor: '#ffbb33',
          fill: false,
          borderWidth: 2,
        },
          {
            label: '2020',
            data: dataCases.chart2,
            backgroundColor: '#ff4444',
            borderColor: '#ff4444',
            fill: false,
            borderWidth: 2
          }]
      },
      options: {

        plugins: {
          title: {
            display: true,
            text: 'The chart analyze  total earnings per each month ',
            position: 'top',
            color:"red"
          },
          tooltips: {
            mode: 'index',
            intersect: true
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
        }
      }
    });
  }


}
