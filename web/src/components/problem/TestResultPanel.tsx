import { Beaker } from 'lucide-react'

export function TestResultPanel() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-3">
            <Beaker className="h-8 w-8 text-gray-500" />
            <p className="text-sm">Run your code to see results</p>
        </div>
    )
}
