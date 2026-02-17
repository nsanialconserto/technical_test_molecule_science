import { Module } from '@nestjs/common'
import { SuperheroResolver } from './superhero.resolver'
import { SuperheroService } from './superhero.service'

@Module({
  providers: [SuperheroResolver, SuperheroService]
})
export class SuperheroModule {}
