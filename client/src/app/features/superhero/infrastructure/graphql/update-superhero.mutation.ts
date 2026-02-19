// TODO étape 3: créer la mutation UpdateSuperhero (id + input { name?, power? })
// Ex: mutation UpdateSuperhero($id: String!, $input: UpdateSuperheroInput!) { updateSuperhero(id: $id, input: $input) { id name power } }
import { Superhero } from "../../domain/models/superhero.model";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
import { Injectable, inject } from "@angular/core";

export type UpdateSuperheroMutation = {
  updateSuperhero: Superhero;
};

export type UpdateSuperheroVariables = {
  id: string;
  name?: string;
  power?: string;
};

const UpdateSuperheroDocument = gql`
  mutation UpdateSuperhero($id: String!, $name: String!, $power: String!) {
    updateSuperhero(
      id: $id,
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
export class UpdateSuperheroesGQL extends Apollo.Mutation<UpdateSuperheroMutation, UpdateSuperheroVariables> {
  override document = UpdateSuperheroDocument;

  constructor() {
    super(inject(Apollo.Apollo));
  }
}