import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  temperatura: number | null = null;
  humedadAire: number | null = null;
  sueloSeco: boolean = false;
  nivelAguaArriba: boolean = true; // true = agua arriba (LOW)
  bombaEncendida: boolean = false;
  ventilacionAbierta: boolean = false;
  tempNormal: boolean = true;

  TEMP_MIN = 18;
  TEMP_MAX = 30;

  constructor() { }

  ngOnInit(): void {
    this.simularLecturas();
    setInterval(() => {
      this.simularLecturas();
    }, 2000); // Actualiza cada 2 segundos
  }

  simularLecturas() {
    // Simular temperatura entre 15 y 35
    this.temperatura = Math.round(15 + Math.random() * 20);

    // Simular humedad aire 30-70%
    this.humedadAire = Math.round(30 + Math.random() * 40);

    // Simular suelo seco (boolean)
    // Aquí mantenemos el estado actual, para simular control manual, no lo cambiamos solo
    // si quieres, puedes hacerlo aleatorio:
    // this.sueloSeco = Math.random() > 0.5;

    // La lógica de tempNormal:
    this.tempNormal = this.temperatura >= this.TEMP_MIN && this.temperatura <= this.TEMP_MAX;

    // Lógica ventilación según temperatura
    this.ventilacionAbierta = !this.tempNormal;

    // Lógica bomba:
    // Enciende bomba si suelo seco y nivelAgua abajo (nivelAguaArriba == false)
    if (this.sueloSeco && !this.nivelAguaArriba) {
      this.bombaEncendida = true;
    } else {
      this.bombaEncendida = false;
    }
  }

  toggleSuelo() {
    this.sueloSeco = !this.sueloSeco;
    this.simularLecturas();
  }

  toggleNivelAgua() {
    this.nivelAguaArriba = !this.nivelAguaArriba;
    this.simularLecturas();
  }

}
