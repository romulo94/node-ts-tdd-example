import { promisify } from 'bluebird'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import authConfig from '../../config/auth'

export default async (req: Request, res: Response, next: NextFunction): Promise<NextFunction|Response|void> => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: { message: 'Token not found' } })
  }

  try {
    const [, token] = authHeader.split(' ')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded: any = await promisify(jwt.verify)(
      token,
      authConfig.secret
    )

    req.userId = decoded.id
    req.userType = decoded.type

    return next()
  } catch (err) {
    return res.status(401).json({
      error: {
        message: 'Token invalidate.'
      }
    })
  }
}
