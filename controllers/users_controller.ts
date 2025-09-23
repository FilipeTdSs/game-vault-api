import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
 async show({ params }: HttpContext) {
        const user = await User.findOrFail(params.id)
        return {
            message: 'User found',
            user
        }
    }

    async store({ request }: HttpContext) {
        console.log('request:', request)
        const data = request.only(['email', 'password'])
        const user = await User.create(data)
        return {
            message: 'User created',
            user
        }
    }

    async update({ params, request }: HttpContext) {
        const user = await User.findOrFail(params.id)
        
        if(!user) throw new Error('User not found')

        const data = request.only(['email', 'password', 'full_name'])

        user.merge(data)
        await user.save()
        return {
            message: 'User updated',
            user
        }
    }

    async destroy({ params }: HttpContext) {
        const user = await User.findOrFail(params.id)
        await user.delete()

        return {
            message: 'User deleted',
            user
        }
    }
}