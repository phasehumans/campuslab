import { cn } from '@/lib/utils'

interface ActivityGridProps {
    /** Today's date in IST, YYYY-MM-DD (from the server) */
    today: string
    days: Array<{ date: string; count: number }>
}

const DAYS = 30
const DAY_MS = 24 * 60 * 60 * 1000

function toUtcMs(isoDate: string) {
    const [y, m, d] = isoDate.split('-').map(Number)
    return Date.UTC(y, m - 1, d)
}

function toIsoDate(ms: number) {
    return new Date(ms).toISOString().slice(0, 10)
}

function cellColor(count: number) {
    if (count <= 0) return 'bg-[#f1f5f9] dark:bg-[#252423]'
    // Brand blue (#87b2f4), deeper with more problems solved that day
    if (count === 1) return 'bg-[#87b2f4]/35'
    if (count === 2) return 'bg-[#87b2f4]/65'
    return 'bg-[#87b2f4]'
}

/**
 * The last 30 days as a 10 x 3 grid of square cells spanning the full card width.
 * Oldest day top-left, today bottom-right.
 */
export function ActivityGrid({ today, days }: ActivityGridProps) {
    const counts = new Map(days.map((d) => [d.date, d.count]))
    const todayMs = toUtcMs(today)
    const cells = Array.from({ length: DAYS }, (_, i) => {
        const date = toIsoDate(todayMs - (DAYS - 1 - i) * DAY_MS)
        return { date, count: counts.get(date) ?? 0 }
    })

    const totalSolved = days.reduce((sum, d) => sum + d.count, 0)
    const activeDays = days.filter((d) => d.count > 0).length

    return (
        <div className="space-y-1.5 font-mono">
            <div className="flex items-center justify-between text-[10px] text-[#64748b] dark:text-[#777777] uppercase tracking-wider">
                <span>Last 30 days</span>
                <span className="normal-case tracking-normal">
                    {totalSolved} solved · {activeDays} {activeDays === 1 ? 'day' : 'days'}
                </span>
            </div>
            <div
                className="grid grid-cols-10 gap-1 w-full"
                role="img"
                aria-label={`${totalSolved} problems solved in the last 30 days`}
            >
                {cells.map((cell) => (
                    <div
                        key={cell.date}
                        title={`${new Date(toUtcMs(cell.date)).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            timeZone: 'UTC',
                        })}: ${cell.count} solved`}
                        className={cn(
                            'aspect-square w-full rounded-[2px]',
                            cellColor(cell.count),
                            cell.date === today && 'ring-1 ring-[#3b6fc4] dark:ring-[#cfe0fb]'
                        )}
                    />
                ))}
            </div>
        </div>
    )
}
