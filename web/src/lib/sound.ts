/**
 * A tiny notification chime synthesised with the Web Audio API (no audio files).
 * Browsers only allow audio after the user has interacted with the page; in a
 * contest or duel that has already happened (the "Enter fullscreen" click), and
 * anywhere else a blocked sound simply fails silently.
 */

let ctx: AudioContext | null = null

function audioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    if (!ctx) ctx = new Ctor()
    return ctx
}

// One soft rising "ding-ding" for every alert: [frequency Hz, start offset s]
/** Peak loudness of each note (0..1). Raise or lower this to change the chime volume. */
const CHIME_VOLUME = 0.25

const CHIME: Array<[number, number]> = [
    [880, 0],
    [1320, 0.09],
]

export function playAlertSound() {
    const ac = audioContext()
    if (!ac) return
    try {
        if (ac.state === 'suspended') void ac.resume()
        const now = ac.currentTime
        for (const [freq, offset] of CHIME) {
            const osc = ac.createOscillator()
            const gain = ac.createGain()
            osc.type = 'sine'
            osc.frequency.value = freq
            const t = now + offset
            // quick fade in/out so the note doesn't click
            gain.gain.setValueAtTime(0.0001, t)
            gain.gain.exponentialRampToValueAtTime(CHIME_VOLUME, t + 0.015)
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.32)
            osc.connect(gain).connect(ac.destination)
            osc.start(t)
            osc.stop(t + 0.35)
        }
    } catch {
        // audio not available; alerts still show visually
    }
}
