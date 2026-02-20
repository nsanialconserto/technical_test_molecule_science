export type Superhero = {
  id: string
  name: string
  power: string
}

export type SuperheroCreationData = {
    name: string,
    power: string
}

export type SuperheroUpdateData = {
    name?: string,
    power?: string
}