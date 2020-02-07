import { Request, Response } from 'express'
import Store from '../models/Store'

class StoreController {
  public async index (_req: Request, res: Response): Promise<Response> {
    const response = await Store.findAll()

    return res.json(response)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const { name,
      address,
      longitude,
      latitude } = req.body

    await Store.create({ name,
      address,
      longitude,
      latitude })

    return res.status(201).json()
  }
  public async update (req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name,
      address,
      longitude,
      latitude } = req.body

    await Store.update({
      name,
      address,
      longitude,
      latitude
    }, { where: { id } })

    return res.status(204).json()
  }
  public async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    await Store.destroy({ where: {
      id
    } })

    return res.status(202).json()
  }
}

export default new StoreController()
