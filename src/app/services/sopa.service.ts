import { Injectable, signal } from '@angular/core';
import { Posicion } from '../interface/position.interface';



@Injectable({ providedIn: 'root' })
export class SopaService {
  tam: number = 20;

  sopa = Array<Array<string>>(this.tam).fill([]).map(() =>
    Array<string>(this.tam).fill('')
  );

  listaPalabras = ['AUTOBUS', 'COCHE', 'PERRO', 'PELOTA', 'BARCELONA'];

  generarSopa(): string[][] {



    for (let word of this.listaPalabras) {
      let placed = false;
      while (!placed) {
        const dir = Math.random() > 0.5 ? 'H' : 'V';
        const row = Math.floor(Math.random() * this.tam);
        const col = Math.floor(Math.random() * this.tam);
        if (
          dir === 'H' &&
          col + word.length <= this.tam
          // &&
          // this.isOccuped(row, col, word.length, 'H')
        ) {
          for (let i = 0; i < word.length; i++) {
            this.sopa[row][col + i] = word[i].toUpperCase();
          }
          placed = true;
        } else if (
          dir === 'V' &&
          row + word.length <= this.tam
          // &&
          // this.isOccuped(row, col, word.length, 'V')
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
        if (!this.sopa[i][j]) {
          this.sopa[i][j] =
            alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }

    return this.sopa;
  }

  private isOccuped(
    row: number,
    col: number,
    tamPalabra: number,
    dir: 'H' | 'V'
  ): boolean {
    if (dir === 'H') {
      for (let i = col; i < tamPalabra && i < this.tam; i++) {
        if (this.sopa[row][i]) return true;
      }
    } else {
      for (let i = row; i < tamPalabra && i < this.tam; i++) {
        if (this.sopa[i][col]) return true;
      }
    }

    return false;
  }

  validarPalabra(activo: Posicion[]): boolean {


    const arrayPalabra = activo.map(pos => this.sopa[pos.row][pos.col]);

    const palabra = arrayPalabra.join('');

    console.log(palabra);
    

    return this.listaPalabras.includes(palabra);
  }
}
