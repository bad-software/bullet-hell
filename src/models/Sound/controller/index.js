import { Sound } from '../index'
import { droneA } from './sounds/droneA'
import { intro } from './sounds/intro'
import { playerFire } from './sounds/playerFire'

function play( sound, start = null, stop = 1) {
  start = start || Sound.sfx.currentTime
  sounds[ sound ]( start, stop )
}

const sounds = {
  droneA,
  intro,
  playerFire,
}

export const ctrl = {
  play
}