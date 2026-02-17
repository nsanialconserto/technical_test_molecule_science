import {
  ApplicationConfig,
  inject,
  provideZonelessChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";
import { InMemoryCache } from "@apollo/client/core";
import { provideApollo } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { appRoutes } from "./app.routes";
import { GraphqlSuperheroGateway } from "./features/superheroes/adapters/graphql-superhero.gateway";
import { SuperheroGateway } from "./features/superheroes/ports/superhero.gateway";
import { SuperheroesStore } from "./features/superheroes/superheroes.store";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    { provide: SuperheroGateway, useClass: GraphqlSuperheroGateway },
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({ uri: "http://localhost:3000/graphql" }),
        cache: new InMemoryCache(),
      };
    }),
    SuperheroesStore,
  ],
};
