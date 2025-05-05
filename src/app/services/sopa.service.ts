import { Injectable, signal } from '@angular/core';
import { Posicion } from '../interface/position.interface';
import { listGrande } from '../interface/palabras';



@Injectable({ providedIn: 'root' })
export class SopaService {
  tam: number = 20;

  sopa : string[][] = [];

  // listaPalabras = [ 'COCHE'];
  // listaPalabras = listaGrande.slice(this.inicio, this.inicio + 10 );
  listaPalabras: string[] = [];
  listaBlocked: string[] = [];

  terminado = signal(false);

  private inicializarSopa(){
    this.sopa =  Array<Array<string>>(this.tam).fill([]).map(() =>
      Array<string>(this.tam).fill(''));
  }

  private generarNuevaLista(){
    this.listaPalabras = [];
    while(this.listaPalabras.length < 1){
      const inicio = Math.floor (Math.random() * listGrande.length);
      if(!this.listaPalabras.includes(listGrande[inicio]))
        this.listaPalabras.push(listGrande[inicio]);
    }
  }

  generarSopa(): string[][] {

    this.terminado.set(false);
    this.listaBlocked = [];
    this.generarNuevaLista();
    this.inicializarSopa();



    for (let word of this.listaPalabras) {
      let placed = false;
      while (!placed) {
        const dir = Math.random() > 0.66 ? 'H' : Math.random() > 0.5 ? 'V' : 'D'; // obtengo si va a ser horizontal o verical
        const row = Math.floor(Math.random() * this.tam); // obtengo el row de inicio
        const col = Math.floor(Math.random() * this.tam); // obtengo el col de inicio
        if (
          dir === 'H' &&
          col + word.length <= this.tam // si es horizontal y cabe
          && !this.isOccuped(  row,col,word.length, 'H') //  y no está ocupado ya
        ) {
          console.log('H -->' ,word, ' | ',row ,  ' | ', col, ' | ', );
          for (let i = 0; i < word.length; i++) {
            this.sopa[row][col + i] = word[i].toUpperCase(); // la meto en las posciones
          }
          placed = true; // y marco que ya se ha puesto
        } else if (
          dir === 'V' && // palabra vertical
          row + word.length <= this.tam // no se sale de el tamaño
          && !this.isOccuped( row,col,word.length, 'V') // y no está ocupado ya

        ) {
          console.log('V -->' , word, ' | ',row ,  ' | ', col, ' | ', );
          for (let i = 0; i < word.length; i++) {
            this.sopa[row + i][col] = word[i].toUpperCase();
          }
          placed = true;
        }

        else if (
          dir === 'D' && // palabra diagonal
          row + word.length <= this.tam // no se sale de el tamaño
          &&
          col + word.length <= this.tam
          && !this.isOccuped( row,col,word.length, 'D') // y no está ocupado ya

        ) {
          console.log('D -->' , word, ' | ',row ,  ' | ', col, ' | ', );
          for (let i = 0; i < word.length; i++) {
            this.sopa[row + i][col+i] = word[i].toUpperCase();
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

  private isOccuped(
    row: number,
    col: number,
    tamPalabra: number,
    dir: 'H' | 'V'| 'D'
  ): boolean {
    if (dir === 'H') {
      for (let i = col; i < col + tamPalabra ; i++) {
        if (this.sopa[row][i]) return true;

      }
    } else if( dir === 'V') {
      for (let i = row; i < row + tamPalabra; i++) {
        if (this.sopa[i][col]) return true;

      }
    }

    else if( dir === 'D') {
      for (let i = 0; i < tamPalabra; i++) {
        if (this.sopa[row + i][col + i]) return true;
      }
    }

    return false;
  }

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
