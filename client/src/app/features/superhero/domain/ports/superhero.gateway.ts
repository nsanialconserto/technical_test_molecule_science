import { Observable } from 'rxjs'
import { Superhero } from '../models/superhero.model'

export abstract class SuperheroGateway {
  abstract getSuperheroes$(): Observable<Superhero[]>
  abstract getSuperheroById$(id: string): Observable<Superhero | null>
  abstract createSuperhero$(name: string, power: string): Observable<Superhero | null>
  abstract updateSuperhero$(id: string, input: { name?: string; power?: string }): Observable<Superhero | null>
}
