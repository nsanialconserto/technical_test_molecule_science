import { inject, Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";
import { gql } from "apollo-angular";
import { Superhero } from "../models/superhero.model";

export type GetSuperheroesQuery = {
  superheroes: Superhero[];
};

export const GetSuperheroesDocument = gql`
  query GetSuperheroes {
    superheroes {
      id
      name
      power
    }
  }
`;

@Injectable({ providedIn: "root" })
export class GetSuperheroesGQL extends Apollo.Query<
  GetSuperheroesQuery,
  Record<string, never>
> {
  override document = GetSuperheroesDocument;

  constructor() {
    super(inject(Apollo.Apollo));
  }
}
