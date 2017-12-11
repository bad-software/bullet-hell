import { Sound } from 'Models/Sound/index'
import { randomRange } from 'Lib/utility'

export function droneA( start, stop ) {
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
  osc.A.connect( gain.A )

  gain.A.gain.setValueAtTime( 0, start )
  gain.A.gain.linearRampToValueAtTime( 0.3, start + start * 1.5 )
  gain.A.connect( ctx.destination )

  function setFrequency( osc ) {
    const time = randomRange( 1, 1.5 )
    osc.frequency.exponentialRampToValueAtTime( randomRange( 400, 45 ), time )
    setTimeout( () => setFrequency( osc ), time * 1000 )
  }

  setFrequency( osc.A )
}