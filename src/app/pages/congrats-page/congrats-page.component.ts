import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SopaService } from '../../services/sopa.service';

@Component({
  selector: 'app-congrats-page',
  imports: [RouterLink],
  templateUrl: './congrats-page.component.html',
})
export default class CongratsPageComponent implements AfterViewInit {

  sopaServ = inject(SopaService);

  ngAfterViewInit(): void { // cuando entro en congrats, reinicio todo
    this.sopaServ.terminado.set(false);
    this.sopaServ.listaBlocked= [];
    this.sopaServ.generarSopa();
  }
}
