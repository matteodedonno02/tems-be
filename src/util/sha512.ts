import * as crypto from 'crypto'

export const sha512 = (value: string) => {
    const hash = crypto.createHash('sha512')
    hash.update(value)
    return hash.digest('hex')
}