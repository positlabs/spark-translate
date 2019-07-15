const D = require('Diagnostics')
const Scene = require('Scene')
const Locale = require('Locale')
const Networking = require('Networking')

const languageAndTerritory = Locale.fromDevice
D.log('My location and territory are ' + languageAndTerritory)
const localeAsArray = languageAndTerritory.split('_')
let language = localeAsArray[0]

language = 'es'

const hello = {
  en: 'hello',
  fr: 'bonjour',

}

const defaultTxt = 'hello'
const txt = Scene.root.find('hello_txt')
txt.text = hello[language] || defaultTxt

if (!hello[language]) {
  D.log('translation needed!')
  const url = `http://localhost:3000/translate?text=${defaultTxt}&lang=${language}`
  const request = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
  }
  Networking.fetch(url, request).then(function (result) {
    if ((result.status >= 200) && (result.status < 300)) {
      return result.json()
    }
    throw new Error('HTTP status code - ' + result.status)
  }).then(function (json) {
    Diagnostics.log('Successfully sent - ' + json.translation)
    txt.text = json.translation
  }).catch(function (error) {
    Diagnostics.log('Error - ' + error.message)
  })
}
