import React from 'react'

export default ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div>app component</div>
    <div style={{ border: '1px solid', flex: 1, overflow: 'auto' }}>
      {children}
    </div>
  </div>
)
