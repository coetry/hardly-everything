module.exports = pages

function pages (state, emitter) {
  state.pages = {
    log: {
      title: 'Log',
      slug: '/',
      content: require('../content/log')
    },
    about: {
      title: 'About',
      slug: 'about',
      content: require('../content/q-and-a')
    },
    tips: {
      title: 'Tips',
      slug: 'tips',
      content: require('../content/tips')
    }
  }
}