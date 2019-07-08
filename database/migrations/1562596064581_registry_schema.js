'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RegistrySchema extends Schema {
  up () {
    this.create('registries', (table) => {
      table.increments()
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('registries')
  }
}

module.exports = RegistrySchema
