import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("VR Rendering Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-8 text-center">
          <span className="material-symbols-outlined text-6xl text-red-500 mb-4 animate-bounce">error</span>
          <h1 className="text-3xl font-bold mb-4 font-headline text-red-400">Something went wrong in the VR Scene</h1>
          <p className="text-slate-400 max-w-md mb-8 italic">
            {this.state.error?.message || "An unexpected rendering error occurred."}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary hover:bg-primary/80 px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">refresh</span>
            RETRY EXPERIENCE
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
