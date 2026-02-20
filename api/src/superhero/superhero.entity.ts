import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Superhero {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field()
  power: string
}

@InputType()
export class CreateSuperheroInput {
    @Field()
    name: string
    
    @Field()
    power: string
}

@InputType()
export class UpdateSuperheroInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  power?: string
}
