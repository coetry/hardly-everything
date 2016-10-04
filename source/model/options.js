const db = require('../db/options')
const clone = require('clone-deep')
const x = require('xtend')

const namespace = 'options'

const typography = {
  moderat: {
    name: 'Moderat',
    key: 'moderat',
    value: 'Moderat',
    weights: [400, 700]
  },
  cabin: {
    name: 'Cabin',
    key: 'cabin',
    value: 'Cabin',
    weights: [400]
  },
  garamond: {
    name: 'Cormorant Garamond',
    key: 'garamond',
    value: 'Cormorant+Garamond',
    weights: [400]
  },
  inconsolata: {
    name: 'Inconsolata',
    key: 'inconsolata',
    value: 'Inconsolata',
    weights: [400]
  },
  montserrat: {
    name: 'Montserrat',
    key: 'montserrat',
    value: 'Montseratt',
    weights: [400]
  },
  openSans: {
    name: 'Open Sans',
    key: 'openSans',
    value: 'Open+Sans',
    weights: [400, 600]
  },
  spaceMono: {
    name: 'Space Mono',
    key: 'spaceMono',
    value: 'Space+Mono',
    weights: [400]
  },
  workSans: {
    name: 'Work Sans',
    key: 'workSans',
    value: 'Work+Sans',
    weights: [400]
  }
}

exports.state = {
  design: {
    colorBg: {
      name: 'Background',
      key: 'colorBg',
      type: 'text',
      visible: false,
      value: '#fff'
    },
    colorText: {
      name: 'Text',
      key: 'colorText',
      type: 'text',
      visible: false,
      value: '#000'
    },
    font: {
      name: 'Font',
      key: 'font',
      type: 'dropdown',
      value: 'Moderat-Bold',
      visible: true
    },
    scale: {
      name: 'Scale',
      key: 'scale',
      type: 'range',
      min: 5,
      max: 72,
      value: 35,
      visible: true
    },
    spacing: {
      name: 'Spacing',
      key: 'spacing',
      type: 'range',
      min: 0,
      max: 25,
      value: 5,
      visible: true
    }
  },
  typography: typography
}

exports.subscriptions = [
  (send, done) => {
    db.update({ }, exports.state)
    db.get(data => {
      send('options:update', data, done)
    })
  }
]

exports.reducers = {
  update: (data, state) => (x(state, data))
}

exports.effects = {
  design: (data, state, send, done) => {
    const newState = clone(state)
    newState.design[data.key].value = data.value
    db.update(data, newState)
    send('options:update', newState, done)
  }
}

exports.namespace = namespace
