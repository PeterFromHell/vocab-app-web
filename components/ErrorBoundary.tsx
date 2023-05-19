import React from 'react'
class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);
      this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log({error, errorInfo})
    }
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something went wrong.</h1>;
                    <button
                        type="button"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Try again</button>
                </div>
            )
        }
        return this.props.children;
    }
}
export default ErrorBoundary;