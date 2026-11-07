import React, { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] p-6 text-white text-center">
                    <div className="max-w-md space-y-4">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400 text-2xl">
                            ⚠️
                        </div>
                        <h2 className="text-xl font-bold">Something went wrong</h2>
                        <p className="text-sm text-gray-400">
                            {this.state.error?.message ||
                                'An unexpected error occurred while rendering this page.'}
                        </p>
                        <div className="flex justify-center gap-3 pt-4">
                            <button
                                onClick={() => (window.location.href = '/practice')}
                                className="rounded-xl bg-[#3E6FC3] px-4 py-2 text-sm font-semibold text-white hover:bg-[#325a9e] transition-colors"
                            >
                                Back to Problems
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-white/5 transition-colors"
                            >
                                Reload Page
                            </button>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
