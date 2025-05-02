import { Injectable, signal } from '@angular/core';
import { Posicion } from '../interface/position.interface';



@Injectable({ providedIn: 'root' })
export class SopaService {
  tam: number = 20;

  sopa = Array<Array<string>>(this.tam).fill([]).map(() =>
    Array<string>(this.tam).fill('')
  );

  // listaPalabras = [ 'COCHE'];
  listaPalabras = [ 'COCHE', 'PERRO'];
  listaBlocked: string[] = [];

  terminado = signal(false);

  generarSopa(): string[][] {



    for (let word of this.listaPalabras) {
      let placed = false;
      while (!placed) {
        const dir = Math.random() > 0.5 ? 'H' : 'V'; // obtengo si va a ser horizontal o verical
        const row = Math.floor(Math.random() * this.tam); // obtengo el row de inicio
        const col = Math.floor(Math.random() * this.tam); // obtengo el col de inicio
        if (
          dir === 'H' &&
          col + word.length <= this.tam // si es horizontal y cabe
        ) {
          for (let i = 0; i < word.length; i++) {
            this.sopa[row][col + i] = word[i].toUpperCase(); // la meto en las posciones
          }
          placed = true; // y marco que ya se ha puesto
        } else if (
          dir === 'V' &&
          row + word.length <= this.tam
        ) {
          for (let i = 0; i < word.length; i++) {
            this.sopa[row + i][col] = word[i].toUpperCase();
          }
          placed = true;
        }
      }
    }

    // Rellenar los huecos con letras aleatorias
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i = 0; i < this.tam; i++) {
      for (let j = 0; j < this.tam; j++) {
        if (!this.sopa[i][j]) { // si no esta ocupado
          this.sopa[i][j] =
            alphabet[Math.floor(Math.random() * alphabet.length)]; // meto una de las letras del array
        }
      }
    }

    return this.sopa;
  }

  // private isOccuped(
  //   row: number,
  //   col: number,
  //   tamPalabra: number,
  //   dir: 'H' | 'V'
  // ): boolean {
  //   if (dir === 'H') {
  //     for (let i = col; i < tamPalabra && i < this.tam; i++) {
  //       if (this.sopa[row][i]) return true;
  //     }
  //   } else {
  //     for (let i = row; i < tamPalabra && i < this.tam; i++) {
  //       if (this.sopa[i][col]) return true;
  //     }
  //   }

  //   return false;
  // }

  validarPalabra(activo: Posicion[]): boolean {


    const arrayPalabra = activo.map(pos => this.sopa[pos.row][pos.col]); // obtengo las letras de las posiciones

    const palabra = arrayPalabra.join(''); // lo junto a un solo string

    if(this.listaPalabras.includes(palabra)){
      this.listaBlocked.push(palabra); // añado la palabra
      if(this.listaBlocked.length == this.listaPalabras.length) { // si estan las mismas palabras
        this.terminado.set(true); // marco como terminado
      }
      return true;
    }


    return false;
  }
}
