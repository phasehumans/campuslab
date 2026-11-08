import { Component, type ReactNode, type ErrorInfo } from 'react'
import { AlertTriangle, RotateCcw, ArrowLeft } from 'lucide-react'

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
                <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-[#141414] text-[#090a0f] dark:text-[#e8e8e6] p-4 transition-colors font-sans selection:bg-[#87b2f4] selection:text-[#0a1128]">
                    <div className="max-w-md w-full border border-[#e2e8f0] dark:border-[#333333] bg-white dark:bg-[#1e1e1e] p-6 rounded-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-4 text-center transition-colors">
                        <div className="flex items-center justify-between font-mono text-[11px] text-[#64748b] dark:text-[#a09f9d] border-b border-[#f0f2f5] dark:border-[#272727] pb-2">
                            <span className="uppercase tracking-wider font-medium flex items-center gap-1.5 text-red-600 dark:text-red-400">
                                <AlertTriangle className="h-3.5 w-3.5" />
                                [Application Error]
                            </span>
                            <span className="text-[10px] text-[#94a3b8] dark:text-[#a09f9d]">
                                500
                            </span>
                        </div>

                        <div className="space-y-1 text-left">
                            <h2 className="text-sm font-semibold tracking-tight text-[#090a0f] dark:text-[#e8e8e6]">
                                Something went wrong
                            </h2>
                            <p className="text-xs text-[#64748b] dark:text-[#a09f9d]">
                                An unexpected client runtime error occurred while rendering this
                                page.
                            </p>
                        </div>

                        {this.state.error?.message && (
                            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 font-mono text-[11px] rounded-[2px] text-left break-all overflow-x-auto">
                                {this.state.error.message}
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-2 pt-1 font-mono text-xs">
                            <button
                                type="button"
                                onClick={() => (window.location.href = '/')}
                                className="flex-1 flex items-center justify-center gap-1.5 bg-[#090a0f] dark:bg-white text-white dark:text-[#141414] hover:bg-[#27272a] dark:hover:bg-[#e8e8e6] py-2 px-3 rounded-[3px] transition-colors cursor-pointer"
                            >
                                <ArrowLeft className="h-3.5 w-3.5" />
                                <span>Back to Problems</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="flex-1 flex items-center justify-center gap-1.5 border border-[#e2e8f0] dark:border-[#333333] hover:bg-[#f9fafb] dark:hover:bg-[#252423] text-[#090a0f] dark:text-[#e8e8e6] py-2 px-3 rounded-[3px] transition-colors cursor-pointer"
                            >
                                <RotateCcw className="h-3.5 w-3.5" />
                                <span>Reload Page</span>
                            </button>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
