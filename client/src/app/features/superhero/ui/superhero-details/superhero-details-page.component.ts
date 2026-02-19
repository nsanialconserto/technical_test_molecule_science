import { Component, computed, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { SuperheroDetails } from './superhero-details.component';

@Component({
  standalone: true,
  imports: [SuperheroDetails],
  template: `
  @if(_id(); as heroId) {
    <app-superhero-details [superHeroId]="heroId"></app-superhero-details>
  }`,
})
export class SuperheroDetailsPage {
    private route = inject(ActivatedRoute);
    private _paramMap = toSignal(this.route.paramMap);
    readonly _id = computed(() => this._paramMap()?.get('id'));
}
