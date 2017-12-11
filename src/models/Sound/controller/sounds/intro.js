import { Sound } from 'Models/Sound/index'

export function intro(start, stop ) {
  const
    ctx = Sound.sfx,
    gain = {
      A: ctx.createGain(),
      B: ctx.createGain(),
    },
    osc = {
      A: ctx.createOscillator(),
      B: ctx.createOscillator(),
    }

  // Osc A
  osc.A.frequency.value = 70
  osc.A.type = 'square'
  osc.A.start( start )
  osc.A.stop( start + stop )
  osc.A.connect( gain.A )

  gain.A.gain.setValueAtTime( 0, start )
  gain.A.gain.linearRampToValueAtTime( 1, start + stop / 15 )
  gain.A.gain.linearRampToValueAtTime( 0.0001, start + stop )
  gain.A.connect( ctx.destination )

  // Osc B
  osc.B.frequency.value = 280
  osc.B.type = 'square'
  osc.B.start( start )
  osc.B.stop( start + stop )
  osc.B.connect( gain.B )

  gain.B.gain.setValueAtTime( 0, start )
  gain.B.gain.linearRampToValueAtTime( 0.8, start + stop )
  gain.B.connect( ctx.destination )
}