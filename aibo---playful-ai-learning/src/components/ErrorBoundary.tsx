import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center space-y-6 border-2 border-red-100">
            <div className="inline-flex p-4 bg-red-100 text-red-600 rounded-2xl">
              <AlertTriangle size={48} />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-gray-900">Oops! Something went wrong</h1>
              <p className="text-gray-500 font-medium">
                We encountered an unexpected error. Don't worry, your progress is safe!
              </p>
            </div>

            {true && (
              <div className="p-4 bg-gray-50 rounded-xl text-left overflow-auto max-h-32">
                <code className="text-xs text-red-500">{this.state.error?.toString()}</code>
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full py-4 bg-aibo-blue-500 text-white rounded-2xl font-black text-lg hover:bg-aibo-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
            >
              <RefreshCcw size={20} />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
