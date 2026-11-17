import { cn } from '@/lib/utils'
import type { DuelRecord as DuelRecordData } from '@/lib/types'

const SEGMENTS = [
    { key: 'wins', label: 'won', color: 'bg-emerald-400' },
    { key: 'losses', label: 'lost', color: 'bg-rose-300' },
] as const

/**
 * 1v1 duel record for the profile panel: win rate, a segmented bar and a
 * colour-keyed legend. Only decided duels count (draws are left out), and nothing
 * renders until the first win or loss.
 */
export function DuelRecord({ record }: { record: DuelRecordData }) {
    const decided = record.wins + record.losses
    if (decided === 0) return null

    const winRate = Math.round((record.wins / decided) * 100)
    const segments = SEGMENTS.filter((s) => record[s.key] > 0)
    const legend = SEGMENTS.map((s) => ({ ...s, text: `${record[s.key]} ${s.label}` }))

    return (
        <div className="space-y-2 font-mono">
            <div className="flex items-baseline justify-between text-[10px] uppercase tracking-wider text-[#64748b] dark:text-[#777777]">
                <span>1v1 Duels</span>
                <span className="normal-case tracking-normal">
                    <span className="text-xs font-semibold text-[#090a0f] dark:text-[#e8e8e6]">
                        {winRate}%
                    </span>{' '}
                    win rate
                </span>
            </div>

            {/* Segmented bar: one rounded piece per outcome, sized by share of decided duels */}
            <div
                className="flex h-2 w-full gap-[3px]"
                role="img"
                aria-label={`${record.wins} won, ${record.losses} lost`}
            >
                {segments.map((s) => (
                    <div
                        key={s.key}
                        className={cn('h-full rounded-full min-w-[6px]', s.color)}
                        style={{ flexGrow: record[s.key], flexBasis: 0 }}
                    />
                ))}
            </div>

            <div className="flex items-center gap-3 text-[11px] text-[#52525b] dark:text-[#a09f9d]">
                {legend.map((l) => (
                    <span key={l.key} className="flex items-center gap-1.5">
                        <span className={cn('h-1.5 w-1.5 rounded-full', l.color)} aria-hidden />
                        {l.text}
                    </span>
                ))}
            </div>
        </div>
    )
}
