import React from 'react'

import Immutable from 'immutable'

import Reverse from './reverse'
import Forward from './forward'

import {
  Gears
} from '../gears'

export default class Pinion extends React.Component {
  shouldComponentUpdate (props) {
    const {
      reverse,
      forward
    } = this.props

    return (
      !(Immutable.is(Immutable.Map(reverse), Immutable.Map(props.reverse))) ||
      !(Immutable.is(Immutable.Map(forward), Immutable.Map(props.forward)))
    )
  }

  render () { // console.log('(Pinion)render()')
    const pattern = Gears.pattern()

    const {
      reverse,
      forward
    } = this.props

    const r = Gears.engage(pattern, reverse)
    const f = Gears.engage(pattern, forward)

    if (r || f) {
      return (
        <ul className='react-gears-pinion' key='react-gears-pinion'>
          {(r) ? (<Reverse pathname={Gears.path(pattern, reverse)} />) : null}
          {(f) ? (<Forward pathname={Gears.path(pattern, forward)} />) : null}
        </ul>
      )
    }

    return false
  }
}

Pinion.propTypes = {
  reverse: React.PropTypes.object,
  forward: React.PropTypes.object
}
