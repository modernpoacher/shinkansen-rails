import React from 'react'

import {
  Link
} from 'react-router'

export default class Forward extends React.Component {
  render () {
    const {
      pathname
    } = this.props

    const key = `${pathname}-forward`
    const to = {
      pathname
    }

    return (
      <li key={key} className='rocket-forward'>
        <Link to={to}>
          Forward
        </Link>
      </li>
    )
  }
}

Forward.propTypes = {
  pathname: React.PropTypes.string.isRequired
}
