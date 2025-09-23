
import type { HttpContext } from '@adonisjs/core/http'
import UsersService from '#services/users_service'
import User from '#models/user'


export default class UsersController {
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
        const user = await User.findOrFail(params.id)
        await user.delete()

        return new UsersService().delete(params.id)
    }
}