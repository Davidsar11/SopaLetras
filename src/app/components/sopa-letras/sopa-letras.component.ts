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


    if(!this.isBlocked(row,col)){
      this.activo.forEach( pos => {
        if(pos.row == row && pos.col == col){
          this.activo.splice(this.activo.indexOf(pos), 1);
          removed = true;
        }
      });

      if(!removed)
        this.activo.push(aux);

      this.isCorrect();

      
    }


  }


  isSelected(row : number, col: number): boolean {

    let aux = false;


    this.activo.forEach( pos => {
      if(pos.row == row && pos.col == col ){
        aux = true;
      }

    });
    return aux;
  }

  isBlocked(row : number, col: number){
    let aux = false;

    this.blocked.forEach( pos => {
      if(pos.row == row && pos.col == col){
        aux = true;
      }

    });
    return aux;
  }



  isCorrect(){
    console.log(this.blocked)
    if(this.sopaService.validarPalabra(this.activo)){
      this.blocked.push(... this.activo);
      this.activo = [];
    }
  }

 }
