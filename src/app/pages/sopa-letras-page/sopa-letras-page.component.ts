import { Component, inject } from '@angular/core';
import { SopaLetrasComponent } from "../../components/sopa-letras/sopa-letras.component";
import { SopaService } from '../../services/sopa.service';

@Component({
  selector: 'app-sopa-letras-page',
  imports: [SopaLetrasComponent],
  templateUrl: './sopa-letras-page.component.html',
})
export default class SopaLetrasPageComponent {
  sopaService = inject(SopaService);

  sopa = this.sopaService.generarSopa();

}
