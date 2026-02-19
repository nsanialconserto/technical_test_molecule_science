import { inject, Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";
import { gql } from "apollo-angular";
import { Superhero } from "../../domain/models/superhero.model";

export type GetSuperheroByIdQuery = {
  superhero: Superhero;
};

export type GetSuperheroByIdVariables = {
  id: string;
};

export const GetSuperheroByIdDocument = gql`
  query GetSuperheroById($id: String!) {
    superhero(id: $id) {
      id
      name
      power
    }
  }
`;

@Injectable({ providedIn: "root" })
export class GetSuperheroByIdGQL extends Apollo.Query<GetSuperheroByIdQuery, GetSuperheroByIdVariables> {
  override document = GetSuperheroByIdDocument;

  constructor() {
    super(inject(Apollo.Apollo));
  }
}
