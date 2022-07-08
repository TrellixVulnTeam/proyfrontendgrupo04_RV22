import { Component, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ReunionService } from 'src/app/services/reunion.service';
import { Reunion } from 'src/app/models/reunion';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/empleado';
@Component({
  selector: 'app-grafica-torta',
  templateUrl: './grafica-torta.component.html',
  styleUrls: ['./grafica-torta.component.css'],
})
export class GraficaTortaComponent implements OnInit {
  dataP = [2, 4, 6, 8, 10, 12];
  etiquetas = ['Oficina A1', 'Oficina B2', 'Oficina C3', 'Oficina D5', 'Oficina E6', 'Oficina F4'];
  reuniones!: Reunion[];
  reunion!: Reunion;
  participantes!: Array<Empleado>;
  participante!: Empleado;
  constructor(private reunionService: ReunionService, private empleadoService: EmpleadoService) {
    this.participantes = new Array<Empleado>();
    this.reuniones = new Array<Reunion>();
    this.getReuniones();
    this.getParticipantes()
  }

  ngOnInit(): void { }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.etiquetas,
    datasets: [
      {
        data: this.dataP,
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  changeLabels(): void {

    this.pieChartData.labels = new Array();

    this.chart?.update();
  }

  addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push(this.etiquetas);
    }

    this.pieChartData.datasets[0].data.push(this.dataP[0]);

    this.chart?.update();
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  }

  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position =
        this.pieChartOptions.plugins.legend.position === 'left'
          ? 'top'
          : 'left';
    }

    this.chart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display =
        !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }

  getReuniones() {

    this.reunionService.getReuniones().subscribe(
      (result) => {
        console.log(result);
        this.reuniones = new Array<Reunion>();
        result.forEach((element: any) => {
          this.reunion = new Reunion();
          Object.assign(this.reunion, element);
          this.reuniones.push(this.reunion);
        })
      },
    )
  }
  getParticipantes() {

    this.empleadoService.getEmpleados().subscribe(
      (result) => {
        console.log(result);
        this.participantes = new Array<Empleado>();
        result.forEach((element: any) => {
          this.participante = new Empleado();
          Object.assign(this.participante, element);
          this.participantes.push(this.participante);
        })
      },
    )
    console.log(this.participantes)
    console.log(this.participante)
  }

}
