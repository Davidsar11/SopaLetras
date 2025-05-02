import { Component, inject, input, signal } from '@angular/core';
import { SopaService } from '../../services/sopa.service';
import { Posicion } from '../../interface/position.interface';



@Component({
  selector: 'app-sopa-letras',
  imports: [],
  templateUrl: './sopa-letras.component.html',
})
export class SopaLetrasComponent {

  sopa = input.required<string[][]>();

  sopaService = inject(SopaService);

  activo : Posicion[] = [];

  blocked: Posicion [] = [];

  addLetra(row : number, col: number): void{
    const aux =  { row: row, col: col};

    let removed = false;


    if(!this.isBlocked(row,col)){ // si la posición no esta bloqueada (ya se ha acertad antes)
      this.activo.forEach( pos => { // para cada activo
        if(pos.row == row && pos.col == col){ // compruebo si es la Posicion en la que me encuentro
          this.activo.splice(this.activo.indexOf(pos), 1); // si es así, lo elimno de activos
          removed = true;
        }
      });

      if(!removed) // si no lo he eliminado
        this.activo.push(aux); // lo añado a activo

      this.isCorrect(); // y compruebo si está activo


    }


  }


  isSelected(row : number, col: number): boolean {

    let aux = false;


    this.activo.forEach( pos => {// para cada activo
      if(pos.row == row && pos.col == col){ // compruebo si es la Posicion en la que me encuentro
        aux = true; // si es así lo marco a true
      }

    });
    return aux;
  }

  isBlocked(row : number, col: number){
    let aux = false;

    this.blocked.forEach( pos => {// para cada activo
      if(pos.row == row && pos.col == col){ // compruebo si es la Posicion en la que me encuentro
        aux = true; // si es así lo marco a true
      }

    });
    return aux;
  }



  isCorrect(){

    if(this.sopaService.validarPalabra(this.activo)){ // si es valida
      this.blocked.push(... this.activo); // meto las posiciones activas en bloqued
      this.activo = []; // inicializo de nuevo activo
    }
  }

 }
