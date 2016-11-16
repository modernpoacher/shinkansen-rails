import React from 'react'

import {
  Link
} from 'react-router'

export default class Reverse extends React.Component {
  render () {
    const {
      pathname
    } = this.props

    const key = `${pathname}-reverse`
    const to = {
      pathname
    }

    return (
      <li key={key} className='rocket-reverse'>
        <Link to={to}>
          Reverse
        </Link>
      </li>
    )
  }
}

Reverse.propTypes = {
  pathname: React.PropTypes.string.isRequired
}
