import React, { Component } from 'react';
import { node } from 'prop-types';
import ErrorComponent from './ErrorComponent';
import { errorTextsPropType } from '../../interfaces/types';
import { DEFAULT_ERROR_TEXTS } from '../../constants';

class ErrorBoundary extends Component {
  static propTypes = {
    children: node,
    texts: errorTextsPropType
  };

  static defaultProps = {
    children: null,
    texts: DEFAULT_ERROR_TEXTS
  };

  state = {
    error: false
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Something unexpected had happened', error, errorInfo);
  }

  render() {
    const { error } = this.state;
    const { texts } = this.props;

    if (error) {
      return <ErrorComponent error={error.message} texts={texts} />;
    }
    return this.props.children;
  }
}

export const getUser = state => state.user;

export default ErrorBoundary;
