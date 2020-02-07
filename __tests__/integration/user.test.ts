/* eslint-disable @typescript-eslint/no-explicit-any */
import request from 'supertest'
import bcrypt from 'bcryptjs'
import app from '../../src/app'
import User from '../../src/app/models/User'

import truncate from '../util/truncate'

describe('User', (): any => {
  beforeEach(async (): Promise<void> => {
    await truncate()
  })

  const defaultUser: any = {
    name: 'Rômulo Rocha',
    password: '123456',
    email: 'romulorocha063@gmail.com'

  }

  it('should encrypt user password when new user created', async ():Promise<void> => {
    const user: any = await User.create(defaultUser)

    const compareHash = await bcrypt.compare('123456', user.password_hash)

    expect(compareHash).toBe(true)
  })

  it('should be able to register', async ():Promise<void> => {
    const response = await request(app)
      .post('/user')
      .send(defaultUser)

    expect(response.status).toBe(200)
  })

  it('should not be able to register with ducplicated email', async ():Promise<void> => {
    await request(app)
      .post('/user')
      .send(defaultUser)

    const response = await request(app)
      .post('/user')
      .send(defaultUser)

    expect(response.status).toBe(400)
  })
})
