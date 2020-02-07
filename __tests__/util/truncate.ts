/* eslint-disable @typescript-eslint/explicit-function-return-type */
import database from '../../src/database'

export default async function truncate (): Promise<void> {
  await database.truncate({ force: true, cascade: true })
}
