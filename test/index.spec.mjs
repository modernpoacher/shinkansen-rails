import chai, { expect } from 'chai'
import sinonChai from 'sinon-chai'

import {
  Rails
} from 'shinkansen-rails'

chai.use(sinonChai)

describe('shinkansen-rails', () => {
  it('is a function', () => {
    expect(Rails).to.be.a('function')
  })
})
