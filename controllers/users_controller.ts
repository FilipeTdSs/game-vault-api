
import type { HttpContext } from '@adonisjs/core/http'
import UsersService from '#services/users_service'
import { loginValidator } from '#validators/authLogin'
import { createOrUpdateUserValidator } from '#validators/authUser'


export default class UsersController {
  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    return new UsersService().login(email, password)
  }

 async show({ params }: HttpContext) {
        const id = params.id
        return new UsersService().show(id)
    }

    async store({ request }: HttpContext) {
        const data = await request.validateUsing(createOrUpdateUserValidator)

        return new UsersService().store(data)
    }

    async update({ params, request }: HttpContext) {
        const data = await request.validateUsing(createOrUpdateUserValidator)
        const id = params.id

        return new UsersService().update(id, data)
    }

    async delete({ params }: HttpContext) {
        return new UsersService().delete(params.id)
    }
}