import * as Apollo from "apollo-angular";
import { Superhero } from "../../domain/models/superhero.model";
import { inject, Injectable } from "@angular/core";

export type CreateSuperheroMutation = {
  createSuperhero: Superhero;
};

export type CreateSuperheroVariables = {
  name: string;
  power: string;
};

const CreateSuperheroDocument = Apollo.gql`
  mutation CreateSuperhero($name: String!, $power: String!) {
    createSuperhero(
      input: {
        name: $name,
        power: $power
      }
    ) {
      id
      name
      power
    }
  }
`;

@Injectable({ providedIn: "root" })
export class CreateSuperheroesGQL extends Apollo.Mutation<CreateSuperheroMutation, CreateSuperheroVariables> {
  override document = CreateSuperheroDocument;

  constructor() {
    super(inject(Apollo.Apollo));
  }
}