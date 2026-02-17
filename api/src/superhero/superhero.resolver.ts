import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Superhero, UpdateSuperheroInput } from "./superhero.entity";
import { SuperheroService } from "./superhero.service";

@Resolver(() => Superhero)
export class SuperheroResolver {
  constructor(private readonly superheroService: SuperheroService) {}

  @Query(() => [Superhero], { name: "superheroes" })
  async superheroes(): Promise<Superhero[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return this.superheroService.getAll();
  }

  @Mutation(() => Superhero, { nullable: true })
  async updateSuperhero(
    @Args("id") id: string,
    @Args("input") input: UpdateSuperheroInput,
  ): Promise<Superhero | null> {
    const result = await this.superheroService.update(id, input);
    return result ?? null;
  }
}