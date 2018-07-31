import React from 'react'
import PropTypes from 'prop-types'

const Component = props => (
  <div>
    {'Input with props: ' + JSON.stringify(props, false, 2)}
    <input placeholder={props.placeholder} />
  </div>
)

Component.propTypes = {
  placeholder: PropTypes.string
}

Component.defaultProps = {
  placeholder: 'Gimme some input!'
}

export default Component