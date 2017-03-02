import React from 'react'
import Form from 'react-jsonschema-form'

export default class Engine extends React.Component {
  shouldComponentUpdate = (props) => props.definition.schema !== this.props.definition.schema

  handleChange = (parameters) => this.props.onChange(parameters)
  handleSubmit = ({ formData }) => this.props.onSubmit(formData)
  handleError = (parameters) => this.props.onError(parameters)

  render () { // // console.log('(Engine)render()')
    const {
      definition
    } = this.props

    if ('schema' in definition) {
      const {
        schema,
        formData,
        uiSchema
      } = definition

      return (
        <div className='react-gears-engine' key='react-gears-engine'>
          <Form
            schema={schema}
            formData={formData}
            uiSchema={uiSchema}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
            onError={this.handleError} />
        </div>
      )
    }

    return false
  }
}

Engine.propTypes = {
  definition: React.PropTypes.shape({
    schema: React.PropTypes.object
  }).isRequired,
  onChange: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  onError: React.PropTypes.func
}

Engine.defaultProps = {
  definition: {},
  onChange: () => { /* no op */ },
  onSubmit: () => { /* no op */ },
  onError: () => { /* no op */ }
}
