import React from 'react'
import PropTypes from 'prop-types'

const Component = (props) => <div>{ 'Check with props: ' + JSON.stringify(props, false, 2) }</div>

Component.propTypes = {
  
}

Component.defaultProps = {

}

export default Component