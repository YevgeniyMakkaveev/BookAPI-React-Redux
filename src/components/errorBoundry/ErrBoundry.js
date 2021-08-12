import React, { Component } from "react";
import ErrorGlobal from "../error";

export default class ErrorBoundry extends Component {
  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorGlobal />;
    }
    return this.props.children;
  }
}
