import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Reunion } from 'src/app/models/reunion';
import { Empleado } from 'src/app/models/empleado';
import { ReunionService } from 'src/app/services/reunion.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
@Component({
  selector: 'app-grafica-barra-oficina',
  templateUrl: './grafica-barra-oficina.component.html',
  styleUrls: ['./grafica-barra-oficina.component.css']
})
export class GraficaBarraOficinaComponent implements OnInit {
  minimo = 0;
  maximo = 10;
  reuniones: Array<Reunion>;
  resultados: Array<Reunion>;
  reunion: Reunion;
  cantidadTotal: number;
  reunionesPorOficina: Array<any>;
  oficinas = ['A1', 'B2', 'C3', 'D5', 'E6', 'F4'];
  oficina!: string;

  rango!: true; //true= enero a junio, false=julio diciembre
  rango1 = [1, 2, 3, 4, 5, 6]
  rango2 = [7, 8, 9, 10, 11, 12]
  meses1 = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']
  meses2 = ['Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  anio!: string;
  mes!: string;
  etiquetas = [];
  dataB = [];
  constructor(private reunionService: ReunionService) {

  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  ngOnInit(): void {
    this.resultados = new Array<Reunion>();
    this.reuniones = new Array<Reunion>();

  }
  ///////////************************************************///////////////

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        max: 20
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: this.etiquetas,
    datasets: [
      { data: [], label: 'Reuniones por P.' }
    ]

  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }



  ///////////************************************************///////////////


  //determina por cual rango hará la busqueda
  buscarReunionesEnOficina() {
    if (this.rango == true) {
      this.contarReunionesOficina(this.rango1);
      this.barChartData.labels = this.meses1;
      this.etiquetas = this.meses1;
      this.chart?.update();
    } else {

      this.contarReunionesOficina(this.rango2);
      this.barChartData.labels = this.meses2;
      this.etiquetas = this.meses2;
      this.chart?.update();//supuestamente actualiza la gráfica
    }

  }

  //cuenta las reuniones encontradas por cada mes del rango
  async contarReunionesOficina(r: Array<any>) {
    this.reunionesPorOficina = new Array<any>();
    console.log("r: " + r);
    for (var _i = 0; _i < r.length; _i++) {
      await this.recuperarReuniones(r[_i]);
      console.log("eti: " + this.etiquetas)
    }
  }
  //recuperamos las reuniones de una oficina en un mes y año dado
  async recuperarReuniones(mes: string) {
    this.reunionService.getReunionFiltroOficina(this.oficina, mes, this.anio).subscribe(
      (result) => {
        this.resultados = new Array<Reunion>();
        Object.assign(this.resultados, result);
        this.reunionesPorOficina.push(this.resultados.length);
        this.barChartData.datasets[0].data = this.reunionesPorOficina;//paso a dataB los datos para la grafica

        this.chart?.update();
      },
    )
  }



}
