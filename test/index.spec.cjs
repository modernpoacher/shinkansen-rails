const {
  expect // @ts-expect-error
} = require('chai')

const {
  Rails
} = require('#rails')

describe('#rails', () => {
  it('is a function', () => {
    expect(Rails)
      .to.be.a('function')
  })
})
