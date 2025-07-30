import React from 'react';

/**
 * Error Boundary for handling lazy loading errors
 * Provides fallback UI when code splitting fails
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Code splitting error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="center" style={{ padding: '2rem', textAlign: 'center' }}>
          <div className="card">
            <h2>⚠️ Loading Error</h2>
            <p>Failed to load this page. Please try refreshing.</p>
            <button 
              className="button"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
