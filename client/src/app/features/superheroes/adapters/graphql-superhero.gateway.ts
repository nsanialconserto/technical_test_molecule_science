import { Injectable, inject } from "@angular/core";
import { map } from "rxjs";
import { GetSuperheroesGQL } from "../graphql/get-superheroes.query";
import { SuperheroGateway } from "../ports/superhero.gateway";
import { UpdateSuperheroesGQL } from "../graphql/update-superhero.mutation";
// TODO étape 3: injecter GetSuperheroesGQL et UpdateSuperheroGQL, implémenter getSuperheroes$ et updateSuperhero$
@Injectable({ providedIn: "root" })
export class GraphqlSuperheroGateway extends SuperheroGateway {
  readonly getSuperheroesGQL = inject<GetSuperheroesGQL>(GetSuperheroesGQL);
  readonly updateSuperheroesGQL = inject<UpdateSuperheroesGQL>(UpdateSuperheroesGQL);

  getSuperheroes$() {
    return this.getSuperheroesGQL
      .fetch()
      .pipe(map((result) => result.data?.superheroes ?? []));
  }

  updateSuperhero$(id: string, input: { name?: string; power?: string }) {
    return this.updateSuperheroesGQL
      .mutate({
        variables: {
          id,
          name: input.name!,
          power: input.power!
        }
      })
      .pipe(map((result) => result.data?.updateSuperhero ?? null));
  }
}
