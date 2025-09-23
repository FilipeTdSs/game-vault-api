
import type { HttpContext } from '@adonisjs/core/http'
import UsersService from '#services/users_service'


export default class UsersController {
  async login({ request }: HttpContext) {
    const { email, password } = request.all()
    if(!email || !password) throw new Error('Invalid credentials')

    return new UsersService().login(email, password)
  }

 async show({ params }: HttpContext) {
        const id = params.id
        return new UsersService().show(id)
    }

    async store({ request }: HttpContext) {
        const data = request.only(['email', 'password'])

        return new UsersService().store(data)
    }

    async update({ params, request }: HttpContext) {        
        const data = request.only(['email', 'password', 'full_name'])
        const id = params.id

        return new UsersService().update(id, data)
    }

    async delete({ params }: HttpContext) {
        const id = params.id
        if(!id) throw new Error('User not found')

        return new UsersService().delete(params.id)
    }
}