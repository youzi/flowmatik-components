import React from 'react'
// import Input from './Input'
import { connect } from 'hub'

const isValidName = str => {
  if (str === ' ') return false
  return /^(([a-z'\u00E4\u00F6\u00FC\u00C4\u00D6\u00DC\u00dfàâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ]{2,30})|(\s{1})){1,30}$/i.test(
    str
  )
}

// TEMP
const Input = () => <input placeholder="im a temp input" />

export default connect(
  ({ hub, autofocus, placeholder, data, uuid, label }) => (
    <Input
      autofocus={autofocus}
      type="text"
      label={label}
      value={data ? data.value : ''}
      placeholder={placeholder || 'e.g. Jim de Beer'}
      validation={isValidName}
      onChange={(value, valid) =>
        hub.setImmediate('sync', { value, valid }, uuid)
      }
    />
  ),
  ({ uuid }) => ({ type: 'sync', options: uuid })
)
