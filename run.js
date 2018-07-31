const fs = require('fs')

fs.readdir('lib', (err, files) => {
  const imports = []
  const exports = []

  files.forEach(file => {
    if (file !== 'index.js') {
      const [Comp] = file.split('.')
      const comp = Comp.toLowerCase()
      imports.push(`import ${comp} from './${Comp}'`)
      exports.push(`export const ${Comp} = ${comp}`)
      if (file !== 'App.js') {
        fs.writeFile(
          'lib/' + file,
          `import React from 'react'
import PropTypes from 'prop-types'

const Component = (props) => <div>{ '${Comp} with props: ' + JSON.stringify(props, false, 2) }</div>

Component.propTypes = {
  
}

Component.defaultProps = {

}

export default Component`,
          err => console.log(err || 'wrote to: ' + file)
        )
      }
    }
  })
  const content = [imports.join('\n'), exports.join('\n')].join('\n\n')

  fs.writeFile('lib/index.js', content, err => {
    console.log(err || 'success writing components...')
  })
})