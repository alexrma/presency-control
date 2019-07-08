'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Registry = use('App/Models/Registry')
const { validate } = use('Validator')
/**
 * Resourceful controller for interacting with registries
 */
class RegistryController {
  /**
   * Show a list of all registries.
   * GET registries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const registries = await Registry.all()
    
    return view.render('registry.index', { registries: registries.toJSON() })
  }

  /**
   * Render a form to be used for creating a new registry.
   * GET registries/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new registry.
   * POST registries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response , session }) {
    const validation = await validate(request.all(), {
      description: 'required|min:3|max:255',
      hour: 'required|min:3|max:255',
    })
  
    // show error messages upon validation fail
    if (validation.fails()) {
      session.withErrors(validation.messages())
              .flashAll()
  
      return response.redirect('back')
    }
  
    // persist to database
    const registry = new Registry()
    registry.description = request.input('description')
    registry.hour = request.input('hour')
    await registry.save()
  
    // Fash success message to session
    session.flash({ notification: 'Registro añadido' })
  
    return response.redirect('back')
  }

  /**
   * Display a single registry.
   * GET registries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing registry.
   * GET registries/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update registry details.
   * PUT or PATCH registries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a registry with id.
   * DELETE registries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = RegistryController
