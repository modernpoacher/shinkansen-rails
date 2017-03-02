import React from 'react'

import Immutable from 'immutable'

import {
  Reverse
} from './reverse'

import {
  Forward
} from './forward'

import {
  Gears
} from '../gears'

export default class Pinion extends React.Component {
  state = {} // define state

  /**
   *  Convert latest 'props' to 'Immutable.Map()' and store in 'state'
   *
   *  @param {Object} props   Latest props
   */
  componentWillReceiveProps (props) { // // console.log('(Pinion)componentWillReceiveProps()', props) // eslint-disable-line
    const {
      reverse,
      forward
    } = props

    this.setState({
      REVERSE: Immutable.Map(reverse),
      FORWARD: Immutable.Map(forward)
    })
  }

  /**
   *  Compare latest 'props' with previous 'state' for changes to 'reverse' or 'forward'
   *
   *  @param {Object} props   Latest props
   */
  shouldComponentUpdate (props) { // // console.log('(Pinion)shouldComponentUpdate()', props)
    /**
     *  Compare new 'props' to old 'state'
     */
    const {
      reverse,
      forward
    } = props

    const {
      REVERSE,
      FORWARD
    } = this.state // state must be defined

    /**
     *  Compare object values
     */
    return (
      !(Immutable.is(Immutable.Map(reverse), REVERSE)) ||
      !(Immutable.is(Immutable.Map(forward), FORWARD))
    )
  }

  render () { // // console.log('(Pinion)render()')
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
          {(r) ? (<Reverse pathname={Gears.path(pattern, reverse)} />) : false}
          {(f) ? (<Forward pathname={Gears.path(pattern, forward)} />) : false}
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
