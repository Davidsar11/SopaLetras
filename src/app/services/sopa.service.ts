import { Injectable, signal } from '@angular/core';
import { Posicion } from '../interface/position.interface';
import { listGrande } from '../interface/palabras';

// const listaGrande = [
//   'COCHE', 'PERRO', 'GATO', 'CASA', 'ARBOL', 'FLOR', 'LUNA', 'SOL', 'AGUA', 'FUEGO',
//   'TIERRA', 'AIRE', 'NUBE', 'LLUVIA', 'VIENTO', 'TRUENO', 'RAYO', 'MAR', 'OLAS', 'RÍO',
//   'MONTAÑA', 'VALLE', 'BOSQUE', 'CAMPO', 'PRADO', 'CIUDAD', 'PUEBLO', 'CALLE', 'AVENIDA', 'CARRETERA',
//   'PUENTE', 'TÚNEL', 'CAMIÓN', 'TREN', 'AVIÓN', 'BARCO', 'BICICLETA', 'MOTO', 'HELICE', 'RODAJE',
//   'RUEDA', 'MOTOR', 'TUBO', 'ESCAPE', 'ACEITE', 'BATERÍA', 'FRENO', 'EMBRAGUE', 'VOLANTE', 'ASIENTO',
//   'CINTURÓN', 'ESPEJO', 'RETROVISOR', 'FARO', 'NEUMÁTICO', 'PARACHOQUES', 'CAPÓ', 'MALETERO', 'PUERTA', 'VENTANA',
//   'CRISTAL', 'LUNETA', 'LIMPIAPARABRISAS', 'RADIO', 'GPS', 'CLAXON', 'ANTENA', 'AIRBAG', 'TABLERO', 'CUADRO',
//   'RELOJ', 'CUENTA', 'KILÓMETROS', 'VELOCIDAD', 'COMBUSTIBLE', 'GASOLINA', 'DIÉSEL', 'HÍBRIDO', 'ELÉCTRICO', 'RECARGA',
//   'ENCHUFE', 'CABLE', 'BATERÍA', 'ENERGÍA', 'POTENCIA', 'AUTONOMÍA', 'TIEMPO', 'VEHÍCULO', 'TRANSPORTE', 'MOVILIDAD',
//   'ROBOT', 'ORDENADOR', 'PANTALLA', 'TECLADO', 'RATÓN', 'ALTAVOZ', 'MICRÓFONO', 'CÁMARA', 'RED', 'CABLEADO',
//   'INTERNET', 'WIFI', 'BLUETOOTH', 'SERVIDOR', 'CLIENTE', 'SOFTWARE', 'HARDWARE', 'PROGRAMA', 'SISTEMA', 'FICHERO',
//   'DOCUMENTO', 'ARCHIVO', 'CARPETA', 'IMAGEN', 'VÍDEO', 'MÚSICA', 'SONIDO', 'TEXTO', 'CÓDIGO', 'LENGUAJE',
//   'PYTHON', 'JAVA', 'JAVASCRIPT', 'HTML', 'CSS', 'SQL', 'RUBY', 'PHP',
//   'NODE', 'ANGULAR', 'REACT', 'VUE', 'SPRING', 'DJANGO', 'FLASK', 'LARAVEL', 'EXPRESS', 'NET',
//   'BASE', 'DATOS', 'MYSQL', 'POSTGRES', 'MONGODB', 'ORACLE', 'FIREBASE', 'JSON', 'XML', 'CSV',
//   'EXCEL', 'WORD', 'POWERPOINT', 'GOOGLE', 'CHROME', 'FIREFOX', 'SAFARI', 'EDGE', 'WINDOWS', 'LINUX',
//   'UBUNTU', 'DEBIAN', 'FEDORA', 'REDHAT', 'ANDROID', 'IOS', 'TABLET', 'MÓVIL', 'SMARTPHONE', 'TELEVISIÓN',
//   'RADIO', 'ANTENA', 'SEÑAL', 'SATÉLITE', 'ESPACIO', 'PLANETA', 'ESTRELLA', 'GALAXIA', 'ASTEROIDE', 'COMETA',
//   'TIEMPO', 'CLIMA', 'TEMPERATURA', 'HUMEDAD', 'PRESIÓN', 'VIENTO', 'TORMENTA', 'HURACÁN', 'TORNADO', 'NEVADA',
//   'GRANIZO', 'ESCARCHA', 'HIELO', 'NIEVE', 'CALOR', 'FRÍO', 'PRIMAVERA', 'VERANO', 'OTOÑO', 'INVIERNO',
//   'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE',
//   'NOVIEMBRE', 'DICIEMBRE', 'DÍA', 'SEMANA', 'MES', 'AÑO', 'SIGLO', 'MILENIO', 'SEGUNDO', 'MINUTO',
//   'HORA', 'RELOJ', 'CALENDARIO', 'TIEMPO', 'PASADO', 'PRESENTE', 'FUTURO', 'MAÑANA', 'TARDE', 'NOCHE',
//   'MADRUGADA', 'ALBA', 'OCASO', 'LUZ', 'SOMBRA', 'OSCURA', 'BRILLO', 'REFLEJO', 'CRISTALINO', 'OPACO', ];

@Injectable({ providedIn: 'root' })
export class SopaService {
  tam: number = 20;

  sopa = Array<Array<string>>(this.tam).fill([]).map(() =>
    Array<string>(this.tam).fill('')
  );

  inicio = Math.random() * listGrande.length;
  // listaPalabras = [ 'COCHE'];
  // listaPalabras = listaGrande.slice(this.inicio, this.inicio + 10 );
  listaPalabras = listGrande.slice(this.inicio, this.inicio + 10 );
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
