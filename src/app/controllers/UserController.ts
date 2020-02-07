/* eslint-disable camelcase */

import { Request, Response } from 'express'
import User from '../models/User'

class UserController {
  public async store (req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    const checkDuplicateEmail = await User.findOne({ where: { email } })

    if (checkDuplicateEmail) {
      res.status(400).json({ error: 'Duplicated email' })
    }

    // eslint-disable-next-line @typescript-eslint/camelcase
    const { id, password, name, created_at } = await User.create(req.body)

    return res.json({
      // eslint-disable-next-line @typescript-eslint/camelcase
      id, email, password, name, created_at
    })
  }
}

export default new UserController()
