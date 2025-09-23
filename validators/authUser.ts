import vine, { VineString } from '@vinejs/vine'
import { cpf } from '#validators/rules/ruleCpf'

declare module '@vinejs/vine' {
  interface VineString {
    cpf(): this
  }
}

VineString.macro('cpf', function (this: VineString) {
  return this.use(cpf())
})

export const createOrUpdateUserValidator = vine.compile(
  vine.object({
    cpf: vine.string().cpf().unique({ table: 'users', column: 'cpf' }),
    email: vine.string().email().unique({ table: 'users', column: 'email' }),
    password: vine.string().minLength(8),
    full_name: vine.string().optional(),
  })
)
