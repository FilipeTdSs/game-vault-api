import User from '#models/user'

export default class UsersService {
    async login(email: string, password: string) {
        const user = await User.verifyCredentials(email, password)
        const token = await User.accessTokens.create(user)
    
        return {
          type: 'bearer',
          value: token.value!.release(),
        }
    }
    async show(id: any) {
        const user = await User.findOrFail(id)
        if(!user) throw new Error('User not found')

        return {
            message: 'User found',
            user
        }
    }

    async store(data: object) {
        const user = await User.create(data)
        if(!user) throw new Error('User not created')

        return {
            message: 'User created',
            user
        }
    }

    async update(id: number, data: object){
        const user = await User.findOrFail(id)
        if(!user) throw new Error('User not found')

        user.merge(data)
        await user.save()

        return {
            message: 'User updated',
            user
        }
    }

    async delete(id: number){
        const user = await User.findOrFail(id)
        if(!user) throw new Error('User not found')

        await user.delete()

        return {
            message: 'User deleted',
            user
        }
    }
}