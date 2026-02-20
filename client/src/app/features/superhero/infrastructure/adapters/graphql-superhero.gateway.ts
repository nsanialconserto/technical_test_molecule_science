import { Injectable, inject } from "@angular/core";
import { map } from "rxjs";
import { SuperheroGateway } from "../../domain/ports/superhero.gateway";
import { GetSuperheroesGQL } from "../graphql/get-superheroes.query";
import { GetSuperheroByIdGQL } from "../graphql/get-superhero-byid.query";
import { UpdateSuperheroesGQL } from "../graphql/update-superhero.mutation";
import { CreateSuperheroesGQL } from "../graphql/create-superhero.mutation";
// TODO étape 3: injecter GetSuperheroesGQL et UpdateSuperheroGQL, implémenter getSuperheroes$ et updateSuperhero$
@Injectable({ providedIn: "root" })
export class GraphqlSuperheroGateway extends SuperheroGateway {
    readonly getSuperheroesGQL = inject<GetSuperheroesGQL>(GetSuperheroesGQL);
    readonly getSuperheroByIdGQL = inject<GetSuperheroByIdGQL>(GetSuperheroByIdGQL);
    readonly createSuperheroGQL = inject<CreateSuperheroesGQL>(CreateSuperheroesGQL);
    readonly updateSuperheroesGQL = inject<UpdateSuperheroesGQL>(UpdateSuperheroesGQL);

    getSuperheroes$() {
        return this.getSuperheroesGQL
            .fetch()
            .pipe(map((result) => result.data?.superheroes ?? []));
    }

    getSuperheroById$(id: string) {
        return this.getSuperheroByIdGQL
            .fetch({ variables: { id } })
            .pipe(map((result) => result.data?.superhero ?? null));
    }

    createSuperhero$(name: string, power: string) {
        return this.createSuperheroGQL
            .mutate({
                variables: { name, power }
            }).pipe(map((result) => result.data?.createSuperhero ?? null));
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
