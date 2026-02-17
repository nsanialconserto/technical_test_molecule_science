const fs = require('fs')
const path = require('path')
const db = {
  superheroes: [
    { id: '1', name: 'Batman', power: 'Intelligence' },
    { id: '2', name: 'Superman', power: 'Flight' },
    { id: '3', name: 'Wonder Woman', power: 'Strength' }
  ]
}
const out = path.join(__dirname, '..', 'db.json')
fs.writeFileSync(out, JSON.stringify(db, null, 2), 'utf-8')
console.log('db.json seeded at', out)
