import { Component } from "react";

export class EthereumProvider extends Component {

  render() {
    const { ethereum } = window;

    if (!ethereum) {
      return <h1>errorrrr</h1>;
    }
  }
}