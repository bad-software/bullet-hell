import m from 'mithril'
import { Model } from 'Models'
import { ctrl } from './controller'


export const Sound = new class C_Sound extends Model {
  constructor() {
    super()

    this.bgm = new ( window.AudioContext || window.webkitAudioContext )()
    this.sfx = new ( window.AudioContext || window.webkitAudioContext )()

    this.ctrl = ctrl
  }
}

function initBGM() {
  const
    ctx = new ( window.AudioContext || window.webkitAudioContext )(),
    osc = {
      A: ctx.createOscillator(),
      B: ctx.createOscillator(),
    },
    gain = {
      A: ctx.createGain(),
      B: ctx.createGain(),
    }

  osc.A.frequency.value = 70
  osc.A.type = 'square'

  osc.B.frequency.value = 280
  osc.B.type = 'square'

  osc.A.connect( gain.A )
  gain.A.connect( ctx.destination )

  osc.B.connect( gain.B )
  gain.B.connect( ctx.destination )

  return { ctx, gain, osc }
}