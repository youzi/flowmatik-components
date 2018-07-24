// REFACTOR
import React, { Component } from 'react'
import { input, inputIcon, modal } from './index.css'
import CheckIcon from 'components/Icons/line/Check'
import WrongIcon from 'components/Icons/line/Close'
import { isValidEmail } from '../../util'
import { connect } from 'hub'

const Icon = connect(({ valid, value, hub }) => {
  const { negative, positive } = hub.get('theme').colors
  const iconStyle = {
    transition: 'opacity 0.3s',
    position: 'absolute'
  }
  return (
    <div
      style={{
        position: 'relative'
      }}
    >
      <CheckIcon
        style={{ opacity: valid ? 1 : 0, ...iconStyle }}
        color={positive.bg[0]}
      />
      <WrongIcon
        style={{ opacity: !value ? 0 : !valid ? 1 : 0, ...iconStyle }}
        color={negative.bg[0]}
      />
    </div>
  )
})

const InputIcon = connect(({ valid, value }) => {
  return (
    <div
      className={inputIcon}
      style={{
        height: 50,
        marginTop: -35,
        marginLeft: 'calc(100% - 24px)'
      }}
    >
      <Icon valid={valid} value={value} />
    </div>
  )
})

class Input extends Component {
  state = { valid: false, value: '', focus: false }
  componentDidMount() {
    this.t = setTimeout(() => {
      this.first = true
    }, 700)
  }
  componentWillUnmount() {
    clearTimeout(this.t)
    clearTimeout(this.timer)
  }
  render() {
    let {
      setForm,
      type = 'email',
      validation,
      modal: inModal,
      label,
      attach,
      onChange,
      autofocus,
      autofocusIndex,
      autocomplete,
      value: propsValue,
      style = {}
    } = this.props

    const { value, valid, focus } = this.state
    const validator = validation || (type === 'email' ? isValidEmail : false)
    const placeholder =
      !focus && label
        ? label
        : this.props.placeholder !== void 0
          ? this.props.placeholder
          : type === 'email'
            ? 'Email Address'
            : type === 'password'
              ? 'Password'
              : ''
    if (type === 'email' && !autocomplete) {
      autocomplete = 'email'
    }
    if (
      autofocus &&
      (!this.state.autofocus ||
        (autofocusIndex !== void 0 && this.autofocusIndex !== autofocusIndex))
    ) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.state.autofocus = autofocusIndex || true
        this.e.focus()
      }, !this.first ? 600 : 0)
    }

    this.autofocusIndex = autofocusIndex

    return (
      <div
        style={{
          flex: 1,
          width: '100%',
          transition: 'color 0.3s',
          ...style
        }}
      >
        <input
          className={`${input}${inModal ? ' ' + modal : ''}`}
          style={{
            fontSize: 16,
            width: '100%',
            lineHeight: '15px',
            padding: '8px 0',
            marginBottom: 0,
            maxWidth: '100%',
            fontWeight: 100,
            transition: 'border 0.3s',
            background: 'transparent',
            color: 'inherit'
          }}
          ref={e => {
            if (setForm) setForm(e)
            if (e) this.e = e
          }}
          autoComplete={autocomplete || 'off'}
          type={type}
          value={propsValue || value}
          placeholder={placeholder}
          onChange={e => {
            const value = e.target.value
            const state = {
              value,
              autofocus: this.state.autofocus,
              valid: validator ? validator(value) : false
            }
            this.setState(state)
            if (onChange) onChange(state.value, state.valid)
            if (attach) attach[type] = state
          }}
        />
        {validator && <InputIcon valid={valid} value={value} />}
      </div>
    )
  }
}

export default Input
