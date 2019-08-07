Object.defineProperty(navigator, 'product', {
  get () {
    return 'ReactNative'
  }
})

let createStore = require('../')

function counter (store) {
  store.on('@init', () => ({ count: 0, started: true }))
  store.on('inc', (state, value) => ({ count: state.count + value }))
}

it('prints dispatches', () => {
  jest.spyOn(console, 'log').mockImplementation(() => { })
  let logger = require('../devtools/logger.browser')
  let store = createStore([counter, logger])
  store.dispatch('inc', 2)
  expect(console.log.mock.calls).toEqual([
    ['action', '@init'],
    ['changed', 'count, started', { count: 0, started: true }],
    ['action', 'inc', 2],
    ['changed', 'count', { count: 2, started: true }]
  ])
})