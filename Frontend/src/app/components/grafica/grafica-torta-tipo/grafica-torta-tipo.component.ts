import { Component, OnInit, ViewChild } from '@angular/core';
import { Reunion } from 'src/app/models/reunion';
import { ReunionService } from 'src/app/services/reunion.service';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-grafica-torta-tipo',
  templateUrl: './grafica-torta-tipo.component.html',
  styleUrls: ['./grafica-torta-tipo.component.css']
})
export class GraficaTortaTipoComponent implements OnInit {

  dataP = [];
  tipos = ["Informativa", "Formativa", "Estrategica", "Creativa", "OnetoOne"];
  cantidadReunionesTipos: Array<any>;
  reuniones!: Reunion[];
  reunion!: Reunion;

  resultado!: any;
  cantidad!: number;
  cantidadTotal!: number;
  constructor(private reunionService: ReunionService) {

  }

  ngOnInit(): void {
    this.reuniones = new Array<Reunion>();
    this.getReuniones();
    this.contarReunionesTipo();

  }
  getReuniones() {

    this.reunionService.getReuniones().subscribe(
      (result) => {

        this.reuniones = new Array<any>();
        result.forEach((element: any) => {
          this.reunion = new Reunion();
          Object.assign(this.reunion, element);
          this.reuniones.push(this.reunion);
          this.cantidadTotal = this.reuniones.length
        })
      },
    )
  }
  async contarReunionesTipo() {
    this.cantidadReunionesTipos = new Array<any>();
    for (var _i = 0; _i < this.tipos.length; _i++) {
      this.reunionesPorTipo(this.tipos[_i]);
    }

  }
  async reunionesPorTipo(tipo: string) {
    this.reunionService.getReunionPorTipo(tipo).subscribe(
      (result) => {
        this.resultado = new Array<Reunion>();
        Object.assign(this.resultado, result);
        this.cantidadReunionesTipos.push(this.resultado.length);
        this.pieChartDataTipo.datasets[0].data = this.cantidadReunionesTipos

        this.chartB?.update();
      }
    )
  }
  @ViewChild(BaseChartDirective) chartB: BaseChartDirective | undefined;
  //******************** pie de tipos de reunion ****************************
  public pieChartOptionsTipo: ChartConfiguration['options'] = {
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
    }
  };
  public pieChartDataTipo: ChartData<'pie', number[], string | string[]> = {
    labels: this.tipos,
    datasets: [{
      data: this.dataP
    }]
  };
  public pieChartTypeTipo: ChartType = 'pie';
  public pieChartPluginsTipo = [DatalabelsPlugin];

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }



}
