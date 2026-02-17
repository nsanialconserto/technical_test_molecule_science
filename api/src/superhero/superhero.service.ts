import { Injectable } from '@nestjs/common'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import { Superhero } from './superhero.entity'

const DB_PATH = join(process.cwd(), 'db.json')

interface Db {
  superheroes: Superhero[]
}

function readDb(): Db {
  if (!existsSync(DB_PATH)) {
    return { superheroes: [] }
  }
  const raw = readFileSync(DB_PATH, 'utf-8')
  return JSON.parse(raw) as Db
}

function writeDb(db: Db): void {
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8')
}

@Injectable()
export class SuperheroService {
  getAll(): Superhero[] {
    return readDb().superheroes
  }

  getById(id: string): Superhero | undefined {
    return readDb().superheroes.find(h => h.id === id)
  }

  create(name: string, power: string): Superhero {
    const db = readDb()
    const id = String(Date.now())
    const hero: Superhero = { id, name, power }
    db.superheroes.push(hero)
    writeDb(db)
    return hero
  }

  update(id: string, updates: { name?: string; power?: string }): Superhero | undefined {
    const db = readDb()
    const index = db.superheroes.findIndex(h => h.id === id)
    if (index === -1) return undefined
    const current = db.superheroes[index]
    db.superheroes[index] = {
      ...current,
      ...(updates.name != null && { name: updates.name }),
      ...(updates.power != null && { power: updates.power })
    }
    writeDb(db)
    return db.superheroes[index]
  }
}
