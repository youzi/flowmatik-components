import React from 'react'

const Topbar = () => (
  <div
    style={{
      background: 'lightgrey'
    }}
  >
    im a topbar
  </div>
)

const Main = ({ children }) => (
  <div style={{ flex: 1, overflow: 'auto' }}>{children}</div>
)

export default ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <Topbar />
    <Main>{children}</Main>
  </div>
)
