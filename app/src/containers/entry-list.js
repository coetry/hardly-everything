var html = require('rooch/html')
var ov = require('object.values')
var moment = require('moment')
var Entry = require('../components/entry')

function getDismissedDate (entry) {
  return moment(entry.dateDismissed)
    .add(entry.duration, entry.interval)
    .toDate()
}

function templateEntries (state, emit) {
  var now = moment().toDate()

  var entries = ov(state.entries.all)
    .filter(entry => {
      if (
        !state.ui.entriesViewAll &&
        entry.dateDismissed &&
        entry.duration &&
        entry.interval &&
        entry.visited >= 1
      ) {
        var dismissed = getDismissedDate(entry)
        return dismissed < now
      } else {
        return true
      }
    })
    .sort((a, b) => {
      return state.ui.entriesViewAll
        ? getDismissedDate(b) - getDismissedDate(a)
        : getDismissedDate(a) - getDismissedDate(b)
    })
    .map(entry => Entry(state, entry, emit))

  return entries
}

function emptyEl () {
  return html`<div class="fs2">
    <svg height="50" width="50" viewBox="0 0 100 100"><path d="M50 100C22.386 100 0 77.614 0 50S22.386 0 50 0s50 22.386 50 50-22.386 50-50 50zM20 50.105C20 66.615 33.43 80 50 80s30-13.384 30-29.895c0-.14-60-.14-60 0zM35 41c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm30 0c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z" class="fill-black" fill-rule="evenodd"/></svg>
  </div>`
}

function elEntriesNone (state, emit) {
  return html`
    <div class="fs2 lh1-5 sans fwn">
      There aren’t any links,<br>
      go ahead and
      <span class="curp fwb" onclick=${e => emit('ui:update', {
        stagingActive: !state.ui.stagingActive
      })}>add one</span>?
    </div>
  `
}

module.exports = EntryList

function EntryList (state, emit) {
  var elsEntries = templateEntries(state, emit)
  var isEntriesAll = Object.keys(state.entries.all).length > 0

  var elContent =
      isEntriesAll && elsEntries.length ? elsEntries
    : isEntriesAll && !elsEntries.length ? emptyEl()
    : elEntriesNone(state, emit)

  return html`
    <div class="design-container">
      <div
        class="
          x xw xac xjc tac
          design-font design-background design-color-entry design-block-padding
        "
        style="
          line-height: 1.2;
          min-height: 100vh;
        "
      >
        ${elContent}
      </div>
    </div>
  `
}
