
import { Request, Response, Router } from 'express'
import UserController from './app/controllers/UserController'
import StoreController from './app/controllers/StoreController'
import SessionController from './app/controllers/SessionController'

import auth from './app/middlewares/auth'

const routes = Router()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
routes.get('/', (_req: Request, res: Response) => res.json({ message: 'Welcome to Omni CLI' }))

routes.post('/user', UserController.store)
routes.post('/session', SessionController.store)

routes.use(auth)

routes.get('/store', StoreController.index)
routes.post('/store', StoreController.store)
routes.put('/store/:id', StoreController.update)
routes.delete('/store/:id', StoreController.delete)

export default routes
