const {
  Translate
} = require('@google-cloud/translate')

const translate = new Translate({
  projectId: 'spark-translate-1563211101549'
})

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`listening on port http://localhost:${port}`))

app.get('/translate', async (req, res) => {
  console.log(req.query)

  const {
    text,
    lang
  } = req.query

  const [translation] = await translate.translate(text, lang)

  console.log(`Text: ${text}`)
  console.log(`Translation: ${translation}`)
  res.send({
    text,
    translation
  })
})
