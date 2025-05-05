import { Component, effect, inject } from '@angular/core';
import { SopaLetrasComponent } from "../../components/sopa-letras/sopa-letras.component";
import { SopaService } from '../../services/sopa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sopa-letras-page',
  imports: [SopaLetrasComponent],
  templateUrl: './sopa-letras-page.component.html',
})
export default class SopaLetrasPageComponent {
  sopaService = inject(SopaService);
  router = inject(Router);

  sopa = this.sopaService.generarSopa();


  redirigir = effect( ()  => {
    if(this.sopaService.terminado()) { // si he terminado
      console.log('redirigir')
      this.router.navigate(['/congrats']); // redirijo al cogratulations
    }
  })

}
