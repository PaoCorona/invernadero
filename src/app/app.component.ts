import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  template: `
    <div class="container mt-4" style="background-color: #f0f8ff; min-height: 100vh; padding-bottom: 40px;">
      <h2 
        style="
          color: #2c3e50; 
          margin-top: 40px; 
          margin-bottom: 30px; 
          font-weight: 700; 
          font-size: 2.5rem; 
          text-align: center; 
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        ">
        Panel de Control - Sistema de Riego Automático
      </h2>

      <div class="card my-3">
        <div class="card-body">
          <h5>Lecturas Sensoriales</h5>
          <p>
            Temperatura: 
            <strong [class.text-success]="tempNormal" [class.text-danger]="!tempNormal">
              {{ temperatura !== null && temperatura !== undefined ? temperatura : '--' }} °C
            </strong>
          </p>
          <p>Humedad del Aire: {{ humedadAire !== null && humedadAire !== undefined ? humedadAire : '--' }} %</p>
          <p>Suelo Seco: <strong>{{ sueloSeco ? 'Sí' : 'No' }}</strong></p>
          <p>Nivel de Agua: <strong>{{ nivelAgua | titlecase }}</strong></p>
        </div>
      </div>

      <div class="card my-3">
        <div class="card-body">
          <h5>Estado de Actuadores</h5>
          <p style="margin-top: 20px;">
            Bomba de Riego: 
            <span class="badge" 
              [class.bg-success]="bombaEncendida" 
              [class.bg-danger]="!bombaEncendida">
              {{ bombaEncendida ? 'Encendida' : 'Apagada' }}
            </span>
          </p>
        </div>
      </div>

      <div class="card my-3">
        <div class="card-body">
          <h5>Gráfica de Temperatura - Últimos 10 días en Querétaro</h5>
          <div style="display: block;">
            <canvas baseChart
              [data]="lineChartData"
              [options]="lineChartOptions"
              [legend]="lineChartLegend"
              chartType="line">
            </canvas>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AppComponent {
  temperatura: number | null = 25;
  humedadAire: number | null = 50;
  sueloSeco: boolean = false;

  nivelAgua: 'alto' | 'medio' | 'bajo' = 'alto';

  bombaEncendida: boolean = false;
  ventilacionAbierta: boolean = false;
  tempNormal: boolean = true;

  public lineChartData = {
    datasets: [
      {
        data: [18, 20, 22, 25, 28, 27, 26, 24, 22, 20], // temperaturas de cada día
        label: 'Temperatura (°C)',
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ],
    labels: ['19-Mayo', '20-Mayo', '21-Mayo', '22-Mayo', '23-Mayo', '24-Mayo', '25-Mayo', '26-Mayo', '27-Mayo', '28-Mayo']
  };

  public lineChartOptions = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 50
      }
    }
  };

  public lineChartLegend = true;

  toggleSuelo() {
    this.sueloSeco = !this.sueloSeco;
    this.actualizarEstados();
  }

  toggleNivelAgua() {
    if (this.nivelAgua === 'alto') {
      this.nivelAgua = 'medio';
    } else if (this.nivelAgua === 'medio') {
      this.nivelAgua = 'bajo';
    } else {
      this.nivelAgua = 'alto';
    }
    this.actualizarEstados();
  }

  private actualizarEstados() {
    this.tempNormal = this.temperatura !== null && this.temperatura >= 18 && this.temperatura <= 30;
    this.ventilacionAbierta = !this.tempNormal;
    this.bombaEncendida = this.sueloSeco && (this.nivelAgua === 'bajo');
  }
}
