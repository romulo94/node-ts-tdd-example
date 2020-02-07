import app from './app'

const port = process.env.PORT

app.listen(port, (): void => console.log(`server online on PORT: ${port}`))
