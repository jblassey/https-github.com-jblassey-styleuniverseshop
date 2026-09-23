import React from 'react';

/**
 * Top-level error boundary. Catches render errors in any child component
 * so a bug in one part of the page (e.g. a broken product card later on)
 * does not take down the entire site with a blank white screen.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // In a later stage this can report to a logging service.
    // eslint-disable-next-line no-console
    console.error('Style Universe rendering error:', error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.assign('/');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6">
          <div className="text-center max-w-sm">
            <p className="text-label mb-4">Something went wrong</p>
            <h1 className="text-h2 mb-4">We hit a snag.</h1>
            <p className="text-body mb-8">
              Part of the page failed to load. Try returning home and starting again.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="text-button inline-flex items-center justify-center px-8 py-3 bg-black text-white hover:bg-charcoal transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
