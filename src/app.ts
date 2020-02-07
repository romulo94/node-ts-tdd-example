import { config } from 'dotenv'

import express, {
  Application,
  ErrorRequestHandler,
  json,
  Request,
  Response, NextFunction
} from 'express'

import cors from 'cors'
import 'express-async-errors'

import Youch from 'youch'

import routes from './routes'

import './database'

config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

class App {
    public server: Application;

    public constructor () {
      this.server = express()

      this.middlewares()
      this.routes()
      this.exceptionHandler()
    }

    private middlewares (): void {
      this.server.use(cors())
      this.server.use(json())
    }

    private routes (): void {
      this.server.use(routes)
    }

    private exceptionHandler (): void {
      this.server.use(
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        async (
          err: ErrorRequestHandler,
          req: Request,
          res: Response,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          _next: NextFunction
        ) => {
          if (process.env.NODE_ENV === 'development') {
            const errors = await new Youch(err, req).toJSON()

            return res.status(500).json(errors)
          }
          return res
            .status(500)
            .json({ error: 'Internal server error.' })
        }
      )
    }
}

export default new App().server
