import { Request, Response } from 'express'

import User from '../models/User'

class SessionController {
  public async index (req: Request, res: Response): Promise<Response> {
    return res.json({ id: req.userId, type: req.userType })
  }
  public async store (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    // verificar se o email ja existe
    const response = await User.findOne({
      where: { email }
    })

    if (!response) return res.status(404).json({ error: 'User does not exists' })

    if (!(await response.checkPassword(password))) return res.status(401).json({ error: 'Password is wrong' })

    const token = await response.generateToken()

    return res.status(200).json({ token })
  }
}

export default new SessionController()
