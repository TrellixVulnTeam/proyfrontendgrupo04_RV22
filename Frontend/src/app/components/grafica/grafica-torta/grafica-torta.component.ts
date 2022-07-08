import { Component, OnInit, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { ReunionService } from 'src/app/services/reunion.service';
import { Reunion } from 'src/app/models/reunion';

@Component({
  selector: 'app-grafica-torta',
  templateUrl: './grafica-torta.component.html',
  styleUrls: ['./grafica-torta.component.css'],
})
export class GraficaTortaComponent implements OnInit {
  dataP = [];
  oficinas = ['A1', 'B2', 'C3', 'D5', 'E6', 'F4'];
  oficina!: string;
  cantidadReunionesOficinas: Array<any>;
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

    this.contarReunionesOficina();
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
  async contarReunionesOficina() {
    this.cantidadReunionesOficinas = new Array<any>();
    for (var _i = 0; _i < this.oficinas.length; _i++) {
      this.reunionesPorOficina(this.oficinas[_i]);
    }

  }
  async reunionesPorOficina(oficina: string) {
    this.reunionService.getReunionOficina(oficina).subscribe(
      (result) => {
        this.resultado = new Array<Reunion>();
        Object.assign(this.resultado, result);
        this.cantidadReunionesOficinas.push(this.resultado.length);
        this.pieChartData.datasets[0].data = this.cantidadReunionesOficinas
        this.chart?.update();
      }
    )
  }
  /////////////////////////////////************/////////////////////////////////
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // ************************Pie de oficinas*********************************
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
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: this.oficinas,
    datasets: [{
      data: this.dataP
    }]

  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];
  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
  /*
    changeLabels(): void {
      const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
        'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
        'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
        'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
        'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
      const randomWord = () => words[Math.trunc(Math.random() * words.length)];
      this.pieChartData.labels = new Array(3).map(_ => randomWord());
  
      this.chart?.update();
    }
  
    addSlice(): void {
      if (this.pieChartData.labels) {
        this.pieChartData.labels.push(['Line 1', 'Line 2', 'Line 3']);
      }
  
      this.pieChartData.datasets[0].data.push(400);
  
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
        this.pieChartOptions.plugins.legend.position = this.pieChartOptions.plugins.legend.position === 'left' ? 'top' : 'left';
      }
  
      this.chart?.render();
    }
  
    toggleLegend(): void {
      if (this.pieChartOptions?.plugins?.legend) {
        this.pieChartOptions.plugins.legend.display = !this.pieChartOptions.plugins.legend.display;
      }
  
      this.chart?.render();
    }
    */
}