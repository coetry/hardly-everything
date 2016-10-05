const choo = require('choo')
const log = require('choo-log')

require('./db')

const app = choo()
app.use(log())

app.model(require('./model/user'))
app.model(require('./model/entries'))
app.model(require('./model/options'))
app.model(require('./model/staging'))
app.model(require('./model/ui'))

app.model(require('./containers/panel-options').model)

app.router((route) => [
  route('/', require('./templates/index')),
  route('/data', require('./templates/export'))
])

module.exports = app