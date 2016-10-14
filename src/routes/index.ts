import { Application } from 'express'
import * as keystone from 'keystone'
import { View } from 'keystone'

exports = module.exports = function (app: Application) {
  app.get('/api/books', (req, res) => {})
}
 