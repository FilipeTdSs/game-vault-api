import vine from '@vinejs/vine'
import type { FieldContext } from '@vinejs/vine/types'

async function cpfRule(value: unknown, _: any, field: FieldContext) {
    if (typeof value !== 'string') {
        return
    }

  const cpf = value.replace(/[^\d]+/g, '')

  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
    field.report('O campo {{ field }} não é um CPF válido', 'cpf', field)
    return
  }

  const digits = cpf.split('').map(Number)

  const calculateDigit = (slice: number) => {
    let sum = 0
    let multiplier = slice + 1

    for (let i = 0; i < slice; i++) {
      sum += digits[i] * multiplier--
    }

    const remainder = (sum * 10) % 11
    return remainder === 10 ? 0 : remainder
  }

  const firstDigit = calculateDigit(9)
  const secondDigit = calculateDigit(10)

  if (firstDigit !== digits[9] || secondDigit !== digits[10]) {
    field.report('O campo {{ field }} não é um CPF válido', 'cpf', field)
  }
}

export const cpf = vine.createRule(cpfRule)
