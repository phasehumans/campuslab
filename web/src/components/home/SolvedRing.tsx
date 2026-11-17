import { cn } from '@/lib/utils'

type DifficultyStat = { name: 'Easy' | 'Medium' | 'Hard'; value: number; total: number }

interface SolvedRingProps {
    stats: DifficultyStat[]
    /** Total problems on the platform (ring denominator) */
    total: number
}

const SEGMENT_COLOR: Record<DifficultyStat['name'], string> = {
    Easy: '#5cbf92', // emerald-400 (theme)
    Medium: '#fcd34d',
    Hard: '#eda0a5', // rose-300 (theme)
}

const LABEL_CLASS: Record<DifficultyStat['name'], string> = {
    Easy: 'text-emerald-500 dark:text-emerald-400',
    Medium: 'text-[#d97706] dark:text-[#fcd34d]',
    Hard: 'text-rose-500 dark:text-rose-300',
}

const SIZE = 76
const STROKE = 7
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/** Solved count in a ring split by difficulty, with a per-difficulty legend. */
export function SolvedRing({ stats, total }: SolvedRingProps) {
    const solved = stats.reduce((sum, s) => sum + s.value, 0)
    const denominator = Math.max(total, solved, 1)

    // Lay segments end to end, starting at 12 o'clock
    let offset = 0
    const segments = stats.map((s) => {
        const length = (s.value / denominator) * CIRCUMFERENCE
        const segment = { name: s.name, length, offset }
        offset += length
        return segment
    })

    return (
        <div className="flex items-center gap-4 pt-1 font-mono">
            <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
                <svg
                    width={SIZE}
                    height={SIZE}
                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                    className="-rotate-90"
                    role="img"
                    aria-label={`${solved} of ${total} problems solved`}
                >
                    <circle
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={RADIUS}
                        fill="none"
                        strokeWidth={STROKE}
                        className="stroke-[#f1f5f9] dark:stroke-[#252423]"
                    />
                    {segments.map(
                        (seg) =>
                            seg.length > 0 && (
                                <circle
                                    key={seg.name}
                                    cx={SIZE / 2}
                                    cy={SIZE / 2}
                                    r={RADIUS}
                                    fill="none"
                                    stroke={SEGMENT_COLOR[seg.name]}
                                    strokeWidth={STROKE}
                                    strokeDasharray={`${seg.length} ${CIRCUMFERENCE - seg.length}`}
                                    strokeDashoffset={-seg.offset}
                                    className="transition-all duration-500"
                                />
                            )
                    )}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                    <span className="text-base font-bold text-[#090a0f] dark:text-[#e8e8e6]">
                        {solved}
                    </span>
                    <span className="text-[10px] text-[#94a3b8] dark:text-[#777777] mt-0.5">
                        /{total}
                    </span>
                </div>
            </div>

            <div className="flex-1 min-w-0 space-y-1.5 text-[11px]">
                {stats.map((s) => (
                    <div key={s.name} className="flex items-center justify-between gap-2">
                        <span className={cn('font-medium', LABEL_CLASS[s.name])}>{s.name}</span>
                        <span className="text-[#090a0f] dark:text-[#e8e8e6] font-semibold">
                            {s.value}
                            <span className="text-[#94a3b8] dark:text-[#777777] font-normal">
                                /{s.total}
                            </span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
