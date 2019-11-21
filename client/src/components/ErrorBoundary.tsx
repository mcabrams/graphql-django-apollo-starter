import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

interface ErrorBoundaryProps {}
interface ErrorBoundaryState {
  hasError: boolean;
  eventId: undefined | string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { eventId: undefined, hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error | null, errorInfo: object) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    const { children } = this.props;
    const { hasError, eventId } = this.state;

    if (hasError) {
      return (
        <button
          onClick={() => Sentry.showReportDialog({ eventId })}
          type="button"
        >
          Report feedback
        </button>
      );
    }

    return children;
  }
}
