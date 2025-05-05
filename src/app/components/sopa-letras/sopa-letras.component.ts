import { AfterViewInit, Component, inject, input, signal } from '@angular/core';
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

  activo: Posicion[] = [];

  blocked: Posicion[] = [];

  addLetra(row: number, col: number): void {
    const aux = { row: row, col: col };

    let removed = false;

    if (!this.isBlocked(row, col)) {
      // si la posición no esta bloqueada (ya se ha acertad antes)
      this.activo.forEach((pos) => {
        // para cada activo
        if (pos.row == row && pos.col == col) {
          // compruebo si es la Posicion en la que me encuentro
          this.activo.splice(this.activo.indexOf(pos), 1); // si es así, lo elimno de activos
          removed = true;
        }
      });

      // si no lo he eliminado
      if (!removed && this.isValidSelection({ row: row, col: col }))
        this.activo.push(aux); // lo añado a activo

      this.isCorrect(); // y compruebo si está activo
    }
  }

  isSelected(row: number, col: number): boolean {
    let aux = false;

    this.activo.forEach((pos) => {
      // para cada activo
      if (pos.row == row && pos.col == col) {
        // compruebo si es la Posicion en la que me encuentro
        aux = true; // si es así lo marco a true
      }
    });
    return aux;
  }

  isBlocked(row: number, col: number) {
    let aux = false;

    this.blocked.forEach((pos) => {
      // para cada activo
      if (pos.row == row && pos.col == col) {
        // compruebo si es la Posicion en la que me encuentro
        aux = true; // si es así lo marco a true
      }
    });
    return aux;
  }

  isCorrect() {
    if (this.sopaService.validarPalabra(this.activo)) {
      // si es valida
      this.blocked.push(...this.activo); // meto las posiciones activas en bloqued
      this.activo = []; // inicializo de nuevo activo
    }
  }

  private isValidSelection(nuevo: Posicion): boolean {
    const tam = this.activo.length;

    if (this.activo.length < 1) return true; // el primero lo paso directo
    else if (this.activo.length < 2) {
      // si ya tengo uno, compruebo si es consecutivo
      if (
        this.activo[tam - 1].col + 1 === nuevo.col && // compruebo si es horizontal
        this.activo[tam - 1].row === nuevo.row
      )
        return true;
      else if (
        this.activo[tam - 1].row + 1 === nuevo.row && // si es vertical
        this.activo[tam - 1].col === nuevo.col
      )
        return true;
      else if (
        // si es
        this.activo[tam - 1].row + 1 === nuevo.row &&
        this.activo[tam - 1].col + 1 === nuevo.col
      )
        return true;
    } else {
      //si ya tengo mas de dos


      const deltaRow = this.activo[1].row - this.activo[0].row;
      const deltaCol = this.activo[1].col - this.activo[0].col;

      // Solo permitimos:
      const isHorizontal = deltaRow === 0 && deltaCol === 1;
      const isVertical = deltaRow === 1 && deltaCol === 0;
      const isDiagonal = deltaRow === 1 && deltaCol === 1;

      if (isHorizontal)
        return (
          this.activo[tam - 1].col + 1 === nuevo.col &&
          this.activo[tam - 1].row === nuevo.row
        );
      else if (isVertical)
        return (
          this.activo[tam - 1].row + 1 === nuevo.row &&
          this.activo[tam - 1].col === nuevo.col
        );
      else if (isDiagonal)
        return (
          this.activo[tam - 1].row + 1 === nuevo.row &&
          this.activo[tam - 1].col + 1 === nuevo.col
        );
    }

    return false;
  }
}
