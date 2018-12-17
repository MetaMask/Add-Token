import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import queryString from 'querystringify'
import TextField from '@material-ui/core/TextField';

const schema = {
  title: "Token Details",
  properties: {
    tokenName: {type: "string", title: "Token Name", default: "My Token", required: true},
    tokenAddress: {type: "string", title: "Token Address", required: true},
    tokenSymbol: {type: "string", title: "Token Symbol", default: "TKN", required: true},
    tokenDecimals: {type: "number", title: "Token Decimals", default: 18, required: true},
    tokenNet: {type: "number", title: "Token Network Id", default: 1, required: true},
    tokenImage: {type: "string", title: "Token Image URL (optional)", required: false},
  }
};

class EditTokenPanel extends Component {

  constructor () {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="my-form">
        <h1>Enter Token Details</h1>
        <p>To create an easy token-suggesting page.</p>

        <div className="form-content">
          { Object.keys(schema.properties).map((key) => {
            return (
              <div key={key}>
                <TextField
                  id={key}
                  required={schema.properties[key].required}
                  errormessage={this.state[key + 'Error']}
                  label={schema.properties[key].title}
                  margin="normal"
                />
              </div>
            )
          }) }

          <Button onClick={this.visitForm}>
            Create Add Token Page
          </Button>
        </div>
      </div>
    )
  }

  visitForm () {

    const opts = {}
    const keys = ['tokenImage', 'tokenName', 'tokenAddress', 'tokenNet', 'tokenSymbol', 'tokenDecimals']

    keys.forEach((key) => {
      const el = document.querySelector('#' + key)
      if (!el) return
      opts[key] = el.value
    })

    window.location.href = './add?' + queryString.stringify(opts)
  }
}

export default EditTokenPanel;

