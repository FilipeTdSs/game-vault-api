import User from '#models/user'

export default class UsersService {
  async login(email: string, password: string) {
    const user = await User.verifyCredentials(email, password)
    const tokens = await User.accessTokens.all(user)
    const validToken = tokens.find((token) => !token.isExpired())
    if (validToken) return {
      message: 'User logged in',
      type: 'bearer',
      value: validToken.value!.release(),
    }

    if(tokens.length) await Promise.all(
      tokens.map((token) => User.accessTokens.delete(user, token.identifier))
    )
    const recentlyUsedToken = await User.accessTokens.create(user, ['*'], { expiresIn: '10 days' })
    
    return {
      message: 'User logged in',
      type: 'bearer',
      value: recentlyUsedToken.value!.release(),
    }
  }
    async show(id: any) {
        const user = await User.findOrFail(id)
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
        user.merge(data)
        await user.save()

        return {
            message: 'User updated',
            user
        }
    }

    async delete(id: number){
        const user = await User.findOrFail(id)
        await user.delete()

        return {
            message: 'User deleted',
            user
        }
    }
}